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

import dotenv from "dotenv";
dotenv.config();
// Quick check – helps you see immediately if .env loaded
console.log("PAYPAL_CLIENT_ID loaded?", !!process.env.PAYPAL_CLIENT_ID);
console.log("First 10 chars:", process.env.PAYPAL_CLIENT_ID?.slice(0, 10) || "missing");
console.log("PAYPAL_MODE:", process.env.PAYPAL_MODE || "not set");



import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
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
// import attendanceRoutes from "./routes/attendanceRoutes.js";

import attendanceRoutes from './routes/attendanceRoutes.js'
import loginHourRoutes from './routes/loginHour.js'
import weeklyOffRoutes from './routes/weeklyOffRoutes.js'
import leaveRoutes from './routes/leaveRoutes.js'


import flightStatusRoutes from "./routes/flightStatusRoutes.js";
import "./services/emailCron.js";


import agreementRoutes from './routes/agreement.js';
import emailWebhookRoutes from './routes/emailWebhook.js';
import emailReplyRoutes from './routes/emailReply.js';

import paymentRoutes from "./routes/paymentRoutes.js";


// dotenv.config();

// Connect DB
connectDB();

const app = express();

app.set("trust proxy", true);

// Middlewares
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.options("*", cors());


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       const allowedOrigins = [
//         "http://localhost:5173",
//         "https://farebuzzertravel.com"
//       ];

//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );



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


app.use("/api/attendance", attendanceRoutes);
app.use("/api/login-hours", loginHourRoutes);
app.use("/api/weekly-off", weeklyOffRoutes);
app.use("/api/leaves", leaveRoutes);

app.use("/api", flightStatusRoutes);



app.use('/api/agreement', agreementRoutes);
// app.use('/api/webhook', emailWebhookRoutes);
// app.use('/api/email', emailReplyRoutes);


app.use("/api/payment", paymentRoutes);





// ✅ Proper PORT handling
const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
