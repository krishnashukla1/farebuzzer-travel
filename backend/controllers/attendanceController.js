

//=====================
import Attendance from "../models/Attendance.js";

/* =========================
   MARK ATTENDANCE
========================= */
export const markAttendance = async (req, res) => {
  try {
    // ❌ Admin should not mark attendance
    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin attendance not allowed",
      });
    }

    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    const alreadyMarked = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for today",
      });
    }

    const attendance = await Attendance.create({
      user: userId,
      date: today,
      status: "Present",
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    console.error("Attendance Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while marking attendance",
    });
  }
};

/* =========================
   GET MY ATTENDANCE ✅ FIXED
========================= */
export const getMyAttendance = async (req, res) => {
  try {
    const data = await Attendance.find({
      user: req.user._id, // ✅ FIX HERE
    }).sort({ date: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to load attendance" });
  }
};

/* =========================
   ADMIN – ALL ATTENDANCE ✅ FIXED
========================= */
export const getAllAttendance = async (req, res) => {
  try {
    const data = await Attendance.find()
      .populate("user", "name email role") // ✅ FIX HERE
      .sort({ date: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to load attendance" });
  }
};
