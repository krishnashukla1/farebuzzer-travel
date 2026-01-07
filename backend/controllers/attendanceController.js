import Attendance from "../models/Attendance.js";

// MARK ATTENDANCE (Auto Present)
// export const markAttendance = async (req, res) => {
//   try {
//     const today = new Date().toISOString().slice(0, 10);

//     const attendance = await Attendance.findOneAndUpdate(
//       { userId: req.user._id, date: today },
//       { status: "Present" },
//       { upsert: true, new: true }
//     );

//     res.json({ message: "Attendance marked", attendance });
//   } catch (err) {
//     res.status(500).json({ message: "Attendance error" });
//   }
// };
export const markAttendance = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Check if already marked
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

    // Create attendance
    const attendance = await Attendance.create({
      user: userId,
      date: today,
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


