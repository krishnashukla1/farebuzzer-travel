// import Attendance from "../models/Attendance.js";
// import LoginHour from "../models/loginHoursSchema.js";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc.js";
// import timezone from "dayjs/plugin/timezone.js";

// dayjs.extend(utc);
// dayjs.extend(timezone);

// /* ================= CONSTANTS ================= */
// const BREAK_LIMITS = {
//   HALF_DAY: 70, // 1 hour 10 minutes in minutes
//   ABSENT: 90    // 1 hour 30 minutes in minutes
// };

// const SHIFT_START_HOUR = 15; // 3 PM IST
// const MAX_FREE_BREAKS = 5;
// const FREE_BREAK_DURATION = 15; // 15 minutes for free breaks

// /* ================= HELPERS ================= */
// function getISTNow() {
//   return dayjs().tz("Asia/Kolkata");
// }

// function getShiftDate() {
//   const istNow = getISTNow();
  
//   // If current time is before 3 PM, it belongs to previous day's shift
//   if (istNow.hour() < SHIFT_START_HOUR) {
//     return istNow.subtract(1, 'day').format("YYYY-MM-DD");
//   }
  
//   return istNow.format("YYYY-MM-DD");
// }

// function calculateTotalBreakMinutes(breaks = []) {
//   return breaks.reduce((total, b) => {
//     if (!b.start || b.status !== "approved") return total;
    
//     const start = new Date(b.start);
//     const end = b.end ? new Date(b.end) : new Date();
    
//     // Make sure end is after start
//     if (end <= start) return total;
    
//     const duration = (end - start) / (1000 * 60); // Convert to minutes
//     return total + Math.max(0, duration);
//   }, 0);
// }

// function calculateWorkedHours(loginTime, logoutTime, totalBreakMinutes) {
//   if (!loginTime) return 0;
  
//   const login = new Date(loginTime);
//   const logout = logoutTime ? new Date(logoutTime) : new Date();
  
//   // Ensure logout is after login
//   if (logout <= login) return 0;
  
//   const totalMs = logout - login;
//   const breakMs = totalBreakMinutes * 60 * 1000;
//   const workedMs = totalMs - breakMs;
  
//   return workedMs > 0 ? workedMs / (1000 * 60 * 60) : 0; // Convert to hours
// }

// function calculateAttendanceStatus(totalBreakMinutes) {
//   if (totalBreakMinutes >= BREAK_LIMITS.ABSENT) return "absent";
//   if (totalBreakMinutes >= BREAK_LIMITS.HALF_DAY) return "half-day";
//   return "present";
// }

// function formatDuration(minutes) {
//   if (!minutes || minutes <= 0) return "0 min";
  
//   const hours = Math.floor(minutes / 60);
//   const mins = Math.floor(minutes % 60);
  
//   if (hours > 0) {
//     return `${hours}h ${mins}m`;
//   }
//   return `${mins}m`;
// }

// /* ================= LOGIN / LOGOUT ================= */
// // export const login = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const date = getShiftDate();

// //     // Check if already logged in today
// //     const existingRecord = await LoginHour.findOne({ 
// //       userId, 
// //       date,
// //       logoutTime: { $exists: false }
// //     });

// //     if (existingRecord) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Already logged in for today",
// //         record: existingRecord 
// //       });
// //     }

// //     // Check if there's a completed record for today
// //     const completedRecord = await LoginHour.findOne({ 
// //       userId, 
// //       date,
// //       logoutTime: { $exists: true }
// //     });

// //     if (completedRecord) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Already completed today's shift. Cannot login again.",
// //         record: completedRecord 
// //       });
// //     }

// //     const record = new LoginHour({
// //       userId,
// //       date,
// //       loginTime: new Date(),
// //       breaks: [],
// //       status: "present"
// //     });

// //     await record.save();

// //     res.json({ 
// //       success: true,
// //       message: "Login recorded successfully", 
// //       record: {
// //         _id: record._id,
// //         userId: record.userId,
// //         date: record.date,
// //         loginTime: record.loginTime,
// //         breaks: record.breaks,
// //         status: record.status
// //       }
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
    
// //     // Handle duplicate key error
// //     if (err.code === 11000) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Already logged in for today", 
// //         error: "Duplicate entry"
// //       });
// //     }
    
// //     res.status(500).json({ 
// //       success: false,
// //       message: "Login failed", 
// //       error: err.message 
// //     });
// //   }
// // };


// // loginHourController.js → login function
// // export const login = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const shiftDate = getShiftDate();

// //     // 1. Check for existing record for this shift date
// //     let loginRecord = await LoginHour.findOne({ 
// //       userId, 
// //       date: shiftDate 
// //     });

// //     // Case 1: Already logged out → shift completed
// //     if (loginRecord?.logoutTime) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Today's shift has already been completed. Cannot login again.",
// //         alreadyCompleted: true,
// //         record: {
// //           date: loginRecord.date,
// //           loginTime: loginRecord.loginTime,
// //           logoutTime: loginRecord.logoutTime
// //         }
// //       });
// //     }

// //     // Case 2: Already logged in (active session)
// //     if (loginRecord && !loginRecord.logoutTime) {
// //       return res.status(200).json({
// //         success: true,
// //         message: "You are already logged in for today's shift",
// //         alreadyLoggedIn: true,
// //         record: {
// //           _id: loginRecord._id,
// //           date: loginRecord.date,
// //           loginTime: loginRecord.loginTime,
// //           status: loginRecord.status
// //         }
// //       });
// //     }

// //     // Case 3: First login for this shift → create new record + auto attendance
// //     if (!loginRecord) {
// //       // Prepare new login record
// //       loginRecord = new LoginHour({
// //         userId,
// //         date: shiftDate,
// //         loginTime: new Date(),
// //         breaks: [],
// //         status: "present",
// //         totalWorkedHours: 0,
// //         totalBreakHours: 0
// //       });

// //       // Auto-create Attendance record (if not exists)
// //       const attendanceDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD (calendar day)

// //       const existingAttendance = await Attendance.findOne({
// //         user: userId,
// //         date: attendanceDate
// //       });

// //       if (!existingAttendance) {
// //         await Attendance.create({
// //           user: userId,
// //           date: attendanceDate,
// //           status: "Present",
// //           punchIn: new Date(),
// //           // You can also add punchOut later when they logout if needed
// //         });
// //         console.log(`Auto-marked attendance for ${userId} on ${attendanceDate}`);
// //       }

// //       // Save the login record
// //       await loginRecord.save();
// //     }

// //     // Success response
// //     return res.status(200).json({
// //       success: true,
// //       message: "Login successful - shift started",
// //       record: {
// //         _id: loginRecord._id,
// //         date: loginRecord.date,
// //         loginTime: loginRecord.loginTime,
// //         status: loginRecord.status,
// //         isActive: !loginRecord.logoutTime
// //       }
// //     });

// //   } catch (error) {
// //     console.error("Login controller error:", error);

// //     if (error.code === 11000) {
// //       // MongoDB duplicate key error (shouldn't happen with our checks, but safety)
// //       return res.status(409).json({
// //         success: false,
// //         message: "Conflict: Record already exists for this shift",
// //         error: "duplicate_key"
// //       });
// //     }

// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to start shift",
// //       error: error.message
// //     });
// //   }
// // };

// // export const login = async (req, res) => {
// //   try {
// //     console.log('LOGIN ATTEMPT - User:', req.user);           // ← Add this
// //     console.log('User ID:', req.user?._id);                    // ← Add this

// //     if (!req.user || !req.user._id) {
// //       console.error('No authenticated user found in request');
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Authentication required - no user found'
// //       });
// //     }

// //     const userId = req.user._id;
// //     const date = getShiftDate();

// //     console.log('Shift date calculated:', date);              // ← Debug

// //     let loginRecord = await LoginHour.findOne({ userId, date });

// //     if (loginRecord?.logoutTime) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "Shift already completed" 
// //       });
// //     }

// //     if (loginRecord && !loginRecord.logoutTime) {
// //       return res.status(200).json({ 
// //         success: true, 
// //         message: "Already logged in", 
// //         alreadyActive: true 
// //       });
// //     }

// //     // Create new record
// //     loginRecord = new LoginHour({
// //       userId,
// //       date,
// //       loginTime: new Date(),
// //       status: "present"
// //     });

// //     // Auto attendance
// //     const today = new Date().toISOString().split("T")[0];
// //     console.log('Trying to create attendance for:', today);

// //     await Attendance.findOneAndUpdate(
// //       { user: userId, date: today },
// //       { 
// //         $setOnInsert: { 
// //           user: userId, 
// //           date: today, 
// //           status: "Present",
// //           punchIn: new Date()
// //         }
// //       },
// //       { upsert: true, new: true }
// //     );

// //     await loginRecord.save();

// //     return res.status(201).json({
// //       success: true,
// //       message: "Shift started successfully",
// //       record: loginRecord
// //     });

// //   } catch (error) {
// //     console.error('LOGIN CONTROLLER CRASH:', error);         // ← Very important!
// //     console.error('Stack trace:', error.stack);

// //     return res.status(500).json({
// //       success: false,
// //       message: "Server error while starting shift",
// //       error: error.message,                                 // ← Send real error to frontend
// //       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
// //     });
// //   }
// // };

// // controllers/loginHourController.js
// export const login = async (req, res) => {
//   try {
//     // ── VERY IMPORTANT DEBUG LOGS ──
//     console.log('╔══════════════════════════════════════════════╗');
//     console.log('║          LOGIN REQUEST RECEIVED             ║');
//     console.log('╚══════════════════════════════════════════════╝');
//     console.log('Request Headers:', req.headers);
//     console.log('Authorization Header:', req.headers.authorization);
//     console.log('User from middleware:', req.user ? 'YES' : 'NO – MISSING!');
//     if (req.user) {
//       console.log('User ID:', req.user._id);
//       console.log('User Email:', req.user.email);
//     } else {
//       console.log('!!! CRITICAL: req.user is undefined !!!');
//     }

//     if (!req.user || !req.user._id) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication failed: No user found in request'
//       });
//     }

//     const userId = req.user._id;
//     const shiftDate = getShiftDate();

//     console.log('Calculated shift date:', shiftDate);

//     let loginRecord = await LoginHour.findOne({ userId, date: shiftDate });

//     if (loginRecord?.logoutTime) {
//       return res.status(400).json({
//         success: false,
//         message: "Today's shift already completed"
//       });
//     }

//     if (loginRecord && !loginRecord.logoutTime) {
//       return res.status(200).json({
//         success: true,
//         message: "Already logged in for this shift",
//         alreadyActive: true
//       });
//     }

//     // Create new shift record
//     loginRecord = new LoginHour({
//       userId,
//       date: shiftDate,
//       loginTime: new Date(),
//       status: "present"
//     });

//     // Auto-create attendance (safe upsert)
//     const today = new Date().toISOString().split("T")[0];
//     console.log('Creating attendance for date:', today);

//     await Attendance.findOneAndUpdate(
//       { user: userId, date: today },
//       {
//         $setOnInsert: {
//           user: userId,
//           date: today,
//           status: "Present",
//           punchIn: new Date()
//         }
//       },
//       { upsert: true, new: true }
//     );

//     await loginRecord.save();

//     console.log('LOGIN SUCCESS – Shift started for user:', userId);

//     return res.status(201).json({
//       success: true,
//       message: "Shift started successfully",
//       record: {
//         date: loginRecord.date,
//         loginTime: loginRecord.loginTime
//       }
//     });

//   } catch (error) {
//     // ── CRITICAL: Detailed error logging ──
//     console.error('╔══════════════════════════════════════════════╗');
//     console.error('║          LOGIN CONTROLLER CRASHED           ║');
//     console.error('╚══════════════════════════════════════════════╝');
//     console.error('Error Message:', error.message);
//     console.error('Error Stack:', error.stack);
//     console.error('Full Error Object:', JSON.stringify(error, null, 2));

//     return res.status(500).json({
//       success: false,
//       message: "Server error while starting shift",
//       error: error.message,
//       // Only in development – remove in production!
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

// // export const logout = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const date = getShiftDate();

// //     const record = await LoginHour.findOne({ userId, date });
// //     if (!record) {
// //       return res.status(404).json({ 
// //         success: false,
// //         message: "No login record found for today" 
// //       });
// //     }

// //     if (record.logoutTime) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Already logged out for today" 
// //       });
// //     }

// //     // End any active break
// //     const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
// //     if (activeBreak) {
// //       activeBreak.end = new Date();
// //       console.log(`Auto-ended break for user ${userId}`);
// //     }

// //     // Calculate totals
// //     const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
// //     const totalWorkedHours = calculateWorkedHours(
// //       record.loginTime, 
// //       new Date(), 
// //       totalBreakMinutes
// //     );
// //     const status = calculateAttendanceStatus(totalBreakMinutes);

// //     record.logoutTime = new Date();
// //     record.totalBreakHours = totalBreakMinutes / 60;
// //     record.totalWorkedHours = totalWorkedHours;
// //     record.status = status;

// //     await record.save();

// //     res.json({ 
// //       success: true,
// //       message: "Logout recorded successfully", 
// //       record: {
// //         _id: record._id,
// //         userId: record.userId,
// //         date: record.date,
// //         loginTime: record.loginTime,
// //         logoutTime: record.logoutTime,
// //         totalWorkedHours: record.totalWorkedHours,
// //         totalBreakHours: record.totalBreakHours,
// //         status: record.status,
// //         breaks: record.breaks
// //       },
// //       summary: {
// //         workedHours: totalWorkedHours.toFixed(2),
// //         breakHours: (totalBreakMinutes / 60).toFixed(2),
// //         status: status
// //       }
// //     });
// //   } catch (err) {
// //     console.error("Logout error:", err);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "Logout failed", 
// //       error: err.message 
// //     });
// //   }
// // };


// export const logout = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const shiftDate = getShiftDate(); // renamed for clarity

//     // 1. Find the current shift record
//     const record = await LoginHour.findOne({ 
//       userId, 
//       date: shiftDate,
//       logoutTime: { $exists: false } // only find active (not yet logged out) records
//     });

//     if (!record) {
//       // Either no record or already logged out
//       const alreadyLoggedOut = await LoginHour.findOne({ 
//         userId, 
//         date: shiftDate,
//         logoutTime: { $exists: true }
//       });

//       if (alreadyLoggedOut) {
//         return res.status(400).json({ 
//           success: false,
//           message: "You have already logged out for today's shift",
//           alreadyLoggedOut: true
//         });
//       }

//       return res.status(404).json({ 
//         success: false,
//         message: "No active shift found for today. Please login first.",
//         noActiveShift: true
//       });
//     }

//     // 2. Auto-end any open approved break (good practice)
//     const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
//     if (activeBreak) {
//       activeBreak.end = new Date();
//       activeBreak.autoEnded = true; // optional: mark it as auto-ended
//       console.log(`Auto-ended open break for user ${userId} at logout`);
//     }

//     // 3. Calculate final totals
//     const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
//     const totalWorkedHours = calculateWorkedHours(
//       record.loginTime, 
//       new Date(), 
//       totalBreakMinutes
//     );
//     const finalStatus = calculateAttendanceStatus(totalBreakMinutes);

//     // 4. Update record
//     record.logoutTime = new Date();
//     record.totalBreakHours = totalBreakMinutes / 60;
//     record.totalWorkedHours = totalWorkedHours;
//     record.status = finalStatus;

//     await record.save();

//     // 5. Clean success response
//     res.status(200).json({ 
//       success: true,
//       message: "Logout successful. Have a great day!",
//       record: {
//         _id: record._id,
//         date: record.date,
//         loginTime: record.loginTime,
//         logoutTime: record.logoutTime,
//         totalWorkedHours: record.totalWorkedHours?.toFixed(2),
//         totalBreakHours: record.totalBreakHours?.toFixed(2),
//         status: record.status,
//         breaksCount: record.breaks.length
//       },
//       summary: {
//         workedHours: totalWorkedHours.toFixed(2),
//         breakHours: (totalBreakMinutes / 60).toFixed(2),
//         status: finalStatus,
//         shiftDuration: `${Math.floor(totalWorkedHours)}h ${Math.round((totalWorkedHours % 1) * 60)}m`
//       }
//     });

//   } catch (err) {
//     console.error("Logout controller error:", {
//       message: err.message,
//       stack: err.stack,
//       userId: req.user?._id
//     });

//     res.status(500).json({ 
//       success: false,
//       message: "Failed to logout. Please try again or contact support.",
//       error: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// };

// /* ================= BREAK MANAGEMENT ================= */
// export const requestBreak = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const date = getShiftDate();

//     const record = await LoginHour.findOne({ userId, date });
//     if (!record) {
//       return res.status(404).json({ 
//         success: false,
//         message: "No active shift found. Please login first." 
//       });
//     }

//     if (record.logoutTime) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Cannot take break after logout" 
//       });
//     }

//     // Check if already on break
//     const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
//     if (activeBreak) {
//       return res.status(400).json({ 
//         success: false,
//         message: "You are already on a break. End current break first." 
//       });
//     }

//     // Check if pending request exists
//     const pendingBreak = record.breaks.find(b => b.status === "pending");
//     if (pendingBreak) {
//       return res.status(400).json({ 
//         success: false,
//         message: "You already have a pending break request" 
//       });
//     }

//     // Count approved breaks
//     const approvedBreaks = record.breaks.filter(b => b.status === "approved");
    
//     // AUTO APPROVE FIRST 3 BREAKS
//     if (approvedBreaks.length < MAX_FREE_BREAKS) {
//       const breakRecord = {
//         start: new Date(),
//         status: "approved",
//         approvedAt: new Date(),
//         requestedAt: new Date()
//       };

//       record.breaks.push(breakRecord);
//       await record.save();

//       return res.json({
//         success: true,
//         autoApproved: true,
//         message: `Break started automatically (${approvedBreaks.length + 1}/${MAX_FREE_BREAKS} free breaks)`,
//         break: breakRecord
//       });
//     }

//     // NEED SUPERVISOR APPROVAL FOR ADDITIONAL BREAKS
//     const breakRecord = {
//       requestedAt: new Date(),
//       status: "pending"
//     };

//     record.breaks.push(breakRecord);
//     await record.save();

//     res.json({
//       success: true,
//       pending: true,
//       message: "Break request sent to supervisor for approval",
//       breakId: breakRecord._id
//     });

//   } catch (err) {
//     console.error("Break request error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Break request failed", 
//       error: err.message 
//     });
//   }
// };

// // Add this function since it's imported in routes
// export const startBreak = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const date = getShiftDate();

//     const record = await LoginHour.findOne({ userId, date });
//     if (!record) {
//       return res.status(404).json({ 
//         success: false,
//         message: "No active shift found. Please login first." 
//       });
//     }

//     // Check if already on break
//     const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
//     if (activeBreak) {
//       return res.status(400).json({ 
//         success: false,
//         message: "You are already on a break" 
//       });
//     }

//     // Auto approve if within free breaks limit
//     const approvedBreaks = record.breaks.filter(b => b.status === "approved");
    
//     if (approvedBreaks.length < MAX_FREE_BREAKS) {
//       const breakRecord = {
//         start: new Date(),
//         status: "approved",
//         requestedAt: new Date(),
//         approvedAt: new Date()
//       };

//       record.breaks.push(breakRecord);
//       await record.save();

//       return res.json({
//         success: true,
//         message: `Break started (${approvedBreaks.length + 1}/${MAX_FREE_BREAKS} free breaks)`,
//         break: breakRecord
//       });
//     }

//     // If exceeded free breaks, require approval
//     return res.status(400).json({
//       success: false,
//       message: "Free break limit exceeded. Please request break approval."
//     });

//   } catch (err) {
//     console.error("Start break error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to start break", 
//       error: err.message 
//     });
//   }
// };

// export const endBreak = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const date = getShiftDate();

//     const record = await LoginHour.findOne({ userId, date });
//     if (!record) {
//       return res.status(404).json({ 
//         success: false,
//         message: "No attendance record found" 
//       });
//     }

//     const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
//     if (!activeBreak) {
//       return res.status(400).json({ 
//         success: false,
//         message: "No active break found" 
//       });
//     }

//     activeBreak.end = new Date();
    
//     // Calculate break duration
//     const breakDuration = (new Date(activeBreak.end) - new Date(activeBreak.start)) / (1000 * 60);
    
//     // Auto-end if free break exceeds 15 minutes
//     if (breakDuration > FREE_BREAK_DURATION) {
//       activeBreak.autoEnded = true;
//     }

//     // Update totals immediately
//     const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
//     record.totalBreakHours = totalBreakMinutes / 60;
    
//     // If already logged out, update worked hours
//     if (record.logoutTime) {
//       record.totalWorkedHours = calculateWorkedHours(
//         record.loginTime, 
//         record.logoutTime, 
//         totalBreakMinutes
//       );
//       record.status = calculateAttendanceStatus(totalBreakMinutes);
//     }

//     await record.save();

//     res.json({
//       success: true,
//       message: "Break ended successfully",
//       break: activeBreak,
//       duration: `${breakDuration.toFixed(1)} minutes`,
//       totalBreakMinutes: totalBreakMinutes
//     });

//   } catch (err) {
//     console.error("End break error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to end break", 
//       error: err.message 
//     });
//   }
// };

// /* ================= SUPERVISOR FUNCTIONS ================= */
// export const reviewBreakRequest = async (req, res) => {
//   try {
//     const { userId, breakId, action, rejectReason } = req.body;
//     const supervisorId = req.user._id;

//     if (!["approve", "reject"].includes(action)) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Invalid action. Use 'approve' or 'reject'" 
//       });
//     }

//     const date = getShiftDate();
//     const record = await LoginHour.findOne({ userId, date });
    
//     if (!record) {
//       return res.status(404).json({ 
//         success: false,
//         message: "User record not found" 
//       });
//     }

//     const breakIndex = record.breaks.findIndex(b => 
//       b._id.toString() === breakId
//     );

//     if (breakIndex === -1) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Break request not found" 
//       });
//     }

//     const breakRecord = record.breaks[breakIndex];

//     if (breakRecord.status !== "pending") {
//       return res.status(400).json({ 
//         success: false,
//         message: "Break request already processed" 
//       });
//     }

//     if (action === "approve") {
//       breakRecord.status = "approved";
//       breakRecord.start = breakRecord.start || new Date();
//       breakRecord.approvedBy = supervisorId;
//       breakRecord.approvedAt = new Date();
//     } else {
//       breakRecord.status = "rejected";
//       breakRecord.rejectReason = rejectReason || "No reason provided";
//     }

//     await record.save();

//     res.json({
//       success: true,
//       message: `Break request ${action}d successfully`,
//       break: breakRecord
//     });

//   } catch (err) {
//     console.error("Review break error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to review break request", 
//       error: err.message 
//     });
//   }
// };

// export const getPendingBreakRequests = async (req, res) => {
//   try {
//     const date = getShiftDate();

//     const records = await LoginHour.find({
//       date,
//       "breaks.status": "pending"
//     })
//       .populate("userId", "name email employeeId")
//       .select("userId date loginTime breaks");

//     // Format response
//     const pendingRequests = records.flatMap(record => 
//       record.breaks
//         .filter(b => b.status === "pending")
//         .map(breakRecord => ({
//           userId: record.userId._id,
//           userName: record.userId.name,
//           userEmail: record.userId.email,
//           employeeId: record.userId.employeeId,
//           date: record.date,
//           loginTime: record.loginTime,
//           breakId: breakRecord._id,
//           requestedAt: breakRecord.requestedAt,
//           status: breakRecord.status
//         }))
//     );

//     res.json({
//       success: true,
//       count: pendingRequests.length,
//       requests: pendingRequests
//     });

//   } catch (err) {
//     console.error("Fetch pending breaks error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch pending break requests", 
//       error: err.message 
//     });
//   }
// };

// /* ================= STATISTICS ================= */
// export const getTodayStats = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const date = getShiftDate();

//     const record = await LoginHour.findOne({ userId, date });
    
//     if (!record) {
//       return res.json({
//         success: true,
//         isLoggedIn: false,
//         message: "No record found for today",
//         data: {
//           workedHours: 0,
//           breakHours: 0,
//           breakCount: 0,
//           status: "pending"
//         }
//       });
//     }

//     const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
//     const totalWorkedHours = calculateWorkedHours(
//       record.loginTime,
//       record.logoutTime || new Date(),
//       totalBreakMinutes
//     );

//     const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    
//     const formattedBreaks = record.breaks.map(b => ({
//       id: b._id,
//       start: b.start,
//       end: b.end,
//       status: b.status,
//       duration: b.start && b.end ? 
//         formatDuration((new Date(b.end) - new Date(b.start)) / (1000 * 60)) : 
//         "Ongoing"
//     }));

//     res.json({
//       success: true,
//       isLoggedIn: !record.logoutTime,
//       data: {
//         loginTime: record.loginTime,
//         logoutTime: record.logoutTime,
//         workedHours: totalWorkedHours.toFixed(2),
//         breakHours: (totalBreakMinutes / 60).toFixed(2),
//         breakCount: record.breaks.filter(b => b.status === "approved").length,
//         pendingBreaks: record.breaks.filter(b => b.status === "pending").length,
//         freeBreaksUsed: record.breaks.filter(b => b.status === "approved").length,
//         freeBreaksLeft: Math.max(0, MAX_FREE_BREAKS - record.breaks.filter(b => b.status === "approved").length),
//         isOnBreak: !!activeBreak,
//         currentBreak: activeBreak,
//         allBreaks: formattedBreaks,
//         status: record.status || calculateAttendanceStatus(totalBreakMinutes)
//       }
//     });

//   } catch (err) {
//     console.error("Get stats error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch today's statistics", 
//       error: err.message 
//     });
//   }
// };

// export const getAllLoginHours = async (req, res) => {
//   try {
//     const { startDate, endDate, userId } = req.query;
    
//     let filter = {};
    
//     if (startDate && endDate) {
//       filter.date = { $gte: startDate, $lte: endDate };
//     } else {
//       // Default to last 30 days if no date range provided
//       const thirtyDaysAgo = getISTNow().subtract(30, 'day').format("YYYY-MM-DD");
//       const today = getISTNow().format("YYYY-MM-DD");
//       filter.date = { $gte: thirtyDaysAgo, $lte: today };
//     }
    
//     if (userId) {
//       filter.userId = userId;
//     }

//     const records = await LoginHour.find(filter)
//       .populate("userId", "name email employeeId department")
//       .sort({ date: -1, loginTime: -1 })
//       .lean();

//     // Format response
//     const formattedRecords = records.map(record => {
//       const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
//       const totalWorkedHours = calculateWorkedHours(
//         record.loginTime,
//         record.logoutTime || new Date(),
//         totalBreakMinutes
//       );

//       return {
//         _id: record._id,
//         user: record.userId,
//         date: record.date,
//         loginTime: record.loginTime,
//         logoutTime: record.logoutTime,
//         workedHours: totalWorkedHours.toFixed(2),
//         breakHours: (totalBreakMinutes / 60).toFixed(2),
//         breakCount: record.breaks.filter(b => b.status === "approved").length,
//         status: record.status || calculateAttendanceStatus(totalBreakMinutes),
//         createdAt: record.createdAt
//       };
//     });

//     res.json({
//       success: true,
//       count: formattedRecords.length,
//       records: formattedRecords
//     });

//   } catch (err) {
//     console.error("Get all login hours error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch login hours", 
//       error: err.message 
//     });
//   }
// };

// // Add any other missing exports that might be in your routes
// export const getMyLoginHours = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { startDate, endDate } = req.query;
    
//     let filter = { userId };
    
//     if (startDate && endDate) {
//       filter.date = { $gte: startDate, $lte: endDate };
//     } else {
//       // Default to last 7 days
//       const sevenDaysAgo = getISTNow().subtract(7, 'day').format("YYYY-MM-DD");
//       const today = getISTNow().format("YYYY-MM-DD");
//       filter.date = { $gte: sevenDaysAgo, $lte: today };
//     }

//     const records = await LoginHour.find(filter)
//       .sort({ date: -1, loginTime: -1 })
//       .lean();

//     const formattedRecords = records.map(record => {
//       const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
//       const totalWorkedHours = calculateWorkedHours(
//         record.loginTime,
//         record.logoutTime || new Date(),
//         totalBreakMinutes
//       );

//       return {
//         _id: record._id,
//         date: record.date,
//         loginTime: record.loginTime,
//         logoutTime: record.logoutTime,
//         workedHours: totalWorkedHours.toFixed(2),
//         breakHours: (totalBreakMinutes / 60).toFixed(2),
//         breakCount: record.breaks.filter(b => b.status === "approved").length,
//         status: record.status || calculateAttendanceStatus(totalBreakMinutes)
//       };
//     });

//     res.json({
//       success: true,
//       count: formattedRecords.length,
//       records: formattedRecords
//     });

//   } catch (err) {
//     console.error("Get my login hours error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch login hours", 
//       error: err.message 
//     });
//   }
// };


// export const getTodayLoginHoursAdmin = async (req, res) => {
//   try {
//     const date = getShiftDate();
//     const { userId } = req.query;

//     const filter = { date };
//     if (userId) filter.userId = userId;

//     const records = await LoginHour.find(filter)
//       .populate("userId", "name email employeeId role")
//       .sort({ loginTime: -1 })
//       .lean();

//     const formatted = records.map(r => {
//       const totalBreakMinutes = calculateTotalBreakMinutes(r.breaks);
//       const workedHours = calculateWorkedHours(
//         r.loginTime,
//         r.logoutTime, // ✅ IMPORTANT: DO NOT USE new Date()
//         totalBreakMinutes
//       );

//       return {
//         _id: r._id,
//         userId: r.userId,
//         loginTime: r.loginTime,
//         logoutTime: r.logoutTime,
//         workedHours: workedHours.toFixed(2),
//         breakHours: (totalBreakMinutes / 60).toFixed(2),
//         status: r.logoutTime ? "Logged Out" : "Logged In"
//       };
//     });

//     res.json({
//       success: true,
//       data: formatted
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch today login hours"
//     });
//   }
// };
























//=================with remove commented code=============




import Attendance from "../models/Attendance.js";
import LoginHour from "../models/loginHoursSchema.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

/* ================= CONSTANTS ================= */
const BREAK_LIMITS = {
  HALF_DAY: 70, // 1 hour 10 minutes in minutes
  ABSENT: 90    // 1 hour 30 minutes in minutes
};

const SHIFT_START_HOUR = 15; // 3 PM IST
const MAX_FREE_BREAKS = 5;
const FREE_BREAK_DURATION = 15; // 15 minutes for free breaks

/* ================= HELPERS ================= */
function getISTNow() {
  return dayjs().tz("Asia/Kolkata");
}

function getShiftDate() {
  const istNow = getISTNow();
  
  // If current time is before 3 PM, it belongs to previous day's shift
  if (istNow.hour() < SHIFT_START_HOUR) {
    return istNow.subtract(1, 'day').format("YYYY-MM-DD");
  }
  
  return istNow.format("YYYY-MM-DD");
}

function calculateTotalBreakMinutes(breaks = []) {
  return breaks.reduce((total, b) => {
    if (!b.start || b.status !== "approved") return total;
    
    const start = new Date(b.start);
    const end = b.end ? new Date(b.end) : new Date();
    
    // Make sure end is after start
    if (end <= start) return total;
    
    const duration = (end - start) / (1000 * 60); // Convert to minutes
    return total + Math.max(0, duration);
  }, 0);
}

function calculateWorkedHours(loginTime, logoutTime, totalBreakMinutes) {
  if (!loginTime) return 0;
  
  const login = new Date(loginTime);
  const logout = logoutTime ? new Date(logoutTime) : new Date();
  
  // Ensure logout is after login
  if (logout <= login) return 0;
  
  const totalMs = logout - login;
  const breakMs = totalBreakMinutes * 60 * 1000;
  const workedMs = totalMs - breakMs;
  
  return workedMs > 0 ? workedMs / (1000 * 60 * 60) : 0; // Convert to hours
}

function calculateAttendanceStatus(totalBreakMinutes) {
  if (totalBreakMinutes >= BREAK_LIMITS.ABSENT) return "absent";
  if (totalBreakMinutes >= BREAK_LIMITS.HALF_DAY) return "half-day";
  return "present";
}

function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return "0 min";
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

/* ================= LOGIN / LOGOUT ================= */

// controllers/loginHourController.js
export const login = async (req, res) => {
  try {
    // ── VERY IMPORTANT DEBUG LOGS ──
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║          LOGIN REQUEST RECEIVED             ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('Request Headers:', req.headers);
    console.log('Authorization Header:', req.headers.authorization);
    console.log('User from middleware:', req.user ? 'YES' : 'NO – MISSING!');
    if (req.user) {
      console.log('User ID:', req.user._id);
      console.log('User Email:', req.user.email);
    } else {
      console.log('!!! CRITICAL: req.user is undefined !!!');
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: No user found in request'
      });
    }

    const userId = req.user._id;
    const shiftDate = getShiftDate();

    console.log('Calculated shift date:', shiftDate);

    let loginRecord = await LoginHour.findOne({ userId, date: shiftDate });

    if (loginRecord?.logoutTime) {
      return res.status(400).json({
        success: false,
        message: "Today's shift already completed"
      });
    }

    if (loginRecord && !loginRecord.logoutTime) {
      return res.status(200).json({
        success: true,
        message: "Already logged in for this shift",
        alreadyActive: true
      });
    }

    // Create new shift record
    loginRecord = new LoginHour({
      userId,
      date: shiftDate,
      loginTime: new Date(),
      status: "present"
    });

    // Auto-create attendance (safe upsert)
    const today = new Date().toISOString().split("T")[0];
    console.log('Creating attendance for date:', today);

    await Attendance.findOneAndUpdate(
      { user: userId, date: today },
      {
        $setOnInsert: {
          user: userId,
          date: today,
          status: "Present",
          punchIn: new Date()
        }
      },
      { upsert: true, new: true }
    );

    await loginRecord.save();

    console.log('LOGIN SUCCESS – Shift started for user:', userId);

    return res.status(201).json({
      success: true,
      message: "Shift started successfully",
      record: {
        date: loginRecord.date,
        loginTime: loginRecord.loginTime
      }
    });

  } catch (error) {
    // ── CRITICAL: Detailed error logging ──
    console.error('╔══════════════════════════════════════════════╗');
    console.error('║          LOGIN CONTROLLER CRASHED           ║');
    console.error('╚══════════════════════════════════════════════╝');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('Full Error Object:', JSON.stringify(error, null, 2));

    return res.status(500).json({
      success: false,
      message: "Server error while starting shift",
      error: error.message,
      // Only in development – remove in production!
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.user._id;
    const shiftDate = getShiftDate(); // renamed for clarity

    // 1. Find the current shift record
    const record = await LoginHour.findOne({ 
      userId, 
      date: shiftDate,
      logoutTime: { $exists: false } // only find active (not yet logged out) records
    });

    if (!record) {
      // Either no record or already logged out
      const alreadyLoggedOut = await LoginHour.findOne({ 
        userId, 
        date: shiftDate,
        logoutTime: { $exists: true }
      });

      if (alreadyLoggedOut) {
        return res.status(400).json({ 
          success: false,
          message: "You have already logged out for today's shift",
          alreadyLoggedOut: true
        });
      }

      return res.status(404).json({ 
        success: false,
        message: "No active shift found for today. Please login first.",
        noActiveShift: true
      });
    }

    // 2. Auto-end any open approved break (good practice)
    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (activeBreak) {
      activeBreak.end = new Date();
      activeBreak.autoEnded = true; // optional: mark it as auto-ended
      console.log(`Auto-ended open break for user ${userId} at logout`);
    }

    // 3. Calculate final totals
    const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
    const totalWorkedHours = calculateWorkedHours(
      record.loginTime, 
      new Date(), 
      totalBreakMinutes
    );
    const finalStatus = calculateAttendanceStatus(totalBreakMinutes);

    // 4. Update record
    record.logoutTime = new Date();
    record.totalBreakHours = totalBreakMinutes / 60;
    record.totalWorkedHours = totalWorkedHours;
    record.status = finalStatus;

    await record.save();

    // 5. Clean success response
    res.status(200).json({ 
      success: true,
      message: "Logout successful. Have a great day!",
      record: {
        _id: record._id,
        date: record.date,
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        totalWorkedHours: record.totalWorkedHours?.toFixed(2),
        totalBreakHours: record.totalBreakHours?.toFixed(2),
        status: record.status,
        breaksCount: record.breaks.length
      },
      summary: {
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        status: finalStatus,
        shiftDuration: `${Math.floor(totalWorkedHours)}h ${Math.round((totalWorkedHours % 1) * 60)}m`
      }
    });

  } catch (err) {
    console.error("Logout controller error:", {
      message: err.message,
      stack: err.stack,
      userId: req.user?._id
    });

    res.status(500).json({ 
      success: false,
      message: "Failed to logout. Please try again or contact support.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

/* ================= BREAK MANAGEMENT ================= */
export const requestBreak = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "No active shift found. Please login first." 
      });
    }

    if (record.logoutTime) {
      return res.status(400).json({ 
        success: false,
        message: "Cannot take break after logout" 
      });
    }

    // Check if already on break
    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (activeBreak) {
      return res.status(400).json({ 
        success: false,
        message: "You are already on a break. End current break first." 
      });
    }

    // Check if pending request exists
    const pendingBreak = record.breaks.find(b => b.status === "pending");
    if (pendingBreak) {
      return res.status(400).json({ 
        success: false,
        message: "You already have a pending break request" 
      });
    }

    // Count approved breaks
    const approvedBreaks = record.breaks.filter(b => b.status === "approved");
    
    // AUTO APPROVE FIRST 3 BREAKS
    if (approvedBreaks.length < MAX_FREE_BREAKS) {
      const breakRecord = {
        start: new Date(),
        status: "approved",
        approvedAt: new Date(),
        requestedAt: new Date()
      };

      record.breaks.push(breakRecord);
      await record.save();

      return res.json({
        success: true,
        autoApproved: true,
        message: `Break started automatically (${approvedBreaks.length + 1}/${MAX_FREE_BREAKS} free breaks)`,
        break: breakRecord
      });
    }

    // NEED SUPERVISOR APPROVAL FOR ADDITIONAL BREAKS
    const breakRecord = {
      requestedAt: new Date(),
      status: "pending"
    };

    record.breaks.push(breakRecord);
    await record.save();

    res.json({
      success: true,
      pending: true,
      message: "Break request sent to supervisor for approval",
      breakId: breakRecord._id
    });

  } catch (err) {
    console.error("Break request error:", err);
    res.status(500).json({ 
      success: false,
      message: "Break request failed", 
      error: err.message 
    });
  }
};

// Add this function since it's imported in routes
export const startBreak = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "No active shift found. Please login first." 
      });
    }

    // Check if already on break
    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (activeBreak) {
      return res.status(400).json({ 
        success: false,
        message: "You are already on a break" 
      });
    }

    // Auto approve if within free breaks limit
    const approvedBreaks = record.breaks.filter(b => b.status === "approved");
    
    if (approvedBreaks.length < MAX_FREE_BREAKS) {
      const breakRecord = {
        start: new Date(),
        status: "approved",
        requestedAt: new Date(),
        approvedAt: new Date()
      };

      record.breaks.push(breakRecord);
      await record.save();

      return res.json({
        success: true,
        message: `Break started (${approvedBreaks.length + 1}/${MAX_FREE_BREAKS} free breaks)`,
        break: breakRecord
      });
    }

    // If exceeded free breaks, require approval
    return res.status(400).json({
      success: false,
      message: "Free break limit exceeded. Please request break approval."
    });

  } catch (err) {
    console.error("Start break error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to start break", 
      error: err.message 
    });
  }
};

export const endBreak = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "No attendance record found" 
      });
    }

    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    if (!activeBreak) {
      return res.status(400).json({ 
        success: false,
        message: "No active break found" 
      });
    }

    activeBreak.end = new Date();
    
    // Calculate break duration
    const breakDuration = (new Date(activeBreak.end) - new Date(activeBreak.start)) / (1000 * 60);
    
    // Auto-end if free break exceeds 15 minutes
    if (breakDuration > FREE_BREAK_DURATION) {
      activeBreak.autoEnded = true;
    }

    // Update totals immediately
    const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
    record.totalBreakHours = totalBreakMinutes / 60;
    
    // If already logged out, update worked hours
    if (record.logoutTime) {
      record.totalWorkedHours = calculateWorkedHours(
        record.loginTime, 
        record.logoutTime, 
        totalBreakMinutes
      );
      record.status = calculateAttendanceStatus(totalBreakMinutes);
    }

    await record.save();

    res.json({
      success: true,
      message: "Break ended successfully",
      break: activeBreak,
      duration: `${breakDuration.toFixed(1)} minutes`,
      totalBreakMinutes: totalBreakMinutes
    });

  } catch (err) {
    console.error("End break error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to end break", 
      error: err.message 
    });
  }
};

/* ================= SUPERVISOR FUNCTIONS ================= */
export const reviewBreakRequest = async (req, res) => {
  try {
    const { userId, breakId, action, rejectReason } = req.body;
    const supervisorId = req.user._id;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid action. Use 'approve' or 'reject'" 
      });
    }

    const date = getShiftDate();
    const record = await LoginHour.findOne({ userId, date });
    
    if (!record) {
      return res.status(404).json({ 
        success: false,
        message: "User record not found" 
      });
    }

    const breakIndex = record.breaks.findIndex(b => 
      b._id.toString() === breakId
    );

    if (breakIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: "Break request not found" 
      });
    }

    const breakRecord = record.breaks[breakIndex];

    if (breakRecord.status !== "pending") {
      return res.status(400).json({ 
        success: false,
        message: "Break request already processed" 
      });
    }

    if (action === "approve") {
      breakRecord.status = "approved";
      breakRecord.start = breakRecord.start || new Date();
      breakRecord.approvedBy = supervisorId;
      breakRecord.approvedAt = new Date();
    } else {
      breakRecord.status = "rejected";
      breakRecord.rejectReason = rejectReason || "No reason provided";
    }

    await record.save();

    res.json({
      success: true,
      message: `Break request ${action}d successfully`,
      break: breakRecord
    });

  } catch (err) {
    console.error("Review break error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to review break request", 
      error: err.message 
    });
  }
};

export const getPendingBreakRequests = async (req, res) => {
  try {
    const date = getShiftDate();

    const records = await LoginHour.find({
      date,
      "breaks.status": "pending"
    })
      .populate("userId", "name email employeeId")
      .select("userId date loginTime breaks");

    // Format response
    const pendingRequests = records.flatMap(record => 
      record.breaks
        .filter(b => b.status === "pending")
        .map(breakRecord => ({
          userId: record.userId._id,
          userName: record.userId.name,
          userEmail: record.userId.email,
          employeeId: record.userId.employeeId,
          date: record.date,
          loginTime: record.loginTime,
          breakId: breakRecord._id,
          requestedAt: breakRecord.requestedAt,
          status: breakRecord.status
        }))
    );

    res.json({
      success: true,
      count: pendingRequests.length,
      requests: pendingRequests
    });

  } catch (err) {
    console.error("Fetch pending breaks error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch pending break requests", 
      error: err.message 
    });
  }
};

/* ================= STATISTICS ================= */
export const getTodayStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = getShiftDate();

    const record = await LoginHour.findOne({ userId, date });
    
    if (!record) {
      return res.json({
        success: true,
        isLoggedIn: false,
        message: "No record found for today",
        data: {
          workedHours: 0,
          breakHours: 0,
          breakCount: 0,
          status: "pending"
        }
      });
    }

    const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
    const totalWorkedHours = calculateWorkedHours(
      record.loginTime,
      record.logoutTime || new Date(),
      totalBreakMinutes
    );

    const activeBreak = record.breaks.find(b => !b.end && b.status === "approved");
    
    const formattedBreaks = record.breaks.map(b => ({
      id: b._id,
      start: b.start,
      end: b.end,
      status: b.status,
      duration: b.start && b.end ? 
        formatDuration((new Date(b.end) - new Date(b.start)) / (1000 * 60)) : 
        "Ongoing"
    }));

    res.json({
      success: true,
      isLoggedIn: !record.logoutTime,
      data: {
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        breakCount: record.breaks.filter(b => b.status === "approved").length,
        pendingBreaks: record.breaks.filter(b => b.status === "pending").length,
        freeBreaksUsed: record.breaks.filter(b => b.status === "approved").length,
        freeBreaksLeft: Math.max(0, MAX_FREE_BREAKS - record.breaks.filter(b => b.status === "approved").length),
        isOnBreak: !!activeBreak,
        currentBreak: activeBreak,
        allBreaks: formattedBreaks,
        status: record.status || calculateAttendanceStatus(totalBreakMinutes)
      }
    });

  } catch (err) {
    console.error("Get stats error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch today's statistics", 
      error: err.message 
    });
  }
};

export const getAllLoginHours = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;
    
    let filter = {};
    
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    } else {
      // Default to last 30 days if no date range provided
      const thirtyDaysAgo = getISTNow().subtract(30, 'day').format("YYYY-MM-DD");
      const today = getISTNow().format("YYYY-MM-DD");
      filter.date = { $gte: thirtyDaysAgo, $lte: today };
    }
    
    if (userId) {
      filter.userId = userId;
    }

    const records = await LoginHour.find(filter)
      .populate("userId", "name email employeeId department")
      .sort({ date: -1, loginTime: -1 })
      .lean();

    // Format response
    const formattedRecords = records.map(record => {
      const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
      const totalWorkedHours = calculateWorkedHours(
        record.loginTime,
        record.logoutTime || new Date(),
        totalBreakMinutes
      );

      return {
        _id: record._id,
        user: record.userId,
        date: record.date,
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        breakCount: record.breaks.filter(b => b.status === "approved").length,
        status: record.status || calculateAttendanceStatus(totalBreakMinutes),
        createdAt: record.createdAt
      };
    });

    res.json({
      success: true,
      count: formattedRecords.length,
      records: formattedRecords
    });

  } catch (err) {
    console.error("Get all login hours error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch login hours", 
      error: err.message 
    });
  }
};

// Add any other missing exports that might be in your routes
export const getMyLoginHours = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;
    
    let filter = { userId };
    
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    } else {
      // Default to last 7 days
      const sevenDaysAgo = getISTNow().subtract(7, 'day').format("YYYY-MM-DD");
      const today = getISTNow().format("YYYY-MM-DD");
      filter.date = { $gte: sevenDaysAgo, $lte: today };
    }

    const records = await LoginHour.find(filter)
      .sort({ date: -1, loginTime: -1 })
      .lean();

    const formattedRecords = records.map(record => {
      const totalBreakMinutes = calculateTotalBreakMinutes(record.breaks);
      const totalWorkedHours = calculateWorkedHours(
        record.loginTime,
        record.logoutTime || new Date(),
        totalBreakMinutes
      );

      return {
        _id: record._id,
        date: record.date,
        loginTime: record.loginTime,
        logoutTime: record.logoutTime,
        workedHours: totalWorkedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        breakCount: record.breaks.filter(b => b.status === "approved").length,
        status: record.status || calculateAttendanceStatus(totalBreakMinutes)
      };
    });

    res.json({
      success: true,
      count: formattedRecords.length,
      records: formattedRecords
    });

  } catch (err) {
    console.error("Get my login hours error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch login hours", 
      error: err.message 
    });
  }
};


export const getTodayLoginHoursAdmin = async (req, res) => {
  try {
    const date = getShiftDate();
    const { userId } = req.query;

    const filter = { date };
    if (userId) filter.userId = userId;

    const records = await LoginHour.find(filter)
      .populate("userId", "name email employeeId role")
      .sort({ loginTime: -1 })
      .lean();

    const formatted = records.map(r => {
      const totalBreakMinutes = calculateTotalBreakMinutes(r.breaks);
      const workedHours = calculateWorkedHours(
        r.loginTime,
        r.logoutTime, // ✅ IMPORTANT: DO NOT USE new Date()
        totalBreakMinutes
      );

      return {
        _id: r._id,
        userId: r.userId,
        loginTime: r.loginTime,
        logoutTime: r.logoutTime,
        workedHours: workedHours.toFixed(2),
        breakHours: (totalBreakMinutes / 60).toFixed(2),
        status: r.logoutTime ? "Logged Out" : "Logged In"
      };
    });

    res.json({
      success: true,
      data: formatted
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch today login hours"
    });
  }
};
