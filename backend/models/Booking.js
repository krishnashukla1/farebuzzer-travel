
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

    // 🧾 Pricing
    grossPrice: {
      type: Number,
      required: true, // actual flight cost
    },

    sellingPrice: {
      type: Number,
      required: true, // customer paid
    },

    // 💰 Sales Profit (MCO / Gross Profit)
    salesProfit: {
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

// 🔥 AUTO CALCULATION (Single Source of Truth)
bookingSchema.pre("save", function (next) {
  // Sales Profit = Selling Price – Gross Price
  this.salesProfit = (this.sellingPrice || 0) - (this.grossPrice || 0);
  next();
});

export default mongoose.model("Booking", bookingSchema);

