import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  const leave = await Leave.create({
    userId: req.user._id,
    ...req.body
  });

  res.json({ message: "Leave applied", leave });
};

export const getMyLeaves = async (req, res) => {
  const data = await Leave.find({ userId: req.user._id });
  res.json(data);
};

export const approveLeave = async (req, res) => {
  await Leave.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ message: "Leave approved" });
};
