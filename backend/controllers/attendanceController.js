import Attendance from "../models/Attendance.js";

// MARK ATTENDANCE (Auto Present)
export const markAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const attendance = await Attendance.findOneAndUpdate(
      { userId: req.user._id, date: today },
      { status: "Present" },
      { upsert: true, new: true }
    );

    res.json({ message: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ message: "Attendance error" });
  }
};

// GET MY ATTENDANCE
export const getMyAttendance = async (req, res) => {
  const data = await Attendance.find({ userId: req.user._id }).sort({ date: -1 });
  res.json(data);
};

// ADMIN – ALL ATTENDANCE
export const getAllAttendance = async (req, res) => {
  const data = await Attendance.find().populate("userId", "name email");
  res.json(data);

};
