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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

/* ================= CONSTANTS ================= */
const BREAK_LIMITS = {
  HALF_DAY: 70, // 1 hour 10 minutes in minutes
  ABSENT: 90    // 1 hour 30 minutes in minutes
};

const SHIFT_START_HOUR = 15; // 3 PM IST
const MAX_FREE_BREAKS = 3;
const FREE_BREAK_DURATION = 15; // 15 minutes for free breaks

/* ================= HELPERS ================= */
function getISTNow() {
  return dayjs().tz("Asia/Kolkata");
}

function getShiftDate() {
  const istNow = getISTNow();
  
  // If current time is before 3 PM, it belongs to previous day's shift
  if (istNow.hour() < SHIFT_START_HOUR) {
    return istNow.subtract(1, 'day').format("YYYY-MM-DD");
  }
  
  return istNow.format("YYYY-MM-DD");
}

function calculateTotalBreakMinutes(breaks = []) {
  return breaks.reduce((total, b) => {
    if (!b.start || b.status !== "approved") return total;
    
    const start = new Date(b.start);
    const end = b.end ? new Date(b.end) : new Date();
    
    // Make sure end is after start
    if (end <= start) return total;
    
    const duration = (end - start) / (1000 * 60); // Convert to minutes
    return total + Math.max(0, duration);
  }, 0);
}

function calculateWorkedHours(loginTime, logoutTime, totalBreakMinutes) {
  if (!loginTime) return 0;
  
  const login = new Date(loginTime);
  const logout = logoutTime ? new Date(logoutTime) : new Date();
  
  // Ensure logout is after login
  if (logout <= login) return 0;
  
  const totalMs = logout - login;
  const breakMs = totalBreakMinutes * 60 * 1000;
  const workedMs = totalMs - breakMs;
  
  return workedMs > 0 ? workedMs / (1000 * 60 * 60) : 0; // Convert to hours
}

function calculateAttendanceStatus(totalBreakMinutes) {
  if (totalBreakMinutes >= BREAK_LIMITS.ABSENT) return "absent";
  if (totalBreakMinutes >= BREAK_LIMITS.HALF_DAY) return "half-day";
  return "present";
}

function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return "0 min";
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

/* ================= LOGIN / LOGOUT ================= */
export const login = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    // Check if already logged in today
    const existingRecord = await LoginHour.findOne({ 
      userId, 
      date,
      logoutTime: { $exists: false }
    });

    if (existingRecord) {
      return res.status(400).json({ 
        success: false,
        message: "Already logged in for today",
        record: existingRecord 
      });
    }

    // Check if there's a completed record for today
    const completedRecord = await LoginHour.findOne({ 
      userId, 
      date,
      logoutTime: { $exists: true }
    });

    if (completedRecord) {
      return res.status(400).json({ 
        success: false,
        message: "Already completed today's shift. Cannot login again.",
        record: completedRecord 
      });
    }

    const record = new LoginHour({
      userId,
      date,
      loginTime: new Date(),
      breaks: [],
      status: "present"
    });

    await record.save();

    res.json({ 
      success: true,
      message: "Login recorded successfully", 
      record: {
        _id: record._id,
        userId: record.userId,
        date: record.date,
        loginTime: record.loginTime,
        breaks: record.breaks,
        status: record.status
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: "Already logged in for today", 
        error: "Duplicate entry"
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Login failed", 
      error: err.message 
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "No login record found for today" 
      });
    }

    if (record.logoutTime) {
      return res.status(400).json({ 
        success: false,
        message: "Already logged out for today" 
      });
    }

    // End any active break
    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (activeBreak) {
      activeBreak.end = new Date();
      console.log(`Auto-ended break for user ${userId}`);
    }

    // Calculate totals
    const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
    const totalWorkedHours = calculateWorkedHours(
      record.loginTime, 
      new Date(), 
      totalBreakMinutes
    );
    const status = calculateAttendanceStatus(totalBreakMinutes);

    record.logoutTime = new Date();
    record.totalBreakHours = totalBreakMinutes / 60;
    record.totalWorkedHours = totalWorkedHours;
    record.status = status;

    await record.save();

    res.json({ 
      success: true,
      message: "Logout recorded successfully", 
      record: {
        _id: record._id,
        userId: record.userId,
        date: record.date,
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        totalWorkedHours: record.totalWorkedHours,
        totalBreakHours: record.totalBreakHours,
        status: record.status,
        breaks: record.breaks
      },
      summary: {
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        status: status
      }
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ 
      success: false,
      message: "Logout failed", 
      error: err.message 
    });
  }
};

/* ================= BREAK MANAGEMENT ================= */
export const requestBreak = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "No active shift found. Please login first." 
      });
    }

    if (record.logoutTime) {
      return res.status(400).json({ 
        success: false,
        message: "Cannot take break after logout" 
      });
    }

    // Check if already on break
    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (activeBreak) {
      return res.status(400).json({ 
        success: false,
        message: "You are already on a break. End current break first." 
      });
    }

    // Check if pending request exists
    const pendingBreak = record.breaks.find(b => b.status === "pending");
    if (pendingBreak) {
      return res.status(400).json({ 
        success: false,
        message: "You already have a pending break request" 
      });
    }

    // Count approved breaks
    const approvedBreaks = record.breaks.filter(b => b.status === "approved");
    
    // AUTO APPROVE FIRST 3 BREAKS
    if (approvedBreaks.length < MAX_FREE_BREAKS) {
      const breakRecord = {
        start: new Date(),
        status: "approved",
        approvedAt: new Date(),
        requestedAt: new Date()
      };

      record.breaks.push(breakRecord);
      await record.save();

      return res.json({
        success: true,
        autoApproved: true,
        message: `Break started automatically (${approvedBreaks.length + 1}/${MAX_FREE_BREAKS} free breaks)`,
        break: breakRecord
      });
    }

    // NEED SUPERVISOR APPROVAL FOR ADDITIONAL BREAKS
    const breakRecord = {
      requestedAt: new Date(),
      status: "pending"
    };

    record.breaks.push(breakRecord);
    await record.save();

    res.json({
      success: true,
      pending: true,
      message: "Break request sent to supervisor for approval",
      breakId: breakRecord._id
    });

  } catch (err) {
    console.error("Break request error:", err);
    res.status(500).json({ 
      success: false,
      message: "Break request failed", 
      error: err.message 
    });
  }
};

// Add this function since it's imported in routes
export const startBreak = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "No active shift found. Please login first." 
      });
    }

    // Check if already on break
    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (activeBreak) {
      return res.status(400).json({ 
        success: false,
        message: "You are already on a break" 
      });
    }

    // Auto approve if within free breaks limit
    const approvedBreaks = record.breaks.filter(b => b.status === "approved");
    
    if (approvedBreaks.length < MAX_FREE_BREAKS) {
      const breakRecord = {
        start: new Date(),
        status: "approved",
        requestedAt: new Date(),
        approvedAt: new Date()
      };

      record.breaks.push(breakRecord);
      await record.save();

      return res.json({
        success: true,
        message: `Break started (${approvedBreaks.length + 1}/${MAX_FREE_BREAKS} free breaks)`,
        break: breakRecord
      });
    }

    // If exceeded free breaks, require approval
    return res.status(400).json({
      success: false,
      message: "Free break limit exceeded. Please request break approval."
    });

  } catch (err) {
    console.error("Start break error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to start break", 
      error: err.message 
    });
  }
};

export const endBreak = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "No attendance record found" 
      });
    }

    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (!activeBreak) {
      return res.status(400).json({ 
        success: false,
        message: "No active break found" 
      });
    }

    activeBreak.end = new Date();
    
    // Calculate break duration
    const breakDuration = (new Date(activeBreak.end) - new Date(activeBreak.start)) / (1000 * 60);
    
    // Auto-end if free break exceeds 15 minutes
    if (breakDuration > FREE_BREAK_DURATION) {
      activeBreak.autoEnded = true;
    }

    // Update totals immediately
    const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
    record.totalBreakHours = totalBreakMinutes / 60;
    
    // If already logged out, update worked hours
    if (record.logoutTime) {
      record.totalWorkedHours = calculateWorkedHours(
        record.loginTime, 
        record.logoutTime, 
        totalBreakMinutes
      );
      record.status = calculateAttendanceStatus(totalBreakMinutes);
    }

    await record.save();

    res.json({
      success: true,
      message: "Break ended successfully",
      break: activeBreak,
      duration: `${breakDuration.toFixed(1)} minutes`,
      totalBreakMinutes: totalBreakMinutes
    });

  } catch (err) {
    console.error("End break error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to end break", 
      error: err.message 
    });
  }
};

/* ================= SUPERVISOR FUNCTIONS ================= */
export const reviewBreakRequest = async (req, res) => {
  try {
    const { userId, breakId, action, rejectReason } = req.body;
    const supervisorId = req.user._id;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid action. Use 'approve' or 'reject'" 
      });
    }

    const date = getShiftDate();
    const record = await LoginHour.findOne({ userId, date });
    
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "User record not found" 
      });
    }

    const breakIndex = record.breaks.findIndex(b => 
      b._id.toString() === breakId
    );

    if (breakIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: "Break request not found" 
      });
    }

    const breakRecord = record.breaks[breakIndex];

    if (breakRecord.status !== "pending") {
      return res.status(400).json({ 
        success: false,
        message: "Break request already processed" 
      });
    }

    if (action === "approve") {
      breakRecord.status = "approved";
      breakRecord.start = breakRecord.start || new Date();
      breakRecord.approvedBy = supervisorId;
      breakRecord.approvedAt = new Date();
    } else {
      breakRecord.status = "rejected";
      breakRecord.rejectReason = rejectReason || "No reason provided";
    }

    await record.save();

    res.json({
      success: true,
      message: `Break request ${action}d successfully`,
      break: breakRecord
    });

  } catch (err) {
    console.error("Review break error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to review break request", 
      error: err.message 
    });
  }
};

export const getPendingBreakRequests = async (req, res) => {
  try {
    const date = getShiftDate();

    const records = await LoginHour.find({
      date,
      "breaks.status": "pending"
    })
      .populate("userId", "name email employeeId")
      .select("userId date loginTime breaks");

    // Format response
    const pendingRequests = records.flatMap(record => 
      record.breaks
        .filter(b => b.status === "pending")
        .map(breakRecord => ({
          userId: record.userId._id,
          userName: record.userId.name,
          userEmail: record.userId.email,
          employeeId: record.userId.employeeId,
          date: record.date,
          loginTime: record.loginTime,
          breakId: breakRecord._id,
          requestedAt: breakRecord.requestedAt,
          status: breakRecord.status
        }))
    );

    res.json({
      success: true,
      count: pendingRequests.length,
      requests: pendingRequests
    });

  } catch (err) {
    console.error("Fetch pending breaks error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch pending break requests", 
      error: err.message 
    });
  }
};

/* ================= STATISTICS ================= */
export const getTodayStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    
    if (!record) {
      return res.json({
        success: true,
        isLoggedIn: false,
        message: "No record found for today",
        data: {
          workedHours: 0,
          breakHours: 0,
          breakCount: 0,
          status: "pending"
        }
      });
    }

    const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
    const totalWorkedHours = calculateWorkedHours(
      record.loginTime,
      record.logoutTime || new Date(),
      totalBreakMinutes
    );

    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    
    const formattedBreaks = record.breaks.map(b => ({
      id: b._id,
      start: b.start,
      end: b.end,
      status: b.status,
      duration: b.start && b.end ? 
        formatDuration((new Date(b.end) - new Date(b.start)) / (1000 * 60)) : 
        "Ongoing"
    }));

    res.json({
      success: true,
      isLoggedIn: !record.logoutTime,
      data: {
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        breakCount: record.breaks.filter(b => b.status === "approved").length,
        pendingBreaks: record.breaks.filter(b => b.status === "pending").length,
        freeBreaksUsed: record.breaks.filter(b => b.status === "approved").length,
        freeBreaksLeft: Math.max(0, MAX_FREE_BREAKS - record.breaks.filter(b => b.status === "approved").length),
        isOnBreak: !!activeBreak,
        currentBreak: activeBreak,
        allBreaks: formattedBreaks,
        status: record.status || calculateAttendanceStatus(totalBreakMinutes)
      }
    });

  } catch (err) {
    console.error("Get stats error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch today's statistics", 
      error: err.message 
    });
  }
};

export const getAllLoginHours = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;
    
    let filter = {};
    
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    } else {
      // Default to last 30 days if no date range provided
      const thirtyDaysAgo = getISTNow().subtract(30, 'day').format("YYYY-MM-DD");
      const today = getISTNow().format("YYYY-MM-DD");
      filter.date = { $gte: thirtyDaysAgo, $lte: today };
    }
    
    if (userId) {
      filter.userId = userId;
    }

    const records = await LoginHour.find(filter)
      .populate("userId", "name email employeeId department")
      .sort({ date: -1, loginTime: -1 })
      .lean();

    // Format response
    const formattedRecords = records.map(record => {
      const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
      const totalWorkedHours = calculateWorkedHours(
        record.loginTime,
        record.logoutTime || new Date(),
        totalBreakMinutes
      );

      return {
        _id: record._id,
        user: record.userId,
        date: record.date,
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        breakCount: record.breaks.filter(b => b.status === "approved").length,
        status: record.status || calculateAttendanceStatus(totalBreakMinutes),
        createdAt: record.createdAt
      };
    });

    res.json({
      success: true,
      count: formattedRecords.length,
      records: formattedRecords
    });

  } catch (err) {
    console.error("Get all login hours error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch login hours", 
      error: err.message 
    });
  }
};

// Add any other missing exports that might be in your routes
export const getMyLoginHours = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;
    
    let filter = { userId };
    
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    } else {
      // Default to last 7 days
      const sevenDaysAgo = getISTNow().subtract(7, 'day').format("YYYY-MM-DD");
      const today = getISTNow().format("YYYY-MM-DD");
      filter.date = { $gte: sevenDaysAgo, $lte: today };
    }

    const records = await LoginHour.find(filter)
      .sort({ date: -1, loginTime: -1 })
      .lean();

    const formattedRecords = records.map(record => {
      const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
      const totalWorkedHours = calculateWorkedHours(
        record.loginTime,
        record.logoutTime || new Date(),
        totalBreakMinutes
      );

      return {
        _id: record._id,
        date: record.date,
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        breakCount: record.breaks.filter(b => b.status === "approved").length,
        status: record.status || calculateAttendanceStatus(totalBreakMinutes)
      };
    });

    res.json({
      success: true,
      count: formattedRecords.length,
      records: formattedRecords
    });

  } catch (err) {
    console.error("Get my login hours error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch login hours", 
      error: err.message 
    });
  }
};