
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

    // 👇 store FULL DETAILS here
    meta: {
      customerName: String,
      confirmationNumber: String,
      airline: String,
      departure: String,
      arrival: String,
      travelDate: String,
      refundAmount: String,
      bookingAmount: String,
      message: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Email", emailSchema);
