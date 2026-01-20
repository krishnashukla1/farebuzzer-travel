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

// 📊 SALES SUMMARY (TOP CARDS)   THIS IS CORRECT BECAUSE AMENDMENT IS ADDING IN NET PROFIT
// export const salesReport = async (req, res) => {
//   try {
//     const result = await Booking.aggregate([
//       {
//         $group: {
//           _id: null,

//           totalBookings: { $sum: 1 },

//           // Gross Amount
//           revenue: { $sum: "$sellingPrice" },

//           // Amendment Benefit
//           commission: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$status", "AMENDMENT"] },
//                 "$profit",
//                 0,
//               ],
//             },
//           },

//           // Net Profit / MCO (VOID + AMENDMENT)
//           mco: {
//             $sum: {
//               $cond: [
//                 { $in: ["$status", ["VOID", "AMENDMENT"]] },
//                 "$profit",
//                 0,
//               ],
//             },
//           },
//         },
//       },
//     ]);

//     const data = result[0] || {
//       totalBookings: 0,
//       revenue: 0,
//       commission: 0,
//       mco: 0,
//     };

//     res.json(data);
//   } catch (err) {
//     console.error("Sales report error:", err);
//     res.status(500).json({ message: "Failed to fetch sales report" });
//   }
// };




//===IN THIS CODE AMENDMENT MINUS FROM IN NET PROFIT FOR MATCHING DASHBOARD

export const salesReport = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: null,

          totalBookings: { $sum: 1 },

          // Gross Amount
          totalAmount: { $sum: "$sellingPrice" },

          // Amendment Benefit
          amendmentBenefit: {
            $sum: {
              $cond: [
                { $eq: ["$status", "AMENDMENT"] },
                "$profit",
                0,
              ],
            },
          },

          // MCO / Net Profit (VOID ONLY)
          netProfit: {
            $sum: {
              $cond: [
                { $eq: ["$status", "VOID"] },
                "$profit",
                0,
              ],
            },
          },
        },
      },
    ]);

    res.json(
      result[0] || {
        totalBookings: 0,
        totalAmount: 0,
        amendmentBenefit: 0,
        netProfit: 0,
      }
    );
  } catch (err) {
    console.error("Sales report error:", err);
    res.status(500).json({ message: "Failed to fetch sales report" });
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
      { $sort: { count: -1 } },
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch booking status report" });
  }
};

// 📆 MONTHLY AMOUNT (CHART)
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
    res.status(500).json({ message: "Failed to fetch monthly report" });
  }
};


export const airlineReport = async (req, res) => {
  try {
    const report = await Booking.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $or: [{ $eq: ["$airline", null] }, { $eq: ["$airline", ""] }] },
              "Unknown",
              "$airline",
            ],
          },

          totalBookings: { $sum: 1 },

          totalAmount: { $sum: "$sellingPrice" },

          amendment: {
            $sum: {
              $cond: [
                { $eq: ["$status", "AMENDMENT"] },
                "$profit",
                0,
              ],
            },
          },

          mco: {
            $sum: {
              $cond: [
                { $eq: ["$status", "VOID"] },
                "$profit",
                0,
              ],
            },
          },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    res.json(report);
  } catch (err) {
    console.error("Airline report error:", err);
    res.status(500).json({ message: "Failed to fetch airline report" });
  }
};
