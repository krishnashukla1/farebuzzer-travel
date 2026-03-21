
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD
//   }
// });

// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ Email error:", error.message);
//   } else {
//     console.log("✅ Email server ready");
//   }
// });

// export default transporter;





import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // 🔥 VERY IMPORTANT (SSL)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000
});

// ✅ VERIFY CONNECTION
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email error:", error);
  } else {
    console.log("✅ Email server ready");
  }
});

export default transporter;