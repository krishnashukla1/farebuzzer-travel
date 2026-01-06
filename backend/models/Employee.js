// import mongoose from "mongoose";

// const employeeSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },

//     name: String,
//     role: String,
//     email: String,

//     status: {
//       type: String,
//       default: "Active",
//     },

//     photo: {
//       type: String,
//       default: "",
//     },

//     dateOfJoining: {
//       type: Date,
//     },

//     salary: {
//       type: Number,
//     },

//     leaveQuota: {
//       type: Number,
//       default: 20,
//       min: 1,
//     },

//     usedDays: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     remainingDays: {
//       type: Number,
//       default: function () {
//         return this.leaveQuota - this.usedDays;
//       },
//       min: 0,
//     },
//   },
//   { timestamps: true }
// );

// // Index for search & filtering
// employeeSchema.index({
//   name: "text",
//   email: "text",
//   role: 1,
//   userId: 1,
// });


