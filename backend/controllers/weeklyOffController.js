
// import WeeklyOff from "../models/WeeklyOff.js";
// import User from "../models/User.js";

// /* =====================================================
//    ✅ ADMIN: Add weekly off for selected employee
// ===================================================== */
// export const adminAddWeeklyOff = async (req, res) => {
//   try {
//     const { userId, date, reason } = req.body;

//     if (!userId || !date) {
//       return res.status(400).json({
//         success: false,
//         message: "Employee and date are required",
//       });
//     }

//     const employee = await User.findById(userId);
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     if (employee.role === "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Cannot assign weekly off to admin",
//       });
//     }

//     const weeklyOff = await WeeklyOff.create({
//       userId,
//       date: new Date(date),
//       reason: reason || "",
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Weekly off added successfully",
//       data: weeklyOff,
//     });
//   } catch (error) {
//     console.error("Weekly off create error:", error);

//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Weekly off already exists for this employee on this date",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Server error while adding weekly off",
//       error: error.message,
//     });
//   }
// };

// /* =====================================================
//    ✅ ADMIN: Get ALL employees weekly offs
// ===================================================== */
// export const getAllWeeklyOff = async (req, res) => {
//   try {
//     const data = await WeeklyOff.find()
//       .populate("userId", "name email role")
//       .sort({ date: 1 });

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch weekly offs",
//       error: err.message,
//     });
//   }
// };

// /* =====================================================
//    ✅ ADMIN: Update weekly off
// ===================================================== */
// export const adminUpdateWeeklyOff = async (req, res) => {
//   try {
//     const { date, reason, userId } = req.body;

//     if (!date || !userId) {
//       return res.status(400).json({
//         message: "User and date are required",
//       });
//     }

//     const employee = await User.findById(userId);
//     if (!employee || employee.role === "admin") {
//       return res.status(400).json({
//         message: "Invalid employee selected",
//       });
//     }

//     const updated = await WeeklyOff.findByIdAndUpdate(
//       req.params.id,
//       {
//         userId,
//         date: new Date(date),
//         reason: reason || "",
//       },
//       { new: true, runValidators: true }
//     ).populate("userId", "name email");

//     if (!updated) {
//       return res.status(404).json({
//         message: "Weekly off not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Weekly off updated successfully",
//       data: updated,
//     });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(409).json({
//         message: "Weekly off already exists for this employee on this date",
//       });
//     }

//     res.status(500).json({
//       message: "Failed to update weekly off",
//       error: err.message,
//     });
//   }
// };

// /* =====================================================
//    ✅ ADMIN: Delete weekly off
// ===================================================== */
// export const adminDeleteWeeklyOff = async (req, res) => {
//   try {
//     const deleted = await WeeklyOff.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({
//         message: "Weekly off not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Weekly off deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to delete weekly off",
//       error: err.message,
//     });
//   }
// };

// /* =====================================================
//    ✅ EMPLOYEE: Get own weekly offs
// ===================================================== */
// export const getMyWeeklyOff = async (req, res) => {
//   try {
//     const data = await WeeklyOff.find({
//       userId: req.user._id,
//     }).sort({ date: 1 });

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch your weekly offs",
//       error: err.message,
//     });
//   }
// };

//--------------------------


import WeeklyOff from "../models/WeeklyOff.js";
import User from "../models/User.js"

export const adminAddWeeklyOff = async (req, res) => {
  try {
    // 1. First get data from request body
    const { userId, date, reason } = req.body;

    // 2. Required field validation
    if (!userId || !date) {
      return res.status(400).json({ 
        success: false,
        message: "userId and date are required" 
      });
    }

    // 3. Validate that the employee exists and is not an admin
    const employee = await User.findById(userId);

    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: "Employee not found" 
      });
    }

    if (employee.role === "admin") {
      return res.status(403).json({ 
        success: false,
        message: "Cannot assign weekly off to an admin user" 
      });
    }

    // 4. Create the weekly off entry
    const off = await WeeklyOff.create({
      userId,
      date: new Date(date),           // Make sure it's stored as proper Date
      reason: reason || null,         // Optional field
      // Optional: createdBy: req.user._id   // if you want to track who added it
    });

    res.status(201).json({
      success: true,
      message: "Weekly off added successfully",
      data: off
    });

  } catch (error) {
    console.error("Error creating weekly off:", error);

    if (error.code === 11000) {
      // Duplicate key error (e.g. unique index on userId + date)
      return res.status(409).json({ 
        success: false,
        message: "Weekly off already exists for this employee on this date" 
      });
    }

    // General server error
    res.status(500).json({ 
      success: false,
      message: "Server error while adding weekly off",
      error: error.message 
    });
  }
};
export const adminUpdateWeeklyOff = async (req, res) => {
  try {
    const { date, reason, userId } = req.body;

    const updated = await WeeklyOff.findByIdAndUpdate(
      req.params.id,
      { date, reason, userId },
      { new: true, runValidators: true }
    ).populate("userId", "name email");

    if (!updated) {
      return res.status(404).json({ message: "Weekly off not found" });
    }

    res.json({ message: "Weekly off updated", updated });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Weekly off already exists for this user on this date"
      });
    }
    res.status(500).json({ message: err.message });
  }
};


export const getMyWeeklyOff = async (req, res) => {
  const data = await WeeklyOff.find({ userId: req.user._id }).sort({ date: 1 });
  res.json(data);
};


// 🔹 ADMIN: Get ALL employees weekly off
export const getAllWeeklyOff = async (req, res) => {
  try {
    const data = await WeeklyOff.find()
      .populate("userId", "name email role")
      .sort({ date: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weekly off" });
  }
};

export const adminDeleteWeeklyOff = async (req, res) => {
  try {
    const deleted = await WeeklyOff.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Weekly off not found" });
    }

    res.json({ message: "Weekly off deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};
