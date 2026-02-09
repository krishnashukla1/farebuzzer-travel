// import express from "express";
// import {
//   createInvoice,
//   getInvoice,
//   updatePaymentStatus,
//   getCustomerInvoices
// } from "../controllers/invoiceController.js";

// const router = express.Router();

// router.post("/", createInvoice);
// router.get("/:invoiceNumber", getInvoice);
// router.patch("/:invoiceNumber/payment", updatePaymentStatus);
// router.get("/customer/:email", getCustomerInvoices);

// export default router;


import express from "express";
import {
  createInvoice,
  getInvoice,
  updatePaymentStatus,
  getCustomerInvoices,
  getAllInvoices,
  deleteInvoice,
  searchInvoices
} from "../controllers/invoiceController.js";

const router = express.Router();

// Create new invoice
router.post("/", createInvoice);

// Get all invoices (with filters)
router.get("/", getAllInvoices);

// Search invoices
router.get("/search", searchInvoices);

// Get invoice by number
router.get("/:invoiceNumber", getInvoice);

// Update payment status
router.patch("/:invoiceNumber/payment", updatePaymentStatus);

// Get customer invoices
router.get("/customer/:email", getCustomerInvoices);

// Delete invoice (admin only)
router.delete("/:invoiceNumber", deleteInvoice);

export default router;