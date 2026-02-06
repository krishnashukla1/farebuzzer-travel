

import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 THIS IS THE FIX
    req.userId = decoded.id;   // MUST MATCH LOGIN TOKEN PAYLOAD

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};



// 🔹 Admin: get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 User/Admin: update own profile
export const updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// 🔹 Admin: update ANY user
export const adminUpdateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Admin update failed" });
  }
};

// 🔹 Admin: delete ANY user
export const adminDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // ❌ Prevent admin from deleting non-existing user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Optional safety: prevent deleting self
    if (req.userId === userId) {
      return res.status(400).json({
        message: "Admin cannot delete own account"
      });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (err) {
    console.error("ADMIN DELETE USER ERROR:", err);
    return res.status(500).json({
      message: "Failed to delete user"
    });
  }
};

