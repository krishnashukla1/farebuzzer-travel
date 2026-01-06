import mongoose from "mongoose";

const weeklyOffSchema = new mongoose.Schema(
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
    reason: String
  },
  { timestamps: true }
);

weeklyOffSchema.index({ userId: 1, date: 1 }, { unique: true });

<<<<<<< HEAD
export default mongoose.model("WeeklyOff", weeklyOffSchema);
=======
export default mongoose.model("WeeklyOff", weeklyOffSchema);
>>>>>>> 4ea931ddafa401165734ba191b79e903fffb7afc
