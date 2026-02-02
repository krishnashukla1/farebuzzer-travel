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

export default router; // ✅ VERY IMPORTANT


