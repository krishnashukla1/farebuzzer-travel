import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

const baseURL =
//   process.env.FRONTEND_URL ||
  "https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host";



// ✅ Generate Payment Link
router.post("/generate-link", async (req, res) => {
  try {
    const { customerName, email, phone, amount, remarks } = req.body;

    // Basic validation
    if (!customerName || !email || !amount) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const invoiceNumber = "FBT-" + Date.now();

    const invoice = await Invoice.create({
      invoiceNumber,
      customerName,
      email,
      phone,
      amount,
      remarks,
    });

    // const paymentLink = `${process.env.FRONTEND_URL}/pay?invoice=${invoiceNumber}`;
const paymentLink = `${baseURL}/pay?invoice=${invoiceNumber}`;


    res.status(201).json({
      success: true,
      invoice,
      paymentLink,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get Invoice
router.get("/:invoiceNumber", async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      invoiceNumber: req.params.invoiceNumber,
    });

    if (!invoice)
      return res.status(404).json({ message: "Invoice not found" });

    res.json(invoice);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Payment Success
router.post("/payment-success", async (req, res) => {
  try {
    const { invoiceNumber, transactionId } = req.body;

    if (!invoiceNumber || !transactionId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const invoice = await Invoice.findOne({ invoiceNumber });

    if (!invoice)
      return res.status(404).json({ message: "Invoice not found" });

    // Prevent double update
    if (invoice.status === "Paid") {
      return res.json({ message: "Invoice already paid" });
    }

    invoice.status = "Paid";
    invoice.transactionId = transactionId;
    invoice.paymentDate = new Date();

    await invoice.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
