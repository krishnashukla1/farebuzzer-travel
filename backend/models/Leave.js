import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    from: Date,
    to: Date,
    reason: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },
    leaveType: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Paid"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Leave", leaveSchema);
