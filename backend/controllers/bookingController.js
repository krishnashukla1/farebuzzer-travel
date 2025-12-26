
import Booking from "../models/Booking.js";

/**
 * GET /api/bookings?page=1&limit=10
 */
// export const getBookings = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const total = await Booking.countDocuments();

//     const bookings = await Booking.find()
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



/**
 * GET /api/bookings?page=1&limit=10&customerName=abc&pnr=XYZ&status=FRESH&from=&to=       //with serching functinality
 */
export const getBookings = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // Search filters
    if (req.query.customerName) {
      query.customerName = { $regex: req.query.customerName, $options: "i" }; // case-insensitive partial match
    }

    if (req.query.pnr) {
      query.pnr = { $regex: req.query.pnr, $options: "i" }; // partial, case-insensitive
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.from && req.query.to) {
      query.createdAt = {
        $gte: new Date(req.query.from),
        $lte: new Date(req.query.to),
      };
    }

    const total = await Booking.countDocuments(query);

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: bookings,
      pagination: {
        page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};




/**
 * POST /api/bookings
 */
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: "Failed to create booking" });
  }
};

/**
 * PUT /api/bookings/:id/status
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: "Failed to update status" });
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
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete booking" });
  }
};
