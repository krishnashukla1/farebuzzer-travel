import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  login,
  logout,
  startBreak,
  endBreak
} from "../controllers/loginHourController.js";

const router = express.Router();

router.post("/login", authMiddleware, login);
router.post("/logout", authMiddleware, logout);
router.post("/break/start", authMiddleware, startBreak);
router.post("/break/end", authMiddleware, endBreak);

export default router;
