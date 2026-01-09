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

// import mongoose from "mongoose";

// /* ================= BREAK SCHEMA ================= */
// const breakSchema = new mongoose.Schema(
//   {
//     start: {
//       type: Date,
//       required: true
//     },
//     end: {
//       type: Date
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected", "cancelled"],
//       default: "pending"
//     },
//     requestedAt: {
//       type: Date,
//       default: Date.now
//     },
//     approvedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//     },
//     approvedAt: {
//       type: Date
//     },
//     rejectReason: {
//       type: String
//     },
//     autoEnded: {
//       type: Boolean,
//       default: false
//     }
//   },
//   { _id: true }
// );

// /* ================= LOGIN HOUR SCHEMA ================= */
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
//     loginTime: {
//       type: Date,
//       required: true
//     },
//     logoutTime: {
//       type: Date
//     },
//     breaks: [breakSchema],
//     totalWorkedHours: {
//       type: Number, // in hours
//       default: 0
//     },
//     totalBreakHours: {
//       type: Number, // in hours
//       default: 0
//     },
//     status: {
//       type: String,
//       enum: ["present", "half-day", "absent", "pending"],
//       default: "present"
//     }
//   },
//   { timestamps: true }
// );

// /* 🔥 One record per user per day */
// loginHourSchema.index({ userId: 1, date: 1 }, { unique: true });


// export default mongoose.model("LoginHour", loginHourSchema);





import mongoose from "mongoose";

const breakSchema = new mongoose.Schema({
  start: Date,
  end: Date,

  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "approved"
  },

  requestedAt: Date,
  approvedAt: Date,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  rejectReason: String,
  autoEnded: Boolean
});

const loginHourSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: String,
      required: true
    },

    loginTime: Date,
    logoutTime: Date,

    totalWorkedHours: Number,
    totalBreakHours: Number,

    status: {
      type: String,
      enum: ["present", "half-day", "absent"]
    },

    breaks: [breakSchema]
  },
  { timestamps: true }
);

loginHourSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("LoginHour", loginHourSchema);
