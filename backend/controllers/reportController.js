import Booking from "../models/Booking.js";

// 📊 SALES / REVENUE REPORT
export const salesReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    const match = {};
    if (from && to) {
      match.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to)
      };
    }

    const result = await Booking.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$amount" },
          totalCommission: { $sum: "$commission" },
          totalMCO: { $sum: "$mco" }
        }
      }
    ]);

    res.json(
      result[0] || {
        totalBookings: 0,
        totalRevenue: 0,
        totalCommission: 0,
        totalMCO: 0
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Failed to generate sales report" });
  }
};

// 📈 BOOKINGS BY STATUS
export const bookingStatusReport = async (req, res) => {
  try {
    const report = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch status report" });
  }
};

// 📆 MONTHLY REVENUE (FOR CHARTS)
export const monthlyRevenueReport = async (req, res) => {
  try {
    const report = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch monthly report" });
  }
};
