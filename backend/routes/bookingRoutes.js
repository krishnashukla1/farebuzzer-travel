// import express from "express";
// import {
//   createBooking,
//   getBookings,
//   updateBookingStatus,
//   deleteBooking
// } from "../controllers/bookingController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", authMiddleware, getBookings);
// router.post("/", authMiddleware, createBooking);
// router.put("/:id/status", authMiddleware, updateBookingStatus);
// router.delete("/:id", authMiddleware, deleteBooking);

// export default router;

//===================correct=================

// import express from "express";
// import {
//   getBookings,
//   createBooking,
//   updateBookingStatus,
//   deleteBooking,
// } from "../controllers/bookingController.js";

// const router = express.Router();

// router.get("/", getBookings);
// router.post("/", createBooking);
// router.put("/:id/status", updateBookingStatus);
// router.delete("/:id", deleteBooking);

// export default router;


//===========protected=======

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
