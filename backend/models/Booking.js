
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
    mco: Number,

    discount: {
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

export default mongoose.model("Booking", bookingSchema);
