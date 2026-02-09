

//============with template==========
// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       templateUsed, // NEW: Added template reference
//       customerName,
//       customerPhone,
//       billingEmail,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage
//     } = req.body;

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
    
//     if (!phoneRegex.test(customerPhone.trim())) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "New Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation", // NEW
//       travel_insurance: "Travel Insurance Confirmation" // NEW
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";

//     /* ---------------- DYNAMIC GREETING LOGIC ---------------- */
//     const getDynamicGreeting = () => {
//       // Priority: destination > category > searchQuery > default
      
//       // If destination is provided (most specific)
//       if (destination && typeof destination === 'string') {
//         const dest = destination.trim().toLowerCase();
//         if (dest.includes('kashmir')) return "regarding the Kashmir package";
//         if (dest.includes('manali')) return "regarding the Manali package";
//         if (dest.includes('goa')) return "regarding the Goa package";
//         if (dest.includes('leh') || dest.includes('ladakh')) return "regarding the Leh-Ladakh package";
//         if (dest.includes('shimla')) return "regarding the Shimla package";
//         if (dest.includes('ooty')) return "regarding the Ooty package";
//         if (dest.includes('maldives')) return "regarding the Maldives package";
//         if (dest.includes('dubai')) return "regarding the Dubai package";
//         if (dest.includes('bali')) return "regarding the Bali package";
//         if (dest.includes('thailand')) return "regarding the Thailand package";
//         if (dest.includes('singapore')) return "regarding the Singapore package";
//         return `regarding the ${destination} package`;
//       }
      
//       // If category is provided
//       if (category && typeof category === 'string') {
//         const cat = category.trim().toLowerCase();
//         if (cat.includes('flight')) return "regarding the flight booking";
//         if (cat.includes('hotel')) return "regarding the hotel booking";
//         if (cat.includes('car') || cat.includes('rental')) return "regarding the car rental";
//         if (cat.includes('package') || cat.includes('tour')) return "regarding the holiday package";
//         if (cat.includes('cruise')) return "regarding the cruise booking";
//         if (cat.includes('visa')) return "regarding the visa assistance";
//         if (cat.includes('insurance')) return "regarding the travel insurance";
//       }
      
//       // If search query is provided, extract keywords
//       if (searchQuery && typeof searchQuery === 'string') {
//         const query = searchQuery.toLowerCase();
        
//         // Check for destinations
//         const destinations = [
//           'kashmir', 'manali', 'goa', 'leh', 'ladakh', 'shimla', 'darjeeling',
//           'munnar', 'kerala', 'rajasthan', 'jaipur', 'udaipur', 'agra', 'varanasi',
//           'andaman', 'maldives', 'dubai', 'bali', 'thailand', 'singapore', 'malaysia',
//           'europe', 'usa', 'canada', 'australia', 'new zealand'
//         ];
        
//         for (const dest of destinations) {
//           if (query.includes(dest)) {
//             return `regarding the ${dest.charAt(0).toUpperCase() + dest.slice(1)} package`;
//           }
//         }
        
//         // Check for categories
//         if (query.includes('flight') || query.includes('air ticket') || query.includes('airline')) {
//           return "regarding the flight booking";
//         }
//         if (query.includes('hotel') || query.includes('accommodation') || query.includes('resort')) {
//           return "regarding the hotel booking";
//         }
//         if (query.includes('car') || query.includes('rental') || query.includes('vehicle')) {
//           return "regarding the car rental";
//         }
//         if (query.includes('package') || query.includes('tour') || query.includes('holiday')) {
//           return "regarding the holiday package";
//         }
//       }
      
//       // Default dynamic greeting based on email type
//       switch(emailType) {
//         case 'flight_confirmation':
//         case 'new_reservation':
//           return "regarding your flight booking";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();

//     /* ---------------- EMAIL BODY (UPDATED: Added phone in all cases) ---------------- */
//     let message = "";

//     switch (emailType) {
//       case "new_reservation":
//         message = `
//           <p>Your flight reservation has been successfully confirmed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Airline:</b> ${airline}</p>
//           <p><b>Route:</b> ${departure} → ${arrival}</p>
//           <p><b>Travel Date:</b> ${travelDate}</p>
//           <p><b>Booking Amount:</b> USD ${bookingAmount}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "exchange_ticket":
//         message = `
//           <p>Your ticket exchange request has been processed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Original Date:</b> ${oldTravelDate}</p>
//           <p><b>New Date:</b> ${newTravelDate}</p>
//           <p><b>Change Fee:</b> USD ${changeFee}</p>
//           <p><b>Fare Difference:</b> USD ${fareDifference}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "flight_cancellation":
//         message = `
//           <p>Your flight booking has been cancelled successfully.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Cancellation Date:</b> ${cancellationDate}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "refund_request":
//         message = `
//           <p>Your refund request has been received and is under processing.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Refund Amount:</b> USD ${refundAmount}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           <p>Amount will be credited within 5–10 business days.</p>
//         `;
//         break;

//       case "seat_addons":
//         message = `
//           <p>Your seat selection / add-ons request has been confirmed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "name_correction":
//         message = `
//           <p>Your name correction request has been received.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           <p>Our team will verify and update shortly.</p>
//         `;
//         break;

//       case "add_pet":
//         message = `
//           <p>Your pet addition request has been confirmed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "flight_confirmation":
//         message = `
//           <p>Your flight booking is fully confirmed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Airline:</b> ${airline}</p>
//           <p><b>Route:</b> ${departure} → ${arrival}</p>
//           <p><b>Date:</b> ${travelDate}</p>
//         `;
//         break;

//       case "hotel_booking":
//         message = `
//           <p>Your hotel booking has been successfully confirmed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Hotel:</b> ${hotelName || "Not specified"}</p>
//           <p><b>Room Type:</b> ${roomType || "Standard"}</p>
//           <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "car_rental":
//         message = `
//           <p>Your car rental booking has been confirmed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Car Type:</b> ${carType || "Standard"}</p>
//           <p><b>Rental Days:</b> ${rentalDays || "1"}</p>
//           <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "customer_support":
//         message = `
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p>${customMessage || "Thank you for contacting FareBuzzer support."}</p>
//         `;
//         break;

//       case "holiday_package": // NEW
//         message = `
//           <p>Your holiday package booking has been confirmed.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Package Name:</b> ${packageName || "Holiday Package"}</p>
//           <p><b>Duration:</b> ${packageNights || "1"} night(s)</p>
//           <p><b>Travel Dates:</b> ${packageStartDate || "Not specified"} to ${packageEndDate || "Not specified"}</p>
//           <p><b>Number of Persons:</b> ${numberOfPersons || "2"}</p>
//           <p><b>Package Price:</b> USD ${packagePrice || "0.00"}</p>
//           <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "travel_insurance": // NEW
//         message = `
//           <p>Your travel insurance has been successfully booked.</p>
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p><b>Insurance Type:</b> ${insuranceType || "Comprehensive Travel Insurance"}</p>
//           <p><b>Coverage:</b> ${insuranceCoverage || "Standard Coverage"}</p>
//           <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       default:
//         message = `
//           <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//           <p><b>Email:</b> ${billingEmail}</p>
//           <p>Thank you for choosing FareBuzzer.</p>
//         `;
//     }

//     /* ---------------- FINAL HTML (UPDATED: Dynamic greeting) ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html
//     });

//     /* ---------------- SAVE TO CRM INBOX (UPDATED: Added new fields and templateUsed) ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null, // NEW: Save template reference
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null // NEW: Return template info
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined
//     });
//   }
// };

//===========22 jan====ONLY SEND FLIGHT TICKET======

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       templateUsed,

//       customerName,
//       customerPhone,
//       billingEmail,

//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,

//       customMessage,

//       // 🔹 Payment display name
//       chargeReference = "LowfareStudio",

//        cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       duration
//     } = req.body;

//     /* ---------------- VALIDATION ---------------- */
//     if (!customerName || !customerPhone || !billingEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number and email are required"
//       });
//     }
//     if (!confirmationNumber) {
//   return res.status(400).json({
//     status: "fail",
//     message: "confirmationNumber is required"
//   });
// }


//     const phoneRegex = /^[+]?[0-9\s\-()]{8,20}$/;
//     if (!phoneRegex.test(customerPhone.trim())) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format"
//       });
//     }

//     /* ---------------- SUBJECT ---------------- */
//     const subjectMap = {
//       flight_confirmation: "Flight Booking Confirmation",
//       new_reservation: "New Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received"
//     };

//     const subject =
//       subjectMap[emailType] || "FareBuzzer Travel Notification";

//     /* ---------------- EMAIL MESSAGE ---------------- */
//     let message = "";

//     if (
//       emailType === "flight_confirmation" ||
//       emailType === "new_reservation"
//     ) {

//        const ticketPath = await generateETicket({
//         confirmationNumber,
//         customerName,
//         customerPhone,
//         billingEmail,
//         airline,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         chargeReference,
//         // Pass the new fields
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         duration
//       });


//       message = `
//         <p>Your flight booking is fully confirmed.</p>

//         <p><b>Passenger:</b> ${customerName} (${customerPhone})</p>
//         <p><b>Email:</b> ${billingEmail}</p>
//         <p><b>Airline:</b> ${airline}</p>
//         <p><b>Route:</b> ${departure} → ${arrival}</p>
//         <p><b>Travel Date:</b> ${travelDate}</p>

//         <div style="margin-top:15px;padding:15px;background:#f1f5f9;border-radius:8px;">
//           <p><b>Payment Summary</b></p>
//           <p>Amount Charged: <b>USD ${bookingAmount}</b></p>
//           <p>Charge Reference: <b>${chargeReference}</b></p>
//           <p style="font-family:monospace;">
//             ${chargeReference.toUpperCase()}*TRAVEL<br/>
//             USD ${bookingAmount}
//           </p>
//         </div>

//         <p style="margin-top:15px;">
//           Please find your <b>e-ticket attached</b> with this email.
//         </p>
//       `;
//     } else {
//       message = `
//         <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//         <p><b>Email:</b> ${billingEmail}</p>
//         <p>${customMessage || "Thank you for choosing FareBuzzer Travel."}</p>
//       `;
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:auto;">
//         <h2 style="color:#10b981;">✈️ FareBuzzer Travel</h2>
//         <h3>${subject}</h3>

//         ${message}

//         <hr style="margin:30px 0"/>

//         <p style="font-size:13px;color:#64748b;">
//           <b>FareBuzzer Travel Support</b><br/>
//           📧 enquiry@farebuzzertravel.com<br/>
//           📞 844 784 3676
//         </p>

//         <p style="font-size:12px;color:#94a3b8;text-align:center;">
//           © ${new Date().getFullYear()} FareBuzzer Travel
//         </p>
//       </div>
//     `;

//     /* ---------------- ATTACHMENTS ---------------- */
//     const attachments = [];

//     if (
//       emailType === "flight_confirmation" ||
//       emailType === "new_reservation"
//     ) {
//       const ticketPath = await generateETicket({
//         confirmationNumber,
//         customerName,
//         customerPhone,
//         billingEmail,
//         airline,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         chargeReference
//       });

//       attachments.push({
//         filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//         path: ticketPath,
//         contentType: "application/pdf"
//       });
//     }

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         airline,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         confirmationNumber,
//         chargeReference
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Email sent successfully with e-ticket",
//       data: {
//         customerName,
//         billingEmail,
//         emailType
//       }
//     });
//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email"
//     });
//   }
// };



//=====23 jan============

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       customMessage,
//       chargeReference = "LowfareStudio",
//       // NEW fields
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal
//     } = req.body;

//     /* ---------------- VALIDATION ---------------- */
//     if (!customerName || !customerPhone || !billingEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number and email are required"
//       });
//     }
    
//     if (!confirmationNumber) {
//       return res.status(400).json({
//         status: "fail",
//         message: "confirmationNumber is required"
//       });
//     }

//     const phoneRegex = /^[+]?[0-9\s\-()]{8,20}$/;
//     if (!phoneRegex.test(customerPhone.trim())) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format"
//       });
//     }

//     /* ---------------- SUBJECT ---------------- */
//     const subjectMap = {
//       flight_confirmation: "Flight Booking Confirmation",
//       new_reservation: "New Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Travel Notification";

//     /* ---------------- EMAIL MESSAGE ---------------- */
//     let message = "";

//     if (emailType === "flight_confirmation" || emailType === "new_reservation") {
//       message = `
//         <p>Your flight booking is fully confirmed.</p>

//         <p><b>Passenger:</b> ${customerName} (${customerPhone})</p>
//         <p><b>Email:</b> ${billingEmail}</p>
//         <p><b>Airline:</b> ${airline}</p>
//         <p><b>Route:</b> ${departure} → ${arrival}</p>
//         <p><b>Travel Date:</b> ${travelDate}</p>
//         ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//         ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//         ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}

//         <div style="margin-top:15px;padding:15px;background:#f1f5f9;border-radius:8px;">
//           <p><b>Payment Summary</b></p>
//           <p>Amount Charged: <b>USD ${bookingAmount}</b></p>
//           <p>Charge Reference: <b>${chargeReference}</b></p>
//           <p style="font-family:monospace;">
//             ${chargeReference.toUpperCase()}*TRAVEL<br/>
//             USD ${bookingAmount}
//           </p>
//         </div>

//         <p style="margin-top:15px;">
//           Please find your <b>e-ticket attached</b> with this email.
//         </p>
//       `;
//     } else {
//       message = `
//         <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//         <p><b>Email:</b> ${billingEmail}</p>
//         <p>${customMessage || "Thank you for choosing FareBuzzer Travel."}</p>
//       `;
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:auto;">
//         <h2 style="color:#10b981;">✈️ FareBuzzer Travel</h2>
//         <h3>${subject}</h3>

//         ${message}

//         <hr style="margin:30px 0"/>

//         <p style="font-size:13px;color:#64748b;">
//           <b>FareBuzzer Travel Support</b><br/>
//           📧 enquiry@farebuzzertravel.com<br/>
//           📞 844 784 3676
//         </p>

//         <p style="font-size:12px;color:#94a3b8;text-align:center;">
//           © ${new Date().getFullYear()} FareBuzzer Travel
//         </p>
//       </div>
//     `;

//     /* ---------------- ATTACHMENTS ---------------- */
//     const attachments = [];

//     if (emailType === "flight_confirmation" || emailType === "new_reservation") {
//       const ticketPath = await generateETicket({
//         confirmationNumber,
//         customerName,
//         customerPhone,
//         billingEmail,
//         airline,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         chargeReference,
//         // Pass all fields
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal
//       });

//       attachments.push({
//         filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//         path: ticketPath,
//         contentType: "application/pdf"
//       });
//     }

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         airline,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         confirmationNumber,
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Email sent successfully with e-ticket",
//       data: {
//         customerName,
//         billingEmail,
//         emailType
//       }
//     });
//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email"
//     });
//   }
// };



//========merge===correct====

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // FLIGHT TICKET SPECIFIC FIELDS
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal
//     } = req.body;

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
    
//     if (!phoneRegex.test(customerPhone.trim())) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     // Additional validation for flight ticket forms
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       if (!confirmationNumber) {
//         return res.status(400).json({
//           status: "fail",
//           message: "confirmationNumber is required for flight tickets"
//         });
//       }
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";

//     /* ---------------- DYNAMIC GREETING LOGIC (only for non-flight-ticket forms) ---------------- */
//     const getDynamicGreeting = () => {
//       // For flight tickets, use a simpler greeting
//       if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//         return "regarding your flight booking";
//       }
      
//       // Priority: destination > category > searchQuery > default
      
//       // If destination is provided (most specific)
//       if (destination && typeof destination === 'string') {
//         const dest = destination.trim().toLowerCase();
//         if (dest.includes('kashmir')) return "regarding the Kashmir package";
//         if (dest.includes('manali')) return "regarding the Manali package";
//         if (dest.includes('goa')) return "regarding the Goa package";
//         if (dest.includes('leh') || dest.includes('ladakh')) return "regarding the Leh-Ladakh package";
//         if (dest.includes('shimla')) return "regarding the Shimla package";
//         if (dest.includes('ooty')) return "regarding the Ooty package";
//         if (dest.includes('maldives')) return "regarding the Maldives package";
//         if (dest.includes('dubai')) return "regarding the Dubai package";
//         if (dest.includes('bali')) return "regarding the Bali package";
//         if (dest.includes('thailand')) return "regarding the Thailand package";
//         if (dest.includes('singapore')) return "regarding the Singapore package";
//         return `regarding the ${destination} package`;
//       }
      
//       // If category is provided
//       if (category && typeof category === 'string') {
//         const cat = category.trim().toLowerCase();
//         if (cat.includes('flight')) return "regarding the flight booking";
//         if (cat.includes('hotel')) return "regarding the hotel booking";
//         if (cat.includes('car') || cat.includes('rental')) return "regarding the car rental";
//         if (cat.includes('package') || cat.includes('tour')) return "regarding the holiday package";
//         if (cat.includes('cruise')) return "regarding the cruise booking";
//         if (cat.includes('visa')) return "regarding the visa assistance";
//         if (cat.includes('insurance')) return "regarding the travel insurance";
//       }
      
//       // If search query is provided, extract keywords
//       if (searchQuery && typeof searchQuery === 'string') {
//         const query = searchQuery.toLowerCase();
        
//         // Check for destinations
//         const destinations = [
//           'kashmir', 'manali', 'goa', 'leh', 'ladakh', 'shimla', 'darjeeling',
//           'munnar', 'kerala', 'rajasthan', 'jaipur', 'udaipur', 'agra', 'varanasi',
//           'andaman', 'maldives', 'dubai', 'bali', 'thailand', 'singapore', 'malaysia',
//           'europe', 'usa', 'canada', 'australia', 'new zealand'
//         ];
        
//         for (const dest of destinations) {
//           if (query.includes(dest)) {
//             return `regarding the ${dest.charAt(0).toUpperCase() + dest.slice(1)} package`;
//           }
//         }
        
//         // Check for categories
//         if (query.includes('flight') || query.includes('air ticket') || query.includes('airline')) {
//           return "regarding the flight booking";
//         }
//         if (query.includes('hotel') || query.includes('accommodation') || query.includes('resort')) {
//           return "regarding the hotel booking";
//         }
//         if (query.includes('car') || query.includes('rental') || query.includes('vehicle')) {
//           return "regarding the car rental";
//         }
//         if (query.includes('package') || query.includes('tour') || query.includes('holiday')) {
//           return "regarding the holiday package";
//         }
//       }
      
//       // Default dynamic greeting based on email type
//       switch(emailType) {
//         case 'flight_confirmation':
//         case 'new_reservation':
//           return "regarding your flight booking";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";
//     const attachments = [];

//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       // FLIGHT TICKET EMAIL TEMPLATE
//       message = `
//         <p>Your flight booking is fully confirmed.</p>

//         <p><b>Passenger:</b> ${customerName} (${customerPhone})</p>
//         <p><b>Email:</b> ${billingEmail}</p>
//         <p><b>Airline:</b> ${airline || 'Not specified'}</p>
//         <p><b>Route:</b> ${departure || 'Not specified'} → ${arrival || 'Not specified'}</p>
//         <p><b>Travel Date:</b> ${travelDate || 'Not specified'}</p>
//         ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//         ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//         ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}

//         <div style="margin-top:15px;padding:15px;background:#f1f5f9;border-radius:8px;">
//           <p><b>Payment Summary</b></p>
//           <p>Amount Charged: <b>USD ${bookingAmount || '0.00'}</b></p>
//           <p>Charge Reference: <b>${chargeReference || 'FareBuzzer Travel'}</b></p>
//           <p style="font-family:monospace;">
//             ${(chargeReference || 'FareBuzzer Travel').toUpperCase()}*TRAVEL<br/>
//             USD ${bookingAmount || '0.00'}
//           </p>
//         </div>

//         <p style="margin-top:15px;">
//           Please find your <b>e-ticket attached</b> with this email.
//         </p>
//       `;

//       // Generate and attach PDF ticket
//       try {
//         const ticketPath = await generateETicket({
//           confirmationNumber,
//           customerName,
//           customerPhone,
//           billingEmail,
//           airline,
//           departure,
//           arrival,
//           travelDate,
//           bookingAmount,
//           chargeReference,
//           cabinClass,
//           departureTime,
//           arrivalTime,
//           ticketNumber,
//           flightNumber,
//           fareType,
//           departureTerminal,
//           arrivalTerminal
//         });

//         attachments.push({
//           filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//           path: ticketPath,
//           contentType: "application/pdf"
//         });
//       } catch (error) {
//         console.error("Error generating e-ticket:", error);
//         // Continue without attachment if PDF generation fails
//       }
//     } else {
//       // GENERAL EMAIL TEMPLATE (from code 1)
//       switch (emailType) {
//         case "new_reservation":
//           message = `
//             <p>Your flight reservation has been successfully confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Airline:</b> ${airline}</p>
//             <p><b>Route:</b> ${departure} → ${arrival}</p>
//             <p><b>Travel Date:</b> ${travelDate}</p>
//             <p><b>Booking Amount:</b> USD ${bookingAmount}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "exchange_ticket":
//           message = `
//             <p>Your ticket exchange request has been processed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Original Date:</b> ${oldTravelDate}</p>
//             <p><b>New Date:</b> ${newTravelDate}</p>
//             <p><b>Change Fee:</b> USD ${changeFee}</p>
//             <p><b>Fare Difference:</b> USD ${fareDifference}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "flight_cancellation":
//           message = `
//             <p>Your flight booking has been cancelled successfully.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Cancellation Date:</b> ${cancellationDate}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "refund_request":
//           message = `
//             <p>Your refund request has been received and is under processing.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Refund Amount:</b> USD ${refundAmount}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//             <p>Amount will be credited within 5–10 business days.</p>
//           `;
//           break;

//         case "seat_addons":
//           message = `
//             <p>Your seat selection / add-ons request has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "name_correction":
//           message = `
//             <p>Your name correction request has been received.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//             <p>Our team will verify and update shortly.</p>
//           `;
//           break;

//         case "add_pet":
//           message = `
//             <p>Your pet addition request has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "hotel_booking":
//           message = `
//             <p>Your hotel booking has been successfully confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Hotel:</b> ${hotelName || "Not specified"}</p>
//             <p><b>Room Type:</b> ${roomType || "Standard"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "car_rental":
//           message = `
//             <p>Your car rental booking has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Car Type:</b> ${carType || "Standard"}</p>
//             <p><b>Rental Days:</b> ${rentalDays || "1"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "customer_support":
//           message = `
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p>${customMessage || "Thank you for contacting FareBuzzer support."}</p>
//           `;
//           break;

//         case "holiday_package":
//           message = `
//             <p>Your holiday package booking has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Package Name:</b> ${packageName || "Holiday Package"}</p>
//             <p><b>Duration:</b> ${packageNights || "1"} night(s)</p>
//             <p><b>Travel Dates:</b> ${packageStartDate || "Not specified"} to ${packageEndDate || "Not specified"}</p>
//             <p><b>Number of Persons:</b> ${numberOfPersons || "2"}</p>
//             <p><b>Package Price:</b> USD ${packagePrice || "0.00"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "travel_insurance":
//           message = `
//             <p>Your travel insurance has been successfully booked.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Insurance Type:</b> ${insuranceType || "Comprehensive Travel Insurance"}</p>
//             <p><b>Coverage:</b> ${insuranceCoverage || "Standard Coverage"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         default:
//           message = `
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p>Thank you for choosing FareBuzzer.</p>
//           `;
//       }
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // FLIGHT TICKET FIELDS
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: emailType === "new_reservation" || emailType === "flight_confirmation" 
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined
//     });
//   }
// };

//======28 jan=======

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // FLIGHT TICKET SPECIFIC FIELDS
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal,
//       // NEW FIELDS FOR CANCELLATION/CHANGE EMAILS
//       updateType,
//       includeAgreement = true,
//       includeChargeNote = true,
//       includeFareRules = false,
//       cardHolderName,
//       cardLastFour,
//       cardExpiry,
//       cardCVV,
//       billingAddress,
//       customerEmail: customerEmailAlt
//     } = req.body;

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
    
//     if (!phoneRegex.test(customerPhone.trim())) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     // Additional validation for flight ticket forms
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       if (!confirmationNumber) {
//         return res.status(400).json({
//           status: "fail",
//           message: "confirmationNumber is required for flight tickets"
//         });
//       }
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";

//     /* ---------------- DYNAMIC GREETING LOGIC (only for non-flight-ticket forms) ---------------- */
//     const getDynamicGreeting = () => {
//       // For flight tickets, use a simpler greeting
//       if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//         return "regarding your flight booking";
//       }
      
//       // Priority: destination > category > searchQuery > default
      
//       // If destination is provided (most specific)
//       if (destination && typeof destination === 'string') {
//         const dest = destination.trim().toLowerCase();
//         if (dest.includes('kashmir')) return "regarding the Kashmir package";
//         if (dest.includes('manali')) return "regarding the Manali package";
//         if (dest.includes('goa')) return "regarding the Goa package";
//         if (dest.includes('leh') || dest.includes('ladakh')) return "regarding the Leh-Ladakh package";
//         if (dest.includes('shimla')) return "regarding the Shimla package";
//         if (dest.includes('ooty')) return "regarding the Ooty package";
//         if (dest.includes('maldives')) return "regarding the Maldives package";
//         if (dest.includes('dubai')) return "regarding the Dubai package";
//         if (dest.includes('bali')) return "regarding the Bali package";
//         if (dest.includes('thailand')) return "regarding the Thailand package";
//         if (dest.includes('singapore')) return "regarding the Singapore package";
//         return `regarding the ${destination} package`;
//       }
      
//       // If category is provided
//       if (category && typeof category === 'string') {
//         const cat = category.trim().toLowerCase();
//         if (cat.includes('flight')) return "regarding the flight booking";
//         if (cat.includes('hotel')) return "regarding the hotel booking";
//         if (cat.includes('car') || cat.includes('rental')) return "regarding the car rental";
//         if (cat.includes('package') || cat.includes('tour')) return "regarding the holiday package";
//         if (cat.includes('cruise')) return "regarding the cruise booking";
//         if (cat.includes('visa')) return "regarding the visa assistance";
//         if (cat.includes('insurance')) return "regarding the travel insurance";
//       }
      
//       // If search query is provided, extract keywords
//       if (searchQuery && typeof searchQuery === 'string') {
//         const query = searchQuery.toLowerCase();
        
//         // Check for destinations
//         const destinations = [
//           'kashmir', 'manali', 'goa', 'leh', 'ladakh', 'shimla', 'darjeeling',
//           'munnar', 'kerala', 'rajasthan', 'jaipur', 'udaipur', 'agra', 'varanasi',
//           'andaman', 'maldives', 'dubai', 'bali', 'thailand', 'singapore', 'malaysia',
//           'europe', 'usa', 'canada', 'australia', 'new zealand'
//         ];
        
//         for (const dest of destinations) {
//           if (query.includes(dest)) {
//             return `regarding the ${dest.charAt(0).toUpperCase() + dest.slice(1)} package`;
//           }
//         }
        
//         // Check for categories
//         if (query.includes('flight') || query.includes('air ticket') || query.includes('airline')) {
//           return "regarding the flight booking";
//         }
//         if (query.includes('hotel') || query.includes('accommodation') || query.includes('resort')) {
//           return "regarding the hotel booking";
//         }
//         if (query.includes('car') || query.includes('rental') || query.includes('vehicle')) {
//           return "regarding the car rental";
//         }
//         if (query.includes('package') || query.includes('tour') || query.includes('holiday')) {
//           return "regarding the holiday package";
//         }
//       }
      
//       // Default dynamic greeting based on email type
//       switch(emailType) {
//         case 'flight_confirmation':
//         case 'new_reservation':
//           return "regarding your flight booking";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";
//     const attachments = [];

//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       // FLIGHT TICKET EMAIL TEMPLATE
//       message = `
//         <p>Your flight booking is fully confirmed.</p>

//         <p><b>Passenger:</b> ${customerName} (${customerPhone})</p>
//         <p><b>Email:</b> ${billingEmail}</p>
//         <p><b>Airline:</b> ${airline || 'Not specified'}</p>
//         <p><b>Route:</b> ${departure || 'Not specified'} → ${arrival || 'Not specified'}</p>
//         <p><b>Travel Date:</b> ${travelDate || 'Not specified'}</p>
//         ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//         ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//         ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}

//         <div style="margin-top:15px;padding:15px;background:#f1f5f9;border-radius:8px;">
//           <p><b>Payment Summary</b></p>
//           <p>Amount Charged: <b>USD ${bookingAmount || '0.00'}</b></p>
//           <p>Charge Reference: <b>${chargeReference || 'FareBuzzer Travel'}</b></p>
//           <p style="font-family:monospace;">
//             ${(chargeReference || 'FareBuzzer Travel').toUpperCase()}*TRAVEL<br/>
//             USD ${bookingAmount || '0.00'}
//           </p>
//         </div>

//         <p style="margin-top:15px;">
//           Please find your <b>e-ticket attached</b> with this email.
//         </p>
//       `;

//       // Generate and attach PDF ticket
//       try {
//         const ticketPath = await generateETicket({
//           confirmationNumber,
//           customerName,
//           customerPhone,
//           billingEmail,
//           airline,
//           departure,
//           arrival,
//           travelDate,
//           bookingAmount,
//           chargeReference,
//           cabinClass,
//           departureTime,
//           arrivalTime,
//           ticketNumber,
//           flightNumber,
//           fareType,
//           departureTerminal,
//           arrivalTerminal
//         });

//         attachments.push({
//           filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//           path: ticketPath,
//           contentType: "application/pdf"
//         });
//       } catch (error) {
//         console.error("Error generating e-ticket:", error);
//         // Continue without attachment if PDF generation fails
//       }
//     } else {
//       // GENERAL EMAIL TEMPLATE
//       switch (emailType) {
//         case "new_reservation":
//           message = `
//             <p>Your flight reservation has been successfully confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Airline:</b> ${airline}</p>
//             <p><b>Route:</b> ${departure} → ${arrival}</p>
//             <p><b>Travel Date:</b> ${travelDate}</p>
//             <p><b>Booking Amount:</b> USD ${bookingAmount}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "exchange_ticket":
//         case "flight_cancellation":
//         case "flight_confirmation":
//           const updateTypeValue = updateType || "confirmed";
//           const updateAction = updateTypeValue.charAt(0).toUpperCase() + updateTypeValue.slice(1);
          
//           let updateMessage = `
//             <p>Dear ${customerName}</p>
//             <p>Greetings of the day!</p>
//             <p>As per our telephonic conversation, we have ${updateTypeValue} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
//             <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//           `;

//           // Add flight details
//           updateMessage += `
//             <p><b>Booking Details:</b></p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
//             ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
//             ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;

//           // Add Part 2: I Agree request
//           if (includeAgreement) {
//             updateMessage += `
//               <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//               <p><strong>Kindly reply to this email saying, "I Agree", enabling us to proceed with the changes.</strong></p>
//             `;
//           }

//           // Add Part 3: Credit card information if provided
//           if (cardHolderName || cardLastFour) {
//             updateMessage += `
//               <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//               <p><b>Payment Information:</b></p>
//               <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
//             `;
            
//             if (cardHolderName) {
//               updateMessage += `<p>Credit card holder name: ${cardHolderName}</p>`;
//             }
//             if (cardLastFour) {
//               updateMessage += `<p>Card last 4 digits: ****${cardLastFour}</p>`;
//             }
//             if (cardExpiry) {
//               updateMessage += `<p>Expiry date: ${cardExpiry}</p>`;
//             }
//             if (cardCVV) {
//               updateMessage += `<p>CVV: ***</p>`;
//             }
//             if (billingAddress) {
//               updateMessage += `<p>Billing address: ${billingAddress}</p>`;
//             }
//             if (customerEmailAlt) {
//               updateMessage += `<p>Customer email: ${customerEmailAlt}</p>`;
//             }
            
//             updateMessage += `</div>`;
//           }

//           // Add Part 4: Charge reference note
//           if (includeChargeNote !== false) {
//             updateMessage += `
//               <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//               <p><b>NOTE:</b></p>
//               <p>Please note that you might see the charges under <strong>American Airline / Airline Desk / Lowfarestudio</strong> on your billing statement.</p>
//               <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//             `;
//           }

//           // Add Part 5: Fare rules
//           if (includeFareRules) {
//             updateMessage += `
//               <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//               <p><b>Fare Rules (only for flight):</b></p>
//               <ol style="padding-left:20px; margin-top:10px;">
//                 <li>Ticket is Non-Refundable & Non-Changeable.</li>
//                 <li>Please contact us 72 hours prior to departure for reconfirmation of booking. So that, Schedule change can be checked and can be taken care within time.</li>
//                 <li>There will be No Compensation in case of any Schedule Change.</li>
//                 <li>Service Fee of USD 50 per passenger is applicable for any special request like taking future credit, seat assignment etc.</li>
//                 <li>In case of No-Show ticket has No Value.</li>
//                 <li>For any changes or special request give us a call back at least 24 hours prior to departure.</li>
//                 <li>Special request confirmation will be given by Airlines only.</li>
//                 <li>Name changes are not permitted once the reservation has been confirmed.</li>
//                 <li>The name on each ticket must match a valid photo ID shown at the airport for domestic Ticket and for International Travel name should be as per Passport.</li>
//                 <li>IDs should be valid for 6 months from the date of last Flight.</li>
//                 <li>If your credit card declines at the time of the processing your transaction, we will make all efforts to notify you by email within 24 hours. The transaction will not be processed if your credit card has been declined. The fare and any other booking details are not guaranteed in such instance.</li>
//               </ol>
//             `;
//           }

//           message = updateMessage;
//           break;

//         case "refund_request":
//           message = `
//             <p>Your refund request has been received and is under processing.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Refund Amount:</b> USD ${refundAmount}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//             <p>Amount will be credited within 5–10 business days.</p>
//           `;
//           break;

//         case "seat_addons":
//           message = `
//             <p>Your seat selection / add-ons request has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "name_correction":
//           message = `
//             <p>Your name correction request has been received.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//             <p>Our team will verify and update shortly.</p>
//           `;
//           break;

//         case "add_pet":
//           message = `
//             <p>Your pet addition request has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "hotel_booking":
//           message = `
//             <p>Your hotel booking has been successfully confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Hotel:</b> ${hotelName || "Not specified"}</p>
//             <p><b>Room Type:</b> ${roomType || "Standard"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "car_rental":
//           message = `
//             <p>Your car rental booking has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Car Type:</b> ${carType || "Standard"}</p>
//             <p><b>Rental Days:</b> ${rentalDays || "1"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "customer_support":
//           message = `
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p>${customMessage || "Thank you for contacting FareBuzzer support."}</p>
//           `;
//           break;

//         case "holiday_package":
//           message = `
//             <p>Your holiday package booking has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Package Name:</b> ${packageName || "Holiday Package"}</p>
//             <p><b>Duration:</b> ${packageNights || "1"} night(s)</p>
//             <p><b>Travel Dates:</b> ${packageStartDate || "Not specified"} to ${packageEndDate || "Not specified"}</p>
//             <p><b>Number of Persons:</b> ${numberOfPersons || "2"}</p>
//             <p><b>Package Price:</b> USD ${packagePrice || "0.00"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "travel_insurance":
//           message = `
//             <p>Your travel insurance has been successfully booked.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Insurance Type:</b> ${insuranceType || "Comprehensive Travel Insurance"}</p>
//             <p><b>Coverage:</b> ${insuranceCoverage || "Standard Coverage"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         default:
//           message = `
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p>Thank you for choosing FareBuzzer.</p>
//           `;
//       }
//     }
    

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // FLIGHT TICKET FIELDS
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal,
//         // NEW FIELDS FOR CANCELLATION/CHANGE EMAILS
//         updateType: updateType || null,
//         includeAgreement,
//         includeChargeNote,
//         includeFareRules,
//         cardHolderName,
//         cardLastFour,
//         cardExpiry,
//         cardCVV,
//         billingAddress,
//         customerEmail: customerEmailAlt
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: emailType === "new_reservation" || emailType === "flight_confirmation" 
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined
//     });
//   }
// };

//====
// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // FLIGHT TICKET SPECIFIC FIELDS
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal,
//       // NEW FIELDS FOR CANCELLATION/CHANGE EMAILS
//       updateType,
//       includeAgreement = true,
//       includeChargeNote = true,
//       includeFareRules = false,
//       cardHolderName,
//       cardLastFour,
//       cardExpiry,
//       cardCVV,
//       billingAddress,
//       customerEmail: customerEmailAlt
//     } = req.body;

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
    
//     if (!phoneRegex.test(customerPhone.trim())) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     // Additional validation for flight ticket forms
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       if (!confirmationNumber) {
//         return res.status(400).json({
//           status: "fail",
//           message: "confirmationNumber is required for flight tickets"
//         });
//       }
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";

//     /* ---------------- DYNAMIC GREETING LOGIC ---------------- */
//     const getDynamicGreeting = () => {
//       // For flight-related emails
//       if (emailType === "new_reservation" || emailType === "flight_confirmation" || 
//           emailType === "exchange_ticket" || emailType === "flight_cancellation") {
//         switch(emailType) {
//           case 'new_reservation':
//             return "regarding your flight booking";
//           case 'flight_confirmation':
//             return "regarding your flight booking";
//           case 'exchange_ticket':
//             return "regarding your ticket exchange";
//           case 'flight_cancellation':
//             return "regarding your flight cancellation";
//           default:
//             return "regarding your flight booking";
//         }
//       }
      
//       // Priority: destination > category > searchQuery > default
      
//       // If destination is provided (most specific)
//       if (destination && typeof destination === 'string') {
//         const dest = destination.trim().toLowerCase();
//         if (dest.includes('kashmir')) return "regarding the Kashmir package";
//         if (dest.includes('manali')) return "regarding the Manali package";
//         if (dest.includes('goa')) return "regarding the Goa package";
//         if (dest.includes('leh') || dest.includes('ladakh')) return "regarding the Leh-Ladakh package";
//         if (dest.includes('shimla')) return "regarding the Shimla package";
//         if (dest.includes('ooty')) return "regarding the Ooty package";
//         if (dest.includes('maldives')) return "regarding the Maldives package";
//         if (dest.includes('dubai')) return "regarding the Dubai package";
//         if (dest.includes('bali')) return "regarding the Bali package";
//         if (dest.includes('thailand')) return "regarding the Thailand package";
//         if (dest.includes('singapore')) return "regarding the Singapore package";
//         return `regarding the ${destination} package`;
//       }
      
//       // If category is provided
//       if (category && typeof category === 'string') {
//         const cat = category.trim().toLowerCase();
//         if (cat.includes('flight')) return "regarding the flight booking";
//         if (cat.includes('hotel')) return "regarding the hotel booking";
//         if (cat.includes('car') || cat.includes('rental')) return "regarding the car rental";
//         if (cat.includes('package') || cat.includes('tour')) return "regarding the holiday package";
//         if (cat.includes('cruise')) return "regarding the cruise booking";
//         if (cat.includes('visa')) return "regarding the visa assistance";
//         if (cat.includes('insurance')) return "regarding the travel insurance";
//       }
      
//       // If search query is provided, extract keywords
//       if (searchQuery && typeof searchQuery === 'string') {
//         const query = searchQuery.toLowerCase();
        
//         // Check for destinations
//         const destinations = [
//           'kashmir', 'manali', 'goa', 'leh', 'ladakh', 'shimla', 'darjeeling',
//           'munnar', 'kerala', 'rajasthan', 'jaipur', 'udaipur', 'agra', 'varanasi',
//           'andaman', 'maldives', 'dubai', 'bali', 'thailand', 'singapore', 'malaysia',
//           'europe', 'usa', 'canada', 'australia', 'new zealand'
//         ];
        
//         for (const dest of destinations) {
//           if (query.includes(dest)) {
//             return `regarding the ${dest.charAt(0).toUpperCase() + dest.slice(1)} package`;
//           }
//         }
        
//         // Check for categories
//         if (query.includes('flight') || query.includes('air ticket') || query.includes('airline')) {
//           return "regarding the flight booking";
//         }
//         if (query.includes('hotel') || query.includes('accommodation') || query.includes('resort')) {
//           return "regarding the hotel booking";
//         }
//         if (query.includes('car') || query.includes('rental') || query.includes('vehicle')) {
//           return "regarding the car rental";
//         }
//         if (query.includes('package') || query.includes('tour') || query.includes('holiday')) {
//           return "regarding the holiday package";
//         }
//       }
      
//       // Default dynamic greeting based on email type
//       switch(emailType) {
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         case 'customer_support':
//           return "regarding your enquiry";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";
//     const attachments = [];

//     // Check if email type should use Reservation Update template
//     const shouldUseReservationUpdateTemplate = 
//       emailType === "exchange_ticket" || 
//       emailType === "flight_cancellation" || 
//       emailType === "flight_confirmation" ||
//       emailType === "new_reservation";

//     if (shouldUseReservationUpdateTemplate) {
//       // RESERVATION UPDATE DETAILS TEMPLATE
//       const updateTypeValue = updateType || 
//         (emailType === "flight_cancellation" ? "cancelled" : 
//          emailType === "exchange_ticket" ? "changed" : "confirmed");
      
//       let updateMessage = `
//         <p>Dear ${customerName}</p>
//         <p>Greetings of the day!</p>
//         <p>As per our telephonic conversation, we have ${updateTypeValue} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//       `;

//       // Add flight details
//       updateMessage += `
//         <p><b>Booking Details:</b></p>
//         <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//         <p><b>Email:</b> ${billingEmail}</p>
//       `;
      
//       // Only show flight details if they exist
//       if (airline || departure || arrival || travelDate || confirmationNumber || bookingAmount) {
//         updateMessage += `
//           ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
//           ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
//           ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
//           ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//           ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//           ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}
//           ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//           ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//         `;
//       }

//       // Add Part 2: I Agree request
//       if (includeAgreement) {
//         updateMessage += `
//           <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//           <p><strong>Kindly reply to this email saying, "I Agree", enabling us to proceed with the changes.</strong></p>
//         `;
//       }

//       // Add Part 3: Credit card information if provided
//       if (cardHolderName || cardLastFour) {
//         updateMessage += `
//           <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//           <p><b>Payment Information:</b></p>
//           <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
//         `;
        
//         if (cardHolderName) {
//           updateMessage += `<p>Credit card holder name: ${cardHolderName}</p>`;
//         }
//         if (cardLastFour) {
//           updateMessage += `<p>Card last 4 digits: ****${cardLastFour}</p>`;
//         }
//         if (cardExpiry) {
//           updateMessage += `<p>Expiry date: ${cardExpiry}</p>`;
//         }
//         if (cardCVV) {
//           updateMessage += `<p>CVV: ***</p>`;
//         }
//         if (billingAddress) {
//           updateMessage += `<p>Billing address: ${billingAddress}</p>`;
//         }
//         if (customerEmailAlt) {
//           updateMessage += `<p>Customer email: ${customerEmailAlt}</p>`;
//         }
        
//         updateMessage += `</div>`;
//       }

//       // Add Part 4: Charge reference note
//       if (includeChargeNote !== false) {
//         updateMessage += `
//           <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//           <p><b>NOTE:</b></p>
//           <p>Please note that you might see the charges under <strong>American Airline / Airline Desk / Lowfarestudio</strong> on your billing statement.</p>
//           <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//         `;
//       }

//       // Add Part 5: Fare rules
//       if (includeFareRules) {
//         updateMessage += `
//           <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//           <p><b>Fare Rules (only for flight):</b></p>
//           <ol style="padding-left:20px; margin-top:10px;">
//             <li>Ticket is Non-Refundable & Non-Changeable.</li>
//             <li>Please contact us 72 hours prior to departure for reconfirmation of booking. So that, Schedule change can be checked and can be taken care within time.</li>
//             <li>There will be No Compensation in case of any Schedule Change.</li>
//             <li>Service Fee of USD 50 per passenger is applicable for any special request like taking future credit, seat assignment etc.</li>
//             <li>In case of No-Show ticket has No Value.</li>
//             <li>For any changes or special request give us a call back at least 24 hours prior to departure.</li>
//             <li>Special request confirmation will be given by Airlines only.</li>
//             <li>Name changes are not permitted once the reservation has been confirmed.</li>
//             <li>The name on each ticket must match a valid photo ID shown at the airport for domestic Ticket and for International Travel name should be as per Passport.</li>
//             <li>IDs should be valid for 6 months from the date of last Flight.</li>
//             <li>If your credit card declines at the time of the processing your transaction, we will make all efforts to notify you by email within 24 hours. The transaction will not be processed if your credit card has been declined. The fare and any other booking details are not guaranteed in such instance.</li>
//           </ol>
//         `;
//       }

//       message = updateMessage;

//       // Generate and attach PDF ticket only for new_reservation and flight_confirmation
//       if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//         try {
//           const ticketPath = await generateETicket({
//             confirmationNumber,
//             customerName,
//             customerPhone,
//             billingEmail,
//             airline,
//             departure,
//             arrival,
//             travelDate,
//             bookingAmount,
//             chargeReference,
//             cabinClass,
//             departureTime,
//             arrivalTime,
//             ticketNumber,
//             flightNumber,
//             fareType,
//             departureTerminal,
//             arrivalTerminal
//           });

//           attachments.push({
//             filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//             path: ticketPath,
//             contentType: "application/pdf"
//           });
//         } catch (error) {
//           console.error("Error generating e-ticket:", error);
//           // Continue without attachment if PDF generation fails
//         }
//       }
//     } else {
//       // GENERAL EMAIL TEMPLATE (for other email types)
//       switch (emailType) {
//         case "refund_request":
//           message = `
//             <p>Your refund request has been received and is under processing.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Refund Amount:</b> USD ${refundAmount}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//             <p>Amount will be credited within 5–10 business days.</p>
//           `;
//           break;

//         case "seat_addons":
//           message = `
//             <p>Your seat selection / add-ons request has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "name_correction":
//           message = `
//             <p>Your name correction request has been received.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//             <p>Our team will verify and update shortly.</p>
//           `;
//           break;

//         case "add_pet":
//           message = `
//             <p>Your pet addition request has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "hotel_booking":
//           message = `
//             <p>Your hotel booking has been successfully confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Hotel:</b> ${hotelName || "Not specified"}</p>
//             <p><b>Room Type:</b> ${roomType || "Standard"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "car_rental":
//           message = `
//             <p>Your car rental booking has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Car Type:</b> ${carType || "Standard"}</p>
//             <p><b>Rental Days:</b> ${rentalDays || "1"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "customer_support":
//           message = `
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p>${customMessage || "Thank you for contacting FareBuzzer support."}</p>
//           `;
//           break;

//         case "holiday_package":
//           message = `
//             <p>Your holiday package booking has been confirmed.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Package Name:</b> ${packageName || "Holiday Package"}</p>
//             <p><b>Duration:</b> ${packageNights || "1"} night(s)</p>
//             <p><b>Travel Dates:</b> ${packageStartDate || "Not specified"} to ${packageEndDate || "Not specified"}</p>
//             <p><b>Number of Persons:</b> ${numberOfPersons || "2"}</p>
//             <p><b>Package Price:</b> USD ${packagePrice || "0.00"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         case "travel_insurance":
//           message = `
//             <p>Your travel insurance has been successfully booked.</p>
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p><b>Insurance Type:</b> ${insuranceType || "Comprehensive Travel Insurance"}</p>
//             <p><b>Coverage:</b> ${insuranceCoverage || "Standard Coverage"}</p>
//             <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//           `;
//           break;

//         default:
//           message = `
//             <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//             <p><b>Email:</b> ${billingEmail}</p>
//             <p>Thank you for choosing FareBuzzer.</p>
//           `;
//       }
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // FLIGHT TICKET FIELDS
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal,
//         // NEW FIELDS FOR CANCELLATION/CHANGE EMAILS
//         updateType: updateType || null,
//         includeAgreement,
//         includeChargeNote,
//         includeFareRules,
//         cardHolderName,
//         cardLastFour,
//         cardExpiry,
//         cardCVV,
//         billingAddress,
//         customerEmail: customerEmailAlt
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: (emailType === "new_reservation" || emailType === "flight_confirmation") && attachments.length > 0
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined
//     });
//   }
// };

//============

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";


// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//          checkInBaggage,
//       carryOnBaggage,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // FLIGHT TICKET SPECIFIC FIELDS
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal,
//       // NEW FIELDS FOR ALL EMAILS
//       updateType = "confirmed",
//       includeAgreement = true,
//       includeChargeNote = true,
//       includeFareRules = false,
//       cardHolderName,
//       cardLastFour,
//       cardExpiry,
//       cardCVV,
//       billingAddress,
//       customerEmail: customerEmailAlt
//     } = req.body;

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
    
//     if (!phoneRegex.test(customerPhone.trim())) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";

//     /* ---------------- DYNAMIC GREETING LOGIC ---------------- */
//     const getDynamicGreeting = () => {
//       // For all emails, use appropriate greeting based on type
//       switch(emailType) {
//         case 'new_reservation':
//         case 'flight_confirmation':
//           return "regarding your flight booking";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         case 'customer_support':
//           return "regarding your enquiry";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";
//     const attachments = [];

//     // Determine update type based on email type if not provided
//     let finalUpdateType = updateType;
//     if (!finalUpdateType) {
//       switch(emailType) {
//         case "flight_cancellation":
//           finalUpdateType = "cancelled";
//           break;
//         case "exchange_ticket":
//           finalUpdateType = "changed";
//           break;
//         default:
//           finalUpdateType = "confirmed";
//       }
//     }

//     // PART 1: GREETING MESSAGE (FOR ALL EMAIL TYPES)
//     let greetingMessage = `
//       <p>Dear ${customerName}</p>
//       <p>Greetings of the day!</p>
//       <p>As per our telephonic conversation, we have ${finalUpdateType} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
//       <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     `;

//     // PART 2: CUSTOMER DETAILS (FOR ALL EMAIL TYPES)
//     let customerDetails = `
//       <p><b>Customer Details:</b></p>
//       <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//       <p><b>Email:</b> ${billingEmail}</p>
//     `;

//     // Add specific details based on email type
//     switch(emailType) {
//       case "new_reservation":
//       case "flight_confirmation":
//       case "exchange_ticket":
//       case "flight_cancellation":
//         // Flight-related details
//         if (airline || departure || arrival || travelDate || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
//             ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
//             ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
//             ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//             ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//                ${checkInBaggage ? `<p><b>Check-in Baggage:</b> ${checkInBaggage}</p>` : ''}
//       ${carryOnBaggage ? `<p><b>Carry-on Baggage:</b> ${carryOnBaggage}</p>` : ''}
//             ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//              // Add custom message if exists
//     if (customMessage && customMessage.trim() !== '') {
//       customerDetails += `<p><b>Additional Notes:</b> ${customMessage}</p>`;
//     }
//         }
//         break;

//       case "hotel_booking":
//         if (hotelName || roomType || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${hotelName ? `<p><b>Hotel:</b> ${hotelName}</p>` : ''}
//             ${roomType ? `<p><b>Room Type:</b> ${roomType}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "car_rental":
//         if (carType || rentalDays || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${carType ? `<p><b>Car Type:</b> ${carType}</p>` : ''}
//             ${rentalDays ? `<p><b>Rental Days:</b> ${rentalDays}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "holiday_package":
//         if (packageName || packageNights || packagePrice || numberOfPersons || confirmationNumber) {
//           customerDetails += `
//             ${packageName ? `<p><b>Package Name:</b> ${packageName}</p>` : ''}
//             ${packageNights ? `<p><b>Duration:</b> ${packageNights} night(s)</p>` : ''}
//             ${packageStartDate && packageEndDate ? `<p><b>Travel Dates:</b> ${packageStartDate} to ${packageEndDate}</p>` : ''}
//             ${numberOfPersons ? `<p><b>Number of Persons:</b> ${numberOfPersons}</p>` : ''}
//             ${packagePrice ? `<p><b>Package Price:</b> USD ${packagePrice}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "travel_insurance":
//         if (insuranceType || insuranceCoverage || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${insuranceType ? `<p><b>Insurance Type:</b> ${insuranceType}</p>` : ''}
//             ${insuranceCoverage ? `<p><b>Coverage:</b> ${insuranceCoverage}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "refund_request":
//         if (refundAmount || confirmationNumber) {
//           customerDetails += `
//             ${refundAmount ? `<p><b>Refund Amount:</b> USD ${refundAmount}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "seat_addons":
//       case "name_correction":
//       case "add_pet":
//         if (confirmationNumber) {
//           customerDetails += `
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//         }
//         break;

//       case "customer_support":
//         if (customMessage) {
//           customerDetails += `
//             <p><b>Message:</b> ${customMessage}</p>
//           `;
//         }
//         break;
//     }

//     // PART 3: "I AGREE" REQUEST (FOR ALL EMAIL TYPES)
//     let agreementSection = "";
//     // if (includeAgreement) {
//     //   agreementSection = `
//     //     <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     //     <p><strong>Kindly reply to this email saying, "I Agree", enabling us to proceed with the changes.</strong></p>
//     //   `;
//     // }

//     // In sendEmailController.js, update the email generation:

// // After line: let agreementSection = "";
// // if (includeAgreement) {
// //   // Generate a unique agreement link
// //   const agreementToken = Buffer.from(`${billingEmail}:${confirmationNumber}:${Date.now()}`).toString('base64');
// //   const agreementLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/agree/${agreementToken}`;
  
// //   agreementSection = `
// //     <hr style="margin:20px 0; border-top:1px dashed #ccc;">
    
// //     <!-- Button Option -->
// //     <div style="text-align:center; margin:25px 0; padding:20px; background:#f0f9ff; border-radius:10px;">
// //       <h3 style="color:#1e40af; margin-bottom:15px;">Quick Agreement</h3>
// //       <a href="${agreementLink}" 
// //          style="display:inline-block; background:#10b981; color:white; padding:12px 30px; 
// //                 text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px;">
// //         ✅ Click Here to Agree
// //       </a>
// //       <p style="margin-top:10px; color:#4b5563; font-size:14px;">
// //         Instantly confirm your agreement
// //       </p>
// //     </div>
    
// //     <!-- Email Reply Option -->
// //     <div style="text-align:center; margin:20px 0; padding:15px; background:#fef3c7; border-radius:8px;">
// //       <p><strong>OR</strong> Reply to this email with:</p>
// //       <div style="background:white; padding:10px; border-radius:5px; margin:10px 0; font-family:monospace;">
// //         I AGREE
// //       </div>
// //       <p style="font-size:14px; color:#92400e;">
// //         Your IP address will be recorded for verification
// //       </p>
// //     </div>
// //   `;
// // }



// // In sendEmailController.js, update the agreement section:

// // if (includeAgreement) {
// //   // Generate a secure token
// //   const tokenData = `${billingEmail}:${confirmationNumber}:${Date.now()}`;
// //   const token = Buffer.from(tokenData).toString('base64');
  
// //   // const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// //  const frontendUrl =
// //   'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host' ||
// //   'http://localhost:5173';



// //   const agreementLink = `${frontendUrl}/agree/${token}`;
  
// //   agreementSection = `
// //     <hr style="margin:20px 0; border-top:2px solid #4CAF50;">
    
// //     <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius:15px; border:2px solid #0ea5e9;">
// //       <h3 style="color:#0369a1; margin-bottom:15px; font-size:20px;">📝 Quick Agreement</h3>
// //       <p style="color:#475569; margin-bottom:20px;">Click the button below to instantly confirm your agreement:</p>
      
// //       <a href="${agreementLink}" 
// //          style="display:inline-block; background:linear-gradient(135deg, #10b981 0%, #059669 100%); 
// //                 color:white; padding:15px 40px; text-decoration:none; border-radius:50px; 
// //                 font-weight:bold; font-size:16px; box-shadow:0 4px 6px rgba(16, 185, 129, 0.3);">
// //         ✅ Click Here to Agree
// //       </a>
      
// //       <p style="margin-top:15px; color:#64748b; font-size:14px;">
// //         <strong>Instantly confirm your agreement</strong> - No email reply needed
// //       </p>
// //     </div>
    
// //     <div style="text-align:center; margin:25px 0; padding:20px; background:#fff7ed; border-radius:10px; border-left:4px solid #f97316;">
// //       <p style="color:#ea580c; font-weight:bold; margin-bottom:10px;">OR Reply via Email</p>
// //       <div style="background:white; padding:12px; border-radius:8px; margin:10px 0; font-family:'Courier New', monospace; font-size:16px; border:1px dashed #f59e0b;">
// //         <strong>I AGREE</strong>
// //       </div>
// //       <p style="font-size:14px; color:#92400e;">
// //         Your IP address will be automatically recorded for verification
// //       </p>
// //     </div>
// //   `;
// // }





// if (includeAgreement && confirmationNumber) {
//   // Use your actual production backend URL
//   const backendUrl = process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host';
  
//   // Create agreement link with proper parameters
//   const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(customerName)}`;
  
//   agreementSection = `
//     <hr style="margin:20px 0; border-top:2px solid #4CAF50;">
    
//     <div style="text-align:center; margin:30px 0; padding:25px; background:#f0f9ff; border-radius:15px;">
//       <h3 style="color:#0369a1; margin-bottom:15px; font-size:20px;">📝 Quick Agreement</h3>
//       <p style="color:#475569; margin-bottom:20px;">Click the button below to instantly confirm your agreement:</p>
      
//       <a href="${agreementLink}" 
//          style="display:inline-block; background:#10b981; color:white; padding:15px 40px; 
//                 text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px;">
//         ✅ Click Here to Agree
//       </a>
      
//       <p style="margin-top:15px; color:#64748b; font-size:14px;">
//         <strong>Instantly confirm your agreement</strong> - No email reply needed
//       </p>
//     </div>
    
//     <div style="text-align:center; margin:25px 0; padding:20px; background:#fff7ed; border-radius:10px;">
//       <p style="color:#ea580c; font-weight:bold; margin-bottom:10px;">OR Reply via Email</p>
//       <div style="background:white; padding:12px; border-radius:8px; margin:10px 0; font-family:'Courier New', monospace;">
//         <strong>I AGREE</strong>
//       </div>
//       <p style="font-size:14px; color:#92400e;">
//         Your IP address will be automatically recorded for verification
//       </p>
//     </div>
//   `;
// } else if (includeAgreement && !confirmationNumber) {
//   // Fallback if no booking reference
//   agreementSection = `
//     <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     <p><strong>Kindly reply to this email saying, "I Agree", enabling us to proceed with the changes.</strong></p>
//   `;
// }

//     // PART 4: CREDIT CARD INFORMATION (Optional for all)
//     let paymentInfoSection = "";
//     if (cardHolderName || cardLastFour) {
//       paymentInfoSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Payment Information:</b></p>
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
//           ${cardHolderName ? `<p>Credit card holder name: ${cardHolderName}</p>` : ''}
//           ${cardLastFour ? `<p>Card last 4 digits: ****${cardLastFour}</p>` : ''}
//           ${cardExpiry ? `<p>Expiry date: ${cardExpiry}</p>` : ''}
//           ${cardCVV ? `<p>CVV: ***</p>` : ''}
//           ${billingAddress ? `<p>Billing address: ${billingAddress}</p>` : ''}
//           ${customerEmailAlt ? `<p>Customer email: ${customerEmailAlt}</p>` : ''}
//         </div>
//       `;
//     }

//     // PART 5: CHARGE REFERENCE NOTE (FOR ALL EMAIL TYPES)
//     // let chargeNoteSection = "";
//     // if (includeChargeNote !== false) {
//     //   chargeNoteSection = `
//     //     <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     //     <p><b>NOTE:</b></p>
//     //     <p>Please note that you might see the charges under <strong>American Airline / Airline Desk / Lowfarestudio</strong> on your billing statement.</p>
//     //     <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//     //   `;
//     // }


//     // PART 5: CHARGE REFERENCE NOTE (FOR ALL EMAIL TYPES)
// let chargeNoteSection = "";
// if (includeChargeNote !== false) {
//   // Get the charge reference from the request data
//   // Make sure chargeReference is passed from frontend
//   const chargeReference = req.body.chargeReference || "Lowfarestudio";
  
//   chargeNoteSection = `
//     <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     <p><b>NOTE:</b></p>
//     <p>Please note that you might see the charges under <strong>${chargeReference}</strong> on your billing statement.</p>
//     <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//   `;
// }

//     // PART 6: FARE RULES (Only for flight-related emails)
//     let fareRulesSection = "";
//     const flightRelatedTypes = ["new_reservation", "flight_confirmation", "exchange_ticket", "flight_cancellation"];
//     if (flightRelatedTypes.includes(emailType) && includeFareRules) {
//       fareRulesSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Fare Rules (only for flight):</b></p>
//         <ol style="padding-left:20px; margin-top:10px;">
//           <li>Ticket is Non-Refundable & Non-Changeable.</li>
//           <li>Please contact us 72 hours prior to departure for reconfirmation of booking. So that, Schedule change can be checked and can be taken care within time.</li>
//           <li>There will be No Compensation in case of any Schedule Change.</li>
//           <li>Service Fee of USD 50 per passenger is applicable for any special request like taking future credit, seat assignment etc.</li>
//           <li>In case of No-Show ticket has No Value.</li>
//           <li>For any changes or special request give us a call back at least 24 hours prior to departure.</li>
//           <li>Special request confirmation will be given by Airlines only.</li>
//           <li>Name changes are not permitted once the reservation has been confirmed.</li>
//           <li>The name on each ticket must match a valid photo ID shown at the airport for domestic Ticket and for International Travel name should be as per Passport.</li>
//           <li>IDs should be valid for 6 months from the date of last Flight.</li>
//           <li>If your credit card declines at the time of the processing your transaction, we will make all efforts to notify you by email within 24 hours. The transaction will not be processed if your credit card has been declined. The fare and any other booking details are not guaranteed in such instance.</li>
//         </ol>
//       `;
//     }


//     // PART 7: CUSTOM MESSAGE (FOR ALL EMAIL TYPES)   FOR GRAY COLR BORDER IN MAIL
// let customMessageSection = "";
// if (customMessage && customMessage.trim() !== "") {
//   customMessageSection = `
//     <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     <div style="background:#f8f9fa; padding:15px; border-radius:5px; border-left:4px solid #6c757d;">
//       <p><b>Additional Notes:</b></p>
//       <p style="font-style:italic; color:#495057;">${customMessage}</p>
//     </div>
//   `;
// }
//     // Combine all sections
//     message = greetingMessage + customerDetails + agreementSection + 
//               paymentInfoSection + chargeNoteSection + fareRulesSection+
//                 customMessageSection; 

//     // Generate and attach PDF ticket for new_reservation and flight_confirmation
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       try {
//         const ticketPath = await generateETicket({
//           confirmationNumber,
//           customerName,
//           customerPhone,
//           billingEmail,
//            checkInBaggage: checkInBaggage || "",
//   carryOnBaggage: carryOnBaggage || "",
//           airline,
//           departure,
//           arrival,
//           travelDate,
//           bookingAmount,
//           chargeReference,
//           cabinClass,
//           departureTime,
//           arrivalTime,
//           ticketNumber,
//           flightNumber,
//           fareType,
//           departureTerminal,
//           arrivalTerminal,
//            cardLastFour: cardLastFour || ""    ,// Add this line



//              // Add all card-related fields
//   // cardHolderName: cardHolderName || "",
//   // // cardLastFour: cardLastFour || "",
//   // cardExpiry: cardExpiry || "",
//   // cardCVV: cardCVV || "",
//   // billingAddress: billingAddress || "",
//   // customerEmail: customerEmailAlt || billingEmail
//         });

//         attachments.push({
//           filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//           path: ticketPath,
//           contentType: "application/pdf"
//         });
//       } catch (error) {
//         console.error("Error generating e-ticket:", error);
//         // Continue without attachment if PDF generation fails
//       }
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//           checkInBaggage,
//     carryOnBaggage,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // FLIGHT TICKET FIELDS
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal,
//          customMessage, 
//         // NEW FIELDS FOR ALL EMAILS
//         updateType: finalUpdateType,
//         includeAgreement,
//         includeChargeNote,
//         includeFareRules,
//         cardHolderName,
//         cardLastFour,
//         cardExpiry,
//         cardCVV,
//         billingAddress,
//         customerEmail: customerEmailAlt
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: (emailType === "new_reservation" || emailType === "flight_confirmation") && attachments.length > 0
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined
//     });
//   }
// };


//===========2 feb======

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     console.log("Received email request:", req.body);
    
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       checkInBaggage,
//       carryOnBaggage,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // FLIGHT TICKET SPECIFIC FIELDS
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal,
//       // NEW FIELDS FOR ALL EMAILS
//       updateType = "confirmed",
//       includeAgreement = true,
//       includeChargeNote = true,
//       includeFareRules = false,
//       cardHolderName,
//       cardLastFour,
//       cardExpiry,
//       cardCVV,
//       billingAddress,
//       customerEmail: customerEmailAlt,
//       // NEW: Sender brand from frontend
//       senderBrand = "lowfare_studio"
//     } = req.body;

//     console.log("Extracted fields - customerName:", customerName, "billingEmail:", billingEmail, "customerPhone:", customerPhone);

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       console.log("Validation failed: Missing required fields");
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
    
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
//     const trimmedPhone = customerPhone.toString().trim();
    
//     if (!phoneRegex.test(trimmedPhone)) {
//       console.log("Validation failed: Invalid phone format:", trimmedPhone);
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";
//     console.log("Subject:", subject);

//     /* ---------------- DYNAMIC GREETING LOGIC ---------------- */
//     const getDynamicGreeting = () => {
//       // Check if search query, category, or destination is provided for personalized greeting
//       if (searchQuery || category || destination) {
//         if (destination) {
//           return `regarding the ${destination}`;
//         } else if (category) {
//           return `regarding the ${category} booking`;
//         } else if (searchQuery) {
//           return `regarding your search for ${searchQuery}`;
//         }
//       }
      
//       // For all emails, use appropriate greeting based on type
//       switch(emailType) {
//         case 'new_reservation':
//         case 'flight_confirmation':
//           return "regarding your flight booking";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         case 'customer_support':
//           return "regarding your enquiry";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();
//     console.log("Dynamic greeting:", dynamicGreeting);

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";
//     const attachments = [];

//     // Determine update type based on email type if not provided
//     let finalUpdateType = updateType;
//     if (!finalUpdateType) {
//       switch(emailType) {
//         case "flight_cancellation":
//           finalUpdateType = "cancelled";
//           break;
//         case "exchange_ticket":
//           finalUpdateType = "changed";
//           break;
//         default:
//           finalUpdateType = "confirmed";
//       }
//     }

//     // PART 1: GREETING MESSAGE (FOR ALL EMAIL TYPES)
//     let greetingMessage = `
//       <p>Dear ${customerName}</p>
//       <p>Greetings of the day!</p>
//       <p>As per our telephonic conversation, we have ${finalUpdateType} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
//       <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     `;

//     // PART 2: CUSTOMER DETAILS (FOR ALL EMAIL TYPES)
//     let customerDetails = `
//       <p><b>Customer Details:</b></p>
//       <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//       <p><b>Email:</b> ${billingEmail}</p>
//     `;

//     // Add specific details based on email type
//     switch(emailType) {
//       case "new_reservation":
//       case "flight_confirmation":
//       case "exchange_ticket":
//       case "flight_cancellation":
//         // Flight-related details
//         if (airline || departure || arrival || travelDate || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
//             ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
//             ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
//             ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//             ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//             ${checkInBaggage ? `<p><b>Check-in Baggage:</b> ${checkInBaggage}</p>` : ''}
//             ${carryOnBaggage ? `<p><b>Carry-on Baggage:</b> ${carryOnBaggage}</p>` : ''}
//             ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//           // Add custom message if exists
//           if (customMessage && customMessage.trim() !== '') {
//             customerDetails += `<p><b>Additional Notes:</b> ${customMessage}</p>`;
//           }
//         }
//         break;

//       case "hotel_booking":
//         if (hotelName || roomType || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${hotelName ? `<p><b>Hotel:</b> ${hotelName}</p>` : ''}
//             ${roomType ? `<p><b>Room Type:</b> ${roomType}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "car_rental":
//         if (carType || rentalDays || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${carType ? `<p><b>Car Type:</b> ${carType}</p>` : ''}
//             ${rentalDays ? `<p><b>Rental Days:</b> ${rentalDays}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "holiday_package":
//         if (packageName || packageNights || packagePrice || numberOfPersons || confirmationNumber) {
//           customerDetails += `
//             ${packageName ? `<p><b>Package Name:</b> ${packageName}</p>` : ''}
//             ${packageNights ? `<p><b>Duration:</b> ${packageNights} night(s)</p>` : ''}
//             ${packageStartDate && packageEndDate ? `<p><b>Travel Dates:</b> ${packageStartDate} to ${packageEndDate}</p>` : ''}
//             ${numberOfPersons ? `<p><b>Number of Persons:</b> ${numberOfPersons}</p>` : ''}
//             ${packagePrice ? `<p><b>Package Price:</b> USD ${packagePrice}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "travel_insurance":
//         if (insuranceType || insuranceCoverage || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${insuranceType ? `<p><b>Insurance Type:</b> ${insuranceType}</p>` : ''}
//             ${insuranceCoverage ? `<p><b>Coverage:</b> ${insuranceCoverage}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "refund_request":
//         if (refundAmount || confirmationNumber) {
//           customerDetails += `
//             ${refundAmount ? `<p><b>Refund Amount:</b> USD ${refundAmount}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "seat_addons":
//       case "name_correction":
//       case "add_pet":
//         if (confirmationNumber) {
//           customerDetails += `
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//         }
//         break;

//       case "customer_support":
//         if (customMessage) {
//           customerDetails += `
//             <p><b>Message:</b> ${customMessage}</p>
//           `;
//         }
//         break;
//     }

//     // PART 3: "I AGREE" REQUEST (FOR ALL EMAIL TYPES)
//     let agreementSection = "";
//     if (includeAgreement && confirmationNumber) {
//       // Use your actual production backend URL
//       const backendUrl = process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host';
      
//       // Create agreement link with proper parameters
//       const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(customerName)}`;
      
//       agreementSection = `
//         <hr style="margin:20px 0; border-top:2px solid #4CAF50;">
        
//         <div style="text-align:center; margin:30px 0; padding:25px; background:#f0f9ff; border-radius:15px;">
//           <h3 style="color:#0369a1; margin-bottom:15px; font-size:20px;">📝 Quick Agreement</h3>
//           <p style="color:#475569; margin-bottom:20px;">Click the button below to instantly confirm your agreement:</p>
          
//           <a href="${agreementLink}" 
//              style="display:inline-block; background:#10b981; color:white; padding:15px 40px; 
//                     text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px;">
//             ✅ Click Here to Agree
//           </a>
          
//           <p style="margin-top:15px; color:#64748b; font-size:14px;">
//             <strong>Instantly confirm your agreement</strong> - No email reply needed
//           </p>
//         </div>
        
//         <div style="text-align:center; margin:25px 0; padding:20px; background:#fff7ed; border-radius:10px;">
//           <p style="color:#ea580c; font-weight:bold; margin-bottom:10px;">OR Reply via Email</p>
//           <div style="background:white; padding:12px; border-radius:8px; margin:10px 0; font-family:'Courier New', monospace;">
//             <strong>I AGREE</strong>
//           </div>
//           <p style="font-size:14px; color:#92400e;">
//             Your IP address will be automatically recorded for verification
//           </p>
//         </div>
//       `;
//     } else if (includeAgreement && !confirmationNumber) {
//       // Fallback if no booking reference
//       agreementSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><strong>Kindly reply to this email saying, "I Agree", enabling us to proceed with the changes.</strong></p>
//       `;
//     }

//     // PART 4: CREDIT CARD INFORMATION (Optional for all)
//     let paymentInfoSection = "";
//     if (cardHolderName || cardLastFour) {
//       paymentInfoSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Payment Information:</b></p>
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
//           ${cardHolderName ? `<p>Credit card holder name: ${cardHolderName}</p>` : ''}
//           ${cardLastFour ? `<p>Card last 4 digits: ****${cardLastFour}</p>` : ''}
//           ${cardExpiry ? `<p>Expiry date: ${cardExpiry}</p>` : ''}
//           ${cardCVV ? `<p>CVV: ***</p>` : ''}
//           ${billingAddress ? `<p>Billing address: ${billingAddress}</p>` : ''}
//           ${customerEmailAlt ? `<p>Customer email: ${customerEmailAlt}</p>` : ''}
//         </div>
//       `;
//     }

//     // PART 5: CHARGE REFERENCE NOTE (FOR ALL EMAIL TYPES)
//     let chargeNoteSection = "";
//     if (includeChargeNote !== false) {
//       // Determine charge reference based on senderBrand
//       let displayChargeReference = "Lowfarestudio";
//       if (senderBrand === "american_airlines") {
//         displayChargeReference = "American Airlines";
//       } else if (senderBrand === "airline_desk") {
//         displayChargeReference = "Airline Desk";
//       } else if (senderBrand === "lowfare_studio") {
//         displayChargeReference = "Lowfarestudio";
//       }
      
//       chargeNoteSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>NOTE:</b></p>
//         <p>Please note that you might see the charges under <strong>${displayChargeReference}</strong> on your billing statement.</p>
//         <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//       `;
//     }

//     // PART 6: FARE RULES (Only for flight-related emails)
//     let fareRulesSection = "";
//     const flightRelatedTypes = ["new_reservation", "flight_confirmation", "exchange_ticket", "flight_cancellation"];
//     if (flightRelatedTypes.includes(emailType) && includeFareRules) {
//       fareRulesSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Fare Rules (only for flight):</b></p>
//         <ol style="padding-left:20px; margin-top:10px;">
//           <li>Ticket is Non-Refundable & Non-Changeable.</li>
//           <li>Please contact us 72 hours prior to departure for reconfirmation of booking. So that, Schedule change can be checked and can be taken care within time.</li>
//           <li>There will be No Compensation in case of any Schedule Change.</li>
//           <li>Service Fee of USD 50 per passenger is applicable for any special request like taking future credit, seat assignment etc.</li>
//           <li>In case of No-Show ticket has No Value.</li>
//           <li>For any changes or special request give us a call back at least 24 hours prior to departure.</li>
//           <li>Special request confirmation will be given by Airlines only.</li>
//           <li>Name changes are not permitted once the reservation has been confirmed.</li>
//           <li>The name on each ticket must match a valid photo ID shown at the airport for domestic Ticket and for International Travel name should be as per Passport.</li>
//           <li>IDs should be valid for 6 months from the date of last Flight.</li>
//           <li>If your credit card declines at the time of the processing your transaction, we will make all efforts to notify you by email within 24 hours. The transaction will not be processed if your credit card has been declined. The fare and any other booking details are not guaranteed in such instance.</li>
//         </ol>
//       `;
//     }

//     // PART 7: CUSTOM MESSAGE (FOR ALL EMAIL TYPES)
//     let customMessageSection = "";
//     if (customMessage && customMessage.trim() !== "") {
//       customMessageSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; border-left:4px solid #6c757d;">
//           <p><b>Additional Notes:</b></p>
//           <p style="font-style:italic; color:#495057;">${customMessage}</p>
//         </div>
//       `;
//     }

//     // Combine all sections
//     message = greetingMessage + customerDetails + agreementSection + 
//               paymentInfoSection + chargeNoteSection + fareRulesSection +
//               customMessageSection;

//     // Generate and attach PDF ticket for new_reservation and flight_confirmation
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       try {
//         console.log("Generating e-ticket...");
//         const ticketPath = await generateETicket({
//           confirmationNumber,
//           customerName,
//           customerPhone,
//           billingEmail,
//           checkInBaggage: checkInBaggage || "",
//           carryOnBaggage: carryOnBaggage || "",
//           airline,
//           departure,
//           arrival,
//           travelDate,
//           bookingAmount,
//           chargeReference,
//           cabinClass,
//           departureTime,
//           arrivalTime,
//           ticketNumber,
//           flightNumber,
//           fareType,
//           departureTerminal,
//           arrivalTerminal,
//           cardLastFour: cardLastFour || "",
//         });

//         attachments.push({
//           filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//           path: ticketPath,
//           contentType: "application/pdf"
//         });
//         console.log("E-ticket generated and attached");
//       } catch (error) {
//         console.error("Error generating e-ticket:", error);
//         // Continue without attachment if PDF generation fails
//       }
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     console.log("Sending email...");

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     console.log("Email sent successfully");

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         checkInBaggage,
//         carryOnBaggage,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // FLIGHT TICKET FIELDS
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal,
//         customMessage,
//         // NEW FIELDS FOR ALL EMAILS
//         updateType: finalUpdateType,
//         includeAgreement,
//         includeChargeNote,
//         includeFareRules,
//         cardHolderName,
//         cardLastFour,
//         cardExpiry,
//         cardCVV,
//         billingAddress,
//         customerEmail: customerEmailAlt
//       }
//     });

//     console.log("Email saved to CRM");

//     /* ---------------- RETURN RESPONSE WITH PAYMENT DATA ---------------- */
//     // Prepare booking data for payment page
//     const bookingDataForPayment = {
//       customerName,
//       customerEmail: billingEmail,
//       customerPhone,
//       bookingAmount: bookingAmount || "0.00",
//       emailType,
//       senderBrand,
//       chargeReference,
//       // Include flight-specific data if applicable
//       ...(airline && {
//         airline,
//         flightNumber: flightNumber || "",
//         departure: departure || "",
//         arrival: arrival || "",
//         travelDate: travelDate || "",
//         confirmationNumber: confirmationNumber || ""
//       }),
//       // Include package data if applicable
//       ...(emailType === "holiday_package" && {
//         packageName: packageName || "",
//         packagePrice: packagePrice || "",
//         packageNights: packageNights || ""
//       })
//     };

//     console.log("Returning response with booking data:", bookingDataForPayment);

//     res.status(200).json({
//       status: "success",
//       message: (emailType === "new_reservation" || emailType === "flight_confirmation") && attachments.length > 0
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null,
//         // ADD THIS: Return booking data for Pay Now button
//         bookingData: bookingDataForPayment
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     console.error("Error stack:", error.stack);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: error.message
//     });
//   }
// };

//=========


// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     console.log("Received email request:", req.body);
    
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       checkInBaggage,
//       carryOnBaggage,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // FLIGHT TICKET SPECIFIC FIELDS
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal,
//       // NEW FIELDS FOR ALL EMAILS
//       updateType = "confirmed",
//       includeAgreement = true,
//       includeChargeNote = true,
//       includeFareRules = false,
//       cardHolderName,
//       cardLastFour,
//       cardExpiry,
//       cardCVV,
//       billingAddress,
//       customerEmail: customerEmailAlt,
//       // NEW: Sender brand from frontend
//       senderBrand = "lowfare_studio"
//     } = req.body;

//     console.log("Extracted fields - customerName:", customerName, "billingEmail:", billingEmail, "customerPhone:", customerPhone);

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       console.log("Validation failed: Missing required fields");
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
    
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
//     const trimmedPhone = customerPhone.toString().trim();
    
//     if (!phoneRegex.test(trimmedPhone)) {
//       console.log("Validation failed: Invalid phone format:", trimmedPhone);
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";
//     console.log("Subject:", subject);

//     /* ---------------- DYNAMIC GREETING LOGIC ---------------- */
//     const getDynamicGreeting = () => {
//       // Check if search query, category, or destination is provided for personalized greeting
//       if (searchQuery || category || destination) {
//         if (destination) {
//           return `regarding the ${destination}`;
//         } else if (category) {
//           return `regarding the ${category} booking`;
//         } else if (searchQuery) {
//           return `regarding your search for ${searchQuery}`;
//         }
//       }
      
//       // For all emails, use appropriate greeting based on type
//       switch(emailType) {
//         case 'new_reservation':
//         case 'flight_confirmation':
//           return "regarding your flight booking";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         case 'customer_support':
//           return "regarding your enquiry";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();
//     console.log("Dynamic greeting:", dynamicGreeting);

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";
//     const attachments = [];

//     // Determine update type based on email type if not provided
//     let finalUpdateType = updateType;
//     if (!finalUpdateType) {
//       switch(emailType) {
//         case "flight_cancellation":
//           finalUpdateType = "cancelled";
//           break;
//         case "exchange_ticket":
//           finalUpdateType = "changed";
//           break;
//         default:
//           finalUpdateType = "confirmed";
//       }
//     }

//     // PART 1: GREETING MESSAGE (FOR ALL EMAIL TYPES)
//     let greetingMessage = `
//       <p>Dear ${customerName}</p>
//       <p>Greetings of the day!</p>
//       <p>As per our telephonic conversation, we have ${finalUpdateType} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
//       <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     `;

//     // PART 2: CUSTOMER DETAILS (FOR ALL EMAIL TYPES)
//     let customerDetails = `
//       <p><b>Customer Details:</b></p>
//       <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//       <p><b>Email:</b> ${billingEmail}</p>
//     `;

//     // Add specific details based on email type
//     switch(emailType) {
//       case "new_reservation":
//       case "flight_confirmation":
//       case "exchange_ticket":
//       case "flight_cancellation":
//         // Flight-related details
//         if (airline || departure || arrival || travelDate || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
//             ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
//             ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
//             ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//             ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//             ${checkInBaggage ? `<p><b>Check-in Baggage:</b> ${checkInBaggage}</p>` : ''}
//             ${carryOnBaggage ? `<p><b>Carry-on Baggage:</b> ${carryOnBaggage}</p>` : ''}
//             ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//           // Add custom message if exists
//           if (customMessage && customMessage.trim() !== '') {
//             customerDetails += `<p><b>Additional Notes:</b> ${customMessage}</p>`;
//           }
//         }
//         break;

//       case "hotel_booking":
//         if (hotelName || roomType || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${hotelName ? `<p><b>Hotel:</b> ${hotelName}</p>` : ''}
//             ${roomType ? `<p><b>Room Type:</b> ${roomType}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "car_rental":
//         if (carType || rentalDays || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${carType ? `<p><b>Car Type:</b> ${carType}</p>` : ''}
//             ${rentalDays ? `<p><b>Rental Days:</b> ${rentalDays}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "holiday_package":
//         if (packageName || packageNights || packagePrice || numberOfPersons || confirmationNumber) {
//           customerDetails += `
//             ${packageName ? `<p><b>Package Name:</b> ${packageName}</p>` : ''}
//             ${packageNights ? `<p><b>Duration:</b> ${packageNights} night(s)</p>` : ''}
//             ${packageStartDate && packageEndDate ? `<p><b>Travel Dates:</b> ${packageStartDate} to ${packageEndDate}</p>` : ''}
//             ${numberOfPersons ? `<p><b>Number of Persons:</b> ${numberOfPersons}</p>` : ''}
//             ${packagePrice ? `<p><b>Package Price:</b> USD ${packagePrice}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "travel_insurance":
//         if (insuranceType || insuranceCoverage || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${insuranceType ? `<p><b>Insurance Type:</b> ${insuranceType}</p>` : ''}
//             ${insuranceCoverage ? `<p><b>Coverage:</b> ${insuranceCoverage}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "refund_request":
//         if (refundAmount || confirmationNumber) {
//           customerDetails += `
//             ${refundAmount ? `<p><b>Refund Amount:</b> USD ${refundAmount}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "seat_addons":
//       case "name_correction":
//       case "add_pet":
//         if (confirmationNumber) {
//           customerDetails += `
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//         }
//         break;

//       case "customer_support":
//         if (customMessage) {
//           customerDetails += `
//             <p><b>Message:</b> ${customMessage}</p>
//           `;
//         }
//         break;
//     }

//     // PART 3: "I AGREE" REQUEST (FOR ALL EMAIL TYPES)
//     let agreementSection = "";
//     if (includeAgreement && confirmationNumber) {
//       // Use your actual production backend URL
//       const backendUrl = process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host';
      
//       // Create agreement link with proper parameters
//       const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(customerName)}`;
      
//       agreementSection = `
//         <hr style="margin:20px 0; border-top:2px solid #4CAF50;">
        
//         <div style="text-align:center; margin:30px 0; padding:25px; background:#f0f9ff; border-radius:15px;">
//           <h3 style="color:#0369a1; margin-bottom:15px; font-size:20px;">📝 Quick Agreement</h3>
//           <p style="color:#475569; margin-bottom:20px;">Click the button below to instantly confirm your agreement:</p>
          
//           <a href="${agreementLink}" 
//              style="display:inline-block; background:#10b981; color:white; padding:15px 40px; 
//                     text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px;">
//             ✅ Click Here to Agree
//           </a>
          
//           <p style="margin-top:15px; color:#64748b; font-size:14px;">
//             <strong>Instantly confirm your agreement</strong> - No email reply needed
//           </p>
//             <p style="font-size:14px; color:#92400e;">
//             Your IP address will be automatically recorded for verification
//           </p>
//         </div>
        
       
//       `;
//     } else if (includeAgreement && !confirmationNumber) {
//       // Fallback if no booking reference
//       agreementSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><strong>Kindly reply to this email saying, "I Agree", enabling us to proceed with the changes.</strong></p>
//       `;
//     }

//     // PART 4: CREDIT CARD INFORMATION (Optional for all)
//     let paymentInfoSection = "";
//     if (cardHolderName || cardLastFour) {
//       paymentInfoSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Payment Information:</b></p>
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
//           ${cardHolderName ? `<p>Credit card holder name: ${cardHolderName}</p>` : ''}
//           ${cardLastFour ? `<p>Card last 4 digits: ****${cardLastFour}</p>` : ''}
//           ${cardExpiry ? `<p>Expiry date: ${cardExpiry}</p>` : ''}
//           ${cardCVV ? `<p>CVV: ***</p>` : ''}
//           ${billingAddress ? `<p>Billing address: ${billingAddress}</p>` : ''}
//           ${customerEmailAlt ? `<p>Customer email: ${customerEmailAlt}</p>` : ''}
//         </div>
//       `;
//     }

//     // PART 5: CHARGE REFERENCE NOTE (FOR ALL EMAIL TYPES)
//     let chargeNoteSection = "";
//     if (includeChargeNote !== false) {
//       // Determine charge reference based on senderBrand
//       let displayChargeReference = "Lowfarestudio";
//       if (senderBrand === "american_airlines") {
//         displayChargeReference = "American Airlines";
//       } else if (senderBrand === "airline_desk") {
//         displayChargeReference = "Airline Desk";
//       } else if (senderBrand === "lowfare_studio") {
//         displayChargeReference = "Lowfarestudio";
//       }
      
//       chargeNoteSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>NOTE:</b></p>
//         <p>Please note that you might see the charges under <strong>${displayChargeReference}</strong> on your billing statement.</p>
//         <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//       `;
//     }

//     // PART 6: FARE RULES (Only for flight-related emails)
//     let fareRulesSection = "";
//     const flightRelatedTypes = ["new_reservation", "flight_confirmation", "exchange_ticket", "flight_cancellation"];
//     if (flightRelatedTypes.includes(emailType) && includeFareRules) {
//       fareRulesSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Fare Rules (only for flight):</b></p>
//         <ol style="padding-left:20px; margin-top:10px;">
//           <li>Ticket is Non-Refundable & Non-Changeable.</li>
//           <li>Please contact us 72 hours prior to departure for reconfirmation of booking. So that, Schedule change can be checked and can be taken care within time.</li>
//           <li>There will be No Compensation in case of any Schedule Change.</li>
//           <li>Service Fee of USD 50 per passenger is applicable for any special request like taking future credit, seat assignment etc.</li>
//           <li>In case of No-Show ticket has No Value.</li>
//           <li>For any changes or special request give us a call back at least 24 hours prior to departure.</li>
//           <li>Special request confirmation will be given by Airlines only.</li>
//           <li>Name changes are not permitted once the reservation has been confirmed.</li>
//           <li>The name on each ticket must match a valid photo ID shown at the airport for domestic Ticket and for International Travel name should be as per Passport.</li>
//           <li>IDs should be valid for 6 months from the date of last Flight.</li>
//           <li>If your credit card declines at the time of the processing your transaction, we will make all efforts to notify you by email within 24 hours. The transaction will not be processed if your credit card has been declined. The fare and any other booking details are not guaranteed in such instance.</li>
//         </ol>
//       `;
//     }

//     // PART 7: CUSTOM MESSAGE (FOR ALL EMAIL TYPES)
//     let customMessageSection = "";
//     if (customMessage && customMessage.trim() !== "") {
//       customMessageSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; border-left:4px solid #6c757d;">
//           <p><b>Additional Notes:</b></p>
//           <p style="font-style:italic; color:#495057;">${customMessage}</p>
//         </div>
//       `;
//     }

//     // // ✅ NEW: PAY NOW BUTTON SECTION FOR EMAIL
//     // let payNowButtonSection = "";
//     // if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
//     //   // Create a unique payment link for customer
//     //   const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
//     //   const paymentLink = `${frontendUrl}/payment?customerName=${encodeURIComponent(customerName)}&email=${encodeURIComponent(billingEmail)}&phone=${encodeURIComponent(customerPhone)}&amount=${bookingAmount}&bookingRef=${confirmationNumber || ''}`;
      
//     //   payNowButtonSection = `
//     //     <hr style="margin:20px 0; border-top:2px solid #10b981;">
        
//     //     <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
//     //       <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">💳 Secure Payment</h3>
//     //       <p style="color:#374151; margin-bottom:10px; font-size:16px;">
//     //         Your booking amount: <strong style="color:#065f46; font-size:20px;">USD ${bookingAmount}</strong>
//     //       </p>
//     //       <p style="color:#4b5563; margin-bottom:20px; font-size:14px;">
//     //         Click the button below to complete your payment securely
//     //       </p>
          
//     //       <a href="${paymentLink}" 
//     //          style="display:inline-block; background:linear-gradient(135deg, #10b981 0%, #059669 100%); 
//     //                 color:white; padding:18px 45px; text-decoration:none; border-radius:50px; 
//     //                 font-weight:bold; font-size:18px; box-shadow:0 4px 6px rgba(16, 185, 129, 0.3);
//     //                 transition:all 0.3s ease;">
//     //         💳 Pay Now - USD ${bookingAmount}
//     //       </a>
          
//     //       <p style="margin-top:15px; color:#047857; font-size:14px;">
//     //         <strong>Secure payment via PayPal & Credit Cards</strong>
//     //       </p>
//     //       <div style="display:flex; justify-content:center; gap:15px; margin-top:10px;">
//     //         <span style="font-size:12px; color:#6b7280;">✅ SSL Secured</span>
//     //         <span style="font-size:12px; color:#6b7280;">✅ PayPal Verified</span>
//     //         <span style="font-size:12px; color:#6b7280;">✅ Instant Confirmation</span>
//     //       </div>
//     //     </div>
        
//     //     <div style="text-align:center; margin:20px 0; padding:15px; background:#fef3c7; border-radius:8px;">
//     //       <p style="color:#92400e; font-weight:bold; margin-bottom:8px;">⚠️ Important Note:</p>
//     //       <p style="color:#92400e; font-size:14px; margin:0;">
//     //         Your booking will be confirmed only after successful payment. Please complete payment within 24 hours.
//     //       </p>
//     //     </div>
//     //   `;
//     // }


// //     let payNowButtonSection = "";
// // if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
  
// //   // Debug logging
// //   console.log('Generating payment link for:', {
// //     customerName,
// //     billingEmail,
// //     bookingAmount,
// //     confirmationNumber
// //   });
  
// //   const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
  
// //   // Validate URL
// //   if (!frontendUrl || frontendUrl.includes('localhost') || frontendUrl.includes('127.0.0.1')) {
// //     console.error('❌ Invalid frontend URL for email:', frontendUrl);
// //     // Optionally, provide alternative instructions
// //     payNowButtonSection = `
// //       <div style="text-align:center; margin:30px 0; padding:25px; background:#fef2f2; border-radius:15px;">
// //         <p style="color:#dc2626;">Payment system temporarily unavailable.</p>
// //         <p>Please contact support to complete your payment.</p>
// //       </div>
// //     `;
// //   } else {
// //     // Create secure payment link
// //     const params = new URLSearchParams({
// //       customerName: customerName || '',
// //       email: billingEmail || '',
// //       phone: customerPhone || '',
// //       amount: bookingAmount,
// //       bookingRef: confirmationNumber || '',
// //       timestamp: Date.now().toString() // Prevent caching
// //     });
    
// //     const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
    
// //     console.log('Generated payment link:', paymentLink);
    
// //     payNowButtonSection = `
// //       <hr style="margin:20px 0; border-top:2px solid #10b981;">
      
// //       <div style="text-align:center; margin:30px 0; padding:25px; background:#f0fff4; border-radius:15px;">
// //         <h3 style="color:#065f46;">💳 Complete Your Payment</h3>
// //         <p>Amount: <strong>USD ${bookingAmount}</strong></p>
        
// //         <!-- Primary Payment Button -->
// //         <a href="${paymentLink}" 
// //            style="display:inline-block; background:#10b981; color:white; 
// //                   padding:15px 30px; text-decoration:none; border-radius:8px; 
// //                   font-weight:bold; margin:15px 0;">
// //           Pay Now - USD ${bookingAmount}
// //         </a>
        
// //         <!-- Alternative: Direct PayPal Link as fallback -->
// //         <div style="margin-top:15px; font-size:12px; color:#6b7280;">
// //           <p>If the button doesn't work, copy this link:</p>
// //           <p style="word-break:break-all; background:#f3f4f6; padding:8px; border-radius:4px;">
// //             ${paymentLink}
// //           </p>
// //         </div>
// //       </div>
// //     `;
// //   }
// // }


// // ✅ NEW: DIRECT PAYPAL PAYMENT LINK
// // let payNowButtonSection = "";
// // if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
// //   try {
// //     // Step 1: Create PayPal Order First
// //     const paypalOrder = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')}`,
// //         'PayPal-Request-Id': confirmationNumber || `order_${Date.now()}`
// //       },
// //       body: JSON.stringify({
// //         intent: 'CAPTURE',
// //         purchase_units: [{
// //           amount: {
// //             currency_code: 'USD',
// //             value: bookingAmount
// //           },
// //           description: `Booking for ${customerName}`,
// //           custom_id: confirmationNumber || '',
// //           invoice_id: confirmationNumber || `INV_${Date.now()}`
// //         }],
// //         application_context: {
// //           brand_name: 'FareBuzzer Travel',
// //           landing_page: 'BILLING',
// //           user_action: 'PAY_NOW',
// //           return_url: `${process.env.FRONTEND_URL}/payment-success`,
// //           cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`
// //         }
// //       })
// //     });

// //     const orderData = await paypalOrder.json();
    
// //     if (orderData.id && orderData.links) {
// //       // Find the PayPal approval link
// //       const approvalLink = orderData.links.find(link => link.rel === 'approve');
      
// //       if (approvalLink) {
// //         // DIRECT PAYPAL LINK
// //         const directPayPalLink = approvalLink.href;
        
// //         payNowButtonSection = `
// //           <hr style="margin:20px 0; border-top:2px solid #10b981;">
          
// //           <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
// //             <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">💳 Secure Payment</h3>
// //             <p style="color:#374151; margin-bottom:10px; font-size:16px;">
// //               Your booking amount: <strong style="color:#065f46; font-size:20px;">USD ${bookingAmount}</strong>
// //             </p>
            
// //             <!-- DIRECT PAYPAL LINK -->
// //             <a href="${directPayPalLink}" 
// //                style="display:inline-block; background:linear-gradient(135deg, #10b981 0%, #059669 100%); 
// //                       color:white; padding:18px 45px; text-decoration:none; border-radius:50px; 
// //                       font-weight:bold; font-size:18px; box-shadow:0 4px 6px rgba(16, 185, 129, 0.3);
// //                       transition:all 0.3s ease;">
// //               💳 Pay Now with PayPal - USD ${bookingAmount}
// //             </a>
            
// //             <p style="margin-top:15px; color:#047857; font-size:14px;">
// //               <strong>Secure payment via PayPal & Credit Cards</strong>
// //             </p>
// //           </div>
// //         `;
// //       }
// //     }
// //   } catch (error) {
// //     console.error("Error creating PayPal order:", error);
// //     // Fallback to regular payment page
// //     const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
// //     const paymentLink = `${frontendUrl}/payment?customerName=${encodeURIComponent(customerName)}&email=${encodeURIComponent(billingEmail)}&phone=${encodeURIComponent(customerPhone)}&amount=${bookingAmount}&bookingRef=${confirmationNumber || ''}`;
    
// //     payNowButtonSection = `
// //       <div style="text-align:center;">
// //         <a href="${paymentLink}" 
// //            style="display:inline-block; background:#10b981; color:white; padding:15px 30px; text-decoration:none; border-radius:8px;">
// //           Pay Now - USD ${bookingAmount}
// //         </a>
// //       </div>
// //     `;
// //   }
// // }



// // ✅ WORKING PAYMENT BUTTON CODE
// let payNowButtonSection = "";
// if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
//   console.log("=== PAYMENT BUTTON DEBUG ===");
//   console.log("1. Booking amount:", bookingAmount);
//   console.log("2. Customer name:", customerName);
//   console.log("3. Email:", billingEmail);
  
//   try {
//     const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
    
//     // Create payment link with all parameters
//     const params = new URLSearchParams({
//       customerName: customerName || '',
//       email: billingEmail || '',
//       phone: customerPhone || '',
//       amount: bookingAmount,
//       bookingRef: confirmationNumber || '',
//       source: 'email',
//       timestamp: Date.now().toString()
//     });
    
//     const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
    
//     console.log("4. Payment link:", paymentLink);
//     console.log("5. FRONTEND_URL:", frontendUrl);
    
//     payNowButtonSection = `
//       <hr style="margin:20px 0; border-top:2px solid #10b981;">
      
//       <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
//         <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">💳 Complete Your Payment</h3>
        
//         <div style="background:white; padding:15px; border-radius:10px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
//           <p style="margin:0; color:#374151; font-size:16px;">
//             <span style="color:#64748b;">Booking Reference:</span> 
//             <strong style="color:#065f46;">${confirmationNumber || 'N/A'}</strong>
//           </p>
//           <p style="margin:10px 0 0; color:#374151; font-size:16px;">
//             <span style="color:#64748b;">Amount Due:</span> 
//             <strong style="color:#065f46; font-size:20px;">USD ${bookingAmount}</strong>
//           </p>
//         </div>
        
//         <!-- PAY NOW BUTTON -->
//         <a href="${paymentLink}" 
//            style="display:inline-block; 
//                   background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//                   color: white; 
//                   padding: 16px 40px; 
//                   text-decoration: none; 
//                   border-radius: 50px; 
//                   font-weight: bold; 
//                   font-size: 18px; 
//                   box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
//                   transition: all 0.3s ease;
//                   margin: 15px 0;">
//           💳 Pay Now - USD ${bookingAmount}
//         </a>
        
//         <!-- PAYMENT OPTIONS -->
//         <div style="margin-top:20px;">
//           <p style="color:#047857; font-size:14px; margin-bottom:10px;">
//             <strong>Accepted Payment Methods:</strong>
//           </p>
//           <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
//             <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ PayPal</span>
//             <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Credit Card</span>
//             <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Debit Card</span>
//           </div>
//         </div>
        
//         <!-- ALTERNATIVE INSTRUCTIONS -->
//         <div style="margin-top:20px; padding:15px; background:#fef3c7; border-radius:8px;">
//           <p style="color:#92400e; font-size:14px; margin:0;">
//             <strong>⚠️ Important:</strong> Please complete payment within 24 hours to confirm your booking.
//           </p>
//         </div>
//       </div>
//     `;
    
//     console.log("6. Button HTML generated successfully");
//     console.log("=== END DEBUG ===");
    
//   } catch (error) {
//     console.error("ERROR creating payment button:", error);
    
//     // Fallback - simple text
//     payNowButtonSection = `
//       <div style="text-align:center; margin:30px 0; padding:25px; background:#fef2f2; border-radius:15px;">
//         <p style="color:#dc2626; font-weight:bold;">Payment Link Generation Failed</p>
//         <p>Please contact support to complete your payment of USD ${bookingAmount}</p>
//       </div>
//     `;
//   }
// } else {
//   console.log("DEBUG: No payment amount or amount is zero:", bookingAmount);
// }











//     // Combine all sections
//     message = greetingMessage + customerDetails + agreementSection + 
//               paymentInfoSection + chargeNoteSection + fareRulesSection +
//               customMessageSection + payNowButtonSection;

//     // Generate and attach PDF ticket for new_reservation and flight_confirmation
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       try {
//         console.log("Generating e-ticket...");
//         const ticketPath = await generateETicket({
//           confirmationNumber,
//           customerName,
//           customerPhone,
//           billingEmail,
//           checkInBaggage: checkInBaggage || "",
//           carryOnBaggage: carryOnBaggage || "",
//           airline,
//           departure,
//           arrival,
//           travelDate,
//           bookingAmount,
//           chargeReference,
//           cabinClass,
//           departureTime,
//           arrivalTime,
//           ticketNumber,
//           flightNumber,
//           fareType,
//           departureTerminal,
//           arrivalTerminal,
//           cardLastFour: cardLastFour || "",
//         });

//         attachments.push({
//           filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//           path: ticketPath,
//           contentType: "application/pdf"
//         });
//         console.log("E-ticket generated and attached");
//       } catch (error) {
//         console.error("Error generating e-ticket:", error);
//         // Continue without attachment if PDF generation fails
//       }
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     console.log("Sending email...");

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject,
//       html,
//       attachments
//     });

//     console.log("Email sent successfully");

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         checkInBaggage,
//         carryOnBaggage,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // FLIGHT TICKET FIELDS
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal,
//         customMessage,
//         // NEW FIELDS FOR ALL EMAILS
//         updateType: finalUpdateType,
//         includeAgreement,
//         includeChargeNote,
//         includeFareRules,
//         cardHolderName,
//         cardLastFour,
//         cardExpiry,
//         cardCVV,
//         billingAddress,
//         customerEmail: customerEmailAlt
//       }
//     });

//     console.log("Email saved to CRM");

//     /* ---------------- RETURN RESPONSE WITH PAYMENT DATA ---------------- */
//     // Prepare booking data for payment page
//     const bookingDataForPayment = {
//       customerName,
//       customerEmail: billingEmail,
//       customerPhone,
//       bookingAmount: bookingAmount || "0.00",
//       emailType,
//       senderBrand,
//       chargeReference,
//       // Include flight-specific data if applicable
//       ...(airline && {
//         airline,
//         flightNumber: flightNumber || "",
//         departure: departure || "",
//         arrival: arrival || "",
//         travelDate: travelDate || "",
//         confirmationNumber: confirmationNumber || ""
//       }),
//       // Include package data if applicable
//       ...(emailType === "holiday_package" && {
//         packageName: packageName || "",
//         packagePrice: packagePrice || "",
//         packageNights: packageNights || ""
//       })
//     };

//     console.log("Returning response with booking data:", bookingDataForPayment);

//     res.status(200).json({
//       status: "success",
//       message: (emailType === "new_reservation" || emailType === "flight_confirmation") && attachments.length > 0
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null,
//         // ADD THIS: Return booking data for Pay Now button
//         bookingData: bookingDataForPayment
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     console.error("Error stack:", error.stack);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: error.message
//     });
//   }
// };

//============7 feb=======

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";
// import Invoice from "../models/Invoice.js";
// // ✅ ADD THIS FUNCTION AT THE TOP
// const generateMessageId = (email) => {
//   const timestamp = Date.now();
//   const random = Math.random().toString(36).substring(2, 10);
//   const domain = email.split('@')[1] || 'farebuzzertravel.com';
//   return `<${timestamp}.${random}@${domain}>`;
// };

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     console.log("Received email request:", req.body);
    
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       checkInBaggage,
//       carryOnBaggage,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // NEW: Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // NEW: Hotel fields
//       hotelName,
//       roomType,
//       // NEW: Car rental fields
//       carType,
//       rentalDays,
//       // NEW: Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // FLIGHT TICKET SPECIFIC FIELDS
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal,
//       // NEW FIELDS FOR ALL EMAILS
//       updateType = "confirmed",
//       includeAgreement = true,
//       includeChargeNote = true,
//       includeFareRules = false,
//       cardHolderName,
//       cardLastFour,
//       cardExpiry,
//       cardCVV,
//       billingAddress,
//       customerEmail: customerEmailAlt,
//       // NEW: Sender brand from frontend
//       senderBrand = "lowfare_studio",
//       // ✅ NEW: For chain mail threading
//       originalMessageId // Added this field
//     } = req.body;

//     console.log("Extracted fields - customerName:", customerName, "billingEmail:", billingEmail, "customerPhone:", customerPhone);

//     // UPDATED: Added phone validation
//     if (!customerName || !billingEmail || !customerPhone) {
//       console.log("Validation failed: Missing required fields");
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
    
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
//     const trimmedPhone = customerPhone.toString().trim();
    
//     if (!phoneRegex.test(trimmedPhone)) {
//       console.log("Validation failed: Invalid phone format:", trimmedPhone);
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
//       });
//     }

//     // ✅ INVOICE CREATION - Send email ke baad
//     if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
//       // Create invoice
//       const invoice = await Invoice.create({
//         customerName,
//         customerEmail: billingEmail,
//         customerPhone,
//         bookingRef: confirmationNumber,
//         emailType,
//         senderBrand,
//         amount: bookingAmount,
//         messageId: messageId,
//         items: [{
//           description: getServiceDescription(emailType, {
//             packageName,
//             airline,
//             departure,
//             arrival
//           }),
//           quantity: 1,
//           unitPrice: bookingAmount,
//           total: bookingAmount
//         }]
//       });
      
//       console.log("Invoice created:", invoice.invoiceNumber);
      
//       // ✅ UPDATE PAYMENT BUTTON WITH INVOICE LINK
//       const invoiceLink = `${frontendUrl}/invoice/${invoice.invoiceNumber}`;
//       payNowButtonSection = generateInvoicePaymentSection(invoice, invoiceLink);
//     }

//     /* ---------------- SUBJECT MAP ---------------- */
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";
//     console.log("Subject:", subject);

//     /* ---------------- DYNAMIC GREETING LOGIC ---------------- */
//     const getDynamicGreeting = () => {
//       // Check if search query, category, or destination is provided for personalized greeting
//       if (searchQuery || category || destination) {
//         if (destination) {
//           return `regarding the ${destination}`;
//         } else if (category) {
//           return `regarding the ${category} booking`;
//         } else if (searchQuery) {
//           return `regarding your search for ${searchQuery}`;
//         }
//       }
      
//       // For all emails, use appropriate greeting based on type
//       switch(emailType) {
//         case 'new_reservation':
//         case 'flight_confirmation':
//           return "regarding your flight booking";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         case 'customer_support':
//           return "regarding your enquiry";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();
//     console.log("Dynamic greeting:", dynamicGreeting);

//     // ✅ GENERATE MESSAGE ID FOR THREADING
//     const messageId = generateMessageId(billingEmail);
//     console.log("Generated Message-ID:", messageId);
//     console.log("Original Message-ID from request:", originalMessageId);

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";
//     const attachments = [];

//     // Determine update type based on email type if not provided
//     let finalUpdateType = updateType;
//     if (!finalUpdateType) {
//       switch(emailType) {
//         case "flight_cancellation":
//           finalUpdateType = "cancelled";
//           break;
//         case "exchange_ticket":
//           finalUpdateType = "changed";
//           break;
//         default:
//           finalUpdateType = "confirmed";
//       }
//     }

//     // PART 1: GREETING MESSAGE (FOR ALL EMAIL TYPES)
//     let greetingMessage = `
//       <p>Dear ${customerName}</p>
//       <p>Greetings of the day!</p>
//       <p>As per our telephonic conversation, we have ${finalUpdateType} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
//       <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     `;

//     // PART 2: CUSTOMER DETAILS (FOR ALL EMAIL TYPES)
//     let customerDetails = `
//       <p><b>Customer Details:</b></p>
//       <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//       <p><b>Email:</b> ${billingEmail}</p>
//     `;

//     // Add specific details based on email type
//     switch(emailType) {
//       case "new_reservation":
//       case "flight_confirmation":
//       case "exchange_ticket":
//       case "flight_cancellation":
//         // Flight-related details
//         if (airline || departure || arrival || travelDate || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
//             ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
//             ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
//             ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//             ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//             ${checkInBaggage ? `<p><b>Check-in Baggage:</b> ${checkInBaggage}</p>` : ''}
//             ${carryOnBaggage ? `<p><b>Carry-on Baggage:</b> ${carryOnBaggage}</p>` : ''}
//             ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//           // Add custom message if exists
//           if (customMessage && customMessage.trim() !== '') {
//             customerDetails += `<p><b>Additional Notes:</b> ${customMessage}</p>`;
//           }
//         }
//         break;

//       case "hotel_booking":
//         if (hotelName || roomType || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${hotelName ? `<p><b>Hotel:</b> ${hotelName}</p>` : ''}
//             ${roomType ? `<p><b>Room Type:</b> ${roomType}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "car_rental":
//         if (carType || rentalDays || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${carType ? `<p><b>Car Type:</b> ${carType}</p>` : ''}
//             ${rentalDays ? `<p><b>Rental Days:</b> ${rentalDays}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "holiday_package":
//         if (packageName || packageNights || packagePrice || numberOfPersons || confirmationNumber) {
//           customerDetails += `
//             ${packageName ? `<p><b>Package Name:</b> ${packageName}</p>` : ''}
//             ${packageNights ? `<p><b>Duration:</b> ${packageNights} night(s)</p>` : ''}
//             ${packageStartDate && packageEndDate ? `<p><b>Travel Dates:</b> ${packageStartDate} to ${packageEndDate}</p>` : ''}
//             ${numberOfPersons ? `<p><b>Number of Persons:</b> ${numberOfPersons}</p>` : ''}
//             ${packagePrice ? `<p><b>Package Price:</b> USD ${packagePrice}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "travel_insurance":
//         if (insuranceType || insuranceCoverage || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${insuranceType ? `<p><b>Insurance Type:</b> ${insuranceType}</p>` : ''}
//             ${insuranceCoverage ? `<p><b>Coverage:</b> ${insuranceCoverage}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "refund_request":
//         if (refundAmount || confirmationNumber) {
//           customerDetails += `
//             ${refundAmount ? `<p><b>Refund Amount:</b> USD ${refundAmount}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "seat_addons":
//       case "name_correction":
//       case "add_pet":
//         if (confirmationNumber) {
//           customerDetails += `
//             <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           `;
//         }
//         break;

//       case "customer_support":
//         if (customMessage) {
//           customerDetails += `
//             <p><b>Message:</b> ${customMessage}</p>
//           `;
//         }
//         break;
//     }

//     // PART 3: "I AGREE" REQUEST (FOR ALL EMAIL TYPES)
//     let agreementSection = "";
//     if (includeAgreement && confirmationNumber) {
//       // Use your actual production backend URL
//       const backendUrl = process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host';
      
//       // Create agreement link with proper parameters
//       const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(customerName)}`;
      
//       agreementSection = `
//         <hr style="margin:20px 0; border-top:2px solid #4CAF50;">
        
//         <div style="text-align:center; margin:30px 0; padding:25px; background:#f0f9ff; border-radius:15px;">
//           <h3 style="color:#0369a1; margin-bottom:15px; font-size:20px;">📝 Quick Agreement</h3>
//           <p style="color:#475569; margin-bottom:20px;">Click the button below to instantly confirm your agreement:</p>
          
//           <a href="${agreementLink}" 
//              style="display:inline-block; background:#10b981; color:white; padding:15px 40px; 
//                     text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px;">
//             ✅ Click Here to Agree
//           </a>
          
//           <p style="margin-top:15px; color:#64748b; font-size:14px;">
//             <strong>Instantly confirm your agreement</strong> - No email reply needed
//           </p>
//             <p style="font-size:14px; color:#92400e;">
//             Your IP address will be automatically recorded for verification
//           </p>
//         </div>
//       `;
//     } else if (includeAgreement && !confirmationNumber) {
//       // Fallback if no booking reference
//       agreementSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><strong>Kindly reply to this email saying, "I Agree", enabling us to proceed with the changes.</strong></p>
//       `;
//     }

//     // PART 4: CREDIT CARD INFORMATION (Optional for all)
//     let paymentInfoSection = "";
//     if (cardHolderName || cardLastFour) {
//       paymentInfoSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Payment Information:</b></p>
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
//           ${cardHolderName ? `<p>Credit card holder name: ${cardHolderName}</p>` : ''}
//           ${cardLastFour ? `<p>Card last 4 digits: ****${cardLastFour}</p>` : ''}
//           ${cardExpiry ? `<p>Expiry date: ${cardExpiry}</p>` : ''}
//           ${cardCVV ? `<p>CVV: ***</p>` : ''}
//           ${billingAddress ? `<p>Billing address: ${billingAddress}</p>` : ''}
//           ${customerEmailAlt ? `<p>Customer email: ${customerEmailAlt}</p>` : ''}
//         </div>
//       `;
//     }

//     // PART 5: CHARGE REFERENCE NOTE (FOR ALL EMAIL TYPES)
//     let chargeNoteSection = "";
//     if (includeChargeNote !== false) {
//       // Determine charge reference based on senderBrand
//       let displayChargeReference = "Lowfarestudio";
//       if (senderBrand === "american_airlines") {
//         displayChargeReference = "American Airlines";
//       } else if (senderBrand === "airline_desk") {
//         displayChargeReference = "Airline Desk";
//       } else if (senderBrand === "lowfare_studio") {
//         displayChargeReference = "Lowfarestudio";
//       }
      
//       chargeNoteSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>NOTE:</b></p>
//         <p>Please note that you might see the charges under <strong>${displayChargeReference}</strong> on your billing statement.</p>
//         <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//       `;
//     }

//     // PART 6: FARE RULES (Only for flight-related emails)
//     let fareRulesSection = "";
//     const flightRelatedTypes = ["new_reservation", "flight_confirmation", "exchange_ticket", "flight_cancellation"];
//     if (flightRelatedTypes.includes(emailType) && includeFareRules) {
//       fareRulesSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Fare Rules (only for flight):</b></p>
//         <ol style="padding-left:20px; margin-top:10px;">
//           <li>Ticket is Non-Refundable & Non-Changeable.</li>
//           <li>Please contact us 72 hours prior to departure for reconfirmation of booking. So that, Schedule change can be checked and can be taken care within time.</li>
//           <li>There will be No Compensation in case of any Schedule Change.</li>
//           <li>Service Fee of USD 50 per passenger is applicable for any special request like taking future credit, seat assignment etc.</li>
//           <li>In case of No-Show ticket has No Value.</li>
//           <li>For any changes or special request give us a call back at least 24 hours prior to departure.</li>
//           <li>Special request confirmation will be given by Airlines only.</li>
//           <li>Name changes are not permitted once the reservation has been confirmed.</li>
//           <li>The name on each ticket must match a valid photo ID shown at the airport for domestic Ticket and for International Travel name should be as per Passport.</li>
//           <li>IDs should be valid for 6 months from the date of last Flight.</li>
//           <li>If your credit card declines at the time of the processing your transaction, we will make all efforts to notify you by email within 24 hours. The transaction will not be processed if your credit card has been declined. The fare and any other booking details are not guaranteed in such instance.</li>
//         </ol>
//       `;
//     }

//     // PART 7: CUSTOM MESSAGE (FOR ALL EMAIL TYPES)
//     let customMessageSection = "";
//     if (customMessage && customMessage.trim() !== "") {
//       customMessageSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; border-left:4px solid #6c757d;">
//           <p><b>Additional Notes:</b></p>
//           <p style="font-style:italic; color:#495057;">${customMessage}</p>
//         </div>
//       `;
//     }

//     // ✅ PAY NOW BUTTON SECTION
//     let payNowButtonSection = "";
//     if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
//       console.log("=== PAYMENT BUTTON DEBUG ===");
//       console.log("1. Booking amount:", bookingAmount);
//       console.log("2. Customer name:", customerName);
//       console.log("3. Email:", billingEmail);
      
//       try {
//         const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
        
//         // Create payment link with all parameters
//         const params = new URLSearchParams({
//           customerName: customerName || '',
//           email: billingEmail || '',
//           phone: customerPhone || '',
//           amount: bookingAmount,
//           bookingRef: confirmationNumber || '',
//           source: 'email',
//           timestamp: Date.now().toString()
//         });
        
//         const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
        
//         console.log("4. Payment link:", paymentLink);
//         console.log("5. FRONTEND_URL:", frontendUrl);
        
//         payNowButtonSection = `
//           <hr style="margin:20px 0; border-top:2px solid #10b981;">
          
//           <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
//             <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">💳 Complete Your Payment</h3>
            
//             <div style="background:white; padding:15px; border-radius:10px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
//               <p style="margin:0; color:#374151; font-size:16px;">
//                 <span style="color:#64748b;">Booking Reference:</span> 
//                 <strong style="color:#065f46;">${confirmationNumber || 'N/A'}</strong>
//               </p>
//               <p style="margin:10px 0 0; color:#374151; font-size:16px;">
//                 <span style="color:#64748b;">Amount Due:</span> 
//                 <strong style="color:#065f46; font-size:20px;">USD ${bookingAmount}</strong>
//               </p>
//             </div>
            
//             <!-- PAY NOW BUTTON -->
//             <a href="${paymentLink}" 
//                style="display:inline-block; 
//                       background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//                       color: white; 
//                       padding: 16px 40px; 
//                       text-decoration: none; 
//                       border-radius: 50px; 
//                       font-weight: bold; 
//                       font-size: 18px; 
//                       box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
//                       transition: all 0.3s ease;
//                       margin: 15px 0;">
//               💳 Pay Now - USD ${bookingAmount}
//             </a>
            
//             <!-- PAYMENT OPTIONS -->
//             <div style="margin-top:20px;">
//               <p style="color:#047857; font-size:14px; margin-bottom:10px;">
//                 <strong>Accepted Payment Methods:</strong>
//               </p>
//               <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
//                 <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ PayPal</span>
//                 <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Credit Card</span>
//                 <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Debit Card</span>
//               </div>
//             </div>
            
//             <!-- ALTERNATIVE INSTRUCTIONS -->
//             <div style="margin-top:20px; padding:15px; background:#fef3c7; border-radius:8px;">
//               <p style="color:#92400e; font-size:14px; margin:0;">
//                 <strong>⚠️ Important:</strong> Please complete payment within 24 hours to confirm your booking.
//               </p>
//             </div>
//           </div>
//         `;
        
//         console.log("6. Button HTML generated successfully");
//         console.log("=== END DEBUG ===");
        
//       } catch (error) {
//         console.error("ERROR creating payment button:", error);
        
//         // Fallback - simple text
//         payNowButtonSection = `
//           <div style="text-align:center; margin:30px 0; padding:25px; background:#fef2f2; border-radius:15px;">
//             <p style="color:#dc2626; font-weight:bold;">Payment Link Generation Failed</p>
//             <p>Please contact support to complete your payment of USD ${bookingAmount}</p>
//           </div>
//         `;
//       }
//     } else {
//       console.log("DEBUG: No payment amount or amount is zero:", bookingAmount);
//     }

//     // Combine all sections
//     message = greetingMessage + customerDetails + agreementSection + 
//               paymentInfoSection + chargeNoteSection + fareRulesSection +
//               customMessageSection + payNowButtonSection;

//     // Generate and attach PDF ticket for new_reservation and flight_confirmation
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       try {
//         console.log("Generating e-ticket...");
//         const ticketPath = await generateETicket({
//           confirmationNumber,
//           customerName,
//           customerPhone,
//           billingEmail,
//           checkInBaggage: checkInBaggage || "",
//           carryOnBaggage: carryOnBaggage || "",
//           airline,
//           departure,
//           arrival,
//           travelDate,
//           bookingAmount,
//           chargeReference,
//           cabinClass,
//           departureTime,
//           arrivalTime,
//           ticketNumber,
//           flightNumber,
//           fareType,
//           departureTerminal,
//           arrivalTerminal,
//           cardLastFour: cardLastFour || "",
//         });

//         attachments.push({
//           filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//           path: ticketPath,
//           contentType: "application/pdf"
//         });
//         console.log("E-ticket generated and attached");
//       } catch (error) {
//         console.error("Error generating e-ticket:", error);
//         // Continue without attachment if PDF generation fails
//       }
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">
//           Thank you for your enquiry ${dynamicGreeting}.
//         </p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     console.log("Sending email...");

//     /* ---------------- SEND EMAIL WITH THREADING HEADERS ---------------- */
//     // ✅ CRITICAL: Prepare email headers for threading
//     const mailOptions = {
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject: subject,
//       html: html,
//       attachments: attachments,
//       // ✅ THREADING HEADERS FOR CHAIN MAIL
//       headers: {
//         'Message-ID': messageId,
//         ...(originalMessageId && {
//           'In-Reply-To': originalMessageId,
//           'References': originalMessageId
//         })
//       }
//     };

//     console.log("Mail options headers:", mailOptions.headers);

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");

//     /* ---------------- SAVE TO CRM INBOX WITH MESSAGE ID ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         checkInBaggage,
//         carryOnBaggage,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         // ✅ SAVE MESSAGE ID FOR THREADING
//         messageId: messageId,
//         originalMessageId: originalMessageId || null,
//         // NEW: Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // NEW: Hotel fields
//         hotelName,
//         roomType,
//         // NEW: Car rental fields
//         carType,
//         rentalDays,
//         // NEW: Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // FLIGHT TICKET FIELDS
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal,
//         customMessage,
//         // NEW FIELDS FOR ALL EMAILS
//         updateType: finalUpdateType,
//         includeAgreement,
//         includeChargeNote,
//         includeFareRules,
//         cardHolderName,
//         cardLastFour,
//         cardExpiry,
//         cardCVV,
//         billingAddress,
//         customerEmail: customerEmailAlt
//       }
//     });

//     console.log("Email saved to CRM with Message-ID:", messageId);

//     /* ---------------- RETURN RESPONSE WITH PAYMENT DATA ---------------- */
//     // Prepare booking data for payment page
//     const bookingDataForPayment = {
//       customerName,
//       customerEmail: billingEmail,
//       customerPhone,
//       bookingAmount: bookingAmount || "0.00",
//       emailType,
//       senderBrand,
//       chargeReference,
//       // Include flight-specific data if applicable
//       ...(airline && {
//         airline,
//         flightNumber: flightNumber || "",
//         departure: departure || "",
//         arrival: arrival || "",
//         travelDate: travelDate || "",
//         confirmationNumber: confirmationNumber || ""
//       }),
//       // Include package data if applicable
//       ...(emailType === "holiday_package" && {
//         packageName: packageName || "",
//         packagePrice: packagePrice || "",
//         packageNights: packageNights || ""
//       }),
//       // ✅ Also return messageId for future replies
//       messageId: messageId
//     };

//     console.log("Returning response with booking data:", bookingDataForPayment);

//     res.status(200).json({
//       status: "success",
//       message: (emailType === "new_reservation" || emailType === "flight_confirmation") && attachments.length > 0
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
//       data: { 
//         customerName, 
//         customerPhone, 
//         billingEmail, 
//         emailType,
//         dynamicGreeting,
//         templateUsed: templateUsed || null,
//         // ✅ Return messageId for threading
//         messageId: messageId,
//         // Return booking data for Pay Now button
//         bookingData: bookingDataForPayment
//       }
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     console.error("Error stack:", error.stack);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: error.message
//     });
//   }
//   // Helper function to generate service description
// const getServiceDescription = (emailType, details) => {
//   switch(emailType) {
//     case 'new_reservation':
//     case 'flight_confirmation':
//       return `Flight Booking: ${details.airline} ${details.departure} to ${details.arrival}`;
//     case 'holiday_package':
//       return `Holiday Package: ${details.packageName}`;
//     case 'hotel_booking':
//       return `Hotel Booking`;
//     case 'car_rental':
//       return `Car Rental`;
//     default:
//       return 'Travel Service';
//   }
// };

// // Generate invoice payment section for email
// const generateInvoicePaymentSection = (invoice, invoiceLink) => {
//   return `
//     <hr style="margin:20px 0; border-top:2px solid #10b981;">
    
//     <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
//       <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">📋 Your Invoice & Payment</h3>
      
//       <div style="background:white; padding:15px; border-radius:10px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
//         <p style="margin:0; color:#374151; font-size:16px;">
//           <span style="color:#64748b;">Invoice Number:</span> 
//           <strong style="color:#065f46;">${invoice.invoiceNumber}</strong>
//         </p>
//         <p style="margin:10px 0 0; color:#374151; font-size:16px;">
//           <span style="color:#64748b;">Due Date:</span> 
//           <strong style="color:#065f46;">${new Date(invoice.dueDate).toLocaleDateString()}</strong>
//         </p>
//         <p style="margin:10px 0 0; color:#374151; font-size:16px;">
//           <span style="color:#64748b;">Amount Due:</span> 
//           <strong style="color:#065f46; font-size:20px;">USD ${invoice.amount}</strong>
//         </p>
//       </div>
      
//       <!-- VIEW INVOICE BUTTON -->
//       <a href="${invoiceLink}" 
//          style="display:inline-block; 
//                 background: #3b82f6;
//                 color: white; 
//                 padding: 12px 30px; 
//                 text-decoration: none; 
//                 border-radius: 50px; 
//                 font-weight: bold; 
//                 font-size: 16px; 
//                 margin: 10px 5px;
//                 border: 2px solid #2563eb;">
//         📄 View Invoice
//       </a>
      
//       <!-- PAY NOW BUTTON -->
//       <a href="${invoiceLink}" 
//          style="display:inline-block; 
//                 background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//                 color: white; 
//                 padding: 12px 30px; 
//                 text-decoration: none; 
//                 border-radius: 50px; 
//                 font-weight: bold; 
//                 font-size: 16px; 
//                 box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
//                 margin: 10px 5px;
//                 border: 2px solid #059669;">
//         💳 Pay Now - USD ${invoice.amount}
//       </a>
      
//       <!-- PAYMENT OPTIONS -->
//       <div style="margin-top:20px;">
//         <p style="color:#047857; font-size:14px; margin-bottom:10px;">
//           <strong>Accepted Payment Methods:</strong>
//         </p>
//         <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap;">
//           <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ PayPal</span>
//           <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Credit Card</span>
//           <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Debit Card</span>
//         </div>
//       </div>
      
//       <!-- ALTERNATIVE INSTRUCTIONS -->
//       <div style="margin-top:20px; padding:15px; background:#fef3c7; border-radius:8px;">
//         <p style="color:#92400e; font-size:14px; margin:0;">
//           <strong>⚠️ Important:</strong> Please complete payment before ${new Date(invoice.dueDate).toLocaleDateString()} to confirm your booking.
//         </p>
//       </div>
//     </div>
//   `;
// };
// };

//===9 feb==


// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";
// import { generateETicket } from "../utils/generateETicket.js";
// import Invoice from "../models/Invoice.js";

// // ✅ HELPER FUNCTIONS AT THE TOP
// const generateMessageId = (email) => {
//   const timestamp = Date.now();
//   const random = Math.random().toString(36).substring(2, 10);
//   const domain = email.split('@')[1] || 'farebuzzertravel.com';
//   return `<${timestamp}.${random}@${domain}>`;
// };

// const getServiceDescription = (emailType, details) => {
//   switch(emailType) {
//     case 'new_reservation':
//     case 'flight_confirmation':
//       return `Flight Booking: ${details.airline} ${details.departure} to ${details.arrival}`;
//     case 'holiday_package':
//       return `Holiday Package: ${details.packageName}`;
//     case 'hotel_booking':
//       return `Hotel Booking`;
//     case 'car_rental':
//       return `Car Rental`;
//     default:
//       return 'Travel Service';
//   }
// };

// const generateInvoicePaymentSection = (invoice) => {
//   const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
//   // const invoiceLink = `${frontendUrl}/invoice/${invoice.invoiceNumber}`;

//   const invoiceLink = `${process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host'}/api/invoices/${invoice.invoiceNumber}/view`;
  
//   return `
//     <hr style="margin:20px 0; border-top:2px solid #10b981;">
    
//     <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
//       <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">📋 Your Invoice & Payment</h3>
      
//       <div style="background:white; padding:15px; border-radius:10px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
//         <p style="margin:0; color:#374151; font-size:16px;">
//           <span style="color:#64748b;">Invoice Number:</span> 
//           <strong style="color:#065f46;">${invoice.invoiceNumber}</strong>
//         </p>
//         <p style="margin:10px 0 0; color:#374151; font-size:16px;">
//           <span style="color:#64748b;">Due Date:</span> 
//           <strong style="color:#065f46;">${new Date(invoice.dueDate).toLocaleDateString()}</strong>
//         </p>
//         <p style="margin:10px 0 0; color:#374151; font-size:16px;">
//           <span style="color:#64748b;">Amount Due:</span> 
//           <strong style="color:#065f46; font-size:20px;">USD ${invoice.amount}</strong>
//         </p>
//       </div>
      
//       <!-- VIEW INVOICE BUTTON -->
//       <a href="${invoiceLink}" 
//          style="display:inline-block; 
//                 background: #3b82f6;
//                 color: white; 
//                 padding: 12px 30px; 
//                 text-decoration: none; 
//                 border-radius: 50px; 
//                 font-weight: bold; 
//                 font-size: 16px; 
//                 margin: 10px 5px;
//                 border: 2px solid #2563eb;">
//         📄 View Invoice
//       </a>
      
//       <!-- PAY NOW BUTTON -->
//       <a href="${invoiceLink}" 
//          style="display:inline-block; 
//                 background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//                 color: white; 
//                 padding: 12px 30px; 
//                 text-decoration: none; 
//                 border-radius: 50px; 
//                 font-weight: bold; 
//                 font-size: 16px; 
//                 box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
//                 margin: 10px 5px;
//                 border: 2px solid #059669;">
//         💳 Pay Now - USD ${invoice.amount}
//       </a>
      
//       <!-- PAYMENT OPTIONS -->
//       <div style="margin-top:20px;">
//         <p style="color:#047857; font-size:14px; margin-bottom:10px;">
//           <strong>Accepted Payment Methods:</strong>
//         </p>
//         <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap;">
//           <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ PayPal</span>
//           <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Credit Card</span>
//           <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Debit Card</span>
//         </div>
//       </div>
      
//       <!-- ALTERNATIVE INSTRUCTIONS -->
//       <div style="margin-top:20px; padding:15px; background:#fef3c7; border-radius:8px;">
//         <p style="color:#92400e; font-size:14px; margin:0;">
//           <strong>⚠️ Important:</strong> Please complete payment before ${new Date(invoice.dueDate).toLocaleDateString()} to confirm your booking.
//         </p>
//       </div>
//     </div>
//   `;
// };

// // ✅ MAIN FUNCTION
// export const sendCustomerEmail = async (req, res) => {
//   try {
//     console.log("📧 Received email request:", req.body.emailType);
    
//     const {
//       emailType,
//       templateUsed,
//       customerName,
//       customerPhone,
//       billingEmail,
//       checkInBaggage,
//       carryOnBaggage,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       bookingAmount,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       refundAmount,
//       cancellationDate,
//       customMessage,
//       searchQuery,
//       category,
//       destination,
//       // Package fields
//       packageName,
//       packageNights,
//       packageStartDate,
//       packageEndDate,
//       packagePrice,
//       numberOfPersons,
//       // Hotel fields
//       hotelName,
//       roomType,
//       // Car rental fields
//       carType,
//       rentalDays,
//       // Insurance fields
//       insuranceType,
//       insuranceCoverage,
//       // Flight ticket fields
//       chargeReference = "LowfareStudio",
//       cabinClass,
//       departureTime,
//       arrivalTime,
//       ticketNumber,
//       flightNumber,
//       fareType,
//       departureTerminal,
//       arrivalTerminal,
//       // Update fields
//       updateType = "confirmed",
//       includeAgreement = true,
//       includeChargeNote = true,
//       includeFareRules = false,
//       cardHolderName,
//       cardLastFour,
//       cardExpiry,
//       cardCVV,
//       billingAddress,
//       customerEmail: customerEmailAlt,
//       // Sender brand
//       senderBrand = "lowfare_studio",
//       // Threading
//       originalMessageId
//     } = req.body;

//     // ✅ VALIDATION
//     if (!customerName || !billingEmail || !customerPhone) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name, phone number, and billing email are required"
//       });
//     }
    
//     const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
//     const trimmedPhone = customerPhone.toString().trim();
    
//     if (!phoneRegex.test(trimmedPhone)) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed"
//       });
//     }

//     // ✅ STEP 1: Generate Message ID
//     const messageId = generateMessageId(billingEmail);
//     console.log("📧 Generated Message-ID:", messageId);

//     // ✅ STEP 2: Create Invoice if booking amount exists
//     let invoice = null;
//     let invoicePaymentSection = "";
    
//     if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
//       try {
//         console.log("💰 Creating invoice for amount:", bookingAmount);
        
//         // Generate invoice number
//         const invoiceNumber = await Invoice.generateInvoiceNumber();
//         console.log("📝 Generated invoice number:", invoiceNumber);
        
//         // Create invoice object
//         const invoiceData = {
//           invoiceNumber,
//           customerName,
//           customerEmail: billingEmail,
//           customerPhone,
//           bookingRef: confirmationNumber,
//           emailType,
//           senderBrand,
//           amount: parseFloat(bookingAmount),
//           messageId,
//           items: [{
//             description: getServiceDescription(emailType, {
//               packageName,
//               airline,
//               departure,
//               arrival
//             }),
//             quantity: 1,
//             unitPrice: parseFloat(bookingAmount),
//             total: parseFloat(bookingAmount)
//           }],
//           paymentLink: `${process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host'}/invoice/${invoiceNumber}`
//         };
        
//         console.log("📋 Invoice data:", invoiceData);
        
//         // Create invoice in database
//         invoice = await Invoice.create(invoiceData);
        
//         console.log("✅ Invoice created:", invoice.invoiceNumber);
//         console.log("📊 Invoice ID:", invoice._id);
        
//         // Generate invoice payment section
//         invoicePaymentSection = generateInvoicePaymentSection(invoice);
        
//       } catch (invoiceError) {
//         console.error("❌ Error creating invoice:", invoiceError);
//         console.error("❌ Invoice error details:", invoiceError.message);
//         console.error("❌ Invoice error stack:", invoiceError.stack);
//         // Continue without invoice
//       }
//     } else {
//       console.log("ℹ️ No booking amount or amount is zero:", bookingAmount);
//     }

//     // ✅ SUBJECT MAP
//     const subjectMap = {
//       new_reservation: "Flight Reservation Confirmation",
//       exchange_ticket: "Ticket Exchange Confirmation",
//       flight_cancellation: "Flight Cancellation Confirmation",
//       refund_request: "Refund Request Received",
//       seat_addons: "Seat / Add-ons Confirmation",
//       name_correction: "Name Correction Request Received",
//       add_pet: "Pet Addition Confirmation",
//       flight_confirmation: "Flight Booking Confirmation",
//       hotel_booking: "Hotel Booking Confirmation",
//       car_rental: "Car Rental Confirmation",
//       customer_support: "Customer Support Response",
//       holiday_package: "Holiday Package Confirmation",
//       travel_insurance: "Travel Insurance Confirmation"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";

//     // ✅ DYNAMIC GREETING
//     const getDynamicGreeting = () => {
//       if (searchQuery || category || destination) {
//         if (destination) return `regarding the ${destination}`;
//         if (category) return `regarding the ${category} booking`;
//         if (searchQuery) return `regarding your search for ${searchQuery}`;
//       }
      
//       switch(emailType) {
//         case 'new_reservation':
//         case 'flight_confirmation':
//           return "regarding your flight booking";
//         case 'exchange_ticket':
//           return "regarding your ticket exchange";
//         case 'flight_cancellation':
//           return "regarding your flight cancellation";
//         case 'refund_request':
//           return "regarding your refund request";
//         case 'seat_addons':
//           return "regarding your seat selection";
//         case 'name_correction':
//           return "regarding your name correction";
//         case 'add_pet':
//           return "regarding your pet addition";
//         case 'hotel_booking':
//           return "regarding your hotel booking";
//         case 'car_rental':
//           return "regarding your car rental";
//         case 'holiday_package':
//           return "regarding your holiday package";
//         case 'travel_insurance':
//           return "regarding your travel insurance";
//         case 'customer_support':
//           return "regarding your enquiry";
//         default:
//           return "regarding your travel enquiry";
//       }
//     };

//     const dynamicGreeting = getDynamicGreeting();

//     // ✅ Determine update type
//     let finalUpdateType = updateType;
//     if (!finalUpdateType) {
//       switch(emailType) {
//         case "flight_cancellation":
//           finalUpdateType = "cancelled";
//           break;
//         case "exchange_ticket":
//           finalUpdateType = "changed";
//           break;
//         default:
//           finalUpdateType = "confirmed";
//       }
//     }

//     // ✅ BUILD EMAIL SECTIONS
//     let greetingMessage = `
//       <p>Dear ${customerName}</p>
//       <p>Greetings of the day!</p>
//       <p>As per our telephonic conversation, we have ${finalUpdateType} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
//       <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//     `;

//     // ✅ CUSTOMER DETAILS
//     let customerDetails = `
//       <p><b>Customer Details:</b></p>
//       <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
//       <p><b>Email:</b> ${billingEmail}</p>
//     `;

//     // Add specific details based on email type
//     switch(emailType) {
//       case "new_reservation":
//       case "flight_confirmation":
//       case "exchange_ticket":
//       case "flight_cancellation":
//         if (airline || departure || arrival || travelDate || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
//             ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
//             ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
//             ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
//             ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
//             ${checkInBaggage ? `<p><b>Check-in Baggage:</b> ${checkInBaggage}</p>` : ''}
//             ${carryOnBaggage ? `<p><b>Carry-on Baggage:</b> ${carryOnBaggage}</p>` : ''}
//             ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "hotel_booking":
//         if (hotelName || roomType || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${hotelName ? `<p><b>Hotel:</b> ${hotelName}</p>` : ''}
//             ${roomType ? `<p><b>Room Type:</b> ${roomType}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "car_rental":
//         if (carType || rentalDays || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${carType ? `<p><b>Car Type:</b> ${carType}</p>` : ''}
//             ${rentalDays ? `<p><b>Rental Days:</b> ${rentalDays}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "holiday_package":
//         if (packageName || packageNights || packagePrice || numberOfPersons || confirmationNumber) {
//           customerDetails += `
//             ${packageName ? `<p><b>Package Name:</b> ${packageName}</p>` : ''}
//             ${packageNights ? `<p><b>Duration:</b> ${packageNights} night(s)</p>` : ''}
//             ${packageStartDate && packageEndDate ? `<p><b>Travel Dates:</b> ${packageStartDate} to ${packageEndDate}</p>` : ''}
//             ${numberOfPersons ? `<p><b>Number of Persons:</b> ${numberOfPersons}</p>` : ''}
//             ${packagePrice ? `<p><b>Package Price:</b> USD ${packagePrice}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "travel_insurance":
//         if (insuranceType || insuranceCoverage || confirmationNumber || bookingAmount) {
//           customerDetails += `
//             ${insuranceType ? `<p><b>Insurance Type:</b> ${insuranceType}</p>` : ''}
//             ${insuranceCoverage ? `<p><b>Coverage:</b> ${insuranceCoverage}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
//             ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
//           `;
//         }
//         break;

//       case "refund_request":
//         if (refundAmount || confirmationNumber) {
//           customerDetails += `
//             ${refundAmount ? `<p><b>Refund Amount:</b> USD ${refundAmount}</p>` : ''}
//             ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
//           `;
//         }
//         break;

//       case "seat_addons":
//       case "name_correction":
//       case "add_pet":
//         if (confirmationNumber) {
//           customerDetails += `<p><b>Confirmation No:</b> ${confirmationNumber}</p>`;
//         }
//         break;

//       case "customer_support":
//         if (customMessage) {
//           customerDetails += `<p><b>Message:</b> ${customMessage}</p>`;
//         }
//         break;
//     }

//     // Add custom message if exists
//     if (customMessage && customMessage.trim() !== '') {
//       customerDetails += `<p><b>Additional Notes:</b> ${customMessage}</p>`;
//     }

//     // ✅ AGREEMENT SECTION
//     let agreementSection = "";
//     if (includeAgreement && confirmationNumber) {
//       const backendUrl = process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host';
//       const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(customerName)}`;
      
//       agreementSection = `
//         <hr style="margin:20px 0; border-top:2px solid #4CAF50;">
//         <div style="text-align:center; margin:30px 0; padding:25px; background:#f0f9ff; border-radius:15px;">
//           <h3 style="color:#0369a1; margin-bottom:15px; font-size:20px;">📝 Quick Agreement</h3>
//           <p style="color:#475569; margin-bottom:20px;">Click the button below to instantly confirm your agreement:</p>
//           <a href="${agreementLink}" style="display:inline-block; background:#10b981; color:white; padding:15px 40px; text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px;">
//             ✅ Click Here to Agree
//           </a>
//           <p style="margin-top:15px; color:#64748b; font-size:14px;">
//             <strong>Instantly confirm your agreement</strong> - No email reply needed
//           </p>
//         </div>
//       `;
//     }

//     // ✅ CREDIT CARD INFO SECTION
//     let paymentInfoSection = "";
//     if (cardHolderName || cardLastFour) {
//       paymentInfoSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Payment Information:</b></p>
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
//           ${cardHolderName ? `<p>Credit card holder name: ${cardHolderName}</p>` : ''}
//           ${cardLastFour ? `<p>Card last 4 digits: ****${cardLastFour}</p>` : ''}
//           ${cardExpiry ? `<p>Expiry date: ${cardExpiry}</p>` : ''}
//           ${cardCVV ? `<p>CVV: ***</p>` : ''}
//           ${billingAddress ? `<p>Billing address: ${billingAddress}</p>` : ''}
//           ${customerEmailAlt ? `<p>Customer email: ${customerEmailAlt}</p>` : ''}
//         </div>
//       `;
//     }

//     // ✅ CHARGE REFERENCE NOTE
//     let chargeNoteSection = "";
//     if (includeChargeNote !== false) {
//       let displayChargeReference = "Lowfarestudio";
//       if (senderBrand === "american_airlines") {
//         displayChargeReference = "American Airlines";
//       } else if (senderBrand === "airline_desk") {
//         displayChargeReference = "Airline Desk";
//       } else if (senderBrand === "lowfare_studio") {
//         displayChargeReference = "Lowfarestudio";
//       }
      
//       chargeNoteSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>NOTE:</b></p>
//         <p>Please note that you might see the charges under <strong>${displayChargeReference}</strong> on your billing statement.</p>
//         <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
//       `;
//     }

//     // ✅ FARE RULES SECTION
//     let fareRulesSection = "";
//     const flightRelatedTypes = ["new_reservation", "flight_confirmation", "exchange_ticket", "flight_cancellation"];
//     if (flightRelatedTypes.includes(emailType) && includeFareRules) {
//       fareRulesSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <p><b>Fare Rules (only for flight):</b></p>
//         <ol style="padding-left:20px; margin-top:10px;">
//           <li>Ticket is Non-Refundable & Non-Changeable.</li>
//           <li>Please contact us 72 hours prior to departure for reconfirmation of booking.</li>
//           <li>There will be No Compensation in case of any Schedule Change.</li>
//           <li>Service Fee of USD 50 per passenger is applicable for any special request.</li>
//           <li>In case of No-Show ticket has No Value.</li>
//           <li>For any changes give us a call back at least 24 hours prior to departure.</li>
//           <li>Special request confirmation will be given by Airlines only.</li>
//           <li>Name changes are not permitted once the reservation has been confirmed.</li>
//           <li>The name on each ticket must match a valid photo ID.</li>
//           <li>IDs should be valid for 6 months from the date of last Flight.</li>
//           <li>If your credit card declines, we will notify you by email within 24 hours.</li>
//         </ol>
//       `;
//     }

//     // ✅ CUSTOM MESSAGE SECTION
//     let customMessageSection = "";
//     if (customMessage && customMessage.trim() !== "") {
//       customMessageSection = `
//         <hr style="margin:20px 0; border-top:1px dashed #ccc;">
//         <div style="background:#f8f9fa; padding:15px; border-radius:5px; border-left:4px solid #6c757d;">
//           <p><b>Additional Notes:</b></p>
//           <p style="font-style:italic; color:#495057;">${customMessage}</p>
//         </div>
//       `;
//     }

//     // ✅ FALLBACK PAYMENT BUTTON (if invoice creation failed)
//     let fallbackPaymentSection = "";
//     if (!invoicePaymentSection && bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
//       const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
//       const params = new URLSearchParams({
//         customerName: customerName || '',
//         email: billingEmail || '',
//         phone: customerPhone || '',
//         amount: bookingAmount,
//         bookingRef: confirmationNumber || '',
//         source: 'email'
//       });
//       const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
      
//       fallbackPaymentSection = `
//         <hr style="margin:20px 0; border-top:2px solid #10b981;">
//         <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
//           <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">💳 Complete Your Payment</h3>
//           <p style="margin:10px 0 0; color:#374151; font-size:16px;">
//             <span style="color:#64748b;">Amount Due:</span> 
//             <strong style="color:#065f46; font-size:20px;">USD ${bookingAmount}</strong>
//           </p>
//           <a href="${paymentLink}" style="display:inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; margin: 15px 0;">
//             💳 Pay Now - USD ${bookingAmount}
//           </a>
//         </div>
//       `;
//     }

//     // ✅ COMBINE ALL SECTIONS
//     let message = greetingMessage + customerDetails;
    
//     // Add invoice section if created successfully
//     if (invoicePaymentSection) {
//       message += invoicePaymentSection;
//       console.log("✅ Invoice section added to email");
//     } else if (fallbackPaymentSection) {
//       message += fallbackPaymentSection;
//       console.log("✅ Fallback payment section added");
//     }
    
//     // Add other sections
//     message += agreementSection + paymentInfoSection + chargeNoteSection + fareRulesSection + customMessageSection;

//     // ✅ GENERATE E-TICKET PDF (if flight email)
//     const attachments = [];
//     if (emailType === "new_reservation" || emailType === "flight_confirmation") {
//       try {
//         const ticketPath = await generateETicket({
//           confirmationNumber,
//           customerName,
//           customerPhone,
//           billingEmail,
//           checkInBaggage: checkInBaggage || "",
//           carryOnBaggage: carryOnBaggage || "",
//           airline,
//           departure,
//           arrival,
//           travelDate,
//           bookingAmount,
//           chargeReference,
//           cabinClass,
//           departureTime,
//           arrivalTime,
//           ticketNumber,
//           flightNumber,
//           fareType,
//           departureTerminal,
//           arrivalTerminal,
//           cardLastFour: cardLastFour || "",
//         });

//         attachments.push({
//           filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
//           path: ticketPath,
//           contentType: "application/pdf"
//         });
//         console.log("✅ E-ticket generated and attached");
//       } catch (error) {
//         console.error("❌ Error generating e-ticket:", error);
//       }
//     }

//     // ✅ FINAL HTML
//     const html = `
//       <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
//         <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
//         <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
//         <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
//         <p style="margin-bottom:20px;">Thank you for your enquiry ${dynamicGreeting}.</p>
//         ${message}
//         <br/>
//         <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
//           <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
//           <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
//         <p style="margin-top:30px; color:#64748b; font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
//         <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
//         <p style="text-align:center; font-size:12px; color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </div>
//     `;

//     // ✅ SEND EMAIL
//     console.log("📤 Sending email...");
//     const mailOptions = {
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       replyTo: "besttripmakers@gmail.com",
//       subject: subject,
//       html: html,
//       attachments: attachments,
//       headers: {
//         'Message-ID': messageId,
//         ...(originalMessageId && {
//           'In-Reply-To': originalMessageId,
//           'References': originalMessageId
//         })
//       }
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully");

//     // ✅ SAVE TO CRM DATABASE
//     const emailDoc = await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       templateUsed: templateUsed || null,
//       meta: {
//         customerName,
//         customerPhone,
//         billingEmail,
//         checkInBaggage,
//         carryOnBaggage,
//         searchQuery,
//         category,
//         destination,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount,
//         oldTravelDate,
//         newTravelDate,
//         changeFee,
//         fareDifference,
//         cancellationDate,
//         customMessage,
//         dynamicGreeting,
//         messageId: messageId,
//         originalMessageId: originalMessageId || null,
//         invoiceNumber: invoice ? invoice.invoiceNumber : null,
//         // Package fields
//         packageName,
//         packageNights,
//         packageStartDate,
//         packageEndDate,
//         packagePrice,
//         numberOfPersons,
//         // Hotel fields
//         hotelName,
//         roomType,
//         // Car rental fields
//         carType,
//         rentalDays,
//         // Insurance fields
//         insuranceType,
//         insuranceCoverage,
//         // Flight ticket fields
//         chargeReference,
//         cabinClass,
//         departureTime,
//         arrivalTime,
//         ticketNumber,
//         flightNumber,
//         fareType,
//         departureTerminal,
//         arrivalTerminal,
//         // Update fields
//         updateType: finalUpdateType,
//         includeAgreement,
//         includeChargeNote,
//         includeFareRules,
//         cardHolderName,
//         cardLastFour,
//         cardExpiry,
//         cardCVV,
//         billingAddress,
//         customerEmail: customerEmailAlt
//       }
//     });

//     console.log("✅ Email saved to CRM with ID:", emailDoc._id);

//     // ✅ PREPARE RESPONSE DATA
//     const responseData = {
//       customerName, 
//       customerPhone, 
//       billingEmail, 
//       emailType,
//       dynamicGreeting,
//       templateUsed: templateUsed || null,
//       messageId: messageId,
//       bookingData: {
//         customerName,
//         customerEmail: billingEmail,
//         customerPhone,
//         bookingAmount: bookingAmount || "0.00",
//         emailType,
//         senderBrand,
//         chargeReference,
//         messageId: messageId
//       }
//     };

//     // Add invoice info if created
//     if (invoice) {
//       responseData.invoice = {
//         invoiceNumber: invoice.invoiceNumber,
//         amount: invoice.amount,
//         paymentLink: invoice.paymentLink,
//         dueDate: invoice.dueDate,
//         status: invoice.paymentStatus
//       };
//       console.log("📋 Invoice info in response:", responseData.invoice);
//     }

//     // ✅ SEND SUCCESS RESPONSE
//     res.status(200).json({
//       status: "success",
//       message: (emailType === "new_reservation" || emailType === "flight_confirmation") && attachments.length > 0
//         ? "Email sent successfully with e-ticket" 
//         : `Email sent to ${customerName} & saved successfully`,
//       data: responseData
//     });

//   } catch (error) {
//     console.error("❌ Send email error:", error);
//     console.error("❌ Error stack:", error.stack);
    
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email",
//       error: error.message
//     });
//   }
// };
//============7 and 9 combine==========

import transporter from "../utils/email.js";
import Email from "../models/Email.js";
import { generateETicket } from "../utils/generateETicket.js";
import Invoice from "../models/Invoice.js";

// ✅ HELPER FUNCTIONS AT THE TOP
const generateMessageId = (email) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const domain = email.split('@')[1] || 'farebuzzertravel.com';
  return `<${timestamp}.${random}@${domain}>`;
};

const getServiceDescription = (emailType, details) => {
  switch(emailType) {
    case 'new_reservation':
    case 'flight_confirmation':
      return `Flight Booking: ${details.airline} ${details.departure} to ${details.arrival}`;
    case 'holiday_package':
      return `Holiday Package: ${details.packageName}`;
    case 'hotel_booking':
      return `Hotel Booking`;
    case 'car_rental':
      return `Car Rental`;
    default:
      return 'Travel Service';
  }
};

const generateInvoicePaymentSection = (invoice, confirmationNumber, customerName, billingEmail, customerPhone, bookingAmount) => {
  const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
  
  // ✅ FIXED: Create payment link from Code 2
  const params = new URLSearchParams({
    customerName: customerName || '',
    email: billingEmail || '',
    phone: customerPhone || '',
    amount: bookingAmount,
    bookingRef: confirmationNumber || '',
    source: 'email',
    timestamp: Date.now().toString(),
    invoiceNumber: invoice.invoiceNumber || '' // Add invoice number
  });
  
  const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
  
  // ✅ FIXED: Invoice view link (backend route)
  const invoiceViewLink = `${process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host'}/api/invoices/${invoice.invoiceNumber}/view`;
  
  return `
    <hr style="margin:20px 0; border-top:2px solid #10b981;">
    
    <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
      <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">📋 Your Invoice & Payment</h3>
      
      <div style="background:white; padding:15px; border-radius:10px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <p style="margin:0; color:#374151; font-size:16px;">
          <span style="color:#64748b;">Invoice Number:</span> 
          <strong style="color:#065f46;">${invoice.invoiceNumber}</strong>
        </p>
        <p style="margin:10px 0 0; color:#374151; font-size:16px;">
          <span style="color:#64748b;">Due Date:</span> 
          <strong style="color:#065f46;">${new Date(invoice.dueDate).toLocaleDateString()}</strong>
        </p>
        <p style="margin:10px 0 0; color:#374151; font-size:16px;">
          <span style="color:#64748b;">Amount Due:</span> 
          <strong style="color:#065f46; font-size:20px;">USD ${invoice.amount}</strong>
        </p>
      </div>
      
      <!-- VIEW INVOICE BUTTON -->
      <a href="${invoiceViewLink}" 
         style="display:inline-block; 
                background: #3b82f6;
                color: white; 
                padding: 12px 30px; 
                text-decoration: none; 
                border-radius: 50px; 
                font-weight: bold; 
                font-size: 16px; 
                margin: 10px 5px;
                border: 2px solid #2563eb;">
        📄 View Invoice
      </a>
      
      <!-- PAY NOW BUTTON (FIXED: Uses paymentLink from Code 2) -->
      <a href="${paymentLink}" 
         style="display:inline-block; 
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white; 
                padding: 12px 30px; 
                text-decoration: none; 
                border-radius: 50px; 
                font-weight: bold; 
                font-size: 16px; 
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                margin: 10px 5px;
                border: 2px solid #059669;">
        💳 Pay Now - USD ${invoice.amount}
      </a>
      
      <!-- PAYMENT OPTIONS -->
      <div style="margin-top:20px;">
        <p style="color:#047857; font-size:14px; margin-bottom:10px;">
          <strong>Accepted Payment Methods:</strong>
        </p>
        <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap;">
          <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ PayPal</span>
          <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Credit Card</span>
          <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Debit Card</span>
        </div>
      </div>
      
      <!-- ALTERNATIVE INSTRUCTIONS -->
      <div style="margin-top:20px; padding:15px; background:#fef3c7; border-radius:8px;">
        <p style="color:#92400e; font-size:14px; margin:0;">
          <strong>⚠️ Important:</strong> Please complete payment before ${new Date(invoice.dueDate).toLocaleDateString()} to confirm your booking.
        </p>
      </div>
    </div>
  `;
};

// ✅ MAIN FUNCTION
export const sendCustomerEmail = async (req, res) => {
  try {
    console.log("📧 Received email request:", req.body.emailType);
    
    const {
      emailType,
      templateUsed,
      customerName,
      customerPhone,
      billingEmail,
      checkInBaggage,
      carryOnBaggage,
      confirmationNumber,
      airline,
      departure,
      arrival,
      travelDate,
      bookingAmount,
      oldTravelDate,
      newTravelDate,
      changeFee,
      fareDifference,
      refundAmount,
      cancellationDate,
      customMessage,
      searchQuery,
      category,
      destination,
      // Package fields
      packageName,
      packageNights,
      packageStartDate,
      packageEndDate,
      packagePrice,
      numberOfPersons,
      // Hotel fields
      hotelName,
      roomType,
      // Car rental fields
      carType,
      rentalDays,
      // Insurance fields
      insuranceType,
      insuranceCoverage,
      // Flight ticket fields
      chargeReference = "LowfareStudio",
      cabinClass,
      departureTime,
      arrivalTime,
      ticketNumber,
      flightNumber,
      fareType,
      departureTerminal,
      arrivalTerminal,
      // Update fields
      updateType = "confirmed",
      includeAgreement = true,
      includeChargeNote = true,
      includeFareRules = false,
      cardHolderName,
      cardLastFour,
      cardExpiry,
      cardCVV,
      billingAddress,
      customerEmail: customerEmailAlt,
      // Sender brand
      senderBrand = "lowfare_studio",
      // Threading
      originalMessageId
    } = req.body;

    // ✅ VALIDATION
    if (!customerName || !billingEmail || !customerPhone) {
      return res.status(400).json({
        status: "fail",
        message: "Customer name, phone number, and billing email are required"
      });
    }
    
    const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
    const trimmedPhone = customerPhone.toString().trim();
    
    if (!phoneRegex.test(trimmedPhone)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed"
      });
    }

    // ✅ STEP 1: Generate Message ID
    const messageId = generateMessageId(billingEmail);
    console.log("📧 Generated Message-ID:", messageId);

    // ✅ STEP 2: Create Invoice if booking amount exists
    let invoice = null;
    let invoicePaymentSection = "";
    
    if (bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
      try {
        console.log("💰 Creating invoice for amount:", bookingAmount);
        
        // Generate invoice number
        const invoiceNumber = await Invoice.generateInvoiceNumber();
        console.log("📝 Generated invoice number:", invoiceNumber);
        
        // Create invoice object
        const invoiceData = {
          invoiceNumber,
          customerName,
          customerEmail: billingEmail,
          customerPhone,
          bookingRef: confirmationNumber,
          emailType,
          senderBrand,
          amount: parseFloat(bookingAmount),
          messageId,
          items: [{
            description: getServiceDescription(emailType, {
              packageName,
              airline,
              departure,
              arrival
            }),
            quantity: 1,
            unitPrice: parseFloat(bookingAmount),
            total: parseFloat(bookingAmount)
          }],
          paymentLink: `${process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host'}/invoice/${invoiceNumber}`
        };
        
        console.log("📋 Invoice data:", invoiceData);
        
        // Create invoice in database
        invoice = await Invoice.create(invoiceData);
        
        console.log("✅ Invoice created:", invoice.invoiceNumber);
        console.log("📊 Invoice ID:", invoice._id);
        
        // ✅ FIXED: Pass all required parameters to generate invoice section
        invoicePaymentSection = generateInvoicePaymentSection(
          invoice, 
          confirmationNumber, 
          customerName, 
          billingEmail, 
          customerPhone, 
          bookingAmount
        );
        
      } catch (invoiceError) {
        console.error("❌ Error creating invoice:", invoiceError);
        console.error("❌ Invoice error details:", invoiceError.message);
        console.error("❌ Invoice error stack:", invoiceError.stack);
        // Continue without invoice
      }
    } else {
      console.log("ℹ️ No booking amount or amount is zero:", bookingAmount);
    }

    // ✅ SUBJECT MAP
    const subjectMap = {
      new_reservation: "Flight Reservation Confirmation",
      exchange_ticket: "Ticket Exchange Confirmation",
      flight_cancellation: "Flight Cancellation Confirmation",
      refund_request: "Refund Request Received",
      seat_addons: "Seat / Add-ons Confirmation",
      name_correction: "Name Correction Request Received",
      add_pet: "Pet Addition Confirmation",
      flight_confirmation: "Flight Booking Confirmation",
      hotel_booking: "Hotel Booking Confirmation",
      car_rental: "Car Rental Confirmation",
      customer_support: "Customer Support Response",
      holiday_package: "Holiday Package Confirmation",
      travel_insurance: "Travel Insurance Confirmation"
    };

    const subject = subjectMap[emailType] || "FareBuzzer Notification";

    // ✅ DYNAMIC GREETING
    const getDynamicGreeting = () => {
      if (searchQuery || category || destination) {
        if (destination) return `regarding the ${destination}`;
        if (category) return `regarding the ${category} booking`;
        if (searchQuery) return `regarding your search for ${searchQuery}`;
      }
      
      switch(emailType) {
        case 'new_reservation':
        case 'flight_confirmation':
          return "regarding your flight booking";
        case 'exchange_ticket':
          return "regarding your ticket exchange";
        case 'flight_cancellation':
          return "regarding your flight cancellation";
        case 'refund_request':
          return "regarding your refund request";
        case 'seat_addons':
          return "regarding your seat selection";
        case 'name_correction':
          return "regarding your name correction";
        case 'add_pet':
          return "regarding your pet addition";
        case 'hotel_booking':
          return "regarding your hotel booking";
        case 'car_rental':
          return "regarding your car rental";
        case 'holiday_package':
          return "regarding your holiday package";
        case 'travel_insurance':
          return "regarding your travel insurance";
        case 'customer_support':
          return "regarding your enquiry";
        default:
          return "regarding your travel enquiry";
      }
    };

    const dynamicGreeting = getDynamicGreeting();

    // ✅ Determine update type
    let finalUpdateType = updateType;
    if (!finalUpdateType) {
      switch(emailType) {
        case "flight_cancellation":
          finalUpdateType = "cancelled";
          break;
        case "exchange_ticket":
          finalUpdateType = "changed";
          break;
        default:
          finalUpdateType = "confirmed";
      }
    }

    // ✅ BUILD EMAIL SECTIONS
    let greetingMessage = `
      <p>Dear ${customerName}</p>
      <p>Greetings of the day!</p>
      <p>As per our telephonic conversation, we have ${finalUpdateType} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
      <hr style="margin:20px 0; border-top:1px dashed #ccc;">
    `;

    // ✅ CUSTOMER DETAILS
    let customerDetails = `
      <p><b>Customer Details:</b></p>
      <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
      <p><b>Email:</b> ${billingEmail}</p>
    `;

    // Add specific details based on email type
    switch(emailType) {
      case "new_reservation":
      case "flight_confirmation":
      case "exchange_ticket":
      case "flight_cancellation":
        if (airline || departure || arrival || travelDate || confirmationNumber || bookingAmount) {
          customerDetails += `
            ${airline ? `<p><b>Airline:</b> ${airline}</p>` : ''}
            ${departure && arrival ? `<p><b>Route:</b> ${departure} → ${arrival}</p>` : ''}
            ${travelDate ? `<p><b>Travel Date:</b> ${travelDate}</p>` : ''}
            ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
            ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
            ${checkInBaggage ? `<p><b>Check-in Baggage:</b> ${checkInBaggage}</p>` : ''}
            ${carryOnBaggage ? `<p><b>Carry-on Baggage:</b> ${carryOnBaggage}</p>` : ''}
            ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}
            ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
            ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
          `;
        }
        break;

      case "hotel_booking":
        if (hotelName || roomType || confirmationNumber || bookingAmount) {
          customerDetails += `
            ${hotelName ? `<p><b>Hotel:</b> ${hotelName}</p>` : ''}
            ${roomType ? `<p><b>Room Type:</b> ${roomType}</p>` : ''}
            ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
            ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
          `;
        }
        break;

      case "car_rental":
        if (carType || rentalDays || confirmationNumber || bookingAmount) {
          customerDetails += `
            ${carType ? `<p><b>Car Type:</b> ${carType}</p>` : ''}
            ${rentalDays ? `<p><b>Rental Days:</b> ${rentalDays}</p>` : ''}
            ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
            ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
          `;
        }
        break;

      case "holiday_package":
        if (packageName || packageNights || packagePrice || numberOfPersons || confirmationNumber) {
          customerDetails += `
            ${packageName ? `<p><b>Package Name:</b> ${packageName}</p>` : ''}
            ${packageNights ? `<p><b>Duration:</b> ${packageNights} night(s)</p>` : ''}
            ${packageStartDate && packageEndDate ? `<p><b>Travel Dates:</b> ${packageStartDate} to ${packageEndDate}</p>` : ''}
            ${numberOfPersons ? `<p><b>Number of Persons:</b> ${numberOfPersons}</p>` : ''}
            ${packagePrice ? `<p><b>Package Price:</b> USD ${packagePrice}</p>` : ''}
            ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
          `;
        }
        break;

      case "travel_insurance":
        if (insuranceType || insuranceCoverage || confirmationNumber || bookingAmount) {
          customerDetails += `
            ${insuranceType ? `<p><b>Insurance Type:</b> ${insuranceType}</p>` : ''}
            ${insuranceCoverage ? `<p><b>Coverage:</b> ${insuranceCoverage}</p>` : ''}
            ${confirmationNumber ? `<p><b>Booking Reference:</b> ${confirmationNumber}</p>` : ''}
            ${bookingAmount ? `<p><b>Amount:</b> USD ${bookingAmount}</p>` : ''}
          `;
        }
        break;

      case "refund_request":
        if (refundAmount || confirmationNumber) {
          customerDetails += `
            ${refundAmount ? `<p><b>Refund Amount:</b> USD ${refundAmount}</p>` : ''}
            ${confirmationNumber ? `<p><b>Confirmation No:</b> ${confirmationNumber}</p>` : ''}
          `;
        }
        break;

      case "seat_addons":
      case "name_correction":
      case "add_pet":
        if (confirmationNumber) {
          customerDetails += `<p><b>Confirmation No:</b> ${confirmationNumber}</p>`;
        }
        break;

      case "customer_support":
        if (customMessage) {
          customerDetails += `<p><b>Message:</b> ${customMessage}</p>`;
        }
        break;
    }

    // Add custom message if exists
    if (customMessage && customMessage.trim() !== '') {
      customerDetails += `<p><b>Additional Notes:</b> ${customMessage}</p>`;
    }

    // ✅ AGREEMENT SECTION
    let agreementSection = "";
    if (includeAgreement && confirmationNumber) {
      const backendUrl = process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host';
      const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(customerName)}`;
      
      agreementSection = `
        <hr style="margin:20px 0; border-top:2px solid #4CAF50;">
        <div style="text-align:center; margin:30px 0; padding:25px; background:#f0f9ff; border-radius:15px;">
          <h3 style="color:#0369a1; margin-bottom:15px; font-size:20px;">📝 Quick Agreement</h3>
          <p style="color:#475569; margin-bottom:20px;">Click the button below to instantly confirm your agreement:</p>
          <a href="${agreementLink}" style="display:inline-block; background:#10b981; color:white; padding:15px 40px; text-decoration:none; border-radius:50px; font-weight:bold; font-size:16px;">
            ✅ Click Here to Agree
          </a>
          <p style="margin-top:15px; color:#64748b; font-size:14px;">
            <strong>Instantly confirm your agreement</strong> - No email reply needed
          </p>
        </div>
      `;
    }

    // ✅ CREDIT CARD INFO SECTION
    let paymentInfoSection = "";
    if (cardHolderName || cardLastFour) {
      paymentInfoSection = `
        <hr style="margin:20px 0; border-top:1px dashed #ccc;">
        <p><b>Payment Information:</b></p>
        <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace;">
          ${cardHolderName ? `<p>Credit card holder name: ${cardHolderName}</p>` : ''}
          ${cardLastFour ? `<p>Card last 4 digits: ****${cardLastFour}</p>` : ''}
          ${cardExpiry ? `<p>Expiry date: ${cardExpiry}</p>` : ''}
          ${cardCVV ? `<p>CVV: ***</p>` : ''}
          ${billingAddress ? `<p>Billing address: ${billingAddress}</p>` : ''}
          ${customerEmailAlt ? `<p>Customer email: ${customerEmailAlt}</p>` : ''}
        </div>
      `;
    }

    // ✅ CHARGE REFERENCE NOTE
    let chargeNoteSection = "";
    if (includeChargeNote !== false) {
      let displayChargeReference = "Lowfarestudio";
      if (senderBrand === "american_airlines") {
        displayChargeReference = "American Airlines";
      } else if (senderBrand === "airline_desk") {
        displayChargeReference = "Airline Desk";
      } else if (senderBrand === "lowfare_studio") {
        displayChargeReference = "Lowfarestudio";
      }
      
      chargeNoteSection = `
        <hr style="margin:20px 0; border-top:1px dashed #ccc;">
        <p><b>NOTE:</b></p>
        <p>Please note that you might see the charges under <strong>${displayChargeReference}</strong> on your billing statement.</p>
        <p>Your Debit/Credit card may have one or multiple charges but the total quoted price will stay the same.</p>
      `;
    }

    // ✅ FARE RULES SECTION
    let fareRulesSection = "";
    const flightRelatedTypes = ["new_reservation", "flight_confirmation", "exchange_ticket", "flight_cancellation"];
    if (flightRelatedTypes.includes(emailType) && includeFareRules) {
      fareRulesSection = `
        <hr style="margin:20px 0; border-top:1px dashed #ccc;">
        <p><b>Fare Rules (only for flight):</b></p>
        <ol style="padding-left:20px; margin-top:10px;">
          <li>Ticket is Non-Refundable & Non-Changeable.</li>
          <li>Please contact us 72 hours prior to departure for reconfirmation of booking.</li>
          <li>There will be No Compensation in case of any Schedule Change.</li>
          <li>Service Fee of USD 50 per passenger is applicable for any special request.</li>
          <li>In case of No-Show ticket has No Value.</li>
          <li>For any changes give us a call back at least 24 hours prior to departure.</li>
          <li>Special request confirmation will be given by Airlines only.</li>
          <li>Name changes are not permitted once the reservation has been confirmed.</li>
          <li>The name on each ticket must match a valid photo ID.</li>
          <li>IDs should be valid for 6 months from the date of last Flight.</li>
          <li>If your credit card declines, we will notify you by email within 24 hours.</li>
        </ol>
      `;
    }

    // ✅ CUSTOM MESSAGE SECTION
    let customMessageSection = "";
    if (customMessage && customMessage.trim() !== "") {
      customMessageSection = `
        <hr style="margin:20px 0; border-top:1px dashed #ccc;">
        <div style="background:#f8f9fa; padding:15px; border-radius:5px; border-left:4px solid #6c757d;">
          <p><b>Additional Notes:</b></p>
          <p style="font-style:italic; color:#495057;">${customMessage}</p>
        </div>
      `;
    }

    // ✅ FALLBACK PAYMENT BUTTON (if invoice creation failed)
    let fallbackPaymentSection = "";
    if (!invoicePaymentSection && bookingAmount && bookingAmount !== "0" && bookingAmount !== "0.00") {
      const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
      const params = new URLSearchParams({
        customerName: customerName || '',
        email: billingEmail || '',
        phone: customerPhone || '',
        amount: bookingAmount,
        bookingRef: confirmationNumber || '',
        source: 'email'
      });
      const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
      
      fallbackPaymentSection = `
        <hr style="margin:20px 0; border-top:2px solid #10b981;">
        <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
          <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">💳 Complete Your Payment</h3>
          <p style="margin:10px 0 0; color:#374151; font-size:16px;">
            <span style="color:#64748b;">Amount Due:</span> 
            <strong style="color:#065f46; font-size:20px;">USD ${bookingAmount}</strong>
          </p>
          <a href="${paymentLink}" style="display:inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; margin: 15px 0;">
            💳 Pay Now - USD ${bookingAmount}
          </a>
        </div>
      `;
    }

    // ✅ COMBINE ALL SECTIONS
    let message = greetingMessage + customerDetails;
    
    // Add invoice section if created successfully
    if (invoicePaymentSection) {
      message += invoicePaymentSection;
      console.log("✅ Invoice section added to email");
    } else if (fallbackPaymentSection) {
      message += fallbackPaymentSection;
      console.log("✅ Fallback payment section added");
    }
    
    // Add other sections
    message += agreementSection + paymentInfoSection + chargeNoteSection + fareRulesSection + customMessageSection;

    // ✅ GENERATE E-TICKET PDF (if flight email)
    const attachments = [];
    if (emailType === "new_reservation" || emailType === "flight_confirmation") {
      try {
        const ticketPath = await generateETicket({
          confirmationNumber,
          customerName,
          customerPhone,
          billingEmail,
          checkInBaggage: checkInBaggage || "",
          carryOnBaggage: carryOnBaggage || "",
          airline,
          departure,
          arrival,
          travelDate,
          bookingAmount,
          chargeReference,
          cabinClass,
          departureTime,
          arrivalTime,
          ticketNumber,
          flightNumber,
          fareType,
          departureTerminal,
          arrivalTerminal,
          cardLastFour: cardLastFour || "",
        });

        attachments.push({
          filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
          path: ticketPath,
          contentType: "application/pdf"
        });
        console.log("✅ E-ticket generated and attached");
      } catch (error) {
        console.error("❌ Error generating e-ticket:", error);
      }
    }

    // ✅ FINAL HTML
    const html = `
      <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
        <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
          <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
        </div>
        <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
        <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
        <p style="margin-bottom:20px;">Thank you for your enquiry ${dynamicGreeting}.</p>
        ${message}
        <br/>
        <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:8px; border-left:4px solid #10b981;">
          <p style="margin:0 0 10px 0; font-weight:500;">Contact Us:</p>
          <p style="margin:0; color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
        </div>
        <p style="margin-top:30px; color:#64748b; font-size:14px;">
          Regards,<br/>
          <b style="color:#10b981;">FareBuzzer Support Team</b>
        </p>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
        <p style="text-align:center; font-size:12px; color:#94a3b8;">
          © ${new Date().getFullYear()} FareBuzzer Travel.
        </p>
      </div>
    `;

    // ✅ SEND EMAIL
    console.log("📤 Sending email...");
    const mailOptions = {
      from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
      to: billingEmail,
      replyTo: "besttripmakers@gmail.com",
      subject: subject,
      html: html,
      attachments: attachments,
      headers: {
        'Message-ID': messageId,
        ...(originalMessageId && {
          'In-Reply-To': originalMessageId,
          'References': originalMessageId
        })
      }
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    // ✅ SAVE TO CRM DATABASE
    const emailDoc = await Email.create({
      type: "sent",
      emailType,
      from: process.env.GMAIL_USER,
      to: billingEmail,
      subject,
      html,
      templateUsed: templateUsed || null,
      meta: {
        customerName,
        customerPhone,
        billingEmail,
        checkInBaggage,
        carryOnBaggage,
        searchQuery,
        category,
        destination,
        airline,
        confirmationNumber,
        departure,
        arrival,
        travelDate,
        bookingAmount,
        refundAmount,
        oldTravelDate,
        newTravelDate,
        changeFee,
        fareDifference,
        cancellationDate,
        customMessage,
        dynamicGreeting,
        messageId: messageId,
        originalMessageId: originalMessageId || null,
        invoiceNumber: invoice ? invoice.invoiceNumber : null,
        // Package fields
        packageName,
        packageNights,
        packageStartDate,
        packageEndDate,
        packagePrice,
        numberOfPersons,
        // Hotel fields
        hotelName,
        roomType,
        // Car rental fields
        carType,
        rentalDays,
        // Insurance fields
        insuranceType,
        insuranceCoverage,
        // Flight ticket fields
        chargeReference,
        cabinClass,
        departureTime,
        arrivalTime,
        ticketNumber,
        flightNumber,
        fareType,
        departureTerminal,
        arrivalTerminal,
        // Update fields
        updateType: finalUpdateType,
        includeAgreement,
        includeChargeNote,
        includeFareRules,
        cardHolderName,
        cardLastFour,
        cardExpiry,
        cardCVV,
        billingAddress,
        customerEmail: customerEmailAlt
      }
    });

    console.log("✅ Email saved to CRM with ID:", emailDoc._id);

    // ✅ PREPARE RESPONSE DATA
    const responseData = {
      customerName, 
      customerPhone, 
      billingEmail, 
      emailType,
      dynamicGreeting,
      templateUsed: templateUsed || null,
      messageId: messageId,
      bookingData: {
        customerName,
        customerEmail: billingEmail,
        customerPhone,
        bookingAmount: bookingAmount || "0.00",
        emailType,
        senderBrand,
        chargeReference,
        messageId: messageId
      }
    };

    // Add invoice info if created
    if (invoice) {
      responseData.invoice = {
        invoiceNumber: invoice.invoiceNumber,
        amount: invoice.amount,
        paymentLink: invoice.paymentLink,
        dueDate: invoice.dueDate,
        status: invoice.paymentStatus
      };
      console.log("📋 Invoice info in response:", responseData.invoice);
    }

    // ✅ SEND SUCCESS RESPONSE
    res.status(200).json({
      status: "success",
      message: (emailType === "new_reservation" || emailType === "flight_confirmation") && attachments.length > 0
        ? "Email sent successfully with e-ticket" 
        : `Email sent to ${customerName} & saved successfully`,
      data: responseData
    });

  } catch (error) {
    console.error("❌ Send email error:", error);
    console.error("❌ Error stack:", error.stack);
    
    res.status(500).json({
      status: "error",
      message: "Failed to send email",
      error: error.message
    });
  }
};


//===========nopdemailer===========

// const transporter = require("../utils/email");

// exports.sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       customerName,
//       billingEmail,
//       customMessage
//     } = req.body;

//     if (!billingEmail || !customerName) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name & email are required"
//       });
//     }

//     let subject = "Customer Support";
//     let html = `<p>Hello <b>${customerName}</b>,</p>`;

//     switch (emailType) {
//       case "new_booking":
//         subject = "New Booking Confirmation";
//         html += "<p>Your booking is confirmed.</p>";
//         break;

//       case "change_booking":
//         subject = "Booking Change Confirmation";
//         html += "<p>Your booking has been updated.</p>";
//         break;

//       case "refund":
//         subject = "Refund Confirmation";
//         html += "<p>Your refund has been processed.</p>";
//         break;

//       default:
//         subject = "Support Message";
//         html += `<p>${customMessage}</p>`;
//     }

//     html += `
//       <br/>
//       <p>Regards,<br/><b>Customer Support Team</b></p>
//     `;

//     await transporter.sendMail({
//       from: `"CRM Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       subject,
//       html
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Email sent successfully"
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       status: "error",
//       message: err.message
//     });
//   }
// };


// const transporter = require("../utils/email");

// // POST /api/send-email
// exports.sendCustomerEmail = async (req, res) => {
//   try {
//     const { emailType, customerName, billingEmail, customMessage } = req.body;

//     if (!billingEmail || !customerName) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name & email are required"
//       });
//     }

//     let subject = "Customer Support";
//     let html = `<p>Hello <b>${customerName}</b>,</p>`;

//     switch (emailType) {
//       case "new_booking":
//         subject = "New Booking Confirmation";
//         html += "<p>Your booking is confirmed.</p>";
//         break;

//       case "change_booking":
//         subject = "Booking Change Confirmation";
//         html += "<p>Your booking has been updated.</p>";
//         break;

//       case "refund":
//         subject = "Refund Confirmation";
//         html += "<p>Your refund has been processed.</p>";
//         break;

//       default:
//         subject = "Support Message";
//         html += `<p>${customMessage || "We are contacting you regarding your account."}</p>`;
//     }

//     html += `
//       <br/>
//       <p>Regards,<br/><b>Customer Support Team</b></p>
//     `;

//     await transporter.sendMail({
//       from: `"CRM Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       subject,
//       html
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Email sent successfully"
//     });

//   } catch (err) {
//     console.error("Email sending error:", err);
//     res.status(500).json({
//       status: "error",
//       message: err.message
//     });
//   }
// };













//============send email to another mail===============

// require("dotenv").config();
// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);
// const VERIFIED_TEST_EMAIL = "backend.9developer@gmail.com";


// const subjectMap = {
//   new_booking: "New Booking Confirmation",
//   change_booking: "Booking Change Confirmation",
//   refund: "Refund Confirmation",
//   other: "Customer Support"
// };

// exports.sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType = "other",
//       customerName,
      
//       airline,
//       confirmationNumber,

//       // refund
//       refundAmount,
//       cancellationDate,
//       billingName,
//       billingAddress,
//       billingEmail,
//       billingPhone,
//       travellers,
//       ticketType,
//       cardLast4,

//       // change booking
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,

//       // new booking
//       travelDate,
//       departure,
//       arrival,
//       bookingAmount,

//       // other
//       customMessage
//     } = req.body;

//     if (!customerName) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name is required"
//       });
//     }
//     // if (!billingEmail) {
//     //   return res.status(400).json({
//     //     status: "fail",
//     //     message: "Customer email is required"
//     //   });
//     // }
//    // ✅ Get customer email and fallback to test email
//     const toEmail = billingEmail || VERIFIED_TEST_EMAIL;
//     if (!toEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer email (billingEmail) is required"
//       });
//     }


//     const subject = subjectMap[emailType] || "Customer Email";

//     let headerTitle = "";
//     let mainMessage = "";
//     let detailsRows = "";

//     if (emailType === "other") {
//       headerTitle = "Customer Support Inquiry";
//       mainMessage = `
//         <p>${customMessage || "Thank you for contacting our support team. We have received your message and will get back to you shortly."}</p>
//           <p>Customer Email: <strong>${billingEmail}</strong></p>
//         <p>If you have any additional details, feel free to reply to this email.</p>
//       `;
//     } else if (emailType === "new_booking") {
//       if (!airline || !travelDate || !bookingAmount) {
//         return res.status(400).json({ status: "fail", message: "New booking details missing" });
//       }
//       headerTitle = "Booking Confirmation";
//       mainMessage = `
//         <p>Your booking with <strong>${airline}</strong> has been successfully confirmed.</p>
//         <p>We wish you a pleasant and safe journey!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td>Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td>Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//         <tr><td>Total Amount</td><td><strong>USD ${bookingAmount}</strong></td></tr>
//       `;
//     } else if (emailType === "change_booking") {
//       if (!airline || !oldTravelDate || !newTravelDate) {
//         return res.status(400).json({ status: "fail", message: "Change booking details missing" });
//       }
//       headerTitle = "Booking Change Confirmation";
//       mainMessage = `
//         <p>Your booking with <strong>${airline}</strong> has been successfully updated.</p>
//         <p>Thank you for your flexibility and for choosing us again.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td>Old Travel Date</td><td><strong>${oldTravelDate}</strong></td></tr>
//         <tr><td>New Travel Date</td><td><strong>${newTravelDate}</strong></td></tr>
//         <tr><td>Change Fee</td><td><strong>USD ${changeFee || "0.00"}</strong></td></tr>
//         <tr><td>Fare Difference</td><td><strong>USD ${fareDifference || "0.00"}</strong></td></tr>
//       `;
//     } else if (emailType === "refund") {
//       if (!airline || !refundAmount) {
//         return res.status(400).json({ status: "fail", message: "Refund details missing" });
//       }
//       headerTitle = "Refund Confirmation";
//       mainMessage = `
//         <p>Your refund request for the <strong>${airline}</strong> booking has been processed.</p>
//         <p>The amount will be credited back to your original payment method within 5-10 business days.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td>Refund Amount</td><td><strong>USD ${refundAmount}</strong></td></tr>
//         ${cancellationDate ? `<tr><td>Cancellation Date</td><td><strong>${cancellationDate}</strong></td></tr>` : ""}
//         ${billingName ? `<tr><td>Billing Name</td><td>${billingName}</td></tr>` : ""}
//         ${billingAddress ? `<tr><td>Billing Address</td><td>${billingAddress}</td></tr>` : ""}
//         ${billingEmail ? `<tr><td>Billing Email</td><td>${billingEmail}</td></tr>` : ""}
//         ${billingPhone ? `<tr><td>Billing Phone</td><td>${billingPhone}</td></tr>` : ""}
//         ${travellers ? `<tr><td>Number of Travellers</td><td>${travellers}</td></tr>` : ""}
//         ${ticketType ? `<tr><td>Ticket Type</td><td>${ticketType}</td></tr>` : ""}
//         ${cardLast4 ? `<tr><td>Payment Method</td><td>Card ending ****${cardLast4}</td></tr>` : ""}
//       `;
//     }

//     const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// </head>
// <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:30px 0;">
//     <tr>
//       <td align="center">
//         <!-- Main Container -->
//         <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08); max-width:95%;">
//           <!-- Header -->
//           <tr>
//             <td style="background:#0f4c81; padding:25px 30px; color:#ffffff; text-align:center;">
//               <h2 style="margin:0; font-size:22px;">${headerTitle}</h2>
//               ${confirmationNumber ? `<p style="margin:8px 0 0; font-size:14px; opacity:0.9;">Reference: ${confirmationNumber}</p>` : ""}
//             </td>
//           </tr>

//           <!-- Body -->
//           <tr>
//             <td style="padding:30px; color:#1f2937; font-size:15px; line-height:1.6;">
//               <p style="margin:0 0 20px;">Dear <strong>${customerName}</strong>,</p>

//               <p style="margin:0 0 20px;">
//                 Thank you for choosing our services.
//               </p>

//               ${mainMessage}

//               <!-- Details Table -->
//               ${detailsRows ? `
//               <table width="100%" cellpadding="12" cellspacing="0" style="background:#f8fafc; border-radius:8px; margin:25px 0;">
//                 <tr>
//                   <td colspan="2" style="font-weight:bold; color:#0f4c81; font-size:16px;">✈️ Booking Details</td>
//                 </tr>
//                 ${detailsRows}
//               </table>
//               ` : ""}

//               <p style="margin:30px 0 0;">
//                 If you have any questions, please reply to this email or contact our support team.
//               </p>

//               <p style="margin:40px 0 0;">
//                 Warm Regards,<br/>
//                 <strong>Customer Support Team</strong>
//               </p>
//             </td>
//           </tr>

//           <!-- Footer -->
//           <tr>
//             <td style="background:#f8fafc; padding:20px 30px; font-size:12px; color:#6b7280; text-align:center;">
//               This email is confidential and intended solely for the recipient.<br/>
//               If received in error, please notify us immediately and delete it.
//             </td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>
//     `;

//     // const { data, error } = await resend.emails.send({
//     //   from: "onboarding@resend.dev",
//     //   to: VERIFIED_TEST_EMAIL,
//     //   subject,
//     //   html: htmlContent
//     // });
//     const { data, error } = await resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: toEmail,       // ← here customer email
//   subject,
//   html: htmlContent
// });


//     if (error) throw new Error(error.message);

//     res.status(200).json({
//       status: "success",
//       message: "Email sent successfully",
//       emailId: data.id
//     });

//   } catch (err) {
//     console.error("Email error:", err);
//     res.status(500).json({
//       status: "error",
//       message: err.message
//     });
//   }
// };


//=======with nodemailer

// const transporter = require("../utils/email");

// // POST /api/send-email
// exports.sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType = "other",
//       customerName,
//       billingEmail,
//       customMessage,
//       airline,
//       confirmationNumber,
//       refundAmount,
//       cancellationDate,
//       billingName,
//       billingAddress,
//       billingPhone,
//       travellers,
//       ticketType,
//       cardLast4,
//       oldTravelDate,
//       newTravelDate,
//       changeFee,
//       fareDifference,
//       travelDate,
//       departure,
//       arrival,
//       bookingAmount
//     } = req.body;

//     if (!customerName || !billingEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name and email are required"
//       });
//     }

//     // Email subject mapping
//     const subjectMap = {
//       new_booking: "New Booking Confirmation",
//       change_booking: "Booking Change Confirmation",
//       refund: "Refund Confirmation",
//       other: "Customer Support"
//     };

//     const subject = subjectMap[emailType] || "Customer Email";

//     let headerTitle = "";
//     let mainMessage = "";
//     let detailsRows = "";

//     // Compose email content based on type
//     if (emailType === "other") {
//       headerTitle = "Customer Support Inquiry";
//       mainMessage = `
//         <p>${customMessage || "Thank you for contacting our support team. We will get back to you shortly."}</p>
//       `;
//     } else if (emailType === "new_booking") {
//       headerTitle = "Booking Confirmation";
//       mainMessage = `
//         <p>Your booking with <strong>${airline}</strong> has been confirmed. We wish you a pleasant journey!</p>
//       `;
//       detailsRows = `
//         <tr><td>Confirmation Number</td><td>${confirmationNumber || "-"}</td></tr>
//         <tr><td>Route</td><td>${departure} → ${arrival}</td></tr>
//         <tr><td>Travel Date</td><td>${travelDate}</td></tr>
//         <tr><td>Total Amount</td><td>USD ${bookingAmount}</td></tr>
//       `;
//     } else if (emailType === "change_booking") {
//       headerTitle = "Booking Change Confirmation";
//       mainMessage = `<p>Your booking with <strong>${airline}</strong> has been updated successfully.</p>`;
//       detailsRows = `
//         <tr><td>Confirmation Number</td><td>${confirmationNumber || "-"}</td></tr>
//         <tr><td>Old Travel Date</td><td>${oldTravelDate}</td></tr>
//         <tr><td>New Travel Date</td><td>${newTravelDate}</td></tr>
//         <tr><td>Change Fee</td><td>USD ${changeFee || "0.00"}</td></tr>
//         <tr><td>Fare Difference</td><td>USD ${fareDifference || "0.00"}</td></tr>
//       `;
//     } else if (emailType === "refund") {
//       headerTitle = "Refund Confirmation";
//       mainMessage = `<p>Your refund request for <strong>${airline}</strong> has been processed.</p>`;
//       detailsRows = `
//         <tr><td>Confirmation Number</td><td>${confirmationNumber || "-"}</td></tr>
//         <tr><td>Refund Amount</td><td>USD ${refundAmount}</td></tr>
//         ${cancellationDate ? `<tr><td>Cancellation Date</td><td>${cancellationDate}</td></tr>` : ""}
//         ${billingName ? `<tr><td>Billing Name</td><td>${billingName}</td></tr>` : ""}
//         ${billingAddress ? `<tr><td>Billing Address</td><td>${billingAddress}</td></tr>` : ""}
//         ${billingEmail ? `<tr><td>Billing Email</td><td>${billingEmail}</td></tr>` : ""}
//         ${billingPhone ? `<tr><td>Billing Phone</td><td>${billingPhone}</td></tr>` : ""}
//         ${travellers ? `<tr><td>Number of Travellers</td><td>${travellers}</td></tr>` : ""}
//         ${ticketType ? `<tr><td>Ticket Type</td><td>${ticketType}</td></tr>` : ""}
//         ${cardLast4 ? `<tr><td>Payment Method</td><td>Card ending ****${cardLast4}</td></tr>` : ""}
//       `;
//     }

//     // Full HTML email
//     const htmlContent = `
//       <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
//         <div style="max-width:650px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
//           <div style="background:#0f4c81; padding:25px; color:#fff; text-align:center;">
//             <h2>${headerTitle}</h2>
//             ${confirmationNumber ? `<p>Reference: ${confirmationNumber}</p>` : ""}
//           </div>
//           <div style="padding:30px; color:#1f2937; font-size:15px; line-height:1.6;">
//             <p>Dear <strong>${customerName}</strong>,</p>
//             ${mainMessage}
//             ${detailsRows ? `<table width="100%" cellpadding="8" cellspacing="0" style="background:#f8fafc; border-radius:8px; margin-top:20px;">${detailsRows}</table>` : ""}
//             <p style="margin-top:30px;">Warm Regards,<br/><strong>Customer Support Team</strong></p>
//           </div>
//           <div style="background:#f8fafc; padding:15px; font-size:12px; color:#6b7280; text-align:center;">
//             This email is confidential and intended solely for the recipient.
//           </div>
//         </div>
//       </div>
//     `;

//     // Send email using Nodemailer
//     await transporter.sendMail({
//       from: `"CRM Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       subject,
//       html: htmlContent
//     });

//     res.status(200).json({
//       status: "success",
//       message: `Email sent successfully to ${billingEmail}`
//     });

//   } catch (err) {
//     console.error("Email error:", err);
//     res.status(500).json({
//       status: "error",
//       message: err.message
//     });
//   }
// };
