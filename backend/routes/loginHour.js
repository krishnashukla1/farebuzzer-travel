// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   login,
//   logout,
//   startBreak,
//   endBreak
// } from "../controllers/loginHourController.js";

// const router = express.Router();

// router.post("/login", authMiddleware, login);
// router.post("/logout", authMiddleware, logout);
// router.post("/break/start", authMiddleware, startBreak);
// router.post("/break/end", authMiddleware, endBreak);

// export default router;

//====================================

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  login,
  logout,
  startBreak,
  endBreak,
  requestBreak,
  reviewBreakRequest,
  getPendingBreakRequests,
  getTodayStats,
  getAllLoginHours
} from "../controllers/loginHourController.js";

const router = express.Router();

/* ================= EMPLOYEE ACTIONS ================= */

// Login / Logout
router.post("/login", authMiddleware, login);
router.post("/logout", authMiddleware, logout);

// Break actions
router.post("/break/start", authMiddleware, startBreak);
router.post("/break/end", authMiddleware, endBreak);

// Request break approval (after limit)
router.post("/break/request", authMiddleware, requestBreak);

// Get today's login + break stats (self)
router.get("/today", authMiddleware, getTodayStats);

/* ================= ADMIN / SUPERVISOR ================= */

// Review break (approve / reject)
router.post(
  "/break/review",
  authMiddleware,
  adminMiddleware,
  reviewBreakRequest
);

// Pending break requests
router.get(
  "/break/pending",
  authMiddleware,
  adminMiddleware,
  getPendingBreakRequests
);

// All login hour records
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllLoginHours
);

export default router;
