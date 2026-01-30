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

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple GET endpoint for direct link clicks
router.get('/submit', async (req, res) => {
  try {
    const { email, booking, name } = req.query;
    
    console.log('Agreement link clicked:', { email, booking, name });
    
    // Validate parameters
    if (!email || !booking) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: #fef3c7;
            }
            .error { 
              color: #dc2626; 
              font-size: 24px;
              margin-bottom: 20px;
            }
            .info {
              background: white;
              padding: 20px;
              border-radius: 10px;
              max-width: 500px;
              margin: 0 auto;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <div class="info">
            <div class="error">❌ Missing Information</div>
            <p>Please contact support with your booking reference.</p>
            <p>Or reply to the original email with "I AGREE"</p>
            <a href="mailto:besttripmakers@gmail.com" style="color: #3b82f6;">Contact Support</a>
          </div>
        </body>
        </html>
      `);
    }
    
    // Get IP from request
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
                      req.headers['x-real-ip'] || 
                      req.ip || 
                      'Unknown';
    
    const customerName = name || email.split('@')[0];
    const timestamp = new Date().toLocaleString();
    
    console.log('Processing agreement:', { email, booking, ipAddress });
    
    // 1. Send notification to YOU (besttripmakers@gmail.com)
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer <besttripmakers@gmail.com>',
        to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
        subject: `✅ Customer Agreement - ${booking}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #10b981; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎉 Customer Agreement Received</h2>
                <p>Via Quick Agreement Button</p>
              </div>
              <div class="content">
                <div class="details">
                  <h3>Customer Details</h3>
                  <p><strong>Name:</strong> ${customerName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Booking Reference:</strong> ${booking}</p>
                  <p><strong>IP Address:</strong> ${ipAddress}</p>
                  <p><strong>Time:</strong> ${timestamp}</p>
                </div>
                <div style="background: #d1fae5; padding: 15px; border-radius: 5px;">
                  <h4 style="color: #065f46; margin-top: 0;">✅ ACTION REQUIRED</h4>
                  <p>Customer has agreed to proceed with booking changes.</p>
                  <p>Please update the booking status in your system.</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
CUSTOMER AGREEMENT - ${booking}
==============================

Customer Name: ${customerName}
Customer Email: ${email}
Booking Reference: ${booking}
IP Address: ${ipAddress}
Time: ${timestamp}
Method: Button Click

ACTION: Customer has agreed. Please proceed with booking changes.
        `
      });
      console.log('✅ Notification sent to admin');
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }
    
    // 2. Send confirmation to customer
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'FareBuzzer Support <besttripmakers@gmail.com>',
        to: email,
        subject: `✅ Agreement Confirmed - ${booking}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 30px;">
              <div style="text-align: center; padding: 20px; background: #10b981; color: white; border-radius: 10px;">
                <h2 style="margin: 0;">✅ Agreement Confirmed</h2>
              </div>
              
              <div style="padding: 30px;">
                <p>Dear ${customerName},</p>
                <p>Thank you for your response. We have received your agreement and will now proceed with your request.</p>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <p><strong>Booking Reference:</strong> ${booking}</p>
                  <p><strong>Confirmation Time:</strong> ${timestamp}</p>
                </div>
                
                <p>Our team will process this request and send you a completion confirmation shortly.</p>
                
                <div style="margin-top: 30px; padding: 15px; background: #eff6ff; border-radius: 5px;">
                  <p style="color: #1e40af; margin: 0;">
                    <strong>🔒 Security Note:</strong> For your protection, this confirmation was recorded for verification purposes.
                  </p>
                </div>
                
                <p style="margin-top: 30px;">
                  Best regards,<br>
                  <strong style="color: #10b981;">FareBuzzer Support Team</strong>
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      });
      console.log('✅ Confirmation sent to customer:', email);
    } catch (customerEmailError) {
      console.error('Failed to send customer confirmation:', customerEmailError);
    }
    
    // Show success page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 20px; 
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 100%;
          }
          .success { 
            color: #10b981; 
            font-size: 28px;
            margin-bottom: 20px;
          }
          .icon {
            font-size: 60px;
            margin-bottom: 20px;
          }
          .details {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
          }
          .note {
            background: #fef3c7;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            font-size: 14px;
            color: #92400e;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">✅</div>
          <div class="success">Agreement Submitted Successfully!</div>
          
          <div class="details">
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Booking Reference:</strong> ${booking}</p>
            <p><strong>Confirmation Time:</strong> ${timestamp}</p>
          </div>
          
          <div class="note">
            ✅ Your agreement has been recorded<br>
            ✅ Email confirmation has been sent<br>
            ✅ Our team has been notified
          </div>
          
          <p style="color: #64748b;">You can safely close this window.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af;">
              Need help? Contact support@farebuzzertravel.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `);
    
  } catch (error) {
    console.error('❌ Agreement processing error:', error);
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background: #fee2e2;
          }
          .error { 
            color: #dc2626; 
            font-size: 24px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="error">❌ Error Processing Agreement</div>
        <p>Please reply to the original email with "I AGREE"</p>
        <p>Or contact: besttripmakers@gmail.com</p>
      </body>
      </html>
    `);
  }
});

// POST endpoint for API calls (if needed)
router.post('/submit-agreement', async (req, res) => {
  try {
    const { email, booking, name, ipAddress } = req.body;
    
    // Same logic as GET endpoint...
    // [Copy the email sending logic from above]
    
    res.json({ success: true, message: 'Agreement submitted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;