
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



import { Resend } from "resend";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Send Email Function (with attachments support)
export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = []
}) => {
  try {
    // 🔥 Convert attachments (file path → buffer)
    const formattedAttachments = attachments.map((file) => {
      return {
        filename: file.filename,
        content: fs.readFileSync(file.path) // required for Resend
      };
    });

    // ✅ Send Email via Resend
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // 🔥 change later to your domain
      to,
      subject,
      html,
      attachments: formattedAttachments
    });

    console.log("✅ Email sent via Resend:", response);

    return response;
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

export default resend;