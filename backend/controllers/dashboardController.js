
//==========correct==========

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


export const getDashboardStats = async (req, res) => {
  try {
    const { from, to } = req.query;

    const dateFilter = {};
    if (from && to) {
      dateFilter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to)
      };
    }

    const bookings = await Booking.find(dateFilter);
    const enquiries = await Enquiry.find(dateFilter);

    // const today = new Date().toISOString().split("T")[0];
       const todayIST = getTodayISTString();

    res.json({
      // ===== BOOKINGS =====
      totalBookings: bookings.length,
      revenue: bookings.reduce((sum, b) => sum + (b.amount || 0), 0),
      commission: bookings.reduce((sum, b) => sum + (b.commission || 0), 0),
      mco: bookings.reduce((sum, b) => sum + (b.mco || 0), 0),

      authLoss: bookings.filter(b => b.status === "CHARGEBACK").length,

      fresh: bookings.filter(b => b.status === "FRESH").length,
      airlineFollowUp: bookings.filter(b => b.status === "FOLLOW_UP").length,
      sendToTicketing: bookings.filter(b => b.status === "TICKETING").length,
      ticketedCharged: bookings.filter(b => b.status === "TICKETED").length,
      cancelled: bookings.filter(b => b.status === "CANCELLED").length,
      chargeBack: bookings.filter(b => b.status === "CHARGEBACK").length,

      todayBookings: bookings.filter(
        // b => b.createdAt.toISOString().startsWith(today)
         b => toISTDate(b.createdAt).toISOString().startsWith(todayIST)  //IST
      ).length,

      // ===== ENQUIRIES =====
      totalEnquiry: enquiries.length,
      todayEnquiry: enquiries.filter(
        // e => e.createdAt.toISOString().startsWith(today)
          e => toISTDate(e.createdAt).toISOString().startsWith(todayIST)   //IST
      ).length,

      // ===== USERS =====
      usersAvailable: await User.countDocuments({ role: "agent" }),

      // ===== OPTIONAL =====
      commissionToday: bookings
        // .filter(b => b.createdAt.toISOString().startsWith(today))
          .filter(b => toISTDate(b.createdAt).toISOString().startsWith(todayIST))   //IST
        .reduce((sum, b) => sum + (b.commission || 0), 0),

      discountToday: 0
    });

  } catch (err) {
    res.status(500).json({ message: "Dashboard data error" });
  }
};



//========


// import Booking from "../models/Booking.js";
// import Enquiry from "../models/Enquiry.js";
// import User from "../models/User.js";

// // IST = UTC + 5 hours 30 minutes
// const IST_OFFSET = 5.5 * 60 * 60 * 1000;

// // Convert any date to IST Date object
// const toISTDate = (date) => new Date(date.getTime() + IST_OFFSET);

// // Get today's IST start and end in UTC (for DB queries)
// const getISTTodayRange = () => {
//   const now = new Date();
//   const istNow = toISTDate(now);

//   // IST start and end of today
//   const istTodayStart = new Date(
//     istNow.getFullYear(),
//     istNow.getMonth(),
//     istNow.getDate(),
//     0, 0, 0, 0
//   );
//   const istTodayEnd = new Date(
//     istNow.getFullYear(),
//     istNow.getMonth(),
//     istNow.getDate(),
//     23, 59, 59, 999
//   );

//   // Convert back to UTC for MongoDB queries
//   const utcStart = new Date(istTodayStart.getTime() - IST_OFFSET);
//   const utcEnd = new Date(istTodayEnd.getTime() - IST_OFFSET);

//   return { utcStart, utcEnd };
// };

// export const getDashboardStats = async (req, res) => {
//   try {
//     const { from, to } = req.query;

//     // ===== Date filter =====
//     const dateFilter = {};
//     if (from && to) {
//       // MongoDB dates are UTC
//       const fromDate = new Date(from);
//       const toDate = new Date(to);
//       toDate.setHours(23, 59, 59, 999); // include entire to-day
//       dateFilter.createdAt = { $gte: fromDate, $lte: toDate };
//     }

//     // Fetch bookings & enquiries
//     const bookings = await Booking.find(dateFilter);
//     const enquiries = await Enquiry.find(dateFilter);

//     // ===== Today range in IST =====
//     const { utcStart, utcEnd } = getISTTodayRange();

//     const todayBookings = bookings.filter(
//       b => b.createdAt >= utcStart && b.createdAt <= utcEnd
//     ).length;

//     const todayEnquiry = enquiries.filter(
//       e => e.createdAt >= utcStart && e.createdAt <= utcEnd
//     ).length;

//     const commissionToday = bookings
//       .filter(b => b.createdAt >= utcStart && b.createdAt <= utcEnd)
//       .reduce((sum, b) => sum + (b.commission || 0), 0);

//     // ===== Response =====
//     res.json({
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
//       todayBookings,
//       totalEnquiry: enquiries.length,
//       todayEnquiry,
//       usersAvailable: await User.countDocuments({ role: "agent" }),
//       commissionToday,
//       discountToday: 0,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Dashboard data error" });
//   }
// };

