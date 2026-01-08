

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";
// import {
//   login,
//   logout,
//   startBreak,
//   endBreak,
//   requestBreak,
//   reviewBreakRequest,
//   getPendingBreakRequests,
//   getTodayStats,
//   getAllLoginHours,
//   getMyLoginHours,
//   getTodayLoginHoursAdmin,   autoFirstLoginAndMark
// } from "../controllers/loginHourController.js";

// const router = express.Router();

// /* ================= EMPLOYEE ================= */

// // Employee login / logout
// router.post("/login", authMiddleware, login);
// router.post("/logout", authMiddleware, logout);

// // Breaks
// router.post("/break/start", authMiddleware, startBreak);
// router.post("/break/end", authMiddleware, endBreak);
// router.post("/break/request", authMiddleware, requestBreak);

// // Employee today stats
// router.get("/today", authMiddleware, getTodayStats);

// // Employee history
// router.get("/my-hours", authMiddleware, getMyLoginHours);

// /* ================= ADMIN ================= */

// // Admin today attendance list
// router.get("/today/all", authMiddleware, adminMiddleware, getTodayLoginHoursAdmin);

// // Admin all history
// router.get("/", authMiddleware, adminMiddleware, getAllLoginHours);

// // Break approvals
// router.post("/break/review", authMiddleware, adminMiddleware, reviewBreakRequest);
// router.get("/break/pending", authMiddleware, adminMiddleware, getPendingBreakRequests);


// router.post("/auto-first-login", authMiddleware, autoFirstLoginAndMark);
// export default router;



//========================
import express from "express";
import {
  markLogin,
  startBreak,
  endBreak,
  markLogout,
  todayStatus
} from "../controllers/loginHourController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", auth, markLogin);
router.post("/break/start", auth, startBreak);
router.post("/break/end", auth, endBreak);
router.post("/logout", auth, markLogout);
router.get("/today", auth, todayStatus);

export default router;
