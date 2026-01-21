
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


// export const getDashboardStats = async (req, res) => {
//   try {
//     const { from, to } = req.query;

//     /* ================= DATE FILTER ================= */
//     const dateFilter = {};
//     if (from && to) {
//       dateFilter.createdAt = {
//         $gte: new Date(from),
//         $lte: new Date(to),
//       };
//     }

//     /* ================= FETCH DATA ================= */
//     const bookings = await Booking.find(dateFilter).lean();
//     const enquiries = await Enquiry.find(dateFilter).lean();

//     const todayIST = getTodayISTString();

//     /* ================= BASIC COUNTS ================= */
//     const totalBookings = bookings.length;

//     /* ================= REVENUE ================= */
//     const revenue = bookings.reduce(
//       (sum, b) => sum + (Number(b.sellingPrice) || 0),
//       0
//     );

//     /* ================= PROFIT HELPERS ================= */
//     const calculateProfit = (b) => {
//       const sp = Number(b.sellingPrice) || 0;
//       const cp = Number(b.costPrice) || 0;
//       const oe = Number(b.otherExpense) || 0;
//       const cb = Number(b.cbFees) || 0;
//       return sp - cp - oe - cb;
//     };

//     /* ================= AMENDMENT PROFIT ================= */
//     const amendmentProfit = bookings.reduce((sum, b) => {
//       if (b.status === "AMENDMENT") {
//         return sum + calculateProfit(b);
//       }
//       return sum;
//     }, 0);

//     /* ================= TOTAL PROFIT (MCO) ================= */
//     const totalProfit = bookings.reduce((sum, b) => {
//       if (["VOID", "AMENDMENT"].includes(b.status)) {
//         return sum + calculateProfit(b);
//       }
//       return sum;
//     }, 0);

//     /* ================= LOSS BOOKINGS ================= */
//     const authLoss = bookings.filter(b =>
//       ["REFUND", "LOSS", "CHARGEBACK"].includes(b.status)
//     ).length;

//     /* ================= STATUS COUNTS ================= */
//     const fresh = bookings.filter(b => b.status === "FRESH").length;
//     const airlineFollowUp = bookings.filter(b => b.status === "FOLLOW_UP").length;
//     const sendToTicketing = bookings.filter(b => b.status === "SEND_TO_TICKETING").length;
//     const ticketedCharged = bookings.filter(b => b.status === "TICKETING").length;
//     const cancelled = bookings.filter(b => b.status === "CANCELLED").length;
//     const chargeBack = bookings.filter(b => b.status === "CHARGEBACK").length;

//     /* ================= TODAY (IST) ================= */
//     const todayBookings = bookings.filter(
//       b => toISTDate(b.createdAt).toISOString().startsWith(todayIST)
//     ).length;

//     const todayEnquiry = enquiries.filter(
//       e => toISTDate(e.createdAt).toISOString().startsWith(todayIST)
//     ).length;

//     /* ================= TODAY AMENDMENT PROFIT ================= */
//     const amendmentProfitToday = bookings.reduce((sum, b) => {
//       if (
//         b.status === "AMENDMENT" &&
//         toISTDate(b.createdAt).toISOString().startsWith(todayIST)
//       ) {
//         return sum + calculateProfit(b);
//       }
//       return sum;
//     }, 0);

//     /* ================= DEBUG LOGS ================= */
//     console.log("===== DASHBOARD DEBUG =====");
//     console.log("Total Bookings:", totalBookings);
//     console.log("Revenue:", revenue);
//     console.log("Amendment Profit:", amendmentProfit);
//     console.log("Total Profit (VOID + AMENDMENT):", totalProfit);
//     console.log("Refund/Loss Count:", authLoss);
//     console.log("===========================");

//     /* ================= RESPONSE ================= */
//     res.json({
//       totalBookings,
//       revenue,

//       amendmentProfit,     // ✅ Only AMENDMENT profit
//       totalProfit,         // ✅ VOID + AMENDMENT (THIS IS MCO)

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

//       amendmentProfitToday,
//       discountToday: 0,
//     });

//   } catch (err) {
//     console.error("Dashboard Error:", err);
//     res.status(500).json({ message: "Dashboard data error" });
//   }
// };



export const getDashboardStats = async (req, res) => {
  try {
    const { from, to } = req.query;

    /* ================= DATE FILTER ================= */
    const dateFilter = {};
    if (from && to) {
      dateFilter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    /* ================= FETCH DATA ================= */
    const bookings = await Booking.find(dateFilter).lean();
    const enquiries = await Enquiry.find(dateFilter).lean();

    const todayIST = getTodayISTString();

    /* ================= BASIC COUNTS ================= */
    const totalBookings = bookings.length;

    /* ================= REVENUE ================= */
    const revenue = bookings.reduce(
      (sum, b) => sum + (Number(b.sellingPrice) || 0),
      0
    );

    /* ================= COST ================= */
    const totalCost = bookings.reduce(
      (sum, b) => sum + (Number(b.costPrice) || 0),
      0
    );

    /* ================= EXPENSES ================= */
    const totalExpenses = bookings.reduce(
      (sum, b) => sum + (Number(b.otherExpense) || 0) + (Number(b.cbFees) || 0),
      0
    );

    /* ================= PROFIT HELPERS ================= */
    const calculateProfit = (b) => {
      const sp = Number(b.sellingPrice) || 0;
      const cp = Number(b.costPrice) || 0;
      const oe = Number(b.otherExpense) || 0;
      const cb = Number(b.cbFees) || 0;
      
      if (b.status === "REFUND") {
        // For refunds, profit is negative (loss)
        return -(sp - cp - oe - cb);
      }
      return sp - cp - oe - cb;
    };

    /* ================= TOTAL PROFIT (MCO) ================= */
    // Calculate profit for ALL bookings, not just VOID/AMENDMENT
    const totalProfit = bookings.reduce((sum, b) => {
      return sum + calculateProfit(b);
    }, 0);

    /* ================= AMENDMENT PROFIT ================= */
    const amendmentProfit = bookings.reduce((sum, b) => {
      if (b.status === "AMENDMENT") {
        return sum + calculateProfit(b);
      }
      return sum;
    }, 0);

    /* ================= PROFIT BY STATUS ================= */
    const profitByStatus = {
      FRESH: 0,
      FOLLOW_UP: 0,
      TICKETING: 0,
      SEND_TO_TICKETING: 0,
      AMENDMENT: 0,
      VOID: 0,
      CANCELLED: 0,
      REFUND: 0,
      CHARGEBACK: 0
    };

    bookings.forEach(b => {
      profitByStatus[b.status] = (profitByStatus[b.status] || 0) + calculateProfit(b);
    });

    /* ================= LOSS BOOKINGS ================= */
    const authLoss = bookings.filter(b =>
      ["REFUND", "LOSS", "CHARGEBACK"].includes(b.status)
    ).length;

    /* ================= STATUS COUNTS ================= */
    const fresh = bookings.filter(b => b.status === "FRESH").length;
    const airlineFollowUp = bookings.filter(b => b.status === "FOLLOW_UP").length;
    const sendToTicketing = bookings.filter(b => b.status === "SEND_TO_TICKETING").length;
    const ticketedCharged = bookings.filter(b => b.status === "TICKETING").length;
    const cancelled = bookings.filter(b => b.status === "CANCELLED").length;
    const chargeBack = bookings.filter(b => b.status === "CHARGEBACK").length;

    /* ================= TODAY (IST) ================= */
    const todayBookings = bookings.filter(
      b => toISTDate(b.createdAt).toISOString().startsWith(todayIST)
    ).length;

    const todayEnquiry = enquiries.filter(
      e => toISTDate(e.createdAt).toISOString().startsWith(todayIST)
    ).length;

    /* ================= TODAY PROFITS ================= */
    const profitToday = bookings.reduce((sum, b) => {
      if (toISTDate(b.createdAt).toISOString().startsWith(todayIST)) {
        return sum + calculateProfit(b);
      }
      return sum;
    }, 0);

    const amendmentProfitToday = bookings.reduce((sum, b) => {
      if (
        b.status === "AMENDMENT" &&
        toISTDate(b.createdAt).toISOString().startsWith(todayIST)
      ) {
        return sum + calculateProfit(b);
      }
      return sum;
    }, 0);

    /* ================= DEBUG LOGS ================= */
    console.log("===== DASHBOARD DEBUG =====");
    console.log("Total Bookings:", totalBookings);
    console.log("Revenue:", revenue);
    console.log("Total Cost:", totalCost);
    console.log("Total Expenses:", totalExpenses);
    console.log("Amendment Profit:", amendmentProfit);
    console.log("Total Profit (ALL):", totalProfit);
    
    // Show profit breakdown
    console.log("Profit Breakdown by Status:");
    Object.entries(profitByStatus).forEach(([status, profit]) => {
      if (profit !== 0) {
        console.log(`  ${status}: $${profit}`);
      }
    });
    
    console.log("===========================");

    /* ================= RESPONSE ================= */
    res.json({
      // Basic stats
      totalBookings,
      revenue,
      totalCost,
      totalExpenses,
      
      // Profit calculations
      amendmentProfit,     // Only AMENDMENT profit
      totalProfit,         // Total profit from ALL bookings (this is MCO)
      mco: totalProfit,    // Alias for frontend compatibility
      profit: totalProfit, // Another alias
      
      // Profit breakdown
      profitByStatus,
      
      // Loss stats
      authLoss,
      
      // Status counts
      fresh,
      airlineFollowUp,
      sendToTicketing,
      ticketedCharged,
      cancelled,
      chargeBack,
      
      // Today stats
      todayBookings,
      profitToday,
      
      // Enquiry stats
      totalEnquiry: enquiries.length,
      todayEnquiry,
      
      // User stats
      usersAvailable: await User.countDocuments({ role: "agent" }),
      
      // Today specific
      amendmentProfitToday,
      commissionToday: amendmentProfitToday, // For frontend compatibility
      discountToday: 0,
      
      // Additional calculations for frontend
      grossProfit: revenue - totalCost,
      netProfit: totalProfit,
      avgProfitPerBooking: totalBookings > 0 ? (totalProfit / totalBookings).toFixed(2) : 0
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard data error" });
  }
};