// import Booking from "../models/Booking.js";

// // 📊 SALES / REVENUE REPORT
// export const salesReport = async (req, res) => {
//   try {
//     const { from, to } = req.query;

//     const match = {};
//     if (from && to) {
//       match.createdAt = {
//         $gte: new Date(from),
//         $lte: new Date(to)
//       };
//     }

//     const result = await Booking.aggregate([
//       { $match: match },
//       {
//         $group: {
//           _id: null,
//           totalBookings: { $sum: 1 },
//           totalRevenue: { $sum: "$amount" },
//           totalCommission: { $sum: "$commission" },
//           totalMCO: { $sum: "$mco" }
//         }
//       }
//     ]);

//     res.json(
//       result[0] || {
//         totalBookings: 0,
//         totalRevenue: 0,
//         totalCommission: 0,
//         totalMCO: 0
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ message: "Failed to generate sales report" });
//   }
// };

// // 📈 BOOKINGS BY STATUS
// export const bookingStatusReport = async (req, res) => {
//   try {
//     const report = await Booking.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json(report);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch status report" });
//   }
// };

// // 📆 MONTHLY REVENUE (FOR CHARTS)
// export const monthlyRevenueReport = async (req, res) => {
//   try {
//     const report = await Booking.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           revenue: { $sum: "$amount" }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     res.json(report);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch monthly report" });
//   }
// };

//====================20 jan===============


import Booking from "../models/Booking.js";

import Booking from "../models/Booking.js";

export const salesReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    const match = {};
    if (from && to) {
      match.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const bookings = await Booking.find(match);

    const totalBookings = bookings.length;

    // Amount = Selling Price (ALL)
    const totalAmount = bookings.reduce(
      (sum, b) => sum + (Number(b.sellingPrice) || 0),
      0
    );

    // Amendment = profit where status = AMENDMENT
    const amendmentBenefit = bookings.reduce(
      (sum, b) =>
        b.status === "AMENDMENT" ? sum + (Number(b.profit) || 0) : sum,
      0
    );

    // MCO = profit where status = VOID
    const totalMCO = bookings.reduce(
      (sum, b) =>
        b.status === "VOID" ? sum + (Number(b.profit) || 0) : sum,
      0
    );

    // Net Profit (optional future use)
    const netProfit = bookings.reduce(
      (sum, b) => sum + (Number(b.profit) || 0),
      0
    );

    res.json({
      totalBookings,
      totalAmount,
      amendmentBenefit,
      totalMCO,
      netProfit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sales report error" });
  }
};



// 📈 BOOKINGS BY STATUS
export const bookingStatusReport = async (req, res) => {
  try {
    const report = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(report);
  } catch {
    res.status(500).json({ message: "Status report failed" });
  }
};


// 📆 MONTHLY REPORT (Charts)
// export const monthlyRevenueReport = async (req, res) => {
//   try {
//     const report = await Booking.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           amount: { $sum: "$sellingPrice" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     res.json(report);
//   } catch {
//     res.status(500).json({ message: "Monthly report failed" });
//   }
// };

export const monthlyRevenueReport = async (req, res) => {
  try {
    const report = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          amount: { $sum: "$sellingPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Monthly report error" });
  }
};



