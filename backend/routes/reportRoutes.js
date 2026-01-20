import express from "express";
import {
  salesReport,
  bookingStatusReport,
  monthlyRevenueReport,airlineReport
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 All reports are protected
router.get("/sales", authMiddleware, salesReport);
router.get("/booking-status", authMiddleware, bookingStatusReport);
router.get("/monthly-revenue", authMiddleware, monthlyRevenueReport);
router.get("/airline", authMiddleware, airlineReport);
export default router;
