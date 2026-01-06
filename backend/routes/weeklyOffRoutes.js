// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware  from "../middleware/adminMiddleware.js";
// import {
//   adminAddWeeklyOff,
//   getMyWeeklyOff,getAllWeeklyOff
// } from "../controllers/weeklyOffController.js";

// const router = express.Router();

// /**
//  * ADMIN → Add weekly off for employee
//  */
// router.post("/admin", authMiddleware, adminMiddleware, adminAddWeeklyOff);
// router.get("/admin", authMiddleware, adminMiddleware, getAllWeeklyOff);

// /**
//  * EMPLOYEE → View own weekly off
//  */
// router.get("/me", authMiddleware, getMyWeeklyOff);

// export default router;

//========================
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  adminAddWeeklyOff,
  getMyWeeklyOff,
  getAllWeeklyOff,
  adminUpdateWeeklyOff,
  adminDeleteWeeklyOff
} from "../controllers/weeklyOffController.js";

const router = express.Router();

// 🔹 ADMIN
router.post("/admin", authMiddleware, adminMiddleware, adminAddWeeklyOff);
router.get("/admin", authMiddleware, adminMiddleware, getAllWeeklyOff);
router.put("/admin/:id", authMiddleware, adminMiddleware, adminUpdateWeeklyOff);
router.delete("/admin/:id", authMiddleware, adminMiddleware, adminDeleteWeeklyOff);

// 🔹 EMPLOYEE
router.get("/me", authMiddleware, getMyWeeklyOff);


export default router;

