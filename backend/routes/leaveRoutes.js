
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,updateLeaveStatus
} from "../controllers/leaveController.js";

const router = express.Router();

/* Employee */
router.post("/", authMiddleware, applyLeave);
router.get("/me", authMiddleware, getMyLeaves);

/* Admin */
router.get("/", authMiddleware, adminMiddleware, getAllLeaves);
router.put("/:id/approve", authMiddleware, adminMiddleware, approveLeave);
router.put("/:id/status",authMiddleware,adminMiddleware,updateLeaveStatus);



export default router;

