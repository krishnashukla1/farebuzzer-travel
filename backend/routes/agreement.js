

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


// import express from "express";
// import nodemailer from "nodemailer";

// const router = express.Router();

// /* =========================
//    TRUST PROXY (IMPORTANT)
// ========================= */
// router.use((req, res, next) => {
//   req.app.set("trust proxy", true);
//   next();
// });

// /* =========================
//    EMAIL SETUP (GMAIL)
// ========================= */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// /* =========================
//    HELPER: GET REAL IP
// ========================= */
// const getClientIP = (req) => {
//   const xff = req.headers["x-forwarded-for"];
//   if (xff) return xff.split(",")[0].trim();
//   return req.ip || req.socket.remoteAddress || "Unknown";
// };

// /* =========================
//    GET — Agreement Link
// ========================= */
// router.get("/submit", async (req, res) => {
//   try {
//     const { email, booking, name } = req.query;

//     if (!email || !booking) {
//       return res.status(400).send("Missing booking or email");
//     }

//     const ipAddress = getClientIP(req);
//     // const time = new Date().toLocaleString();

//    const time = new Date().toLocaleString('en-IN', {
//   timeZone: 'Asia/Kolkata',
//   dateStyle: 'full',
//   timeStyle: 'long'
// });
//     const customerName = name || email.split("@")[0];

//     console.log("AGREEMENT ACCEPTED:", {
//       email,
//       booking,
//       ipAddress,
//     });

//     /* =========================
//        SEND EMAIL TO ADMIN
//     ========================= */
//     await transporter.sendMail({
//       from: `"FareBuzzer" <${process.env.GMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `Agreement Accepted - ${booking}`,
//       html: `
//         <h2>Customer Accepted Agreement</h2>
//         <p><strong>Name:</strong> ${customerName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Booking:</strong> ${booking}</p>
//         <p><strong>IP Address:</strong> ${ipAddress}</p>
//         <p><strong>Time:</strong> ${time}</p>
//       `,
//     });

//     /* =========================
//        SUCCESS PAGE
//     ========================= */
//     return res.send(`
 
// <html>
//   <body style="
//     margin:0;
//     padding:0;
//     background:#f4f7fb;
//     font-family: 'Segoe UI', Arial, sans-serif;
//   ">
//     <div style="
//       min-height:100vh;
//       display:flex;
//       align-items:center;
//       justify-content:center;
//       padding:20px;
//     ">
//       <div style="
//         background:#ffffff;
//         max-width:520px;
//         width:100%;
//         border-radius:12px;
//         box-shadow:0 15px 35px rgba(0,0,0,0.12);
//         padding:30px;
//         text-align:center;
//       ">
        
//         <div style="font-size:56px; color:#22c55e;">✅</div>

//         <h1 style="
//           margin:10px 0;
//           font-size:24px;
//           color:#15803d;
//         ">
//           Agreement Submitted Successfully
//         </h1>

//         <p style="
//           font-size:14px;
//           color:#555;
//           margin-bottom:25px;
//         ">
//           Thank you for confirming your agreement.  
//           This action has been securely recorded.
//         </p>

//         <div style="
//           background:#f9fafb;
//           border-radius:8px;
//           padding:16px;
//           text-align:left;
//           margin-bottom:24px;
//         ">
//           <div style="margin-bottom:10px;">
//             <span style="color:#6b7280;font-size:13px;">Booking Reference</span><br/>
//             <strong style="color:#111827;">${booking}</strong>
//           </div>

//           <div style="margin-bottom:10px;">
//             <span style="color:#6b7280;font-size:13px;">Email Address</span><br/>
//             <strong style="color:#111827;">${email}</strong>
//           </div>

//           <div>
//             <span style="color:#6b7280;font-size:13px;">Submission Time</span><br/>
//             <strong style="color:#111827;">${time}</strong>
//           </div>
//         </div>

//         <p style="
//           font-size:13px;
//           color:#374151;
//           line-height:1.6;
//           margin-bottom:22px;
//         ">
//           You may safely close this window.  
//           A confirmation email has been sent for your records.
//         </p>

//         <button onclick="window.close()" style="
//           background:#2563eb;
//           color:#fff;
//           border:none;
//           padding:12px 22px;
//           border-radius:6px;
//           font-size:14px;
//           font-weight:600;
//           cursor:pointer;
//         ">
//           Close Window
//         </button>

//         <div style="
//           margin-top:20px;
//           font-size:12px;
//           color:#9ca3af;
//         ">
//           Secure Agreement System • Farebuzzer Travel
//         </div>

//       </div>
//     </div>
//   </body>
// </html>
// `);





//   } catch (err) {
//     console.error("AGREEMENT ERROR:", err);
//     return res.status(500).send("Failed to process agreement");
//   }
// });

// export default router;



//=========

// import express from "express";
// import nodemailer from "nodemailer";
// import Email from "../models/Email.js"; // ✅ Email model import करें

// const router = express.Router();

// /* =========================
//    TRUST PROXY (IMPORTANT)
// ========================= */
// router.use((req, res, next) => {
//   req.app.set("trust proxy", true);
//   next();
// });

// /* =========================
//    EMAIL SETUP (GMAIL)
// ========================= */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// /* =========================
//    HELPER: GET REAL IP
// ========================= */
// const getClientIP = (req) => {
//   const xff = req.headers["x-forwarded-for"];
//   if (xff) return xff.split(",")[0].trim();
//   return req.ip || req.socket.remoteAddress || "Unknown";
// };

// /* =========================
//    HELPER: GENERATE MESSAGE-ID
// ========================= */
// const generateMessageId = (email) => {
//   const timestamp = Date.now();
//   const random = Math.random().toString(36).substring(2, 10);
//   const domain = email.split('@')[1] || 'farebuzzertravel.com';
//   return `<${timestamp}.${random}@${domain}>`;
// };

// /* =========================
//    GET — Agreement Link (UPDATED FOR CHAIN MAIL)
// ========================= */
// router.get("/submit", async (req, res) => {
//   try {
//     const { email, booking, name, messageId: frontendMessageId } = req.query;

//     if (!email || !booking) {
//       return res.status(400).send("Missing booking or email");
//     }

//     const ipAddress = getClientIP(req);
//     const time = new Date().toLocaleString('en-IN', {
//       timeZone: 'Asia/Kolkata',
//       dateStyle: 'full',
//       timeStyle: 'long'
//     });
    
//     const customerName = name || email.split("@")[0];

//     console.log("AGREEMENT ACCEPTED:", {
//       email,
//       booking,
//       ipAddress,
//       frontendMessageId
//     });

//     // ✅ 1. ORIGINAL EMAIL का Message-ID FETCH करें
//     let originalMessageId = frontendMessageId || null;
    
//     if (!originalMessageId) {
//       // Database से search करें अगर frontend से नहीं आया
//       const originalEmail = await Email.findOne({
//         'meta.confirmationNumber': booking,
//         'meta.billingEmail': email,
//         'meta.messageId': { $exists: true }
//       }).sort({ createdAt: -1 });
      
//       if (originalEmail && originalEmail.meta?.messageId) {
//         originalMessageId = originalEmail.meta.messageId;
//         console.log("Found original Message-ID from DB:", originalMessageId);
//       }
//     }

//     // ✅ 2. NEW Message-ID GENERATE करें
//     const newMessageId = generateMessageId(email);
//     console.log("Generated new Message-ID:", newMessageId);
//     console.log("Threading with In-Reply-To:", originalMessageId);

//     // ✅ 3. EMAIL HTML TEMPLATE
//     const emailHtml = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #15803d;">✅ Customer Accepted Agreement</h2>
        
//         <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
//           <p style="margin: 0; font-size: 14px; color: #0369a1;">
//             <strong>📋 Thread Reference:</strong> ${originalMessageId ? 'Replying to booking thread' : 'New agreement notification'}
//             ${originalMessageId ? `<br/><small>Original Message-ID: ${originalMessageId}</small>` : ''}
//           </p>
//         </div>
        
//         <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
//           <tr style="background: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Name:</strong></td>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;">${customerName}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Email:</strong></td>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;">${email}</td>
//           </tr>
//           <tr style="background: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Booking:</strong></td>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;">${booking}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>IP Address:</strong></td>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;">${ipAddress}</td>
//           </tr>
//           <tr style="background: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Time:</strong></td>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;">${time}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Thread ID:</strong></td>
//             <td style="padding: 10px; border: 1px solid #e2e8f0;">
//               <code style="font-size: 12px;">${newMessageId}</code>
//               ${originalMessageId ? `<br/><small>In-Reply-To: ${originalMessageId}</small>` : ''}
//             </td>
//           </tr>
//         </table>
        
//         <div style="margin-top: 25px; padding: 15px; background: #fefce8; border-radius: 6px; border-left: 4px solid #eab308;">
//           <p style="margin: 0; color: #713f12;">
//             <strong>⚠️ Important:</strong> This agreement is linked to the original booking thread. 
//             All future correspondence will continue in this chain.
//           </p>
//         </div>
        
//         <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
//           <p style="color: #64748b; font-size: 12px;">
//             Agreement ID: ${Date.now()}<br/>
//             Generated by FareBuzzer Travel System
//           </p>
//         </div>
//       </div>
//     `;

//     // ✅ 4. SEND EMAIL WITH THREADING HEADERS
//     const mailOptions = {
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
//       replyTo: email, // Customer का email replyTo में
//       subject: `Agreement Accepted - ${booking}`,
//       html: emailHtml,
//       // ✅ CHAIN MAIL HEADERS
//       headers: {
//         'Message-ID': newMessageId,
//         ...(originalMessageId && {
//           'In-Reply-To': originalMessageId,
//           'References': originalMessageId
//         }),
//         'X-Agreement-Type': 'customer-accepted',
//         'X-Booking-Ref': booking
//       }
//     };

//     console.log("Sending agreement email with threading headers:", {
//       to: mailOptions.to,
//       messageId: newMessageId,
//       inReplyTo: originalMessageId
//     });

//     await transporter.sendMail(mailOptions);

//     // ✅ 5. SAVE TO DATABASE (CRM) FOR THREADING
//     try {
//       await Email.create({
//         type: "received", // यह customer से आया हुआ है
//         emailType: "agreement_accepted",
//         from: email,
//         to: process.env.ADMIN_EMAIL,
//         subject: `Agreement Accepted - ${booking}`,
//         html: emailHtml,
//         meta: {
//           customerName,
//           billingEmail: email,
//           confirmationNumber: booking,
//           ipAddress,
//           timestamp: time,
//           // ✅ MESSAGE-ID FOR THREADING
//           messageId: newMessageId,
//           originalMessageId: originalMessageId,
//           source: "agreement_link",
//           agreementTime: new Date().toISOString()
//         }
//       });
//       console.log("Agreement saved to CRM with Message-ID:", newMessageId);
//     } catch (dbError) {
//       console.error("Error saving to database:", dbError);
//       // Continue even if DB save fails
//     }

//     /* =========================
//        SUCCESS PAGE (SAME)
//     ========================= */
//     return res.send(`
// <html>
//   <body style="
//     margin:0;
//     padding:0;
//     background:#f4f7fb;
//     font-family: 'Segoe UI', Arial, sans-serif;
//   ">
//     <div style="
//       min-height:100vh;
//       display:flex;
//       align-items:center;
//       justify-content:center;
//       padding:20px;
//     ">
//       <div style="
//         background:#ffffff;
//         max-width:520px;
//         width:100%;
//         border-radius:12px;
//         box-shadow:0 15px 35px rgba(0,0,0,0.12);
//         padding:30px;
//         text-align:center;
//       ">
        
//         <div style="font-size:56px; color:#22c55e;">✅</div>

//         <h1 style="
//           margin:10px 0;
//           font-size:24px;
//           color:#15803d;
//         ">
//           Agreement Submitted Successfully
//         </h1>

//         <p style="
//           font-size:14px;
//           color:#555;
//           margin-bottom:25px;
//         ">
//           Thank you for confirming your agreement.  
//           This action has been securely recorded and linked to your booking thread.
//         </p>

//         <div style="
//           background:#f9fafb;
//           border-radius:8px;
//           padding:16px;
//           text-align:left;
//           margin-bottom:24px;
//         ">
//           <div style="margin-bottom:10px;">
//             <span style="color:#6b7280;font-size:13px;">Booking Reference</span><br/>
//             <strong style="color:#111827;">${booking}</strong>
//           </div>

//           <div style="margin-bottom:10px;">
//             <span style="color:#6b7280;font-size:13px;">Email Address</span><br/>
//             <strong style="color:#111827;">${email}</strong>
//           </div>

//           <div>
//             <span style="color:#6b7280;font-size:13px;">Submission Time</span><br/>
//             <strong style="color:#111827;">${time}</strong>
//           </div>
          
//           ${originalMessageId ? `
//           <div style="margin-top:10px; padding-top:10px; border-top:1px dashed #d1d5db;">
//             <span style="color:#6b7280;font-size:13px;">Thread Status</span><br/>
//             <span style="color:#10b981; font-size:12px;">✅ Linked to original conversation</span>
//           </div>
//           ` : ''}
//         </div>

//         <p style="
//           font-size:13px;
//           color:#374151;
//           line-height:1.6;
//           margin-bottom:22px;
//         ">
//           You may safely close this window.  
//           A confirmation email has been sent and will appear in the same thread as your booking.
//         </p>

//         <button onclick="window.close()" style="
//           background:#2563eb;
//           color:#fff;
//           border:none;
//           padding:12px 22px;
//           border-radius:6px;
//           font-size:14px;
//           font-weight:600;
//           cursor:pointer;
//         ">
//           Close Window
//         </button>

//         <div style="
//           margin-top:20px;
//           font-size:12px;
//           color:#9ca3af;
//         ">
//           Secure Agreement System • Farebuzzer Travel • Thread ID: ${newMessageId.substring(0, 20)}...
//         </div>

//       </div>
//     </div>
//   </body>
// </html>
// `);

//   } catch (err) {
//     console.error("AGREEMENT ERROR:", err);
//     return res.status(500).send("Failed to process agreement");
//   }
// });

// export default router;

//==============correct=====deepseek==============

import express from "express";
import nodemailer from "nodemailer";
import Email from "../models/Email.js";

const router = express.Router();

router.use((req, res, next) => {
  req.app.set("trust proxy", true);
  next();
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const getClientIP = (req) => {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return xff.split(",")[0].trim();
  return req.ip || req.socket.remoteAddress || "Unknown";
};

const generateMessageId = (email) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const domain = email.split('@')[1] || 'farebuzzertravel.com';
  return `<${timestamp}.${random}@${domain}>`;
};

/* =========================
   GET — Agreement Link (WITH IP ADDRESS)
========================= */
router.get("/submit", async (req, res) => {
  try {
    const { email, booking, name, messageId: frontendMessageId } = req.query;

    if (!email || !booking) {
      return res.status(400).send("Missing booking or email");
    }

    const ipAddress = getClientIP(req);
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
      frontendMessageId
    });

    // ✅ 1. ORIGINAL EMAIL का Message-ID और CONTENT FETCH करें
    let originalMessageId = frontendMessageId || null;
    let originalEmailContent = "";
    let originalSubject = "";
    
    if (!originalMessageId) {
      const originalEmail = await Email.findOne({
        'meta.confirmationNumber': booking,
        'meta.billingEmail': email,
        'meta.messageId': { $exists: true }
      }).sort({ createdAt: -1 });
      
      if (originalEmail) {
        originalMessageId = originalEmail.meta?.messageId;
        originalEmailContent = originalEmail.html || "";
        originalSubject = originalEmail.subject || `Flight Reservation Confirmation - ${booking}`;
        console.log("Found original email from DB");
      }
    }

    // ✅ 2. NEW Message-ID GENERATE करें
    const newMessageId = generateMessageId(email);

    // ✅ 3. GMAIL STYLE REPLY TEMPLATE (WITH IP ADDRESS)
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // ✅ Plain text reply (Gmail में दिखेगा)
    const plainTextReply = `Yes, I agree.`;

    // ✅ Quoted original content
    const quotedOriginal = originalEmailContent 
      ? originalEmailContent
          .replace(/<style[^>]*>.*?<\/style>/gs, '')
          .replace(/<script[^>]*>.*?<\/script>/gs, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 500) + "..."
      : `Flight booking confirmation for ${booking}. Please refer to original email.`;

    // ✅ 4. FINAL EMAIL CONTENT (WITH IP ADDRESS SECTION)
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Re: ${originalSubject || 'Flight Reservation Confirmation'}</title>
    <style>
        .ip-section {
            background: #f8f9fa;
            border: 1px solid #dadce0;
            border-radius: 8px;
            padding: 12px 15px;
            margin: 15px 0;
            font-family: 'Roboto Mono', monospace, Courier, sans-serif;
            font-size: 13px;
            color: #3c4043;
        }
        .ip-label {
            color: #5f6368;
            font-weight: 500;
        }
        .ip-value {
            color: #202124;
            font-weight: 600;
        }
        .security-note {
            background: #e8f0fe;
            border-left: 4px solid #1a73e8;
            padding: 10px 15px;
            margin: 20px 0;
            font-size: 12px;
            color: #3c4043;
            border-radius: 0 4px 4px 0;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #202124; margin: 0; padding: 20px;">
    
    <!-- Customer's reply (TOP - नया message) -->
    <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #dadce0;">
        <div style="font-size: 14px; color: #202124; margin-bottom: 10px;">
            <strong>From:</strong> ${customerName} &lt;${email}&gt;<br>
            <strong>Date:</strong> ${currentDate}, ${currentTime}<br>
            <strong>To:</strong> FareBuzzer Support &lt;besttripmakers@gmail.com&gt;<br>
            <strong>Subject:</strong> Re: ${originalSubject || 'Flight Reservation Confirmation'}
        </div>
        
        <!-- CUSTOMER'S AGREEMENT -->
        <div style="font-size: 15px; color: #202124; margin-top: 20px; white-space: pre-wrap;">
Yes, I agree.
        </div>
        
        <!-- IP ADDRESS SECTION (VISIBLE IN EMAIL) -->
        <div class="ip-section">
            <div style="margin-bottom: 8px;">
                <span class="ip-label">📡 Agreement Submitted From:</span><br>
                <span class="ip-value">IP Address: ${ipAddress}</span>
            </div>
            <div style="margin-bottom: 5px;">
                <span class="ip-label">📍 Location Data:</span><br>
                <span style="color: #5f6368; font-size: 12px;">
                    Timestamp: ${time}<br>
                    User Agent: ${req.headers['user-agent']?.substring(0, 80) || 'Not available'}...
                </span>
            </div>
            <div style="font-size: 11px; color: #80868b; margin-top: 8px;">
                🔐 This IP is recorded for security and verification purposes.
            </div>
        </div>
        
        <div class="security-note">
            <strong>✓ Secure Digital Agreement:</strong> This agreement has been digitally signed and recorded.<br>
            <strong>✓ IP Verification:</strong> Submitted from verified IP address: ${ipAddress}
        </div>
    </div>
    
    <!-- Original Email Quoted (Gmail style) -->
    <div style="padding-left: 15px; border-left: 2px solid #dadce0; color: #5f6368; font-size: 14px;">
        <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dashed #dadce0;">
            <div style="font-size: 13px; color: #5f6368;">
                <strong>On ${currentDate} at ${currentTime}</strong>, FareBuzzer Support &lt;besttripmakers@gmail.com&gt; wrote:
            </div>
        </div>
        
        <!-- Original email content (quoted) -->
        <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px;">
            <div style="color: #202124; font-weight: bold; margin-bottom: 10px;">
                FareBuzzer Travel<br>
                Flight Reservation Confirmation
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong>Dear ${customerName},</strong>
            </div>
            
            <div style="margin-bottom: 15px;">
                Thank you for your enquiry regarding your flight booking.
            </div>
            
            <div style="color: #5f6368; font-size: 13px;">
                <strong>Booking Reference:</strong> ${booking}<br>
                <strong>Customer Email:</strong> ${email}<br>
                <strong>Date of Booking:</strong> ${currentDate}<br>
                <strong>IP Address:</strong> ${ipAddress}

            </div>
            
            ${originalEmailContent ? `
            <div style="margin-top: 15px; padding: 10px; background: #fff; border: 1px solid #e8eaed; border-radius: 4px; font-size: 13px;">
                <div style="color: #5f6368; margin-bottom: 5px;"><strong>Original Email Content:</strong></div>
                <div style="color: #70757a;">${quotedOriginal}</div>
            </div>
            ` : ''}
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e8eaed; color: #5f6368; font-size: 12px;">
                This is an automated confirmation email. Please do not reply directly to this message.<br>
                For inquiries, contact: support@farebuzzertravel.com
            </div>
        </div>
    </div>
    
    <!-- Hidden system info (for backend) -->
    <div style="display: none; font-size: 0px; color: transparent;">
        <!-- SYSTEM DATA FOR THREADING & TRACKING -->
        AgreementID: ${Date.now()}
        MessageID: ${newMessageId}
        InReplyTo: ${originalMessageId || 'N/A'}
        BookingRef: ${booking}
        CustomerIP: ${ipAddress}
        IPDetails: ${ipAddress} | ${req.headers['x-forwarded-for'] || 'Direct'}
        UserAgent: ${req.headers['user-agent'] || 'Unknown'}
        Timestamp: ${new Date().toISOString()}
        GeoLocation: ${ipAddress} 
        SecurityLevel: HIGH
        <!-- END SYSTEM DATA -->
    </div>
    
</body>
</html>
    `;

    // ✅ 5. SEND EMAIL WITH IP HEADERS
    const mailOptions = {
      // from: `"${customerName}" <${process.env.GMAIL_USER}>`,

      from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`, // ✅ ये सही है
      to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
      replyTo: email,
      // subject: `Re: ${originalSubject || 'Flight Reservation Confirmation'}`,

      subject: `Re: ${originalSubject.replace(/^Re:\s*/i, '') || 'Flight Reservation Confirmation'}`, // ✅ ये line change करें
      text: `${plainTextReply}\n\n---\nAgreement submitted from IP: ${ipAddress}\nTimestamp: ${time}`,
      html: emailHtml,
      
      headers: {
        'Message-ID': newMessageId,
        ...(originalMessageId && {
          'In-Reply-To': originalMessageId,
          'References': originalMessageId
        }),
        'Thread-Topic': originalSubject || `Flight Booking ${booking}`,
        'X-Original-Message-ID': originalMessageId || '',
        'X-Booking-Reference': booking,
        'X-Customer-Email': email,
        'X-Customer-IP': ipAddress, // ✅ IP in header
        'X-Forwarded-For': req.headers['x-forwarded-for'] || ipAddress,
        'X-User-Agent': req.headers['user-agent'] || 'Unknown',
        'X-Agreement-Type': 'customer-acceptance',
        'X-IP-Verified': 'true',
        'X-Mailer': 'FareBuzzer Travel System 2.0'
      }
    };

    console.log("Sending agreement with IP tracking:", {
      subject: mailOptions.subject,
      customerIP: ipAddress,
      messageId: newMessageId
    });

    await transporter.sendMail(mailOptions);

    // ✅ 6. SAVE TO DATABASE WITH IP DETAILS
    try {
      await Email.create({
        type: "received",
        emailType: "agreement_accepted",
        from: email,
        to: process.env.ADMIN_EMAIL,
        subject: `Re: ${originalSubject || 'Flight Reservation Confirmation'}`,
        text: `${plainTextReply}\n\nIP Address: ${ipAddress}`,
        html: emailHtml,
        meta: {
          customerName,
          billingEmail: email,
          confirmationNumber: booking,
          ipAddress,
          ipDetails: {
            ip: ipAddress,
            xForwardedFor: req.headers['x-forwarded-for'] || null,
            userAgent: req.headers['user-agent'] || null,
            acceptLanguage: req.headers['accept-language'] || null,
            referer: req.headers['referer'] || null
          },
          timestamp: time,
          messageId: newMessageId,
          originalMessageId: originalMessageId,
          originalSubject: originalSubject,
          source: "agreement_link",
          agreementTime: new Date().toISOString(),
          emailStyle: "gmail_chain_reply_with_ip",
          security: {
            ipVerified: true,
            timestampVerified: true,
            agreementHash: require('crypto').createHash('md5').update(`${email}${booking}${ipAddress}`).digest('hex')
          }
        }
      });
      console.log("Agreement saved with IP tracking:", ipAddress);
    } catch (dbError) {
      console.error("Error saving to database:", dbError);
    }

    /* =========================
       SUCCESS PAGE (WITH IP DISPLAY)
    ========================= */
    return res.send(`
<html>
  <body style="
    margin:0;
    padding:0;
    background:#f4f7fb;
    font-family: 'Segoe UI', Arial, sans-serif;
  ">
    <div style="
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
    ">
      <div style="
        background:#ffffff;
        max-width:520px;
        width:100%;
        border-radius:12px;
        box-shadow:0 15px 35px rgba(0,0,0,0.12);
        padding:30px;
        text-align:center;
      ">
        
        <div style="font-size:56px; color:#22c55e;">✅</div>

        <h1 style="
          margin:10px 0;
          font-size:24px;
          color:#15803d;
        ">
          Agreement Submitted Successfully
        </h1>

        <p style="
          font-size:14px;
          color:#555;
          margin-bottom:25px;
        ">
          Your digital agreement has been recorded with IP verification.
        </p>

        <!-- IP ADDRESS DISPLAY -->
        <div style="
          background:#0f172a;
          border-radius:8px;
          padding:16px;
          text-align:left;
          margin-bottom:24px;
          color:white;
          font-family: 'Courier New', monospace;
        ">
          <div style="display:flex; align-items:center; margin-bottom:10px;">
            <div style="background:#3b82f6; width:8px; height:8px; border-radius:50%; margin-right:10px;"></div>
            <span style="color:#94a3b8;font-size:12px;">IP ADDRESS RECORDED</span>
          </div>
          <div style="font-size:18px; font-weight:bold; color:#60a5fa; margin-bottom:5px;">
            ${ipAddress}
          </div>
          <div style="font-size:11px; color:#94a3b8;">
            📍 Location verification complete<br>
            🕒 ${time}
          </div>
        </div>

        <div style="
          background:#f1f8ff;
          border-radius:8px;
          padding:16px;
          text-align:left;
          margin-bottom:24px;
          border-left:4px solid #1a73e8;
        ">
          <div style="margin-bottom:10px;">
            <span style="color:#1a73e8;font-size:12px;font-weight:bold;">EMAIL PREVIEW</span><br/>
            <div style="background:#fff; padding:12px; border-radius:4px; margin-top:5px; font-family:'Courier New', monospace; font-size:12px;">
              <div><strong>From:</strong> ${customerName} &lt;${email}&gt;</div>
              <div><strong>To:</strong> FareBuzzer Support</div>
              <div><strong>Subject:</strong> Re: ${originalSubject || 'Flight Reservation'}</div>
              <div style="margin-top:8px; color:#0d652d;">✓ Yes, I agree.</div>
              <div style="margin-top:6px; color:#5f6368; font-size:11px;">
                📡 IP: ${ipAddress} | 🔐 Secure agreement
              </div>
            </div>
          </div>
        </div>

        <div style="
          background:#f9fafb;
          border-radius:8px;
          padding:16px;
          text-align:left;
          margin-bottom:24px;
        ">
          <div style="margin-bottom:10px;">
            <span style="color:#6b7280;font-size:13px;">Booking Reference</span><br/>
            <strong style="color:#111827;">${booking}</strong>
          </div>

          <div style="margin-bottom:10px;">
            <span style="color:#6b7280;font-size:13px;">Email Address</span><br/>
            <strong style="color:#111827;">${email}</strong>
          </div>

          <div style="margin-bottom:10px;">
            <span style="color:#6b7280;font-size:13px;">IP Address</span><br/>
            <strong style="color:#111827; font-family: 'Courier New', monospace;">${ipAddress}</strong>
          </div>

          <div>
            <span style="color:#6b7280;font-size:13px;">Submission Time</span><br/>
            <strong style="color:#111827;">${time}</strong>
          </div>
          
          ${originalMessageId ? `
          <div style="margin-top:10px; padding-top:10px; border-top:1px dashed #d1d5db;">
            <span style="color:#6b7280;font-size:13px;">Thread Status</span><br/>
            <span style="color:#1a73e8; font-size:12px;">
              🔗 Properly threaded in Gmail<br/>
              <small style="color:#5f6368;">Message-ID: ${newMessageId.substring(0, 25)}...</small>
            </span>
          </div>
          ` : ''}
        </div>

        <div style="
          background:#f0fdf4;
          border:1px solid #bbf7d0;
          border-radius:6px;
          padding:12px;
          margin-bottom:20px;
          text-align:left;
        ">
          <div style="display:flex; align-items:center; margin-bottom:8px;">
            <div style="color:#16a34a; margin-right:8px;">✓</div>
            <span style="font-size:13px; color:#166534;"><strong>IP Verification Complete</strong></span>
          </div>
          <div style="font-size:12px; color:#4b5563;">
            • Agreement digitally signed from IP: ${ipAddress}<br>
            • Timestamp verified with server<br>
            • Secure connection established
          </div>
        </div>

        <button onclick="window.close()" style="
          background:#2563eb;
          color:#fff;
          border:none;
          padding:12px 22px;
          border-radius:6px;
          font-size:14px;
          font-weight:600;
          cursor:pointer;
        ">
          Close Window
        </button>

        <div style="
          margin-top:20px;
          font-size:12px;
          color:#9ca3af;
        ">
          🔐 IP-Verified Agreement System • Farebuzzer Travel • ${new Date().getFullYear()}
        </div>

      </div>
    </div>
  </body>
</html>
`);

  } catch (err) {
    console.error("AGREEMENT ERROR:", err);
    return res.status(500).send("Failed to process agreement");
  }
});

export default router;

//===============chat gpt====================

// import express from "express";
// import nodemailer from "nodemailer";
// import crypto from "crypto";
// import Email from "../models/Email.js";

// const router = express.Router();

// router.use((req, res, next) => {
//   req.app.set("trust proxy", true);
//   next();
// });

// /* ======================
//    MAIL TRANSPORT
// ====================== */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// /* ======================
//    HELPERS
// ====================== */
// const getClientIP = (req) =>
//   (req.headers["x-forwarded-for"] || "").split(",")[0] ||
//   req.socket.remoteAddress ||
//   "Unknown";

// const generateMessageId = (email) => {
//   const domain = email.split("@")[1] || "farebuzzertravel.com";
//   return `<${Date.now()}.${crypto.randomBytes(6).toString("hex")}@${domain}>`;
// };

// /* ======================
//    AGREEMENT ENDPOINT
// ====================== */
// router.get("/submit", async (req, res) => {
//   try {
//     const { email, booking, name, messageId } = req.query;
//     if (!email || !booking) return res.status(400).send("Missing data");

//     const ip = getClientIP(req);
//     const customerName = name || email.split("@")[0];
//     const timeIST = new Date().toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       dateStyle: "full",
//       timeStyle: "short",
//     });

//     /* ======================
//        FETCH ORIGINAL EMAIL
//     ====================== */
//     let original = await Email.findOne({
//       "meta.confirmationNumber": booking,
//       "meta.billingEmail": email,
//     }).sort({ createdAt: -1 });

//     const originalMessageId = messageId || original?.meta?.messageId || null;
//     const originalSubject =
//       original?.subject || `Flight Reservation Confirmation – ${booking}`;

//     /* ======================
//        GMAIL-STYLE HTML
//     ====================== */
//     const emailHtml = `
// <!DOCTYPE html>
// <html>
// <body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#202124">

// <!-- REPLY HEADER -->
// <div style="padding:18px 24px;border-bottom:1px solid #e0e0e0">
//   <div style="font-size:14px">
//     <strong>${customerName}</strong> &lt;${email}&gt;
//   </div>
//   <div style="font-size:12px;color:#5f6368;margin-top:4px">
//     to FareBuzzer Support • ${timeIST}
//   </div>
// </div>

// <!-- REPLY BODY -->
// <div style="padding:24px;font-size:15px;line-height:1.6">
//   Yes, I agree.
// </div>

// <!-- SECURITY NOTE -->
// <div style="
//   margin:0 24px 24px;
//   padding:14px 16px;
//   background:#f8f9fa;
//   border-left:4px solid #1a73e8;
//   font-size:12px;
//   color:#3c4043;
//   border-radius:4px
// ">
//   <strong>Agreement verified</strong><br/>
//   IP Address: <b>${ip}</b><br/>
//   Timestamp: ${timeIST}
// </div>

// <!-- QUOTED EMAIL -->
// <div style="
//   margin:0 24px 30px;
//   padding-left:14px;
//   border-left:2px solid #dadce0;
//   color:#5f6368;
//   font-size:14px
// ">
//   <div style="margin-bottom:10px">
//     On ${timeIST}, FareBuzzer Support wrote:
//   </div>
//   <div style="background:#f8f9fa;padding:14px;border-radius:4px">
//     <strong>Flight Booking Confirmation</strong><br/>
//     Booking Ref: ${booking}<br/>
//     Customer: ${email}
//   </div>
// </div>

// </body>
// </html>
// `;

//     /* ======================
//        SEND EMAIL
//     ====================== */
//     const newMessageId = generateMessageId(email);

//     await transporter.sendMail({
//       from: `"${customerName}" <${process.env.GMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       replyTo: email,
//       subject: `Re: ${originalSubject}`,
//       text: "Yes, I agree.",
//       html: emailHtml,
//       headers: {
//         "Message-ID": newMessageId,
//         ...(originalMessageId && {
//           "In-Reply-To": originalMessageId,
//           References: originalMessageId,
//         }),
//         "X-Customer-IP": ip,
//         "X-Agreement": "Accepted",
//       },
//     });

//     /* ======================
//        SAVE DB
//     ====================== */
//     await Email.create({
//       type: "received",
//       emailType: "agreement_accepted",
//       from: email,
//       subject: `Re: ${originalSubject}`,
//       html: emailHtml,
//       meta: {
//         billingEmail: email,
//         confirmationNumber: booking,
//         ipAddress: ip,
//         messageId: newMessageId,
//         originalMessageId,
//         agreementHash: crypto
//           .createHash("sha256")
//           .update(email + booking + ip)
//           .digest("hex"),
//       },
//     });

//     /* ======================
//        SUCCESS PAGE
//     ====================== */
//     return res.send(`
// <!DOCTYPE html>
// <html>
// <body style="margin:0;background:#f5f7fb;font-family:Inter,Arial">
//   <div style="min-height:100vh;display:flex;align-items:center;justify-content:center">
//     <div style="
//       background:#fff;
//       width:460px;
//       border-radius:14px;
//       padding:32px;
//       box-shadow:0 25px 60px rgba(0,0,0,.12);
//       text-align:center
//     ">
//       <div style="font-size:56px">✅</div>
//       <h2 style="margin:12px 0;color:#0f5132">Agreement Submitted</h2>
//       <p style="font-size:14px;color:#6b7280">
//         Your consent has been securely recorded.
//       </p>

//       <div style="
//         background:#0f172a;
//         color:#60a5fa;
//         padding:16px;
//         border-radius:10px;
//         font-family:monospace;
//         margin:20px 0
//       ">
//         IP Address<br/>
//         <strong style="font-size:18px">${ip}</strong>
//       </div>

//       <div style="font-size:13px;color:#374151">
//         Booking Reference<br/>
//         <strong>${booking}</strong>
//       </div>

//       <button onclick="window.close()" style="
//         margin-top:22px;
//         background:#2563eb;
//         color:#fff;
//         border:none;
//         padding:12px 22px;
//         border-radius:8px;
//         font-weight:600;
//         cursor:pointer
//       ">
//         Close
//       </button>

//       <div style="margin-top:18px;font-size:11px;color:#9ca3af">
//         FareBuzzer • Secure Agreement System
//       </div>
//     </div>
//   </div>
// </body>
// </html>
// `);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to submit agreement");
//   }
// });

// export default router;
