
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email error:", error.message);
  } else {
    console.log("✅ Email server ready");
  }
});

export default transporter;

