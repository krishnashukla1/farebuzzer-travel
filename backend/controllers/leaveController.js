import Leave from "../models/Leave.js";

/* Apply Leave */
export const applyLeave = async (req, res) => {
  const leave = await Leave.create({
    userId: req.user._id,
    ...req.body,
  });

  res.json({ message: "Leave applied", leave });
};

/* Get Logged-in User Leaves */
export const getMyLeaves = async (req, res) => {
  const data = await Leave.find({ userId: req.user._id })
    .sort({ createdAt: -1 });

  res.json(data);
};

/* ✅ GET ALL LEAVES (ADMIN) */
export const getAllLeaves = async (req, res) => {
  const leaves = await Leave.find()
    .populate("userId", "name email role")
    .sort({ createdAt: -1 });

  res.json(leaves);
};

/* Approve Leave */
export const approveLeave = async (req, res) => {
  await Leave.findByIdAndUpdate(req.params.id, {
    status: "Approved",
  });

  res.json({ message: "Leave approved" });
};
