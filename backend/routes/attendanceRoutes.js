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

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 4ea931ddafa401165734ba191b79e903fffb7afc
