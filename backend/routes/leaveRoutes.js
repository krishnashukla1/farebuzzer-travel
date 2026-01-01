import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  applyLeave,
  getMyLeaves,
  approveLeave
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/", authMiddleware, applyLeave);
router.get("/me", authMiddleware, getMyLeaves);
router.put("/:id/approve", authMiddleware, adminMiddleware, approveLeave);

export default router;
