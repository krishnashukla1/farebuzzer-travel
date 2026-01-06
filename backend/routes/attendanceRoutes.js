import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  markAttendance,
  getMyAttendance,
  getAllAttendance
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", authMiddleware, markAttendance);
router.get("/me", authMiddleware, getMyAttendance);
router.get("/", authMiddleware, adminMiddleware, getAllAttendance);


export default router;

