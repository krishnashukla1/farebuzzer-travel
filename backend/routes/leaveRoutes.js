
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


<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 4ea931ddafa401165734ba191b79e903fffb7afc
