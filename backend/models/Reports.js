import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["DAILY", "MONTHLY", "YEARLY"],
      required: true
    },
    fromDate: Date,
    toDate: Date,
    totalBookings: Number,
    totalRevenue: Number,
    totalCommission: Number,
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
