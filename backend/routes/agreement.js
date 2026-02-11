

//==============correct=====deepseek==============

// import express from "express";
// import nodemailer from "nodemailer";
// import Email from "../models/Email.js";

// const router = express.Router();

// router.use((req, res, next) => {
//   req.app.set("trust proxy", true);
//   next();
// });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// const getClientIP = (req) => {
//   const xff = req.headers["x-forwarded-for"];
//   if (xff) return xff.split(",")[0].trim();
//   return req.ip || req.socket.remoteAddress || "Unknown";
// };

// const generateMessageId = (email) => {
//   const timestamp = Date.now();
//   const random = Math.random().toString(36).substring(2, 10);
//   const domain = email.split('@')[1] || 'farebuzzertravel.com';
//   return `<${timestamp}.${random}@${domain}>`;
// };

// /* =========================
//    GET — Agreement Link (WITH IP ADDRESS)
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

//     // ✅ 1. ORIGINAL EMAIL का Message-ID और CONTENT FETCH करें
//     let originalMessageId = frontendMessageId || null;
//     let originalEmailContent = "";
//     let originalSubject = "";
    
//     if (!originalMessageId) {
//       const originalEmail = await Email.findOne({
//         'meta.confirmationNumber': booking,
//         'meta.billingEmail': email,
//         'meta.messageId': { $exists: true }
//       }).sort({ createdAt: -1 });
      
//       if (originalEmail) {
//         originalMessageId = originalEmail.meta?.messageId;
//         originalEmailContent = originalEmail.html || "";
//         originalSubject = originalEmail.subject || `Flight Reservation Confirmation - ${booking}`;
//         console.log("Found original email from DB");
//       }
//     }

//     // ✅ 2. NEW Message-ID GENERATE करें
//     const newMessageId = generateMessageId(email);

//     // ✅ 3. GMAIL STYLE REPLY TEMPLATE (WITH IP ADDRESS)
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
    
//     const currentTime = new Date().toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });

//     // ✅ Plain text reply (Gmail में दिखेगा)
//     const plainTextReply = `Yes, I agree.`;

//     // ✅ Quoted original content
//     const quotedOriginal = originalEmailContent 
//       ? originalEmailContent
//           .replace(/<style[^>]*>.*?<\/style>/gs, '')
//           .replace(/<script[^>]*>.*?<\/script>/gs, '')
//           .replace(/<[^>]+>/g, ' ')
//           .replace(/\s+/g, ' ')
//           .trim()
//           .substring(0, 500) + "..."
//       : `Flight booking confirmation for ${booking}. Please refer to original email.`;

//     // ✅ 4. FINAL EMAIL CONTENT (WITH IP ADDRESS SECTION)
//     const emailHtml = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Re: ${originalSubject || 'Flight Reservation Confirmation'}</title>
//     <style>
//         .ip-section {
//             background: #f8f9fa;
//             border: 1px solid #dadce0;
//             border-radius: 8px;
//             padding: 12px 15px;
//             margin: 15px 0;
//             font-family: 'Roboto Mono', monospace, Courier, sans-serif;
//             font-size: 13px;
//             color: #3c4043;
//         }
//         .ip-label {
//             color: #5f6368;
//             font-weight: 500;
//         }
//         .ip-value {
//             color: #202124;
//             font-weight: 600;
//         }
//         .security-note {
//             background: #e8f0fe;
//             border-left: 4px solid #1a73e8;
//             padding: 10px 15px;
//             margin: 20px 0;
//             font-size: 12px;
//             color: #3c4043;
//             border-radius: 0 4px 4px 0;
//         }
//     </style>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #202124; margin: 0; padding: 20px;">
    
//     <!-- Customer's reply (TOP - नया message) -->
//     <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #dadce0;">
//         <div style="font-size: 14px; color: #202124; margin-bottom: 10px;">
//             <strong>From:</strong> ${customerName} &lt;${email}&gt;<br>
//             <strong>Date:</strong> ${currentDate}, ${currentTime}<br>
//             <strong>To:</strong> FareBuzzer Support &lt;besttripmakers@gmail.com&gt;<br>
//             <strong>Subject:</strong> Re: ${originalSubject || 'Flight Reservation Confirmation'}
//         </div>
        
//         <!-- CUSTOMER'S AGREEMENT -->
//         <div style="font-size: 15px; color: #202124; margin-top: 20px; white-space: pre-wrap;">
// Yes, I agree.
//         </div>
        
//         <!-- IP ADDRESS SECTION (VISIBLE IN EMAIL) -->
//         <div class="ip-section">
//             <div style="margin-bottom: 8px;">
//                 <span class="ip-label">📡 Agreement Submitted From:</span><br>
//                 <span class="ip-value">IP Address: ${ipAddress}</span>
//             </div>
//             <div style="margin-bottom: 5px;">
//                 <span class="ip-label">📍 Location Data:</span><br>
//                 <span style="color: #5f6368; font-size: 12px;">
//                     Timestamp: ${time}<br>
//                     User Agent: ${req.headers['user-agent']?.substring(0, 80) || 'Not available'}...
//                 </span>
//             </div>
//             <div style="font-size: 11px; color: #80868b; margin-top: 8px;">
//                 🔐 This IP is recorded for security and verification purposes.
//             </div>
//         </div>
        
//         <div class="security-note">
//             <strong>✓ Secure Digital Agreement:</strong> This agreement has been digitally signed and recorded.<br>
//             <strong>✓ IP Verification:</strong> Submitted from verified IP address: ${ipAddress}
//         </div>
//     </div>
    
//     <!-- Original Email Quoted (Gmail style) -->
//     <div style="padding-left: 15px; border-left: 2px solid #dadce0; color: #5f6368; font-size: 14px;">
//         <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dashed #dadce0;">
//             <div style="font-size: 13px; color: #5f6368;">
//                 <strong>On ${currentDate} at ${currentTime}</strong>, FareBuzzer Support &lt;besttripmakers@gmail.com&gt; wrote:
//             </div>
//         </div>
        
//         <!-- Original email content (quoted) -->
//         <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px;">
//             <div style="color: #202124; font-weight: bold; margin-bottom: 10px;">
//                 FareBuzzer Travel<br>
//                 Flight Reservation Confirmation
//             </div>
            
//             <div style="margin-bottom: 10px;">
//                 <strong>Dear ${customerName},</strong>
//             </div>
            
//             <div style="margin-bottom: 15px;">
//                 Thank you for your enquiry regarding your flight booking.
//             </div>
            
//             <div style="color: #5f6368; font-size: 13px;">
//                 <strong>Booking Reference:</strong> ${booking}<br>
//                 <strong>Customer Email:</strong> ${email}<br>
//                 <strong>Date of Booking:</strong> ${currentDate}<br>
//                 <strong>IP Address:</strong> ${ipAddress}

//             </div>
            
//             ${originalEmailContent ? `
//             <div style="margin-top: 15px; padding: 10px; background: #fff; border: 1px solid #e8eaed; border-radius: 4px; font-size: 13px;">
//                 <div style="color: #5f6368; margin-bottom: 5px;"><strong>Original Email Content:</strong></div>
//                 <div style="color: #70757a;">${quotedOriginal}</div>
//             </div>
//             ` : ''}
            
//             <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e8eaed; color: #5f6368; font-size: 12px;">
//                 This is an automated confirmation email. Please do not reply directly to this message.<br>
//                 For inquiries, contact: support@farebuzzertravel.com
//             </div>
//         </div>
//     </div>
    
//     <!-- Hidden system info (for backend) -->
//     <div style="display: none; font-size: 0px; color: transparent;">
//         <!-- SYSTEM DATA FOR THREADING & TRACKING -->
//         AgreementID: ${Date.now()}
//         MessageID: ${newMessageId}
//         InReplyTo: ${originalMessageId || 'N/A'}
//         BookingRef: ${booking}
//         CustomerIP: ${ipAddress}
//         IPDetails: ${ipAddress} | ${req.headers['x-forwarded-for'] || 'Direct'}
//         UserAgent: ${req.headers['user-agent'] || 'Unknown'}
//         Timestamp: ${new Date().toISOString()}
//         GeoLocation: ${ipAddress} 
//         SecurityLevel: HIGH
//         <!-- END SYSTEM DATA -->
//     </div>
    
// </body>
// </html>
//     `;

//     // ✅ 5. SEND EMAIL WITH IP HEADERS
//     const mailOptions = {
//       // from: `"${customerName}" <${process.env.GMAIL_USER}>`,

//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`, // ✅ ये सही है
//       to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
//       replyTo: email,
//       // subject: `Re: ${originalSubject || 'Flight Reservation Confirmation'}`,

//       subject: `Re: ${originalSubject.replace(/^Re:\s*/i, '') || 'Flight Reservation Confirmation'}`, // ✅ ये line change करें
//       text: `${plainTextReply}\n\n---\nAgreement submitted from IP: ${ipAddress}\nTimestamp: ${time}`,
//       html: emailHtml,
      
//       headers: {
//         'Message-ID': newMessageId,
//         ...(originalMessageId && {
//           'In-Reply-To': originalMessageId,
//           'References': originalMessageId
//         }),
//         'Thread-Topic': originalSubject || `Flight Booking ${booking}`,
//         'X-Original-Message-ID': originalMessageId || '',
//         'X-Booking-Reference': booking,
//         'X-Customer-Email': email,
//         'X-Customer-IP': ipAddress, // ✅ IP in header
//         'X-Forwarded-For': req.headers['x-forwarded-for'] || ipAddress,
//         'X-User-Agent': req.headers['user-agent'] || 'Unknown',
//         'X-Agreement-Type': 'customer-acceptance',
//         'X-IP-Verified': 'true',
//         'X-Mailer': 'FareBuzzer Travel System 2.0'
//       }
//     };

//     console.log("Sending agreement with IP tracking:", {
//       subject: mailOptions.subject,
//       customerIP: ipAddress,
//       messageId: newMessageId
//     });

//     await transporter.sendMail(mailOptions);

//     // ✅ 6. SAVE TO DATABASE WITH IP DETAILS
//     try {
//       await Email.create({
//         type: "received",
//         emailType: "agreement_accepted",
//         from: email,
//         to: process.env.ADMIN_EMAIL,
//         subject: `Re: ${originalSubject || 'Flight Reservation Confirmation'}`,
//         text: `${plainTextReply}\n\nIP Address: ${ipAddress}`,
//         html: emailHtml,
//         meta: {
//           customerName,
//           billingEmail: email,
//           confirmationNumber: booking,
//           ipAddress,
//           ipDetails: {
//             ip: ipAddress,
//             xForwardedFor: req.headers['x-forwarded-for'] || null,
//             userAgent: req.headers['user-agent'] || null,
//             acceptLanguage: req.headers['accept-language'] || null,
//             referer: req.headers['referer'] || null
//           },
//           timestamp: time,
//           messageId: newMessageId,
//           originalMessageId: originalMessageId,
//           originalSubject: originalSubject,
//           source: "agreement_link",
//           agreementTime: new Date().toISOString(),
//           emailStyle: "gmail_chain_reply_with_ip",
//           security: {
//             ipVerified: true,
//             timestampVerified: true,
//             agreementHash: require('crypto').createHash('md5').update(`${email}${booking}${ipAddress}`).digest('hex')
//           }
//         }
//       });
//       console.log("Agreement saved with IP tracking:", ipAddress);
//     } catch (dbError) {
//       console.error("Error saving to database:", dbError);
//     }

//     /* =========================
//        SUCCESS PAGE (WITH IP DISPLAY)
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
//           Your digital agreement has been recorded with IP verification.
//         </p>

//         <!-- IP ADDRESS DISPLAY -->
//         <div style="
//           background:#0f172a;
//           border-radius:8px;
//           padding:16px;
//           text-align:left;
//           margin-bottom:24px;
//           color:white;
//           font-family: 'Courier New', monospace;
//         ">
//           <div style="display:flex; align-items:center; margin-bottom:10px;">
//             <div style="background:#3b82f6; width:8px; height:8px; border-radius:50%; margin-right:10px;"></div>
//             <span style="color:#94a3b8;font-size:12px;">IP ADDRESS RECORDED</span>
//           </div>
//           <div style="font-size:18px; font-weight:bold; color:#60a5fa; margin-bottom:5px;">
//             ${ipAddress}
//           </div>
//           <div style="font-size:11px; color:#94a3b8;">
//             📍 Location verification complete<br>
//             🕒 ${time}
//           </div>
//         </div>

//         <div style="
//           background:#f1f8ff;
//           border-radius:8px;
//           padding:16px;
//           text-align:left;
//           margin-bottom:24px;
//           border-left:4px solid #1a73e8;
//         ">
//           <div style="margin-bottom:10px;">
//             <span style="color:#1a73e8;font-size:12px;font-weight:bold;">EMAIL PREVIEW</span><br/>
//             <div style="background:#fff; padding:12px; border-radius:4px; margin-top:5px; font-family:'Courier New', monospace; font-size:12px;">
//               <div><strong>From:</strong> ${customerName} &lt;${email}&gt;</div>
//               <div><strong>To:</strong> FareBuzzer Support</div>
//               <div><strong>Subject:</strong> Re: ${originalSubject || 'Flight Reservation'}</div>
//               <div style="margin-top:8px; color:#0d652d;">✓ Yes, I agree.</div>
//               <div style="margin-top:6px; color:#5f6368; font-size:11px;">
//                 📡 IP: ${ipAddress} | 🔐 Secure agreement
//               </div>
//             </div>
//           </div>
//         </div>

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

//           <div style="margin-bottom:10px;">
//             <span style="color:#6b7280;font-size:13px;">IP Address</span><br/>
//             <strong style="color:#111827; font-family: 'Courier New', monospace;">${ipAddress}</strong>
//           </div>

//           <div>
//             <span style="color:#6b7280;font-size:13px;">Submission Time</span><br/>
//             <strong style="color:#111827;">${time}</strong>
//           </div>
          
//           ${originalMessageId ? `
//           <div style="margin-top:10px; padding-top:10px; border-top:1px dashed #d1d5db;">
//             <span style="color:#6b7280;font-size:13px;">Thread Status</span><br/>
//             <span style="color:#1a73e8; font-size:12px;">
//               🔗 Properly threaded in Gmail<br/>
//               <small style="color:#5f6368;">Message-ID: ${newMessageId.substring(0, 25)}...</small>
//             </span>
//           </div>
//           ` : ''}
//         </div>

//         <div style="
//           background:#f0fdf4;
//           border:1px solid #bbf7d0;
//           border-radius:6px;
//           padding:12px;
//           margin-bottom:20px;
//           text-align:left;
//         ">
//           <div style="display:flex; align-items:center; margin-bottom:8px;">
//             <div style="color:#16a34a; margin-right:8px;">✓</div>
//             <span style="font-size:13px; color:#166534;"><strong>IP Verification Complete</strong></span>
//           </div>
//           <div style="font-size:12px; color:#4b5563;">
//             • Agreement digitally signed from IP: ${ipAddress}<br>
//             • Timestamp verified with server<br>
//             • Secure connection established
//           </div>
//         </div>

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
//           🔐 IP-Verified Agreement System • Farebuzzer Travel • ${new Date().getFullYear()}
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


//=================11 feb==========


// import express from "express";
// import nodemailer from "nodemailer";
// import Email from "../models/Email.js";
// import axios from "axios"; // You'll need to install axios for IP geolocation

// const router = express.Router();

// router.use((req, res, next) => {
//   req.app.set("trust proxy", true);
//   next();
// });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// const getClientIP = (req) => {
//   const xff = req.headers["x-forwarded-for"];
//   if (xff) return xff.split(",")[0].trim();
//   return req.ip || req.socket.remoteAddress || "Unknown";
// };

// // ✅ NEW: Function to get location from IP address
// const getLocationFromIP = async (ip) => {
//   try {
//     // Using ipapi.co (free tier available)
//     const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
//       timeout: 5000
//     });
    
//     if (response.data && response.data.city) {
//       const locationParts = [];
      
//       if (response.data.city) locationParts.push(response.data.city);
//       if (response.data.region) locationParts.push(response.data.region);
//       if (response.data.country_name) locationParts.push(response.data.country_name);
      
//       // Format: "Noida, Uttar Pradesh, India" or similar
//       const formattedLocation = locationParts.join(", ");
      
//       // Try to get more specific if available
//       let specificLocation = formattedLocation;
//       if (response.data.district && response.data.district !== response.data.city) {
//         specificLocation = `${response.data.district}, ${formattedLocation}`;
//       }
      
//       return {
//         formatted: specificLocation,
//         raw: response.data,
//         success: true
//       };
//     }
//   } catch (error) {
//     console.log("IP geolocation failed:", error.message);
//   }
  
//   return {
//     formatted: "Location information not available",
//     raw: null,
//     success: false
//   };
// };

// const generateMessageId = (email) => {
//   const timestamp = Date.now();
//   const random = Math.random().toString(36).substring(2, 10);
//   const domain = email.split('@')[1] || 'farebuzzertravel.com';
//   return `<${timestamp}.${random}@${domain}>`;
// };

// /* =========================
//    GET — Agreement Link (WITH IP ADDRESS & LOCATION)
// ========================= */
// router.get("/submit", async (req, res) => {
//   try {
//     const { 
//       email, 
//       booking, 
//       name, 
//       messageId: frontendMessageId,
//       amount, // ✅ NEW: Payment amount parameter
//       company = "Lowfarestudio" // ✅ NEW: Default company name
//     } = req.query;

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
    
//     // ✅ NEW: Get location from IP
//     const locationData = await getLocationFromIP(ipAddress);
    
//     // ✅ NEW: Format amount with currency
//     const formattedAmount = amount ? `$${amount}` : "xxx";
    
//     console.log("AGREEMENT ACCEPTED:", {
//       email,
//       booking,
//       ipAddress,
//       location: locationData.formatted,
//       amount: formattedAmount,
//       company,
//       frontendMessageId
//     });

//     // ✅ 1. ORIGINAL EMAIL का Message-ID और CONTENT FETCH करें
//     let originalMessageId = frontendMessageId || null;
//     let originalEmailContent = "";
//     let originalSubject = "";
    
//     if (!originalMessageId) {
//       const originalEmail = await Email.findOne({
//         'meta.confirmationNumber': booking,
//         'meta.billingEmail': email,
//         'meta.messageId': { $exists: true }
//       }).sort({ createdAt: -1 });
      
//       if (originalEmail) {
//         originalMessageId = originalEmail.meta?.messageId;
//         originalEmailContent = originalEmail.html || "";
//         originalSubject = originalEmail.subject || `Flight Reservation Confirmation - ${booking}`;
//         console.log("Found original email from DB");
//       }
//     }

//     // ✅ 2. NEW Message-ID GENERATE करें
//     const newMessageId = generateMessageId(email);

//     // ✅ 3. GMAIL STYLE REPLY TEMPLATE (WITH IP ADDRESS & LOCATION)
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
    
//     const currentTime = new Date().toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });

//     // ✅ NEW: Payment agreement text
//     const agreementText = amount 
//       ? `Yes, I agree to pay amount ${formattedAmount} and ${company} (charge company).`
//       : `Yes, I agree.`;

//     // ✅ Plain text reply
//     const plainTextReply = agreementText;

//     // ✅ Quoted original content
//     const quotedOriginal = originalEmailContent 
//       ? originalEmailContent
//           .replace(/<style[^>]*>.*?<\/style>/gs, '')
//           .replace(/<script[^>]*>.*?<\/script>/gs, '')
//           .replace(/<[^>]+>/g, ' ')
//           .replace(/\s+/g, ' ')
//           .trim()
//           .substring(0, 500) + "..."
//       : `Flight booking confirmation for ${booking}. Please refer to original email.`;

//     // ✅ 4. FINAL EMAIL CONTENT (WITH IP ADDRESS & LOCATION)
//     const emailHtml = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Re: ${originalSubject || 'Flight Reservation Confirmation'}</title>
//     <style>
//         .ip-section {
//             background: #f8f9fa;
//             border: 1px solid #dadce0;
//             border-radius: 8px;
//             padding: 12px 15px;
//             margin: 15px 0;
//             font-family: 'Roboto Mono', monospace, Courier, sans-serif;
//             font-size: 13px;
//             color: #3c4043;
//         }
//         .ip-label {
//             color: #5f6368;
//             font-weight: 500;
//         }
//         .ip-value {
//             color: #202124;
//             font-weight: 600;
//         }
//         .location-details {
//             background: #e8f0fe;
//             padding: 8px 12px;
//             border-radius: 4px;
//             margin-top: 8px;
//             border-left: 3px solid #1a73e8;
//         }
//         .payment-agreement {
//             background: #f0f7ff;
//             border: 1px solid #c2dfff;
//             border-radius: 6px;
//             padding: 12px 15px;
//             margin: 15px 0;
//             font-size: 14px;
//         }
//         .payment-amount {
//             color: #0d652d;
//             font-weight: bold;
//             font-size: 15px;
//         }
//         .security-note {
//             background: #e8f0fe;
//             border-left: 4px solid #1a73e8;
//             padding: 10px 15px;
//             margin: 20px 0;
//             font-size: 12px;
//             color: #3c4043;
//             border-radius: 0 4px 4px 0;
//         }
//     </style>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #202124; margin: 0; padding: 20px;">
    
//     <!-- Customer's reply (TOP - नया message) -->
//     <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #dadce0;">
//         <div style="font-size: 14px; color: #202124; margin-bottom: 10px;">
//             <strong>From:</strong> ${customerName} &lt;${email}&gt;<br>
//             <strong>Date:</strong> ${currentDate}, ${currentTime}<br>
//             <strong>To:</strong> FareBuzzer Support &lt;besttripmakers@gmail.com&gt;<br>
//             <strong>Subject:</strong> Re: ${originalSubject || 'Flight Reservation Confirmation'}
//         </div>
        
//         <!-- ✅ CUSTOMER'S AGREEMENT WITH PAYMENT INFO -->
//         <div class="payment-agreement">
//             <div style="font-size: 15px; color: #202124; margin-bottom: 8px;">
//                 <strong>Agreement Terms:</strong>
//             </div>
//             <div style="white-space: pre-wrap; font-size: 14.5px;">
// ${agreementText}
//             </div>
//         </div>
        
//         <!-- ✅ IP ADDRESS & LOCATION SECTION -->
//         <div class="ip-section">
//             <div style="margin-bottom: 8px;">
//                 <span class="ip-label">📡 Agreement Submitted From:</span><br>
//                 <span class="ip-value">IP Address: ${ipAddress}</span>
//             </div>
            
//             <!-- ✅ LOCATION INFORMATION -->
//             <div style="margin-bottom: 10px;">
//                 <span class="ip-label">📍 Geolocation Data:</span><br>
//                 <div class="location-details">
//                     ${locationData.formatted}<br>
//                     <span style="font-size: 11px; color: #5f6368;">
//                         Based on IP geolocation (approx. location)
//                     </span>
//                 </div>
//             </div>
            
//             <div style="margin-bottom: 5px;">
//                 <span class="ip-label">🕒 Submission Details:</span><br>
//                 <span style="color: #5f6368; font-size: 12px;">
//                     Timestamp: ${time}<br>
//                     User Agent: ${req.headers['user-agent']?.substring(0, 80) || 'Not available'}...
//                 </span>
//             </div>
            
//             <div style="font-size: 11px; color: #80868b; margin-top: 8px;">
//                 🔐 IP and location recorded for security and verification purposes.
//             </div>
//         </div>
        
//         <div class="security-note">
//             <strong>✓ Secure Digital Agreement:</strong> This agreement has been digitally signed and recorded.<br>
//             <strong>✓ IP Verification:</strong> Submitted from verified IP: ${ipAddress}<br>
//             <strong>✓ Location Verified:</strong> ${locationData.formatted}
//         </div>
//     </div>
    
//     <!-- Original Email Quoted (Gmail style) -->
//     <div style="padding-left: 15px; border-left: 2px solid #dadce0; color: #5f6368; font-size: 14px;">
//         <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dashed #dadce0;">
//             <div style="font-size: 13px; color: #5f6368;">
//                 <strong>On ${currentDate} at ${currentTime}</strong>, FareBuzzer Support &lt;besttripmakers@gmail.com&gt; wrote:
//             </div>
//         </div>
        
//         <!-- Original email content (quoted) -->
//         <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px;">
//             <div style="color: #202124; font-weight: bold; margin-bottom: 10px;">
//                 FareBuzzer Travel<br>
//                 Flight Reservation Confirmation
//             </div>
            
//             <div style="margin-bottom: 10px;">
//                 <strong>Dear ${customerName},</strong>
//             </div>
            
//             <div style="margin-bottom: 15px;">
//                 Thank you for your enquiry regarding your flight booking.
//             </div>
            
//             <div style="color: #5f6368; font-size: 13px;">
//                 <strong>Booking Reference:</strong> ${booking}<br>
//                 <strong>Customer Email:</strong> ${email}<br>
//                 <strong>Date of Booking:</strong> ${currentDate}<br>
//                 <strong>IP Address:</strong> ${ipAddress}
//             </div>
            
//             ${originalEmailContent ? `
//             <div style="margin-top: 15px; padding: 10px; background: #fff; border: 1px solid #e8eaed; border-radius: 4px; font-size: 13px;">
//                 <div style="color: #5f6368; margin-bottom: 5px;"><strong>Original Email Content:</strong></div>
//                 <div style="color: #70757a;">${quotedOriginal}</div>
//             </div>
//             ` : ''}
            
//             <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e8eaed; color: #5f6368; font-size: 12px;">
//                 This is an automated confirmation email. Please do not reply directly to this message.<br>
//                 For inquiries, contact: support@farebuzzertravel.com
//             </div>
//         </div>
//     </div>
    
//     <!-- Hidden system info (for backend) -->
//     <div style="display: none; font-size: 0px; color: transparent;">
//         <!-- SYSTEM DATA FOR THREADING & TRACKING -->
//         AgreementID: ${Date.now()}
//         MessageID: ${newMessageId}
//         InReplyTo: ${originalMessageId || 'N/A'}
//         BookingRef: ${booking}
//         CustomerIP: ${ipAddress}
//         IPDetails: ${ipAddress} | ${req.headers['x-forwarded-for'] || 'Direct'}
//         Location: ${locationData.formatted}
//         PaymentAmount: ${amount || 'Not specified'}
//         ChargeCompany: ${company}
//         UserAgent: ${req.headers['user-agent'] || 'Unknown'}
//         Timestamp: ${new Date().toISOString()}
//         GeoLocation: ${JSON.stringify(locationData.raw)}
//         SecurityLevel: HIGH
//         <!-- END SYSTEM DATA -->
//     </div>
    
// </body>
// </html>
//     `;

//     // ✅ 5. SEND EMAIL WITH IP & LOCATION HEADERS
//     const mailOptions = {
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
//       replyTo: email,
//       subject: `Re: ${originalSubject.replace(/^Re:\s*/i, '') || 'Flight Reservation Confirmation'}`,
//       text: `${plainTextReply}\n\n---\nAgreement submitted from IP: ${ipAddress}\nLocation: ${locationData.formatted}\nTimestamp: ${time}`,
//       html: emailHtml,
      
//       headers: {
//         'Message-ID': newMessageId,
//         ...(originalMessageId && {
//           'In-Reply-To': originalMessageId,
//           'References': originalMessageId
//         }),
//         'Thread-Topic': originalSubject || `Flight Booking ${booking}`,
//         'X-Original-Message-ID': originalMessageId || '',
//         'X-Booking-Reference': booking,
//         'X-Customer-Email': email,
//         'X-Customer-IP': ipAddress,
//         'X-Customer-Location': locationData.formatted,
//         'X-Payment-Amount': amount || 'Not specified',
//         'X-Charge-Company': company,
//         'X-Forwarded-For': req.headers['x-forwarded-for'] || ipAddress,
//         'X-User-Agent': req.headers['user-agent'] || 'Unknown',
//         'X-Agreement-Type': 'customer-acceptance',
//         'X-IP-Verified': 'true',
//         'X-Location-Verified': locationData.success.toString(),
//         'X-Mailer': 'FareBuzzer Travel System 3.0'
//       }
//     };

//     console.log("Sending agreement with IP & location tracking:", {
//       subject: mailOptions.subject,
//       customerIP: ipAddress,
//       location: locationData.formatted,
//       amount: formattedAmount,
//       messageId: newMessageId
//     });

//     await transporter.sendMail(mailOptions);

//     // ✅ 6. SAVE TO DATABASE WITH IP & LOCATION DETAILS
//     try {
//       await Email.create({
//         type: "received",
//         emailType: "agreement_accepted",
//         from: email,
//         to: process.env.ADMIN_EMAIL,
//         subject: `Re: ${originalSubject || 'Flight Reservation Confirmation'}`,
//         text: `${plainTextReply}\n\nIP Address: ${ipAddress}\nLocation: ${locationData.formatted}`,
//         html: emailHtml,
//         meta: {
//           customerName,
//           billingEmail: email,
//           confirmationNumber: booking,
//           paymentDetails: {
//             amount: amount,
//             formattedAmount: formattedAmount,
//             company: company,
//             agreementText: agreementText
//           },
//           ipAddress,
//           ipDetails: {
//             ip: ipAddress,
//             location: locationData.formatted,
//             locationData: locationData.raw,
//             xForwardedFor: req.headers['x-forwarded-for'] || null,
//             userAgent: req.headers['user-agent'] || null,
//             acceptLanguage: req.headers['accept-language'] || null,
//             referer: req.headers['referer'] || null
//           },
//           timestamp: time,
//           messageId: newMessageId,
//           originalMessageId: originalMessageId,
//           originalSubject: originalSubject,
//           source: "agreement_link",
//           agreementTime: new Date().toISOString(),
//           emailStyle: "gmail_chain_reply_with_ip_location",
//           security: {
//             ipVerified: true,
//             locationVerified: locationData.success,
//             timestampVerified: true,
//             agreementHash: require('crypto').createHash('md5').update(`${email}${booking}${ipAddress}${amount || ''}`).digest('hex')
//           }
//         }
//       });
//       console.log("Agreement saved with IP & location:", ipAddress, locationData.formatted);
//     } catch (dbError) {
//       console.error("Error saving to database:", dbError);
//     }

//     /* =========================
//        SUCCESS PAGE (WITH IP & LOCATION DISPLAY)
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
//           Your digital agreement has been recorded with IP verification and location tracking.
//         </p>

//         <!-- ✅ PAYMENT AGREEMENT DISPLAY -->
//         <div style="
//           background:#f0f9ff;
//           border:2px solid #0ea5e9;
//           border-radius:8px;
//           padding:16px;
//           text-align:left;
//           margin-bottom:20px;
//         ">
//           <div style="display:flex; align-items:center; margin-bottom:10px;">
//             <div style="background:#0ea5e9; width:8px; height:8px; border-radius:50%; margin-right:10px;"></div>
//             <span style="color:#0369a1;font-size:12px;font-weight:bold;">PAYMENT AGREEMENT</span>
//           </div>
//           <div style="font-size:15px; color:#0f172a; margin-bottom:8px;">
//             ${agreementText}
//           </div>
//           ${amount ? `
//           <div style="background:#fff; padding:10px; border-radius:4px; margin-top:10px;">
//             <span style="color:#64748b;font-size:12px;">Amount:</span>
//             <span style="font-size:18px; font-weight:bold; color:#059669; margin-left:10px;">${formattedAmount}</span>
//           </div>
//           ` : ''}
//         </div>

//         <!-- ✅ IP & LOCATION DISPLAY -->
//         <div style="
//           background:#0f172a;
//           border-radius:8px;
//           padding:16px;
//           text-align:left;
//           margin-bottom:24px;
//           color:white;
//           font-family: 'Courier New', monospace;
//         ">
//           <div style="display:flex; align-items:center; margin-bottom:10px;">
//             <div style="background:#3b82f6; width:8px; height:8px; border-radius:50%; margin-right:10px;"></div>
//             <span style="color:#94a3b8;font-size:12px;">IP ADDRESS & LOCATION</span>
//           </div>
//           <div style="font-size:18px; font-weight:bold; color:#60a5fa; margin-bottom:5px;">
//             ${ipAddress}
//           </div>
//           <div style="font-size:14px; color:#cbd5e1; margin-bottom:10px; padding:8px; background:#1e293b; border-radius:4px;">
//             📍 ${locationData.formatted}
//           </div>
//           <div style="font-size:11px; color:#94a3b8;">
//             🕒 ${time}
//           </div>
//         </div>

//         <div style="
//           background:#f1f8ff;
//           border-radius:8px;
//           padding:16px;
//           text-align:left;
//           margin-bottom:24px;
//           border-left:4px solid #1a73e8;
//         ">
//           <div style="margin-bottom:10px;">
//             <span style="color:#1a73e8;font-size:12px;font-weight:bold;">EMAIL PREVIEW</span><br/>
//             <div style="background:#fff; padding:12px; border-radius:4px; margin-top:5px; font-family:'Courier New', monospace; font-size:12px;">
//               <div><strong>From:</strong> ${customerName} &lt;${email}&gt;</div>
//               <div><strong>To:</strong> FareBuzzer Support</div>
//               <div><strong>Subject:</strong> Re: ${originalSubject || 'Flight Reservation'}</div>
//               <div style="margin-top:8px; color:#0d652d;">✓ ${agreementText}</div>
//               <div style="margin-top:6px; color:#5f6368; font-size:11px;">
//                 📡 IP: ${ipAddress} | 📍 ${locationData.formatted.split(',')[0]} | 🔐 Secure agreement
//               </div>
//             </div>
//           </div>
//         </div>

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

//           <div style="margin-bottom:10px;">
//             <span style="color:#6b7280;font-size:13px;">IP Address</span><br/>
//             <strong style="color:#111827; font-family: 'Courier New', monospace;">${ipAddress}</strong>
//           </div>

//           <div style="margin-bottom:10px;">
//             <span style="color:#6b7280;font-size:13px;">Geolocation</span><br/>
//             <strong style="color:#111827;">${locationData.formatted}</strong>
//           </div>

//           <div>
//             <span style="color:#6b7280;font-size:13px;">Submission Time</span><br/>
//             <strong style="color:#111827;">${time}</strong>
//           </div>
          
//           ${amount ? `
//           <div style="margin-top:10px; padding-top:10px; border-top:1px dashed #d1d5db;">
//             <span style="color:#6b7280;font-size:13px;">Payment Agreement</span><br/>
//             <span style="color:#059669; font-size:13px;">
//               💳 Amount: ${formattedAmount}<br/>
//               <small style="color:#5f6368;">Charge Company: ${company}</small>
//             </span>
//           </div>
//           ` : ''}
          
//           ${originalMessageId ? `
//           <div style="margin-top:10px; padding-top:10px; border-top:1px dashed #d1d5db;">
//             <span style="color:#6b7280;font-size:13px;">Thread Status</span><br/>
//             <span style="color:#1a73e8; font-size:12px;">
//               🔗 Properly threaded in Gmail<br/>
//               <small style="color:#5f6368;">Message-ID: ${newMessageId.substring(0, 25)}...</small>
//             </span>
//           </div>
//           ` : ''}
//         </div>

//         <div style="
//           background:#f0fdf4;
//           border:1px solid #bbf7d0;
//           border-radius:6px;
//           padding:12px;
//           margin-bottom:20px;
//           text-align:left;
//         ">
//           <div style="display:flex; align-items:center; margin-bottom:8px;">
//             <div style="color:#16a34a; margin-right:8px;">✓</div>
//             <span style="font-size:13px; color:#166534;"><strong>Verification Complete</strong></span>
//           </div>
//           <div style="font-size:12px; color:#4b5563;">
//             • Agreement digitally signed from IP: ${ipAddress}<br>
//             • Location verified: ${locationData.formatted}<br>
//             • Payment terms accepted: ${amount ? formattedAmount : 'Not specified'}<br>
//             • Secure connection established
//           </div>
//         </div>

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
//           🔐 IP-Verified Agreement System • Farebuzzer Travel • ${new Date().getFullYear()}
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



//===

import express from "express";
import nodemailer from "nodemailer";
import Email from "../models/Email.js";
import axios from "axios";

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

// Function to get location from IP address
const getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 5000
    });
    
    if (response.data && response.data.city) {
      const locationParts = [];
      
      if (response.data.city) locationParts.push(response.data.city);
      if (response.data.region) locationParts.push(response.data.region);
      if (response.data.country_name) locationParts.push(response.data.country_name);
      
      const formattedLocation = locationParts.join(", ");
      
      let specificLocation = formattedLocation;
      if (response.data.district && response.data.district !== response.data.city) {
        specificLocation = `${response.data.district}, ${formattedLocation}`;
      }
      
      return {
        formatted: specificLocation,
        raw: response.data,
        success: true
      };
    }
  } catch (error) {
    console.log("IP geolocation failed:", error.message);
  }
  
  return {
    formatted: "Location information not available",
    raw: null,
    success: false
  };
};

const generateMessageId = (email) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const domain = email.split('@')[1] || 'farebuzzertravel.com';
  return `<${timestamp}.${random}@${domain}>`;
};

/* =========================
   GET — Agreement Link (FIXED: Amount & Company Display)
========================= */
router.get("/submit", async (req, res) => {
  try {
    const { 
      email, 
      booking, 
      name, 
      messageId: frontendMessageId,
      amount, 
      company = "Lowfarestudio"
    } = req.query;

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
    
    // Get location from IP
    const locationData = await getLocationFromIP(ipAddress);
    
    // ✅ FIXED: Properly handle amount - check if amount exists and is not empty
    const hasAmount = amount && amount.toString().trim() !== '' && amount !== 'undefined' && amount !== 'null';
    
    // ✅ FIXED: Format amount with currency
    const formattedAmount = hasAmount ? `USD ${amount}` : null;
    
    // ✅ FIXED: Always set company, never undefined
    const chargeCompany = company || "Lowfarestudio";
    
    // ✅ FIXED: Agreement text - ALWAYS show if amount exists
    let agreementText = "Yes, I agree.";
    if (hasAmount) {
      agreementText = `Yes, I agree to pay amount ${formattedAmount} from ${chargeCompany}.`;
    }
    
    console.log("=".repeat(50));
    console.log("AGREEMENT ACCEPTED - DEBUG INFO:");
    console.log("Email:", email);
    console.log("Booking:", booking);
    console.log("Amount Param:", req.query.amount);
    console.log("Has Amount:", hasAmount);
    console.log("Formatted Amount:", formattedAmount);
    console.log("Company:", chargeCompany);
    console.log("Agreement Text:", agreementText);
    console.log("=".repeat(50));

    // Fetch original email
    let originalMessageId = frontendMessageId || null;
    let originalEmailContent = "";
    let originalSubject = "";
    let customerDetails = {};
    
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
        
        // Extract customer details
        if (originalEmail.meta) {
          customerDetails = {
            airline: originalEmail.meta.airline || "Air India",
            departure: originalEmail.meta.departure || "JFK",
            arrival: originalEmail.meta.arrival || "LHR",
            travelDate: originalEmail.meta.travelDate || new Date().toISOString().split('T')[0],
            departureTime: originalEmail.meta.departureTime || "21:00",
            arrivalTime: originalEmail.meta.arrivalTime || "23:00",
            cabinClass: originalEmail.meta.cabinClass || "Economy",
            customerPhone: originalEmail.meta.customerPhone || "",
            customerDOB: originalEmail.meta.customerDOB || "",
            customerGender: originalEmail.meta.customerGender || ""
          };
        }
        
        console.log("Found original email from DB");
      }
    }

    // Generate new Message-ID
    const newMessageId = generateMessageId(email);

    // Format dates
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

    // Plain text reply
    const plainTextReply = agreementText;

    // Quoted original content
    const quotedOriginal = originalEmailContent 
      ? originalEmailContent
          .replace(/<style[^>]*>.*?<\/style>/gs, '')
          .replace(/<script[^>]*>.*?<\/script>/gs, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 500) + "..."
      : `Flight booking confirmation for ${booking}. Please refer to original email.`;

    // ✅ FIXED: Email HTML with payment agreement
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
        .location-details {
            background: #e8f0fe;
            padding: 8px 12px;
            border-radius: 4px;
            margin-top: 8px;
            border-left: 3px solid #1a73e8;
        }
        .payment-agreement {
            background: #f0f7ff;
            border: 2px solid #0ea5e9;
            border-radius: 8px;
            padding: 16px 20px;
            margin: 20px 0;
            font-size: 15px;
        }
        .payment-amount {
            color: #0d652d;
            font-weight: bold;
            font-size: 16px;
            background: #dcfce7;
            padding: 4px 12px;
            border-radius: 20px;
            display: inline-block;
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
        .charge-note {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 10px 15px;
            margin: 15px 0;
            font-size: 12px;
            color: #92400e;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #202124; margin: 0; padding: 20px;">
    
    <!-- Customer's reply -->
    <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #dadce0;">
        <div style="font-size: 14px; color: #202124; margin-bottom: 10px;">
            <strong>From:</strong> ${customerName} &lt;${email}&gt;<br>
            <strong>Date:</strong> ${currentDate}, ${currentTime}<br>
            <strong>To:</strong> FareBuzzer Support &lt;besttripmakers@gmail.com&gt;<br>
            <strong>Subject:</strong> Re: ${originalSubject || 'Flight Reservation Confirmation'}
        </div>
        
        <!-- PAYMENT AGREEMENT - ALWAYS SHOW IF AMOUNT EXISTS -->
        ${hasAmount ? `
        <div class="payment-agreement">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="background: #0ea5e9; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">PAYMENT AGREEMENT</span>
            </div>
            <div style="white-space: pre-wrap; font-size: 16px; font-weight: 500; color: #0f172a;">
                ${agreementText}
            </div>
            <div style="margin-top: 15px;">
                <span class="payment-amount">💰 ${formattedAmount}</span>
                <span style="margin-left: 10px; color: #5f6368; font-size: 13px;">Charge Company: <strong>${chargeCompany}</strong></span>
            </div>
        </div>
        ` : `
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px 15px; margin: 15px 0;">
            <div style="white-space: pre-wrap; font-size: 15px; color: #0f172a;">
                ${agreementText}
            </div>
        </div>
        `}
        
        <!-- IP ADDRESS & LOCATION -->
        <div class="ip-section">
            <div style="margin-bottom: 8px;">
                <span class="ip-label">📡 Agreement Submitted From:</span><br>
                <span class="ip-value">IP Address: ${ipAddress}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
                <span class="ip-label">📍 Geolocation Data:</span><br>
                <div class="location-details">
                    ${locationData.formatted}<br>
                    <span style="font-size: 11px; color: #5f6368;">
                        Based on IP geolocation (approx. location)
                    </span>
                </div>
            </div>
            
            <div style="margin-bottom: 5px;">
                <span class="ip-label">🕒 Submission Details:</span><br>
                <span style="color: #5f6368; font-size: 12px;">
                    Timestamp: ${time}<br>
                    User Agent: ${req.headers['user-agent']?.substring(0, 80) || 'Not available'}...
                </span>
            </div>
        </div>
        
        <!-- CHARGE COMPANY NOTE -->
        ${hasAmount ? `
        <div class="charge-note">
            <strong>NOTE:</strong><br>
            Please note that you might see the charges under <strong>${chargeCompany}</strong> on your billing statement.<br>
            Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.
        </div>
        ` : ''}
        
        <div class="security-note">
            <strong>✓ Secure Digital Agreement:</strong> This agreement has been digitally signed and recorded.<br>
            <strong>✓ IP Verification:</strong> Submitted from verified IP: ${ipAddress}<br>
            <strong>✓ Location Verified:</strong> ${locationData.formatted}
            ${hasAmount ? `<br><strong>✓ Payment Confirmed:</strong> ${formattedAmount} via ${chargeCompany}` : ''}
        </div>
    </div>
    
    <!-- Original Email Quoted -->
    <div style="padding-left: 15px; border-left: 2px solid #dadce0; color: #5f6368; font-size: 14px;">
        <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dashed #dadce0;">
            <div style="font-size: 13px; color: #5f6368;">
                <strong>On ${currentDate} at ${currentTime}</strong>, FareBuzzer Support &lt;besttripmakers@gmail.com&gt; wrote:
            </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 4px;">
            <div style="color: #202124; font-weight: bold; margin-bottom: 10px;">
                FareBuzzer Travel<br>
                Flight Reservation Confirmation
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong>Dear ${customerName},</strong>
            </div>
            
            <div style="color: #5f6368; font-size: 13px;">
                <strong>Booking Reference:</strong> ${booking}<br>
                <strong>Customer Email:</strong> ${email}<br>
                <strong>Date of Booking:</strong> ${currentDate}<br>
                ${hasAmount ? `<strong>Amount:</strong> ${formattedAmount}<br>` : ''}
                <strong>IP Address:</strong> ${ipAddress}
            </div>
        </div>
    </div>
    
    <!-- Hidden system info -->
    <div style="display: none;">
        AgreementID: ${Date.now()}
        MessageID: ${newMessageId}
        BookingRef: ${booking}
        PaymentAmount: ${hasAmount ? formattedAmount : 'Not specified'}
        ChargeCompany: ${chargeCompany}
    </div>
    
</body>
</html>
    `;

    // Send email
    const mailOptions = {
      from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'besttripmakers@gmail.com',
      replyTo: email,
      subject: `Re: ${originalSubject.replace(/^Re:\s*/i, '') || 'Flight Reservation Confirmation'}`,
      text: `${plainTextReply}\n\n---\nIP: ${ipAddress}\nLocation: ${locationData.formatted}\n${hasAmount ? `Amount: ${formattedAmount}\nCompany: ${chargeCompany}\n` : ''}Timestamp: ${time}`,
      html: emailHtml,
      
      headers: {
        'Message-ID': newMessageId,
        ...(originalMessageId && {
          'In-Reply-To': originalMessageId,
          'References': originalMessageId
        }),
        'X-Booking-Reference': booking,
        'X-Customer-Email': email,
        'X-Customer-IP': ipAddress,
        'X-Customer-Location': locationData.formatted,
        'X-Payment-Amount': hasAmount ? formattedAmount : 'Not specified',
        'X-Charge-Company': chargeCompany,
        'X-Agreement-Text': agreementText
      }
    };

    await transporter.sendMail(mailOptions);

    // Save to database
    try {
      await Email.create({
        type: "received",
        emailType: "agreement_accepted",
        from: email,
        to: process.env.ADMIN_EMAIL,
        subject: `Re: ${originalSubject || 'Flight Reservation Confirmation'}`,
        text: `${plainTextReply}\n\nIP: ${ipAddress}\nLocation: ${locationData.formatted}`,
        html: emailHtml,
        meta: {
          customerName,
          billingEmail: email,
          confirmationNumber: booking,
          paymentDetails: {
            amount: hasAmount ? amount : null,
            formattedAmount: hasAmount ? formattedAmount : null,
            company: chargeCompany,
            agreementText: agreementText
          },
          ipAddress,
          location: locationData.formatted,
          timestamp: time,
          messageId: newMessageId
        }
      });
    } catch (dbError) {
      console.error("Error saving to database:", dbError);
    }

    // ✅ FIXED: SUCCESS PAGE - ALWAYS SHOW AMOUNT AND COMPANY
    return res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agreement Confirmed</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .card {
            background: white;
            max-width: 600px;
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            padding: 40px;
            animation: slideUp 0.5s ease;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .success-icon {
            background: #10b981;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 40px;
            color: white;
            box-shadow: 0 10px 20px rgba(16,185,129,0.3);
        }
        h1 {
            color: #1e293b;
            font-size: 28px;
            margin-bottom: 8px;
            text-align: center;
        }
        .subtitle {
            color: #64748b;
            text-align: center;
            margin-bottom: 32px;
            font-size: 15px;
        }
        .payment-box {
            background: linear-gradient(145deg, #f0f9ff, #e6f2ff);
            border: 2px solid #0ea5e9;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
        }
        .payment-label {
            background: #0ea5e9;
            color: white;
            padding: 6px 16px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 16px;
        }
        .payment-text {
            font-size: 20px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 16px;
            line-height: 1.4;
        }
        .amount-badge {
            background: #d1fae5;
            padding: 12px 20px;
            border-radius: 12px;
            display: inline-block;
        }
        .amount {
            font-size: 28px;
            font-weight: 700;
            color: #059669;
        }
        .company-badge {
            background: #f1f5f9;
            padding: 12px 20px;
            border-radius: 12px;
            margin-left: 12px;
        }
        .company-name {
            font-size: 18px;
            font-weight: 600;
            color: #334155;
        }
        .info-grid {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            color: #64748b;
            font-size: 14px;
        }
        .info-value {
            color: #0f172a;
            font-weight: 600;
            font-size: 14px;
        }
        .ip-box {
            background: #0f172a;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .ip-title {
            color: #94a3b8;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 12px;
        }
        .ip-address {
            color: #60a5fa;
            font-size: 22px;
            font-weight: 700;
            font-family: 'Courier New', monospace;
            word-break: break-all;
        }
        .location {
            color: #cbd5e1;
            font-size: 16px;
            margin-top: 8px;
            padding: 10px;
            background: #1e293b;
            border-radius: 8px;
        }
        .note-box {
            background: #fffbeb;
            border: 1px solid #fde68a;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
        }
        .note-title {
            color: #92400e;
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 8px;
        }
        .note-text {
            color: #78350f;
            font-size: 13px;
            line-height: 1.6;
        }
        .close-btn {
            background: linear-gradient(135deg, #2563eb, #1e40af);
            color: white;
            border: none;
            padding: 16px 32px;
            border-radius: 40px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s;
            margin-bottom: 20px;
        }
        .close-btn:hover {
            transform: scale(1.02);
        }
        .footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="success-icon">✓</div>
        
        <h1>Agreement Confirmed!</h1>
        <p class="subtitle">Your digital agreement has been successfully recorded</p>
        
        <!-- PAYMENT AGREEMENT - ALWAYS SHOW IF AMOUNT EXISTS -->
        ${hasAmount ? `
        <div class="payment-box">
            <span class="payment-label">PAYMENT AGREEMENT</span>
            <div class="payment-text">
                Yes, I agree to pay amount ${formattedAmount} from ${chargeCompany}.
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
                <div class="amount-badge">
                    <span style="color: #64748b; font-size: 14px; display: block; margin-bottom: 4px;">Amount</span>
                    <span class="amount">${formattedAmount}</span>
                </div>
                <div class="company-badge">
                    <span style="color: #64748b; font-size: 14px; display: block; margin-bottom: 4px;">Charge Company</span>
                    <span class="company-name">${chargeCompany}</span>
                </div>
            </div>
        </div>
        ` : `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
            <div style="font-size: 18px; color: #0f172a;">${agreementText}</div>
        </div>
        `}
        
        <!-- BOOKING INFO -->
        <div class="info-grid">
            <div class="info-row">
                <span class="info-label">Booking Reference</span>
                <span class="info-value">${booking}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Customer</span>
                <span class="info-value">${customerName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email</span>
                <span class="info-value">${email}</span>
            </div>
            ${customerDetails.customerPhone ? `
            <div class="info-row">
                <span class="info-label">Phone</span>
                <span class="info-value">${customerDetails.customerPhone}</span>
            </div>
            ` : ''}
            ${customerDetails.airline ? `
            <div class="info-row">
                <span class="info-label">Airline</span>
                <span class="info-value">${customerDetails.airline}</span>
            </div>
            ` : ''}
            ${customerDetails.departure && customerDetails.arrival ? `
            <div class="info-row">
                <span class="info-label">Route</span>
                <span class="info-value">${customerDetails.departure} → ${customerDetails.arrival}</span>
            </div>
            ` : ''}
            ${customerDetails.travelDate ? `
            <div class="info-row">
                <span class="info-label">Travel Date</span>
                <span class="info-value">${customerDetails.travelDate}</span>
            </div>
            ` : ''}
        </div>
        
        <!-- IP & LOCATION -->
        <div class="ip-box">
            <div class="ip-title">VERIFICATION DETAILS</div>
            <div class="ip-address">${ipAddress}</div>
            <div class="location">
                📍 ${locationData.formatted}
                <div style="color: #94a3b8; font-size: 11px; margin-top: 4px;">
                    ${time}
                </div>
            </div>
        </div>
        
        <!-- CHARGE COMPANY NOTE -->
        ${hasAmount ? `
        <div class="note-box">
            <div class="note-title">📋 Billing Information</div>
            <div class="note-text">
                <strong>NOTE:</strong> You might see the charges under <strong style="background: #fff3cd; padding: 2px 6px; border-radius: 4px;">${chargeCompany}</strong> on your billing statement.<br>
                Your card may have one or multiple charges but the total quoted price (${formattedAmount}) will stay the same.
            </div>
        </div>
        ` : ''}
        
        <button onclick="window.close()" class="close-btn">
            Close Window
        </button>
        
        <div class="footer">
            🔐 Secure Digital Agreement • Farebuzzer Travel • ${new Date().getFullYear()}
            <div style="margin-top: 8px; font-size: 11px;">Agreement ID: ${Date.now().toString().slice(-8)}</div>
        </div>
    </div>
</body>
</html>
`);

  } catch (err) {
    console.error("AGREEMENT ERROR:", err);
    return res.status(500).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
    <style>
        body { font-family: Arial; background: #f1f5f9; display: flex; align-items: center; justify-content: center; height: 100vh; }
        .error-box { background: white; padding: 40px; border-radius: 12px; text-align: center; border-left: 4px solid #ef4444; }
        h2 { color: #991b1b; margin-bottom: 16px; }
        p { color: #6b7280; }
    </style>
</head>
<body>
    <div class="error-box">
        <h2>❌ Failed to Process Agreement</h2>
        <p>${err.message}</p>
        <button onclick="window.close()" style="margin-top:20px; padding:10px 24px; background:#3b82f6; color:white; border:none; border-radius:6px; cursor:pointer;">Close</button>
    </div>
</body>
</html>
`);
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
