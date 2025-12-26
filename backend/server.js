// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import enquiryRoutes from "./routes/enquiryRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import userRoutes from "./routes/userRoutes.js";


// import financeRoutes from "./routes/financeRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";

// import emailRoutes  from "./routes/emailRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/enquiries", enquiryRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/users", userRoutes);


// app.use("/api/finance", financeRoutes);
// app.use("/api/projects", projectRoutes);

// app.use("/api/email", emailRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

//========================dynamic port===============

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/email", emailRoutes);

// ✅ Proper PORT handling
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
