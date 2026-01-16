
// import mongoose from "mongoose";

// const emailSchema = new mongoose.Schema(
//   {
//     type: {
//       type: String,
//       enum: ["sent", "received"],
//       required: true,
//     },

//     emailType: {
//       type: String,
//       default: "customer_support",
//     },

//     from: String,
//     to: String,
//     subject: String,

//     text: String,
//     html: String,

//     // 👇 store FULL DETAILS here
//     meta: {
//       customerName: String,
//       confirmationNumber: String,
//       airline: String,
//       departure: String,
//       arrival: String,
//       travelDate: String,
//       refundAmount: String,
//       bookingAmount: String,
//       message: String,
//     },

//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Email", emailSchema);


//===============ADD PHN NUMBER============

// import mongoose from "mongoose";

// const emailSchema = new mongoose.Schema(
//   {
//     type: {
//       type: String,
//       enum: ["sent", "received"],
//       required: true,
//     },

//     emailType: {
//       type: String,
//       default: "customer_support",
//     },

//     from: String,
//     to: String,
//     subject: String,

//     text: String,
//     html: String,

//     meta: {
//       customerName: String,
//       customerPhone: {           // ← ADD THIS
//         type: String,
//       },
//       billingEmail: String,      // optional - good to have
//       confirmationNumber: String,
//       airline: String,
//       departure: String,
//       arrival: String,
//       travelDate: String,
//       bookingAmount: String,
//       refundAmount: String,
//       oldTravelDate: String,
//       newTravelDate: String,
//       changeFee: String,
//       fareDifference: String,
//       cancellationDate: String,
//       customMessage: String,     // if you use it in future
//     },

//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Email", emailSchema);

//============template====

import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["sent", "received"],
      required: true,
    },

    emailType: {
      type: String,
      default: "customer_support",
    },

    from: String,
    to: String,
    subject: String,

    text: String,
    html: String,

    templateUsed: { // ADD THIS FIELD
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      default: null
    },

    meta: {
      customerName: String,
      customerPhone: {
        type: String,
      },
      billingEmail: String,
      confirmationNumber: String,
      airline: String,
      departure: String,
      arrival: String,
      travelDate: String,
      bookingAmount: String,
      refundAmount: String,
      oldTravelDate: String,
      newTravelDate: String,
      changeFee: String,
      fareDifference: String,
      cancellationDate: String,
      customMessage: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
emailSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model("Email", emailSchema);