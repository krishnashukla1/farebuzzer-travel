
//==========correct==========

// import Booking from "../models/Booking.js";
// import Enquiry from "../models/Enquiry.js";
// import User from "../models/User.js";

// // IST = UTC + 5 hours 30 minutes
// const IST_OFFSET = 5.5 * 60 * 60 * 1000;

// // Convert any date to IST Date object
// const toISTDate = (date) => {
//   return new Date(date.getTime() + IST_OFFSET);
// };

// // Get today's IST date string (YYYY-MM-DD)
// const getTodayISTString = () => {
//   return toISTDate(new Date()).toISOString().split("T")[0];
// };


// export const getDashboardStats = async (req, res) => {
//   try {
//     const { from, to } = req.query;

//     const dateFilter = {};
//     if (from && to) {
//       dateFilter.createdAt = {
//         $gte: new Date(from),
//         $lte: new Date(to)
//       };
//     }

//     const bookings = await Booking.find(dateFilter);
//     const enquiries = await Enquiry.find(dateFilter);

//     // const today = new Date().toISOString().split("T")[0];
//        const todayIST = getTodayISTString();

//     res.json({
//       // ===== BOOKINGS =====
//       totalBookings: bookings.length,
//       revenue: bookings.reduce((sum, b) => sum + (b.amount || 0), 0),
//       commission: bookings.reduce((sum, b) => sum + (b.commission || 0), 0),
//       mco: bookings.reduce((sum, b) => sum + (b.mco || 0), 0),

//       authLoss: bookings.filter(b => b.status === "CHARGEBACK").length,

//       fresh: bookings.filter(b => b.status === "FRESH").length,
//       airlineFollowUp: bookings.filter(b => b.status === "FOLLOW_UP").length,
//       sendToTicketing: bookings.filter(b => b.status === "TICKETING").length,
//       ticketedCharged: bookings.filter(b => b.status === "TICKETED").length,
//       cancelled: bookings.filter(b => b.status === "CANCELLED").length,
//       chargeBack: bookings.filter(b => b.status === "CHARGEBACK").length,

//       todayBookings: bookings.filter(
//         // b => b.createdAt.toISOString().startsWith(today)
//          b => toISTDate(b.createdAt).toISOString().startsWith(todayIST)  //IST
//       ).length,

//       // ===== ENQUIRIES =====
//       totalEnquiry: enquiries.length,
//       todayEnquiry: enquiries.filter(
//         // e => e.createdAt.toISOString().startsWith(today)
//           e => toISTDate(e.createdAt).toISOString().startsWith(todayIST)   //IST
//       ).length,

//       // ===== USERS =====
//       usersAvailable: await User.countDocuments({ role: "agent" }),

//       // ===== OPTIONAL =====
//       commissionToday: bookings
//         // .filter(b => b.createdAt.toISOString().startsWith(today))
//           .filter(b => toISTDate(b.createdAt).toISOString().startsWith(todayIST))   //IST
//         .reduce((sum, b) => sum + (b.commission || 0), 0),

//       discountToday: 0
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Dashboard data error" });
//   }
// };



//========19 dec=======

import Booking from "../models/Booking.js";
import Enquiry from "../models/Enquiry.js";
import User from "../models/User.js";

// IST = UTC + 5 hours 30 minutes
const IST_OFFSET = 5.5 * 60 * 60 * 1000;

// Convert any date to IST Date object
const toISTDate = (date) => {
  return new Date(date.getTime() + IST_OFFSET);
};

// Get today's IST date string (YYYY-MM-DD)
const getTodayISTString = () => {
  return toISTDate(new Date()).toISOString().split("T")[0];
};

// export const getDashboardStats = async (req, res) => {
//   try {
//     const { from, to } = req.query;

//     // ===== Date Filter =====
//     const dateFilter = {};
//     if (from && to) {
//       dateFilter.createdAt = {
//         $gte: new Date(from),
//         $lte: new Date(to),
//       };
//     }

//     const bookings = await Booking.find(dateFilter);
//     const enquiries = await Enquiry.find(dateFilter);

//     const todayIST = getTodayISTString();

//     // ===== CALCULATIONS =====
//     const totalBookings = bookings.length;

//     // Amount = Selling Price (ALL)
//     const revenue = bookings.reduce(
//       (sum, b) => sum + (Number(b.sellingPrice) || 0),
//       0
//     );

//     // Amendment = Profit where status = AMENDMENT
//     const commission = bookings.reduce(
//       (sum, b) =>
//         b.status === "AMENDMENT" ? sum + (Number(b.profit) || 0) : sum,
//       0
//     );

//     // MCO = Profit where status = VOID
//     const mco = bookings.reduce(
//       (sum, b) =>
//         b.status === "VOID" ? sum + (Number(b.profit) || 0) : sum,
//       0
//     );

//     // LOSS = REFUND + AUTH_FORM_LOSS
//     const authLoss = bookings.filter((b) =>
//       ["REFUND", "AUTH_FORM_LOSS", "CHARGEBACK"].includes(b.status)
//     ).length;

//     // ===== STATUS COUNTS =====
//     const fresh = bookings.filter(b => b.status === "FRESH").length;
//     const airlineFollowUp = bookings.filter(b => b.status === "FOLLOW_UP").length;
//     const sendToTicketing = bookings.filter(b => b.status === "SEND_TO_TICKETING").length;
//     const ticketedCharged = bookings.filter(b => b.status === "TICKETING").length;
//     const cancelled = bookings.filter(b => b.status === "CANCELLED").length;
//     const chargeBack = bookings.filter(b => b.status === "CHARGEBACK").length;

//     // ===== TODAY (IST) =====
//     const todayBookings = bookings.filter(
//       b => toISTDate(b.createdAt).toISOString().startsWith(todayIST)
//     ).length;

//     const todayEnquiry = enquiries.filter(
//       e => toISTDate(e.createdAt).toISOString().startsWith(todayIST)
//     ).length;

//     const commissionToday = bookings
//       .filter(
//         b =>
//           b.status === "AMENDMENT" &&
//           toISTDate(b.createdAt).toISOString().startsWith(todayIST)
//       )
//       .reduce((sum, b) => sum + (Number(b.profit) || 0), 0);

//     // ===== RESPONSE =====
//     res.json({
//       totalBookings,
//       revenue,           // Amount
//       commission,        // Amendment
//       mco,               // MCO
//       authLoss,

//       fresh,
//       airlineFollowUp,
//       sendToTicketing,
//       ticketedCharged,
//       cancelled,
//       chargeBack,

//       todayBookings,

//       totalEnquiry: enquiries.length,
//       todayEnquiry,

//       usersAvailable: await User.countDocuments({ role: "agent" }),

//       commissionToday,   // Amendment Today
//       discountToday: 0,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Dashboard data error" });
//   }
// };


export const getDashboardStats = async (req, res) => {
  try {
    const { from, to } = req.query;

    // Build date match stage
    const dateMatch = {};
    if (from || to) {
      dateMatch.createdAt = {};
      if (from) dateMatch.createdAt.$gte = new Date(from);
      if (to) dateMatch.createdAt.$lte = new Date(to);
    }

    // =======================
    //  BOOKINGS AGGREGATION
    // =======================
    const bookingStats = await Booking.aggregate([
      { $match: dateMatch },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          revenue: { $sum: "$sellingPrice" },
          
          // Amendment Benefit (only AMENDMENT status)
          commission: {
            $sum: {
              $cond: [
                { $eq: ["$status", "AMENDMENT"] },
                { $max: ["$profit", 0] }, // prevent negative
                0
              ]
            }
          },
          
          // MCO / Void Benefit (only VOID status)
          mco: {
            $sum: {
              $cond: [
                { $eq: ["$status", "VOID"] },
                { $max: ["$profit", 0] },
                0
              ]
            }
          },
          
          // Count loss-related bookings (for display count, not amount)
          authLossCount: {
            $sum: {
              $cond: [
                { $in: ["$status", ["REFUND", "CHARGEBACK" /* , "AUTH_FORM_LOSS" if exists */ ]] },
                1,
                0
              ]
            }
          },
          
          // Status counts
          fresh: { $sum: { $cond: [{ $eq: ["$status", "FRESH"] }, 1, 0] } },
          airlineFollowUp: { $sum: { $cond: [{ $eq: ["$status", "FOLLOW_UP"] }, 1, 0] } },
          sendToTicketing: { $sum: { $cond: [{ $eq: ["$status", "SEND_TO_TICKETING"] }, 1, 0] } },
          ticketedCharged: { $sum: { $cond: [{ $eq: ["$status", "TICKETING"] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ["$status", "CANCELLED"] }, 1, 0] } },
          chargeBack: { $sum: { $cond: [{ $eq: ["$status", "CHARGEBACK"] }, 1, 0] } },
        }
      },
      {
        $project: {
          _id: 0,
          totalBookings: { $ifNull: ["$totalBookings", 0] },
          revenue: { $ifNull: ["$revenue", 0] },
          commission: { $ifNull: ["$commission", 0] },
          mco: { $ifNull: ["$mco", 0] },
          authLoss: { $ifNull: ["$authLossCount", 0] },
          fresh: 1,
          airlineFollowUp: 1,
          sendToTicketing: 1,
          ticketedCharged: 1,
          cancelled: 1,
          chargeBack: 1,
        }
      }
    ]);

    const stats = bookingStats[0] || {
      totalBookings: 0,
      revenue: 0,
      commission: 0,
      mco: 0,
      authLoss: 0,
      fresh: 0,
      airlineFollowUp: 0,
      sendToTicketing: 0,
      ticketedCharged: 0,
      cancelled: 0,
      chargeBack: 0,
    };

    // =======================
    //  TODAY STATS (IST)
    // =======================
    const { start: todayStart, end: todayEnd } = getTodayISTBounds();

    const todayBookingStats = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd }
        }
      },
      {
        $group: {
          _id: null,
          todayBookings: { $sum: 1 },
          commissionToday: {
            $sum: {
              $cond: [
                { $eq: ["$status", "AMENDMENT"] },
                "$profit",
                0
              ]
            }
          }
        }
      }
    ]);

    const todayStats = todayBookingStats[0] || { todayBookings: 0, commissionToday: 0 };

    // =======================
    //  ENQUIRIES + USERS
    // =======================
    const totalEnquiry = await Enquiry.countDocuments(dateMatch);
    
    const todayEnquiry = await Enquiry.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    const usersAvailable = await User.countDocuments({ role: "agent" });

    // =======================
    //  FINAL RESPONSE
    // =======================
    res.status(200).json({
      ...stats,
      ...todayStats,
      totalEnquiry,
      todayEnquiry,
      usersAvailable,
      discountToday: 0, // placeholder - implement if you track discounts
      // lossAmount: 0,   // if you later want sum of negative profits
    });

  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ 
      message: "Failed to fetch dashboard statistics",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};
