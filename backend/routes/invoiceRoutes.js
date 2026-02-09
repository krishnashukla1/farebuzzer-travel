import express from "express";
import {
  createInvoice,
  getInvoice,
  updatePaymentStatus,
  getCustomerInvoices
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", createInvoice);
router.get("/:invoiceNumber", getInvoice);
router.patch("/:invoiceNumber/payment", updatePaymentStatus);
router.get("/customer/:email", getCustomerInvoices);

export default router;