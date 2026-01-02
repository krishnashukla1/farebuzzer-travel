// import LoginHour from "../models/loginHoursSchema.js";

// const today = () => new Date().toISOString().slice(0, 10);

// // LOGIN
// export const login = async (req, res) => {
//   const record = await LoginHour.findOneAndUpdate(
//     { userId: req.user._id, date: today() },
//     { loginTime: new Date() },
//     { upsert: true, new: true }
//   );

//   res.json({ message: "Login recorded", record });
// };

// // LOGOUT
// export const logout = async (req, res) => {
//   const record = await LoginHour.findOneAndUpdate(
//     { userId: req.user._id, date: today() },
//     { logoutTime: new Date() },
//     { new: true }
//   );

//   res.json({ message: "Logout recorded", record });
// };

// // START BREAK
// export const startBreak = async (req, res) => {
//   const record = await LoginHour.findOne({ userId: req.user._id, date: today() });
//   record.breaks.push({ start: new Date() });
//   await record.save();
//   res.json({ message: "Break started" });
// };

// // END BREAK
// export const endBreak = async (req, res) => {
//   const record = await LoginHour.findOne({ userId: req.user._id, date: today() });
//   const lastBreak = record.breaks[record.breaks.length - 1];
//   lastBreak.end = new Date();
//   await record.save();
//   res.json({ message: "Break ended" });
// };

//====================================================

import LoginHour from "../models/loginHoursSchema.js";
import Attendance from "../models/Attendance.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);


/* ================= CONSTANTS ================= */

const BREAK_LIMITS = {
  HALF_DAY: 70 * 60 * 1000, // 1h 10m
  ABSENT: 90 * 60 * 1000   // 1h 30m
};

const SHIFT_START_HOUR = 15; // 3 PM IST
const MAX_FREE_BREAKS = 3;

/* ================= HELPERS ================= */

function getISTNow() {
  return dayjs().tz("Asia/Kolkata");
}

function getShiftDate() {
  const istNow = getISTNow();
  let shiftDate = istNow;

  if (istNow.hour() < SHIFT_START_HOUR) {
    shiftDate = istNow.subtract(1, "day");
  }

  return shiftDate.format("YYYY-MM-DD");
}

function calculateTotalBreakTime(breaks = []) {
  return breaks.reduce((total, b) => {
    if (!b.start) return total;
    const start = new Date(b.start);
    const end = b.end ? new Date(b.end) : new Date();
    return total + (end - start);
  }, 0);
}

async function updateAttendanceByBreak(employeeId, date) {
  const record = await LoginHour.findOne({ employeeId, date });
  if (!record) return;

  const totalBreakMs = calculateTotalBreakTime(record.breaks);
  let status = null;

  if (totalBreakMs >= BREAK_LIMITS.ABSENT) status = "Absent";
  else if (totalBreakMs >= BREAK_LIMITS.HALF_DAY) status = "Half Day";

  if (status) {
    await Attendance.findOneAndUpdate(
      { employeeId, date },
      { status },
      { upsert: true }
    );
  }
}

/* ================= LOGIN / LOGOUT ================= */

export const login = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOneAndUpdate(
      { employeeId, date },
      { $setOnInsert: { loginTime: new Date(), breaks: [] } },
      { upsert: true, new: true }
    );

    res.json({ message: "Login recorded", record });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const logout = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOneAndUpdate(
      { employeeId, date },
      { logoutTime: new Date() },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "No login record found" });
    }

    res.json({ message: "Logout recorded", record });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};

/* ================= BREAK REQUEST ================= */

export const requestBreak = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ employeeId, date });
    if (!record) {
      return res.status(404).json({ message: "No active shift found" });
    }

    // already on break
    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (activeBreak) {
      return res.status(400).json({ message: "Already on break" });
    }

    // pending request exists
    const pending = record.breaks.find(b => b.status === "pending");
    if (pending) {
      return res.status(400).json({ message: "Pending break request exists" });
    }

    const approvedCount = record.breaks.filter(b => b.status === "approved").length;

    // AUTO APPROVE FIRST 3
    if (approvedCount < MAX_FREE_BREAKS) {
      record.breaks.push({
        start: new Date(),
        status: "approved",
        approvedAt: new Date(),
        approvedBy: null
      });

      await record.save();

      return res.json({
        success: true,
        autoApproved: true,
        message: `Break started (${approvedCount + 1}/${MAX_FREE_BREAKS})`
      });
    }

    // NEED APPROVAL
    record.breaks.push({
      status: "pending",
      requestedAt: new Date()
    });

    await record.save();

    res.json({
      success: true,
      pending: true,
      message: "Break request sent to supervisor"
    });

  } catch (err) {
    res.status(500).json({ message: "Break request failed" });
  }
};

/* ================= BREAK START / END ================= */

export const startBreak = async (req, res) => {
  return res.status(400).json({
    message: "Use break request system"
  });
};

export const endBreak = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ employeeId, date });
    if (!record) {
      return res.status(404).json({ message: "No attendance record" });
    }

    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (!activeBreak) {
      return res.status(400).json({ message: "No active break" });
    }

    activeBreak.end = new Date();
    await record.save();

    await updateAttendanceByBreak(employeeId, date);

    res.json({
      success: true,
      message: "Break ended",
      break: activeBreak
    });

  } catch (err) {
    res.status(500).json({ message: "End break failed" });
  }
};

/* ================= SUPERVISOR ================= */

export const reviewBreakRequest = async (req, res) => {
  try {
    const { employeeId, breakIndex, action, rejectReason } = req.body;
    const supervisorId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ employeeId, date });
    if (!record || !record.breaks[breakIndex]) {
      return res.status(404).json({ message: "Break request not found" });
    }

    const br = record.breaks[breakIndex];
    if (br.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    if (action === "approve") {
      br.status = "approved";
      br.start = new Date();
      br.approvedBy = supervisorId;
      br.approvedAt = new Date();
    } else if (action === "reject") {
      br.status = "rejected";
      br.rejectReason = rejectReason || "No reason provided";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await record.save();

    res.json({ success: true, break: br });
  } catch (err) {
    res.status(500).json({ message: "Review failed" });
  }
};

export const getPendingBreakRequests = async (req, res) => {
  try {
    const date = getShiftDate();

    const data = await LoginHour.find({
      date,
      "breaks.status": "pending"
    })
      .populate("employeeId", "name email")
      .select("employeeId date breaks");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending breaks" });
  }
};

/* ================= STATS ================= */

export const getTodayStats = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ employeeId, date });
    if (!record) {
      return res.json({
        workedHoursToday: 0,
        totalBreakTimeToday: "00:00:00",
        isOnBreak: false
      });
    }

    const login = new Date(record.loginTime);
    const logout = record.logoutTime ? new Date(record.logoutTime) : new Date();

    const totalBreakMs = calculateTotalBreakTime(record.breaks);
    const workedMs = logout - login - totalBreakMs;

    res.json({
      workedHoursToday: +(workedMs / 36e5).toFixed(2),
      totalBreakTimeToday: Math.floor(totalBreakMs / 60000) + " min",
      isOnBreak: record.breaks.some(b => !b.end && b.status === "approved")
    });
  } catch (err) {
    res.status(500).json({ message: "Stats failed" });
  }
};

export const getAllLoginHours = async (req, res) => {
  try {
    const data = await LoginHour.find()
      .populate("employeeId", "name email")
      .sort({ date: -1, loginTime: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch login hours" });
  }
};
