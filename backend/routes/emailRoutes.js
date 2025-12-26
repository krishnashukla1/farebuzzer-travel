
import express from "express";
import { sendCustomerEmail } from "../controllers/sendEmailController.js";
import Email from "../models/Email.js"; 

const router = express.Router();

router.post("/send", sendCustomerEmail);

// GET /emails → fetch inbox for frontend
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find().sort({ receivedAt: -1 }); // latest first
    res.json(emails);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.post("/receive", async (req, res) => {
  try {
    const {
      from,
      subject,
      message,
      customerName,
      confirmationNumber,
      airline,
      departure,
      arrival,
      travelDate,
       refundAmount,
      bookingAmount,
    } = req.body;

    const email = await Email.create({
      type: "received",
      emailType: "customer_support",
      from,
      to: "support@farebuzzer.com",
      subject,
      text: message,
      meta: {
        customerName,
        confirmationNumber,
        airline,
        departure,
        arrival,
        travelDate,
         refundAmount,
        bookingAmount,
        message,
      },
    });

    res.status(200).json({ status: "success", email });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


export default router;
