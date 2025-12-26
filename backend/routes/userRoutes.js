// import express from "express";
// import User from "../models/User.js";
// import { verifyToken } from "../controllers/userController.js";
// import { updateMe } from "../controllers/userController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Get all users (admin only)
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const users = await User.find().select("-password"); // exclude passwords
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get current logged-in user
// router.get("/me", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Update logged-in user profile
// router.put("/me", authMiddleware, updateMe);

// export default router;

//=========================
import express from "express";
import {
  getAllUsers,
  updateMe,
  adminUpdateUser
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// 🔹 Admin: Get all users
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

// 🔹 User/Admin: Update own profile
router.put("/me", authMiddleware, updateMe);

// 🔹 Admin: Update ANY user
router.put("/:id", authMiddleware, adminMiddleware, adminUpdateUser);

export default router;
