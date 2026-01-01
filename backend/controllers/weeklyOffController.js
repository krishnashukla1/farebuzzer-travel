import WeeklyOff from "../models/WeeklyOff.js";
import User from "../models/User.js"

export const adminAddWeeklyOff = async (req, res) => {
  try {

    const user = await User.findById(userId);
if (!user || user.role === "admin") {
  return res.status(400).json({ message: "Invalid employee" });
}

    const { userId, date, reason } = req.body;

    if (!userId || !date) {
      return res.status(400).json({ message: "userId and date are required" });
    }

    const off = await WeeklyOff.create({
      userId,
      date,
      reason
    });

    res.status(201).json({
      message: "Weekly off added successfully",
      off
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Weekly off already exists for this date" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const adminUpdateWeeklyOff = async (req, res) => {
  try {
    const { date, reason, userId } = req.body;

    const updated = await WeeklyOff.findByIdAndUpdate(
      req.params.id,
      { date, reason, userId },
      { new: true, runValidators: true }
    ).populate("userId", "name email");

    if (!updated) {
      return res.status(404).json({ message: "Weekly off not found" });
    }

    res.json({ message: "Weekly off updated", updated });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Weekly off already exists for this user on this date"
      });
    }
    res.status(500).json({ message: err.message });
  }
};


export const getMyWeeklyOff = async (req, res) => {
  const data = await WeeklyOff.find({ userId: req.user._id }).sort({ date: 1 });
  res.json(data);
};


// 🔹 ADMIN: Get ALL employees weekly off
export const getAllWeeklyOff = async (req, res) => {
  try {
    const data = await WeeklyOff.find()
      .populate("userId", "name email role")
      .sort({ date: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weekly off" });
  }
};

export const adminDeleteWeeklyOff = async (req, res) => {
  try {
    const deleted = await WeeklyOff.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Weekly off not found" });
    }

    res.json({ message: "Weekly off deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
