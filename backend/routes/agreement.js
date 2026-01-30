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


// server/routes/agreement.js
import express from 'express';
import { Resend } from 'resend';
import AgreementLog from '../models/AgreementLog.js';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple agreement endpoint
router.post('/submit-agreement', async (req, res) => {
  try {
    const { 
      customerEmail, 
      customerName, 
      bookingReference,
      ipAddress
    } = req.body;

    console.log('📧 Processing agreement for:', customerEmail, bookingReference);

    // 1. Send notification to YOU (besttripmakers@gmail.com)
    const adminEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer <besttripmakers@gmail.com>',
      to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
      subject: `✅ Customer Agreed - ${bookingReference}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2 style="color: #10b981;">🎉 Customer Agreement Received</h2>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #0369a1;">Customer Details</h3>
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Customer Email:</strong> ${customerEmail}</p>
            <p><strong>Booking Reference:</strong> ${bookingReference}</p>
            <p><strong>IP Address:</strong> ${ipAddress}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Method:</strong> Button Click</p>
          </div>
          
          <div style="background: #d1fae5; padding: 15px; border-radius: 8px;">
            <h4 style="color: #065f46;">✅ ACTION REQUIRED</h4>
            <p>Customer has agreed to proceed with their request.</p>
            <p>Please process the booking changes.</p>
          </div>
        </body>
        </html>
      `,
      text: `
CUSTOMER AGREEMENT RECEIVED
===========================

Customer: ${customerName}
Email: ${customerEmail}
Booking: ${bookingReference}
IP Address: ${ipAddress}
Time: ${new Date().toLocaleString()}
Method: Button Click

ACTION: Customer has agreed. Please proceed with booking changes.
      `
    });

    console.log('✅ Notification sent to:', process.env.ADMIN_EMAIL);

    // 2. Send confirmation to customer
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer Support <besttripmakers@gmail.com>',
        to: customerEmail,
        subject: `✅ Agreement Confirmed - ${bookingReference}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif;">
            <div style="text-align: center; padding: 20px;">
              <h2 style="color: #10b981;">✅ Agreement Confirmed</h2>
            </div>
            
            <div style="max-width: 600px; margin: 0 auto; padding: 30px;">
              <p>Dear ${customerName},</p>
              <p>Thank you for your response. We have received your agreement and will now proceed with your request.</p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Booking Reference:</strong> ${bookingReference}</p>
                <p><strong>Confirmation Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p>Our team will process this request and send you a completion confirmation shortly.</p>
              
              <p>Best regards,<br>
              <strong>FareBuzzer Support Team</strong></p>
            </div>
          </body>
          </html>
        `
      });
      console.log('✅ Confirmation sent to customer:', customerEmail);
    } catch (emailError) {
      console.error('Failed to send customer confirmation:', emailError);
    }

    // 3. Log to database (optional)
    try {
      const agreementLog = new AgreementLog({
        customerEmail,
        customerName,
        bookingReference,
        ipAddress,
        method: 'web_click',
        timestamp: new Date()
      });
      await agreementLog.save();
      console.log('✅ Agreement logged to database');
    } catch (dbError) {
      console.error('Database logging error:', dbError);
    }

    res.json({
      success: true,
      message: 'Agreement submitted successfully'
    });

  } catch (error) {
    console.error('❌ Agreement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit agreement',
      error: error.message
    });
  }
});

// Simple GET endpoint for direct link clicks
router.get('/submit', async (req, res) => {
  try {
    const { email, booking } = req.query;
    
    if (!email || !booking) {
      return res.send('Missing email or booking reference');
    }
    
    // Get IP from request
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
                      req.headers['x-real-ip'] || 
                      req.ip || 
                      'Unknown';
    
    // Send notification
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer <besttripmakers@gmail.com>',
      to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
      subject: `✅ Link Click Agreement - ${booking}`,
      html: `
        <h3>Customer clicked agreement link</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Booking:</strong> ${booking}</p>
        <p><strong>IP:</strong> ${ipAddress}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    });
    
    // Show success page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .success { color: #10b981; font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="success">✅ Agreement Submitted!</div>
        <p>Your agreement has been received. You can close this window.</p>
      </body>
      </html>
    `);
    
  } catch (error) {
    console.error('GET agreement error:', error);
    res.send('Error processing agreement');
  }
});

export default router;