import express from "express";
import User from "../models/User.js";

import {
  getAllUsers,
  updateMe,
  adminUpdateUser,adminDeleteUser
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// 🔹 User: Get own profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});
// 🔹 Admin: Get all users
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

// 🔹 User/Admin: Update own profile
router.put("/me", authMiddleware, updateMe);

// 🔹 Admin: Update ANY user
router.put("/:id", authMiddleware, adminMiddleware, adminUpdateUser);

router.delete("/:id", authMiddleware, adminMiddleware, adminDeleteUser);


export default router;
