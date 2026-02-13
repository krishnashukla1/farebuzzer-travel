import express from "express";
import { createOrder, captureOrder } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/capture-order", captureOrder);


router.post("/record", async (req, res) => {
  try {
    console.log("Payment Record:", req.body);

    // save to DB later if needed
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


router.post("/generate-link", async (req, res) => {
  try {
    const { name, email, phone, amount, remarks } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: "Valid amount required" });
    }

    // 🔥 Unique Invoice ID
    const invoiceId = "INV" + Date.now();

    // 👉 Later you can save in MongoDB
    // await Invoice.create({ invoiceId, name, email, phone, amount, remarks })

    const paymentLink = `${process.env.FRONTEND_URL}/paynow?invoice=${invoiceId}`;

    res.status(200).json({
      success: true,
      invoiceId,
      paymentLink,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate link" });
  }
});


export default router; // ✅ VERY IMPORTANT


