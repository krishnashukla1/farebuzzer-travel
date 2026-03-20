

import express from "express";
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  updateSaleData // Add this new controller
} from "../controllers/enquiryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// ➕ Create enquiry (admin + user)
router.post("/", authMiddleware, createEnquiry);

// 👀 View enquiries
router.get("/", authMiddleware, getEnquiries);

// 🔄 Update enquiry status (ADMIN ONLY)
router.put("/:id/status", authMiddleware, adminOnly, updateEnquiryStatus);

// 💰 Update sale data (ADMIN ONLY) - NEW ROUTE
router.put("/:id/sale", authMiddleware, adminOnly, updateSaleData);

// ❌ Delete enquiry (ADMIN ONLY)
router.delete("/:id", authMiddleware, adminOnly, deleteEnquiry);

export default router;