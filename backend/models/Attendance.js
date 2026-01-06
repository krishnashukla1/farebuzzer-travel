import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["Present", "Absent", "Half Day", "Leave"],
      default: "Present"
    },
    reason: String
  },
  { timestamps: true }
);

// 🔥 One record per user per day
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

<<<<<<< HEAD
export default mongoose.model("Attendance", attendanceSchema);
=======
export default mongoose.model("Attendance", attendanceSchema);
>>>>>>> 4ea931ddafa401165734ba191b79e903fffb7afc
