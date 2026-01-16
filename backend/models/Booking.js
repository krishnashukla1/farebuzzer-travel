
// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     customerName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },

//     airline: String,
//     pnr: String,

//     amount: {
//       type: Number,
//       default: 0,
//     },

//     commission: {
//       type: Number,
//       default: 0,
//     },
//     mco: Number,

//     discount: {
//       type: Number,
//       default: 0,
//     },

//     status: {
//       type: String,
//       enum: [
//         "FRESH",
//         "FOLLOW_UP",
//         "TICKETING",
//         "TICKETED",
//         "CANCELLED",
//         "CHARGEBACK",
//         "AUTH_FORM_LOSS",
//       ],
//       default: "FRESH",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Booking", bookingSchema);


//==================

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    airline: String,
    pnr: String,

    amount: {
      type: Number,
      default: 0,
    },

    commission: {
      type: Number,
      default: 0,
    },

    mco: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    // 🆕 Net Amount (auto)
    netAmount: {
      type: Number,
      default: 0,
    },

    // 🆕 Net Profit (auto)
    netProfit: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "FRESH",
        "FOLLOW_UP",
        "TICKETING",
        "TICKETED",
        "CANCELLED",
        "CHARGEBACK",
        "AUTH_FORM_LOSS",
      ],
      default: "FRESH",
    },
  },
  { timestamps: true }
);

bookingSchema.pre("save", function (next) {
  // Net Amount = Amount - Discount
  this.netAmount = (this.amount || 0) - (this.discount || 0);

  // Net Profit = Commission + MCO
  this.netProfit = (this.commission || 0) + (this.mco || 0);

  next();
});

export default mongoose.model("Booking", bookingSchema);

