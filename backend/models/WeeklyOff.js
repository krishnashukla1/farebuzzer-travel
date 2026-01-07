import mongoose from "mongoose";

const weeklyOffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // date: {
    //   type: String, // YYYY-MM-DD
    //   required: true
    // },
    date: {
  type: Date,
  required: true
},

    reason: String
  },
  { timestamps: true }
);

weeklyOffSchema.index({ userId: 1, date: 1 }, { unique: true });


export default mongoose.model("WeeklyOff", weeklyOffSchema);

