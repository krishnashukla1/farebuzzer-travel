

import express from "express";
import {
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,updateFinancialData
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// 👀 View bookings (admin + user)
router.get("/", authMiddleware, getBookings);

// ➕ Create booking (admin + user)
router.post("/", authMiddleware, createBooking);

// 🔄 Update status (ADMIN ONLY)
router.put("/:id/status", authMiddleware, adminOnly, updateBookingStatus);

// ❌ Delete booking (ADMIN ONLY)
router.delete("/:id", authMiddleware, adminOnly, deleteBooking);

// Update booking (ADMIN ONLY)
router.put("/:id/financial", authMiddleware, adminOnly, updateFinancialData);

export default router;
