// // server/routes/emailReply.js
// import express from 'express';
// import nodemailer from 'nodemailer';

// const router = express.Router();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'besttripmakers@gmail.com',
//     pass: 'snomrnnglqgtfqsg'
//   }
// });

// // This handles email replies
// router.post('/process-reply', async (req, res) => {
//   try {
//     const { 
//       from,        // customer email
//       subject,     // email subject
//       text,        // email content
//       headers      // email headers with IP
//     } = req.body;

//     console.log('📧 Email reply received from:', from);
//     console.log('Headers:', headers);

//     // Check if email contains "I AGREE"
//     const hasAgreement = /i\s+agree/i.test(text || '');

//     if (!hasAgreement) {
//       return res.json({ processed: false });
//     }

//     // Extract IP from email headers
//     let clientIp = 'Unknown';
    
//     if (headers && headers.received) {
//       // Received headers contain IP information
//       const received = Array.isArray(headers.received) 
//         ? headers.received.join(' ') 
//         : headers.received;
      
//       // Look for IP patterns
//       const ipPatterns = [
//         /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,  // IPv4
//         /from \[(\d+\.\d+\.\d+\.\d+)\]/,          // from [IP]
//         /by .*?\[(\d+\.\d+\.\d+\.\d+)\]/,         // by server [IP]
//         /with .*?\[(\d+\.\d+\.\d+\.\d+)\]/,       // with [IP]
//         /from \((\d+\.\d+\.\d+\.\d+)\)/,          // from (IP)
//       ];

//       for (const pattern of ipPatterns) {
//         const match = received.match(pattern);
//         if (match) {
//           clientIp = match[1] || match[0];
//           break;
//         }
//       }
//     }

//     // Extract booking reference from subject
//     let bookingReference = 'Unknown';
//     const refMatch = subject.match(/[A-Z0-9]{6,}/);
//     if (refMatch) {
//       bookingReference = refMatch[0];
//     }

//     const customerName = from.split('@')[0];
//     const timestamp = new Date().toLocaleString();

//     console.log('📝 Email agreement details:', {
//       customer: customerName,
//       email: from,
//       booking: bookingReference,
//       ip: clientIp,
//       time: timestamp
//     });

//     // Send notification email to you
//     await transporter.sendMail({
//       from: '"FareBuzzer" <besttripmakers@gmail.com>',
//       to: 'besttripmakers@gmail.com',
//       subject: `📧 Email Reply: I AGREE - ${bookingReference}`,
//       html: `
//         <h3>Customer replied "I AGREE" via email</h3>
//         <div style="background:#f0f9ff; padding:15px; border-radius:8px;">
//           <p><strong>Customer:</strong> ${customerName}</p>
//           <p><strong>Email:</strong> ${from}</p>
//           <p><strong>Booking:</strong> ${bookingReference}</p>
//           <p><strong>IP Address:</strong> ${clientIp}</p>
//           <p><strong>Time:</strong> ${timestamp}</p>
//         </div>
//         <div style="background:#f3f4f6; padding:10px; border-radius:5px; margin-top:10px;">
//           <p><strong>Email content:</strong></p>
//           <pre>${text || 'No text content'}</pre>
//         </div>
//       `
//     });

//     console.log('✅ Email notification sent');

//     res.json({ 
//       success: true, 
//       message: 'Email reply processed',
//       ip: clientIp 
//     });

//   } catch (error) {
//     console.error('❌ Email reply error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// export default router;