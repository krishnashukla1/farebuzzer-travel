// import mongoose from "mongoose";

// const breakSchema = new mongoose.Schema({
//   start: Date,
//   end: Date
// });

// const loginHourSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//     date: {
//       type: String, // YYYY-MM-DD
//       required: true
//     },
//     loginTime: Date,
//     logoutTime: Date,
//     breaks: [breakSchema]
//   },
//   { timestamps: true }
// );

// loginHourSchema.index({ userId: 1, date: 1 }, { unique: true });

// export default mongoose.model("LoginHour", loginHourSchema);



//=========================================================================

import mongoose from "mongoose";

/* ================= BREAK SCHEMA ================= */
const breakSchema = new mongoose.Schema(
  {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending"
    },
    requestedAt: {
      type: Date,
      default: Date.now
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // admin / supervisor
    },
    approvedAt: {
      type: Date
    },
    rejectReason: {
      type: String
    },
    autoEnded: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

/* ================= LOGIN HOUR SCHEMA ================= */
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
    loginTime: {
      type: Date
    },
    logoutTime: {
      type: Date
    },
    breaks: [breakSchema]
  },
  { timestamps: true }
);

/* 🔥 One record per user per day */
loginHourSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("LoginHour", loginHourSchema);

