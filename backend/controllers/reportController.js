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

    const [result] = await Booking.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalAmount: { $sum: "$sellingPrice" },
          amendmentBenefit: {
            $sum: {
              $cond: [{ $eq: ["$status", "AMENDMENT"] }, "$profit", 0],
            },
          },
          netProfit: { $sum: "$profit" },
        },
      },
    ]);

    res.json(
      result || {
        totalBookings: 0,
        totalAmount: 0,
        amendmentBenefit: 0,
        netProfit: 0,
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Report failed" });
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
  } catch {
    res.status(500).json({ message: "Monthly report failed" });
  }
};


