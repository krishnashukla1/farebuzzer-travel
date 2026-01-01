import LoginHour from "../models/loginHoursSchema.js";

const today = () => new Date().toISOString().slice(0, 10);

// LOGIN
export const login = async (req, res) => {
  const record = await LoginHour.findOneAndUpdate(
    { userId: req.user._id, date: today() },
    { loginTime: new Date() },
    { upsert: true, new: true }
  );

  res.json({ message: "Login recorded", record });
};

// LOGOUT
export const logout = async (req, res) => {
  const record = await LoginHour.findOneAndUpdate(
    { userId: req.user._id, date: today() },
    { logoutTime: new Date() },
    { new: true }
  );

  res.json({ message: "Logout recorded", record });
};

// START BREAK
export const startBreak = async (req, res) => {
  const record = await LoginHour.findOne({ userId: req.user._id, date: today() });
  record.breaks.push({ start: new Date() });
  await record.save();
  res.json({ message: "Break started" });
};

// END BREAK
export const endBreak = async (req, res) => {
  const record = await LoginHour.findOne({ userId: req.user._id, date: today() });
  const lastBreak = record.breaks[record.breaks.length - 1];
  lastBreak.end = new Date();
  await record.save();
  res.json({ message: "Break ended" });
};
