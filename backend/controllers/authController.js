import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER (optional – admin can create users)
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "agent"
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// authController.js - login 8 jan
export const login = async (req, res) => {
  try {
       const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Very important: check today's status
    const today = new Date().toISOString().split('T')[0];
    
    const todayAttendance = await Attendance.findOne({
      user: user._id,
      date: today
    });

    const todayLoginHour = await LoginHour.findOne({
      userId: user._id,
      date: today
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      todayStatus: {
        hasAttendance: !!todayAttendance,
        attendanceStatus: todayAttendance?.status || null,
        hasLoginHour: !!todayLoginHour,
        isCurrentlyLoggedIn: todayLoginHour && !todayLoginHour.logoutTime,
        shiftDate: todayLoginHour?.date || today
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};