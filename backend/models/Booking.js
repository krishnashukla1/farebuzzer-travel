
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

//     // 🧾 Pricing
//     grossPrice: {
//       type: Number,
//       required: true, // actual flight cost
//     },

//     sellingPrice: {
//       type: Number,
//       required: true, // customer paid
//     },

//     // 💰 Sales Profit (MCO / Gross Profit)
//     salesProfit: {
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

// // 🔥 AUTO CALCULATION (Single Source of Truth)
// bookingSchema.pre("save", function (next) {
//   // Sales Profit = Selling Price – Gross Price
//   this.salesProfit = (this.sellingPrice || 0) - (this.grossPrice || 0);
//   next();
// });

// export default mongoose.model("Booking", bookingSchema);

//====================


// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//      customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     pnr: String,
//     airline: String,
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

//     // 💰 Prices
//     costPrice: { type: Number, required: true },     // COST OF GOODS
//     sellingPrice: { type: Number, required: true },  // SOLD PRICE

//     // 💸 Other Expense
//     expenseCategory: String,
//     otherExpense: { type: Number, default: 0 },

//     // 🧮 Auto Calculated
//     profit: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// // 🔥 FINAL PROFIT LOGIC
// bookingSchema.pre("save", function (next) {
//   this.profit =
//     (this.sellingPrice || 0) -
//     (this.costPrice || 0) -
//     (this.otherExpense || 0);

//   next();
// });

// export default mongoose.model("Booking", bookingSchema);

//=============19 jan=====


// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true, trim: true },
//      customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     pnr: { type: String, required: true, trim: true, unique: false, uppercase: true }, // ← unique PNR
//     airline: { type: String, trim: true },
//     status: {
//       type: String,
//       enum: ["FRESH", "FOLLOW_UP", "TICKETING", "SEND_TO_TICKETING", "CANCELLED", "CHARGEBACK", "AUTH_FORM_LOSS"],
//       default: "FRESH",
//     },
                 

//     costPrice: { type: Number, required: true, min: 0 },
//     sellingPrice: { type: Number, required: true, min: 0 },
//     cbFees: { type: Number, default: 0, min: 0 },
//     otherExpense: { type: Number, default: 0, min: 0 },
//     expenseCategory: { type: String, trim: true },

//     profit: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// // Safe profit calculation — handles undefined safely
// bookingSchema.pre("save", function (next) {
//   try {
//     const sp = Number(this.sellingPrice) || 0;
//     const cp = Number(this.costPrice) || 0;
//     const oe = Number(this.otherExpense) || 0;
//     const cb = Number(this.cbFees) || 0;

//     this.profit = sp - cp - oe - cb;
//     next();
//   } catch (err) {
//     next(err); // Pass error to save() → will be caught in controller
//   }
// });

// export default mongoose.model("Booking", bookingSchema);

//=================add refund,void,amendment=============
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pnr: { type: String, required: true, trim: true, unique: false, uppercase: true },
    airline: { type: String, trim: true },
    status: {
      type: String,
      enum: [
        "FRESH",
        "FOLLOW_UP",
        "TICKETING",
        "SEND_TO_TICKETING",
        "CANCELLED",
        "CHARGEBACK",
        "LOSS",
        "REFUND",
        "VOID",
        "AMENDMENT"
      ],
      default: "FRESH",
    },

    costPrice: { type: Number, required: true, min: 0 },
    sellingPrice: { type: Number, required: true, min: 0 },
    cbFees: { type: Number, default: 0, min: 0 },
    otherExpense: { type: Number, default: 0, min: 0 },
    expenseCategory: { type: String, trim: true },

    profit: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Profit calculation based on status
bookingSchema.pre("save", function (next) {
  try {
    const sp = Number(this.sellingPrice) || 0;
    const cp = Number(this.costPrice) || 0;
    const oe = Number(this.otherExpense) || 0;
    const cb = Number(this.cbFees) || 0;

    switch (this.status) {
      case "REFUND":
        // Refund = negative profit (loss)
        this.profit = -(cp + oe + cb - sp); // OR just sp - cp - oe - cb negative
        break;
      case "VOID":
      case "AMENDMENT":
        // Void/Amendment = positive benefit
        this.profit = sp - cp - oe - cb;
        break;
      default:
        // Other statuses normal calculation
        this.profit = sp - cp - oe - cb;
    }

    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Booking", bookingSchema);
