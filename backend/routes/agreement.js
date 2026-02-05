

// // server/routes/agreement.js
// import express from 'express';
// import { Resend } from 'resend';

// const router = express.Router();
// const resend = new Resend(process.env.RESEND_API_KEY);

// // Simple GET endpoint for direct link clicks
// router.get('/submit', async (req, res) => {
//   try {
//     const { email, booking, name } = req.query;
    
//     console.log('Agreement link clicked:', { email, booking, name });
    
//     // Validate parameters
//     if (!email || !booking) {
//       return res.send(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <style>
//             body { 
//               font-family: Arial, sans-serif; 
//               text-align: center; 
//               padding: 50px; 
//               background: #fef3c7;
//             }
//             .error { 
//               color: #dc2626; 
//               font-size: 24px;
//               margin-bottom: 20px;
//             }
//             .info {
//               background: white;
//               padding: 20px;
//               border-radius: 10px;
//               max-width: 500px;
//               margin: 0 auto;
//               box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//             }
//           </style>
//         </head>
//         <body>
//           <div class="info">
//             <div class="error">❌ Missing Information</div>
//             <p>Please contact support with your booking reference.</p>
//             <p>Or reply to the original email with "I AGREE"</p>
//             <a href="mailto:besttripmakers@gmail.com" style="color: #3b82f6;">Contact Support</a>
//           </div>
//         </body>
//         </html>
//       `);
//     }
    
//     // Get IP from request
//     const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
//                       req.headers['x-real-ip'] || 
//                       req.ip || 
//                       'Unknown';
    
//     const customerName = name || email.split('@')[0];
//     const timestamp = new Date().toLocaleString();
    
//     console.log('Processing agreement:', { email, booking, ipAddress });
    
//     // 1. Send notification to YOU (besttripmakers@gmail.com)
//     try {
//       await resend.emails.send({
//         from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer <besttripmakers@gmail.com>',
//         to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
//         subject: `✅ Customer Agreement - ${booking}`,
//         html: `
//           <!DOCTYPE html>
//           <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: #10b981; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
//               .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
//               .details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h2>🎉 Customer Agreement Received</h2>
//                 <p>Via Quick Agreement Button</p>
//               </div>
//               <div class="content">
//                 <div class="details">
//                   <h3>Customer Details</h3>
//                   <p><strong>Name:</strong> ${customerName}</p>
//                   <p><strong>Email:</strong> ${email}</p>
//                   <p><strong>Booking Reference:</strong> ${booking}</p>
//                   <p><strong>IP Address:</strong> ${ipAddress}</p>
//                   <p><strong>Time:</strong> ${timestamp}</p>
//                 </div>
//                 <div style="background: #d1fae5; padding: 15px; border-radius: 5px;">
//                   <h4 style="color: #065f46; margin-top: 0;">✅ ACTION REQUIRED</h4>
//                   <p>Customer has agreed to proceed with booking changes.</p>
//                   <p>Please update the booking status in your system.</p>
//                 </div>
//               </div>
//             </div>
//           </body>
//           </html>
//         `,
//         text: `
// CUSTOMER AGREEMENT - ${booking}
// ==============================

// Customer Name: ${customerName}
// Customer Email: ${email}
// Booking Reference: ${booking}
// IP Address: ${ipAddress}
// Time: ${timestamp}
// Method: Button Click

// ACTION: Customer has agreed. Please proceed with booking changes.
//         `
//       });
//       console.log('✅ Notification sent to admin');
//     } catch (emailError) {
//       console.error('Failed to send admin notification:', emailError);
//     }
    
//     // 2. Send confirmation to customer
//     try {
//       await resend.emails.send({
//         from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer Support <besttripmakers@gmail.com>',
//         to: email,
//         subject: `✅ Agreement Confirmed - ${booking}`,
//         html: `
//           <!DOCTYPE html>
//           <html>
//           <body style="font-family: Arial, sans-serif;">
//             <div style="max-width: 600px; margin: 0 auto; padding: 30px;">
//               <div style="text-align: center; padding: 20px; background: #10b981; color: white; border-radius: 10px;">
//                 <h2 style="margin: 0;">✅ Agreement Confirmed</h2>
//               </div>
              
//               <div style="padding: 30px;">
//                 <p>Dear ${customerName},</p>
//                 <p>Thank you for your response. We have received your agreement and will now proceed with your request.</p>
                
//                 <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
//                   <p><strong>Booking Reference:</strong> ${booking}</p>
//                   <p><strong>Confirmation Time:</strong> ${timestamp}</p>
//                 </div>
                
//                 <p>Our team will process this request and send you a completion confirmation shortly.</p>
                
//                 <div style="margin-top: 30px; padding: 15px; background: #eff6ff; border-radius: 5px;">
//                   <p style="color: #1e40af; margin: 0;">
//                     <strong>🔒 Security Note:</strong> For your protection, this confirmation was recorded for verification purposes.
//                   </p>
//                 </div>
                
//                 <p style="margin-top: 30px;">
//                   Best regards,<br>
//                   <strong style="color: #10b981;">FareBuzzer Support Team</strong>
//                 </p>
//               </div>
//             </div>
//           </body>
//           </html>
//         `
//       });
//       console.log('✅ Confirmation sent to customer:', email);
//     } catch (customerEmailError) {
//       console.error('Failed to send customer confirmation:', customerEmailError);
//     }
    
//     // Show success page
//     res.send(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <style>
//           body { 
//             font-family: Arial, sans-serif; 
//             text-align: center; 
//             padding: 20px; 
//             background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
//             min-height: 100vh;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
//           .container {
//             background: white;
//             padding: 40px;
//             border-radius: 20px;
//             box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//             max-width: 500px;
//             width: 100%;
//           }
//           .success { 
//             color: #10b981; 
//             font-size: 28px;
//             margin-bottom: 20px;
//           }
//           .icon {
//             font-size: 60px;
//             margin-bottom: 20px;
//           }
//           .details {
//             background: #f8fafc;
//             padding: 20px;
//             border-radius: 10px;
//             margin: 20px 0;
//             text-align: left;
//           }
//           .note {
//             background: #fef3c7;
//             padding: 15px;
//             border-radius: 10px;
//             margin: 20px 0;
//             font-size: 14px;
//             color: #92400e;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="icon">✅</div>
//           <div class="success">Agreement Submitted Successfully!</div>
          
//           <div class="details">
//             <p><strong>Customer:</strong> ${customerName}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Booking Reference:</strong> ${booking}</p>
//             <p><strong>Confirmation Time:</strong> ${timestamp}</p>
//           </div>
          
//           <div class="note">
//             ✅ Your agreement has been recorded<br>
//             ✅ Email confirmation has been sent<br>
//             ✅ Our team has been notified
//           </div>
          
//           <p style="color: #64748b;">You can safely close this window.</p>
          
//           <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
//             <p style="font-size: 12px; color: #9ca3af;">
//               Need help? Contact support@farebuzzertravel.com
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `);
    
//   } catch (error) {
//     console.error('❌ Agreement processing error:', error);
    
//     res.send(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { 
//             font-family: Arial, sans-serif; 
//             text-align: center; 
//             padding: 50px; 
//             background: #fee2e2;
//           }
//           .error { 
//             color: #dc2626; 
//             font-size: 24px;
//             margin-bottom: 20px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="error">❌ Error Processing Agreement</div>
//         <p>Please reply to the original email with "I AGREE"</p>
//         <p>Or contact: besttripmakers@gmail.com</p>
//       </body>
//       </html>
//     `);
//   }
// });

// // POST endpoint for API calls (if needed)
// router.post('/submit-agreement', async (req, res) => {
//   try {
//     const { email, booking, name, ipAddress } = req.body;
    
//     // Same logic as GET endpoint...
//     // [Copy the email sending logic from above]
    
//     res.json({ success: true, message: 'Agreement submitted' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// export default router;

//=========5 feb========




// // server/routes/agreement.js
// import express from "express";
// import { Resend } from "resend";

// const router = express.Router();
// const resend = new Resend(process.env.RESEND_API_KEY);

// /**
//  * Helper: Get real client IP
//  */
// const getClientIP = (req) => {
//   const xff = req.headers["x-forwarded-for"];
//   if (xff) return xff.split(",")[0].trim();
//   return req.socket?.remoteAddress || req.ip || "Unknown";
// };

// /**
//  * ============================
//  * GET — Agreement via Email Link
//  * ============================
//  */
// router.get("/submit", async (req, res) => {
//   try {



//     // 🔍 TEMP DEBUG — REMOVE AFTER TESTING
//     console.log("RAW IP DEBUG:", {
//       reqIp: req.ip,
//       xff: req.headers["x-forwarded-for"],
//       remote: req.socket?.remoteAddress,
//     });


//     const { email, booking, name } = req.query;

//     if (!email || !booking) {
//       return res.status(400).send(`
//         <html>
//           <body style="font-family:Arial;text-align:center;padding:50px;background:#fef3c7;">
//             <h2 style="color:#dc2626;">❌ Missing Information</h2>
//             <p>Please contact support with your booking reference.</p>
//             <a href="mailto:besttripmakers@gmail.com">Contact Support</a>
//           </body>
//         </html>
//       `);
//     }

//     const safeEmail = String(email).toLowerCase().trim();
//     const customerName = name?.trim() || safeEmail.split("@")[0];
//     const ipAddress = getClientIP(req);
//     const timestamp = new Date().toLocaleString();

//     console.log("✅ Agreement clicked:", {
//       email: safeEmail,
//       booking,
//       ipAddress,
//     });

//     /* ============================
//        1. Notify Admin
//     ============================ */
//     await resend.emails.send({
//       from:
//         process.env.RESEND_FROM_EMAIL ||
//         "FareBuzzer <besttripmakers@gmail.com>",
//       to: process.env.ADMIN_EMAIL || "besttripmakers@gmail.com",
//       subject: `✅ Customer Agreement - ${booking}`,
//       html: `
//         <h2>Customer Agreement Received</h2>
//         <p><strong>Name:</strong> ${customerName}</p>
//         <p><strong>Email:</strong> ${safeEmail}</p>
//         <p><strong>Booking:</strong> ${booking}</p>
//         <p><strong>IP:</strong> ${ipAddress}</p>
//         <p><strong>Time:</strong> ${timestamp}</p>
//       `,
//     });

//     /* ============================
//        2. Confirm to Customer
//     ============================ */
//     await resend.emails.send({
//       from:
//         process.env.RESEND_FROM_EMAIL ||
//         "FareBuzzer Support <besttripmakers@gmail.com>",
//       to: safeEmail,
//       subject: `Agreement Confirmed - ${booking}`,
//       html: `
//         <p>Dear ${customerName},</p>
//         <p>Your agreement has been successfully recorded.</p>
//         <p><strong>Booking:</strong> ${booking}</p>
//         <p><strong>Time:</strong> ${timestamp}</p>
//         <p>— FareBuzzer Support</p>
//       `,
//     });

//     /* ============================
//        3. Success Page
//     ============================ */
//     return res.send(`
//       <html>
//         <body style="font-family:Arial;text-align:center;padding:40px;background:#ecfeff;">
//           <h1 style="color:#10b981;">✅ Agreement Submitted</h1>
//           <p><strong>Booking:</strong> ${booking}</p>
//           <p><strong>Email:</strong> ${safeEmail}</p>
//           <p><strong>Time:</strong> ${timestamp}</p>
//           <p>You can safely close this window.</p>
//         </body>
//       </html>
//     `);
//   } catch (error) {
//     console.error("❌ Agreement Error:", error);
//     return res.status(500).send(`
//       <html>
//         <body style="font-family:Arial;text-align:center;padding:50px;background:#fee2e2;">
//           <h2 style="color:#dc2626;">❌ Error Processing Agreement</h2>
//           <p>Please reply to the original email with "I AGREE"</p>
//         </body>
//       </html>
//     `);
//   }
// });

// export default router;


import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

/* =========================
   TRUST PROXY (IMPORTANT)
========================= */
router.use((req, res, next) => {
  req.app.set("trust proxy", true);
  next();
});

/* =========================
   EMAIL SETUP (GMAIL)
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/* =========================
   HELPER: GET REAL IP
========================= */
const getClientIP = (req) => {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return xff.split(",")[0].trim();
  return req.ip || req.socket.remoteAddress || "Unknown";
};

/* =========================
   GET — Agreement Link
========================= */
router.get("/submit", async (req, res) => {
  try {
    const { email, booking, name } = req.query;

    if (!email || !booking) {
      return res.status(400).send("Missing booking or email");
    }

    const ipAddress = getClientIP(req);
    // const time = new Date().toLocaleString();

   const time = new Date().toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  dateStyle: 'full',
  timeStyle: 'long'
});
    const customerName = name || email.split("@")[0];

    console.log("AGREEMENT ACCEPTED:", {
      email,
      booking,
      ipAddress,
    });

    /* =========================
       SEND EMAIL TO ADMIN
    ========================= */
    await transporter.sendMail({
      from: `"FareBuzzer" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Agreement Accepted - ${booking}`,
      html: `
        <h2>Customer Accepted Agreement</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Booking:</strong> ${booking}</p>
        <p><strong>IP Address:</strong> ${ipAddress}</p>
        <p><strong>Time:</strong> ${time}</p>
      `,
    });

    /* =========================
       SUCCESS PAGE
    ========================= */
    return res.send(`
      <html>
        <body style="font-family:Arial;text-align:center;padding:40px">
          <h1 style="color:green">✅ Agreement Submitted</h1>
          <p><strong>Booking:</strong> ${booking}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p>You can safely close this window.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("AGREEMENT ERROR:", err);
    return res.status(500).send("Failed to process agreement");
  }
});

export default router;
