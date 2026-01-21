// import mongoose from "mongoose";

// const enquirySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     },
//     message: {
//       type: String,
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ["NEW", "CONTACTED", , "FOLLOW_UP","CLOSED"],
//       default: "NEW"
//     },
//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Enquiry", enquirySchema);



//=================20 jan===========

// import mongoose from "mongoose";

// const enquirySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["NEW", "CONTACTED", "FOLLOW_UP", "CLOSED"],
//       default: "NEW",
//     },
//     // Sale tracking fields
//     saleStatus: {
//       type: String,
//       enum: ["NO", "YES"],
//       default: "NO",
//     },
//     saleAmount: {
//       type: Number,
//       default: 0,
//     },
//     costPrice: {
//       type: Number,
//       default: 0,
//     },
//     sellingPrice: {
//       type: Number,
//       default: 0,
//     },
//     profit: {
//       type: Number,
//       default: 0,
//     },
//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Enquiry", enquirySchema);

//==============21 jan=============

import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },

    // 🆕 Travel Details
    origin: { type: String, trim: true },
    destination: { type: String, trim: true },
    travelDate: { type: Date },
    passengers: { type: Number, default: 1 },
    travelType: {
      type: String,
      enum: ["FLIGHT", "HOTEL", "PACKAGE"],
      default: "FLIGHT",
    },

    // 🆕 Pricing / Budget
    expectedBudget: { type: Number, default: 0 },

    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "FOLLOW_UP", "CLOSED"],
      default: "NEW",
    },

    // Sale tracking
    saleStatus: {
      type: String,
      enum: ["NO", "YES"],
      default: "NO",
    },
    saleAmount: { type: Number, default: 0 },
    costPrice: { type: Number, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
