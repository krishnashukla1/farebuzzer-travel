
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

//     templateUsed: { // ADD THIS FIELD
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Template',
//       default: null
//     },

//     meta: {
//       customerName: String,
//       customerPhone: {
//         type: String,
//       },
//       billingEmail: String,
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
//       customMessage: String,
//     },

//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );
// emailSchema.index({ type: 1, createdAt: -1 });

// export default mongoose.model("Email", emailSchema);

//=========19 jan---------


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

//     // ✅ ONLY TEXT / SNIPPET
//     text: {
//       type: String,
//       maxlength: 2000, // safety
//     },

//     // ❌ html REMOVED COMPLETELY

//     templateUsed: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Template",
//       default: null,
//     },

//     meta: {
//       // customerName: String,

//        // New name breakdown fields
//       customerPrefix: String,
//       customerFirstName: String,
//       customerMiddleName: String,
//       customerLastName: String,
//       customerDOB: String,
//       customerGender: String,
//       // Keep full name for backward compatibility
//       customerName: String,
      
//       customerPhone: String,
//       billingEmail: String,
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
//       customMessage: String,
//     },

//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // performance
// emailSchema.index({ type: 1, createdAt: -1 });

// export default mongoose.model("Email", emailSchema);

//==========12 feb========
import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  prefix: {
    type: String,
    enum: ["mr", "mrs", "miss", "master", ""],
    default: ""
  },
  firstName: {
    type: String,
    default: ""
  },
  middleName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  dob: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", ""],
    default: ""
  }
}, { _id: false }); // Don't create _id for subdocuments

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

    // ✅ ONLY TEXT / SNIPPET
    text: {
      type: String,
      maxlength: 2000, // safety
    },

    templateUsed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      default: null,
    },

    meta: {
      // Keep single customer fields for backward compatibility
      customerPrefix: String,
      customerFirstName: String,
      customerMiddleName: String,
      customerLastName: String,
      customerDOB: String,
      customerGender: String,
      customerName: String,
      
      // ✅ NEW: Array of passengers for multiple passengers
      passengers: [passengerSchema],
      
      customerPhone: String,
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

// performance
emailSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model("Email", emailSchema);