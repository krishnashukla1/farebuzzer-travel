
// import Booking from "../models/Booking.js";

// /**
//  * GET /api/bookings?page=1&limit=10
//  */
// // export const getBookings = async (req, res) => {
// //   try {
// //     const page = Number(req.query.page) || 1;
// //     const limit = Number(req.query.limit) || 10;
// //     const skip = (page - 1) * limit;

// //     const total = await Booking.countDocuments();

// //     const bookings = await Booking.find()
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(limit);

// //     res.json({
// //       data: bookings,
// //       pagination: {
// //         page,
// //         totalPages: Math.ceil(total / limit),
// //         total,
// //       },
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: "Failed to fetch bookings" });
// //   }
// // };



// /**
//  * GET /api/bookings?page=1&limit=10&customerName=abc&pnr=XYZ&status=FRESH&from=&to=       //with serching functinality
//  */
// export const getBookings = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const query = {};

//     // Search filters
//     if (req.query.customerName) {
//       query.customerName = { $regex: req.query.customerName, $options: "i" }; // case-insensitive partial match
//     }

//     if (req.query.pnr) {
//       query.pnr = { $regex: req.query.pnr, $options: "i" }; // partial, case-insensitive
//     }

//     if (req.query.status) {
//       query.status = req.query.status;
//     }

//     if (req.query.from && req.query.to) {
//       query.createdAt = {
//         $gte: new Date(req.query.from),
//         $lte: new Date(req.query.to),
//       };
//     }

//     const total = await Booking.countDocuments(query);

//     const bookings = await Booking.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       data: bookings,
//       pagination: {
//         page,
//         totalPages: Math.ceil(total / limit),
//         total,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// };




// /**
//  * POST /api/bookings
//  */
// export const createBooking = async (req, res) => {
//   try {
//     const booking = await Booking.create(req.body);
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to create booking" });
//   }
// };

// /**
//  * PUT /api/bookings/:id/status
//  */
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json(booking);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update status" });
//   }
// };

// /**
//  * DELETE /api/bookings/:id
//  */
// export const deleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.json({ message: "Booking deleted" });
//   } catch (err) {
//     res.status(400).json({ message: "Failed to delete booking" });
//   }
// };

//=================================================================



// import Booking from "../models/Booking.js";

// /**
//  * GET /api/bookings
//  */
// export const getBookings = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const query = {};

//     if (req.query.customerName) {
//       query.customerName = { $regex: req.query.customerName, $options: "i" };
//     }

//     if (req.query.pnr) {
//       query.pnr = { $regex: req.query.pnr, $options: "i" };
//     }

//     if (req.query.status) {
//       query.status = req.query.status;
//     }

//     if (req.query.from && req.query.to) {
//       query.createdAt = {
//         $gte: new Date(req.query.from),
//         $lte: new Date(req.query.to),
//       };
//     }

//     const total = await Booking.countDocuments(query);

//     const bookings = await Booking.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       data: bookings,
//       pagination: {
//         page,
//         totalPages: Math.ceil(total / limit),
//         total,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// };

// /**
//  * POST /api/bookings
//  */
// export const createBooking = async (req, res) => {
//   try {
//     const booking = new Booking(req.body);
//     await booking.save(); // ✅ auto salesProfit

//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to create booking" });
//   }
// };

// /**
//  * PUT /api/bookings/:id/status
//  */
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.status = req.body.status;
//     await booking.save();

//     res.json(booking);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update status" });
//   }
// };

// /**
//  * DELETE /api/bookings/:id
//  */
// export const deleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json({ message: "Booking deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ message: "Failed to delete booking" });
//   }
// };

//=====================
import Booking from "../models/Booking.js";

/**
 * GET /api/bookings
 */
export const getBookings = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // Text search (case-insensitive)
    if (req.query.customerName) {
      query.customerName = { $regex: req.query.customerName.trim(), $options: "i" };
    }
    if (req.query.pnr) {
      query.pnr = { $regex: req.query.pnr.trim(), $options: "i" };
    }
    if (req.query.airline) {                    // ← bonus: added airline search
      query.airline = { $regex: req.query.airline.trim(), $options: "i" };
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    // Date range (expects ISO strings from frontend)
    if (req.query.from || req.query.to) {
      query.createdAt = {};
      if (req.query.from) query.createdAt.$gte = new Date(req.query.from);
      if (req.query.to)   query.createdAt.$lte = new Date(req.query.to);
    }

    const total = await Booking.countDocuments(query);

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      // .populate("customerId", "name email")   // ← uncomment if you need user info
      .lean();   // faster if you don't need mongoose documents

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

/**
 * POST /api/bookings
 */
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Optional: return populated version
    const populated = await Booking.findById(booking._id)
      // .populate("customerId", "name email")
      .lean();

    res.status(201).json({
      success: true,
      data: populated || booking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create booking",
      error: err.message,
    });
  }
};

/**
 * PUT /api/bookings/:id/status
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Optional: validate status
    const validStatuses = [
      "FRESH", "FOLLOW_UP", "TICKETING", "TICKETED",
      "CANCELLED", "CHARGEBACK", "AUTH_FORM_LOSS"
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update status",
      error: err.message,
    });
  }
};

/**
 * DELETE /api/bookings/:id
 */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete booking",
      error: err.message,
    });
  }
};
