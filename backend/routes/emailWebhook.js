// // Create new file: server/routes/emailWebhook.js
// import express from 'express';
// import { Resend } from 'resend';

// const router = express.Router();
// const resend = new Resend(process.env.RESEND_API_KEY);

// // This endpoint will be called when someone replies to your email
// router.post('/process-reply', async (req, res) => {
//   try {
//     const { 
//       from,        // Customer email
//       subject,     // Email subject
//       text,        // Email body
//       html,        // HTML body
//       headers      // Email headers containing IP
//     } = req.body;

//     // Check if email contains "I Agree"
//     const content = text || html || '';
//     const hasAgreement = /i\s+agree/i.test(content);

//     if (!hasAgreement) {
//       return res.status(200).json({ processed: false });
//     }

//     // Extract customer info
//     const customerEmail = from;
//     const customerName = from.split('@')[0];
    
//     // Extract IP from email headers
//     let clientIp = 'Unknown';
//     if (headers && headers.received) {
//       const received = Array.isArray(headers.received) ? headers.received : [headers.received];
//       for (const header of received) {
//         // Look for IP in received headers
//         const ipMatch = header.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
//         if (ipMatch) {
//           clientIp = ipMatch[0];
//           break;
//         }
//       }
//     }

//     // Extract booking reference from subject
//     let bookingReference = 'Unknown';
//     const refMatch = subject.match(/[A-Z0-9]{6,}/);
//     if (refMatch) bookingReference = refMatch[0];

//     // Send notification to YOUR email
//     await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL,
//       to: process.env.ADMIN_EMAIL, // YOUR email
//       subject: `📧 Email Reply: Agreement - ${bookingReference}`,
//       html: `
//         <h2>Customer Agreement via Email Reply</h2>
//         <p><strong>Customer:</strong> ${customerName}</p>
//         <p><strong>Email:</strong> ${customerEmail}</p>
//         <p><strong>Booking:</strong> ${bookingReference}</p>
//         <p><strong>IP Address:</strong> ${clientIp}</p>
//         <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
//         <hr>
//         <h3>Email Content:</h3>
//         <div style="background:#f5f5f5; padding:10px;">
//           ${html || text.replace(/\n/g, '<br>')}
//         </div>
//       `
//     });

//     res.json({ 
//       success: true, 
//       message: 'Email reply processed' 
//     });

//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(500).json({ error: 'Processing failed' });
//   }
// });

// export default router;