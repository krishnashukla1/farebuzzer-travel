import mongoose from "mongoose";

const breakSchema = new mongoose.Schema({
  start: Date,
  end: Date
});

const loginHourSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true
    },
    loginTime: Date,
    logoutTime: Date,
    breaks: [breakSchema]
  },
  { timestamps: true }
);

loginHourSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("LoginHour", loginHourSchema);
