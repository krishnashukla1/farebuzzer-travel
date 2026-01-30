// // Create new file: server/routes/agreement.js
// import express from 'express';
// import { Resend } from 'resend';

// const router = express.Router();
// const resend = new Resend(process.env.RESEND_API_KEY);

// // Helper to get IP address
// const getClientIp = (req) => {
//   return req.headers['x-forwarded-for']?.split(',')[0] || 
//          req.ip || 
//          'Unknown';
// };

// // Simple agreement endpoint
// router.post('/submit-agreement', async (req, res) => {
//   try {
//     const { 
//       customerEmail, 
//       customerName, 
//       bookingReference 
//     } = req.body;

//     // Get customer IP
//     const clientIp = getClientIp(req);

//     // 1. Send email to YOUR inbox
//     await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL,
//       to: process.env.ADMIN_EMAIL, // YOUR email
//       subject: `✅ Customer Agreed - ${bookingReference}`,
//       html: `
//         <h2>Customer Agreement Received</h2>
//         <p><strong>Customer:</strong> ${customerName}</p>
//         <p><strong>Email:</strong> ${customerEmail}</p>
//         <p><strong>Booking:</strong> ${bookingReference}</p>
//         <p><strong>IP Address:</strong> ${clientIp}</p>
//         <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
//         <hr>
//         <p>Customer clicked "I Agree" button.</p>
//       `
//     });

//     // 2. Send confirmation to customer
//     await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL,
//       to: customerEmail,
//       subject: `Agreement Confirmed - ${bookingReference}`,
//       html: `
//         <h3>Thank you for your agreement</h3>
//         <p>We have received your agreement and will proceed with your request.</p>
//         <p><strong>Booking:</strong> ${bookingReference}</p>
//         <p>Our team will contact you shortly.</p>
//       `
//     });

//     res.json({
//       success: true,
//       message: 'Agreement submitted successfully'
//     });

//   } catch (error) {
//     console.error('Agreement error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to submit agreement'
//     });
//   }
// });

// export default router;



// server/routes/agreement.js - Complete file
// import express from 'express';
// import { Resend } from 'resend';

// const router = express.Router();
// const resend = new Resend(process.env.RESEND_API_KEY);

// // Helper to get IP address
// const getClientIp = (req) => {
//   return req.headers['x-forwarded-for']?.split(',')[0] || 
//          req.headers['x-real-ip'] || 
//          req.connection?.remoteAddress || 
//          req.ip || 
//          'Unknown';
// };

// // POST endpoint for agreement
// router.post('/submit-agreement', async (req, res) => {
//   try {
//     console.log('Agreement request received:', req.body);
    
//     const { 
//       customerEmail, 
//       customerName, 
//       bookingReference,
//       ipAddress,
//       method = 'web_click'
//     } = req.body;

//     if (!customerEmail || !bookingReference) {
//       return res.status(400).json({
//         success: false,
//         message: 'Customer email and booking reference are required'
//       });
//     }

//     // Use provided IP or get from request
//     const clientIp = ipAddress || getClientIp(req);
//     const timestamp = new Date();

//     console.log('Sending email to admin:', process.env.ADMIN_EMAIL);

//     // 1. Send notification to ADMIN (YOUR email)
//     const adminEmail = await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer <noreply@farebuzzer.com>',
//       to: process.env.ADMIN_EMAIL,
//       subject: `✅ Customer Agreement - ${bookingReference}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: #4CAF50; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
//             .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
//             .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #2196F3; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h2>🎉 Customer Agreement Received</h2>
//             </div>
//             <div class="content">
//               <h3>Customer has agreed to proceed</h3>
              
//               <div class="info-box">
//                 <p><strong>Customer:</strong> ${customerName}</p>
//                 <p><strong>Email:</strong> ${customerEmail}</p>
//                 <p><strong>Booking Reference:</strong> ${bookingReference}</p>
//                 <p><strong>IP Address:</strong> ${clientIp}</p>
//                 <p><strong>Method:</strong> ${method === 'web_click' ? 'Web Click' : 'Email Reply'}</p>
//                 <p><strong>Response Time:</strong> ${timestamp.toLocaleString()}</p>
//               </div>
              
//               <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
//                 <h4>✅ Confirmation:</h4>
//                 <p>Customer has confirmed their agreement.</p>
//               </div>
              
//               <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px;">
//                 <h4>⚡ Next Steps:</h4>
//                 <ol>
//                   <li>Process the requested changes/cancellation</li>
//                   <li>Update booking status in your system</li>
//                   <li>Contact customer if needed</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>
//       `,
//       text: `
// Customer Agreement Received - ${bookingReference}
// =============================================

// Customer: ${customerName}
// Email: ${customerEmail}
// Booking Reference: ${bookingReference}
// IP Address: ${clientIp}
// Method: ${method === 'web_click' ? 'Web Click' : 'Email Reply'}
// Response Time: ${timestamp.toLocaleString()}

// ACTION REQUIRED: Customer has agreed to proceed with the request.
//       `
//     });

//     console.log('Admin email sent:', adminEmail);

//     // 2. Send confirmation to customer
//     const customerEmailResponse = await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer Support <support@farebuzzer.com>',
//       to: customerEmail,
//       subject: `✅ Agreement Confirmation - ${bookingReference}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <body style="font-family: Arial, sans-serif; line-height: 1.6;">
//           <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
//             <div style="background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
//               <h2>✅ Agreement Confirmed</h2>
//             </div>
//             <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e1e1e1;">
//               <p>Dear ${customerName},</p>
//               <p>Thank you for your response. We have received your agreement and will now proceed with your request.</p>
              
//               <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
//                 <p><strong>Booking Reference:</strong> ${bookingReference}</p>
//                 <p><strong>Confirmation Time:</strong> ${timestamp.toLocaleString()}</p>
//                 <p><strong>Confirmation ID:</strong> ${Date.now().toString(36).toUpperCase()}</p>
//               </div>
              
//               <p>Our team will process this request and send you a completion confirmation shortly.</p>
              
//               <div style="margin-top: 30px; padding: 15px; background: #f0f9ff; border-radius: 5px;">
//                 <p style="color: #0369a1; margin: 0;">
//                   <strong>🔒 Security Note:</strong> For your protection, this confirmation was recorded for verification purposes.
//                 </p>
//               </div>
              
//               <p style="margin-top: 30px;">
//                 Best regards,<br>
//                 <strong style="color: #4CAF50;">FareBuzzer Support Team</strong>
//               </p>
//             </div>
//             <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #666;">
//               <p>Need help? Contact enquiry@farebuzzertravel.com</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     });

//     console.log('Customer email sent:', customerEmailResponse);

//     res.json({
//       success: true,
//       message: 'Agreement submitted successfully',
//       data: {
//         adminEmailId: adminEmail.data?.id,
//         customerEmailId: customerEmailResponse.data?.id,
//         timestamp: timestamp.toISOString()
//       }
//     });

//   } catch (error) {
//     console.error('Agreement processing error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process agreement',
//       error: error.message
//     });
//   }
// });

// export default router;



import express from "express";
import transporter from "../utils/email.js";
import Email from "../models/Email.js";

const router = express.Router();

router.post("/confirm", async (req, res) => {
  try {
    const { token } = req.body;

    // Decode token
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, confirmationNumber] = decoded.split(":");

    // Capture IP
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    // Send email to ADMIN
    await transporter.sendMail({
      from: `"FareBuzzer Agreement" <${process.env.GMAIL_USER}>`,
      to: "besttripmakers@gmail.com",
      subject: "Customer Agreement Accepted",
      html: `
        <h3>Agreement Confirmed</h3>
        <p><b>Email:</b> ${email}</p>
        <p><b>Confirmation No:</b> ${confirmationNumber}</p>
        <p><b>IP Address:</b> ${ip}</p>
        <p><b>Date:</b> ${new Date().toLocaleString()}</p>
      `
    });

    // Save in DB
    await Email.create({
      type: "agreement",
      from: email,
      subject: "Agreement Accepted",
      meta: {
        confirmationNumber,
        ipAddress: ip,
        agreedAt: new Date()
      }
    });

    res.json({ status: "success" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "fail" });
  }
});

export default router;
