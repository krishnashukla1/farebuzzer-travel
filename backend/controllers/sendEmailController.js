

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



//========merge=======

import transporter from "../utils/email.js";
import Email from "../models/Email.js";
import { generateETicket } from "../utils/generateETicket.js";

export const sendCustomerEmail = async (req, res) => {
  try {
    const {
      emailType,
      templateUsed,
      customerName,
      customerPhone,
      billingEmail,
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
      // NEW: Package fields
      packageName,
      packageNights,
      packageStartDate,
      packageEndDate,
      packagePrice,
      numberOfPersons,
      // NEW: Hotel fields
      hotelName,
      roomType,
      // NEW: Car rental fields
      carType,
      rentalDays,
      // NEW: Insurance fields
      insuranceType,
      insuranceCoverage,
      // FLIGHT TICKET SPECIFIC FIELDS
      chargeReference = "LowfareStudio",
      cabinClass,
      departureTime,
      arrivalTime,
      ticketNumber,
      flightNumber,
      fareType,
      departureTerminal,
      arrivalTerminal
    } = req.body;

    // UPDATED: Added phone validation
    if (!customerName || !billingEmail || !customerPhone) {
      return res.status(400).json({
        status: "fail",
        message: "Customer name, phone number, and billing email are required"
      });
    }
    const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,20}$/;
    
    if (!phoneRegex.test(customerPhone.trim())) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid phone number format. Use 8-20 digits, spaces, +, -, () allowed (example: +919876543210 or 2025550123)"
      });
    }

    // Additional validation for flight ticket forms
    if (emailType === "new_reservation" || emailType === "flight_confirmation") {
      if (!confirmationNumber) {
        return res.status(400).json({
          status: "fail",
          message: "confirmationNumber is required for flight tickets"
        });
      }
    }

    /* ---------------- SUBJECT MAP ---------------- */
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

    /* ---------------- DYNAMIC GREETING LOGIC (only for non-flight-ticket forms) ---------------- */
    const getDynamicGreeting = () => {
      // For flight tickets, use a simpler greeting
      if (emailType === "new_reservation" || emailType === "flight_confirmation") {
        return "regarding your flight booking";
      }
      
      // Priority: destination > category > searchQuery > default
      
      // If destination is provided (most specific)
      if (destination && typeof destination === 'string') {
        const dest = destination.trim().toLowerCase();
        if (dest.includes('kashmir')) return "regarding the Kashmir package";
        if (dest.includes('manali')) return "regarding the Manali package";
        if (dest.includes('goa')) return "regarding the Goa package";
        if (dest.includes('leh') || dest.includes('ladakh')) return "regarding the Leh-Ladakh package";
        if (dest.includes('shimla')) return "regarding the Shimla package";
        if (dest.includes('ooty')) return "regarding the Ooty package";
        if (dest.includes('maldives')) return "regarding the Maldives package";
        if (dest.includes('dubai')) return "regarding the Dubai package";
        if (dest.includes('bali')) return "regarding the Bali package";
        if (dest.includes('thailand')) return "regarding the Thailand package";
        if (dest.includes('singapore')) return "regarding the Singapore package";
        return `regarding the ${destination} package`;
      }
      
      // If category is provided
      if (category && typeof category === 'string') {
        const cat = category.trim().toLowerCase();
        if (cat.includes('flight')) return "regarding the flight booking";
        if (cat.includes('hotel')) return "regarding the hotel booking";
        if (cat.includes('car') || cat.includes('rental')) return "regarding the car rental";
        if (cat.includes('package') || cat.includes('tour')) return "regarding the holiday package";
        if (cat.includes('cruise')) return "regarding the cruise booking";
        if (cat.includes('visa')) return "regarding the visa assistance";
        if (cat.includes('insurance')) return "regarding the travel insurance";
      }
      
      // If search query is provided, extract keywords
      if (searchQuery && typeof searchQuery === 'string') {
        const query = searchQuery.toLowerCase();
        
        // Check for destinations
        const destinations = [
          'kashmir', 'manali', 'goa', 'leh', 'ladakh', 'shimla', 'darjeeling',
          'munnar', 'kerala', 'rajasthan', 'jaipur', 'udaipur', 'agra', 'varanasi',
          'andaman', 'maldives', 'dubai', 'bali', 'thailand', 'singapore', 'malaysia',
          'europe', 'usa', 'canada', 'australia', 'new zealand'
        ];
        
        for (const dest of destinations) {
          if (query.includes(dest)) {
            return `regarding the ${dest.charAt(0).toUpperCase() + dest.slice(1)} package`;
          }
        }
        
        // Check for categories
        if (query.includes('flight') || query.includes('air ticket') || query.includes('airline')) {
          return "regarding the flight booking";
        }
        if (query.includes('hotel') || query.includes('accommodation') || query.includes('resort')) {
          return "regarding the hotel booking";
        }
        if (query.includes('car') || query.includes('rental') || query.includes('vehicle')) {
          return "regarding the car rental";
        }
        if (query.includes('package') || query.includes('tour') || query.includes('holiday')) {
          return "regarding the holiday package";
        }
      }
      
      // Default dynamic greeting based on email type
      switch(emailType) {
        case 'flight_confirmation':
        case 'new_reservation':
          return "regarding your flight booking";
        case 'hotel_booking':
          return "regarding your hotel booking";
        case 'car_rental':
          return "regarding your car rental";
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
        case 'holiday_package':
          return "regarding your holiday package";
        case 'travel_insurance':
          return "regarding your travel insurance";
        default:
          return "regarding your travel enquiry";
      }
    };

    const dynamicGreeting = getDynamicGreeting();

    /* ---------------- EMAIL BODY ---------------- */
    let message = "";
    const attachments = [];

    if (emailType === "new_reservation" || emailType === "flight_confirmation") {
      // FLIGHT TICKET EMAIL TEMPLATE
      message = `
        <p>Your flight booking is fully confirmed.</p>

        <p><b>Passenger:</b> ${customerName} (${customerPhone})</p>
        <p><b>Email:</b> ${billingEmail}</p>
        <p><b>Airline:</b> ${airline || 'Not specified'}</p>
        <p><b>Route:</b> ${departure || 'Not specified'} → ${arrival || 'Not specified'}</p>
        <p><b>Travel Date:</b> ${travelDate || 'Not specified'}</p>
        ${departureTime ? `<p><b>Departure Time:</b> ${departureTime}</p>` : ''}
        ${arrivalTime ? `<p><b>Arrival Time:</b> ${arrivalTime}</p>` : ''}
        ${cabinClass ? `<p><b>Cabin Class:</b> ${cabinClass}</p>` : ''}

        <div style="margin-top:15px;padding:15px;background:#f1f5f9;border-radius:8px;">
          <p><b>Payment Summary</b></p>
          <p>Amount Charged: <b>USD ${bookingAmount || '0.00'}</b></p>
          <p>Charge Reference: <b>${chargeReference || 'FareBuzzer Travel'}</b></p>
          <p style="font-family:monospace;">
            ${(chargeReference || 'FareBuzzer Travel').toUpperCase()}*TRAVEL<br/>
            USD ${bookingAmount || '0.00'}
          </p>
        </div>

        <p style="margin-top:15px;">
          Please find your <b>e-ticket attached</b> with this email.
        </p>
      `;

      // Generate and attach PDF ticket
      try {
        const ticketPath = await generateETicket({
          confirmationNumber,
          customerName,
          customerPhone,
          billingEmail,
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
          arrivalTerminal
        });

        attachments.push({
          filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
          path: ticketPath,
          contentType: "application/pdf"
        });
      } catch (error) {
        console.error("Error generating e-ticket:", error);
        // Continue without attachment if PDF generation fails
      }
    } else {
      // GENERAL EMAIL TEMPLATE (from code 1)
      switch (emailType) {
        case "new_reservation":
          message = `
            <p>Your flight reservation has been successfully confirmed.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Airline:</b> ${airline}</p>
            <p><b>Route:</b> ${departure} → ${arrival}</p>
            <p><b>Travel Date:</b> ${travelDate}</p>
            <p><b>Booking Amount:</b> USD ${bookingAmount}</p>
            <p><b>Confirmation No:</b> ${confirmationNumber}</p>
          `;
          break;

        case "exchange_ticket":
          message = `
            <p>Your ticket exchange request has been processed.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Original Date:</b> ${oldTravelDate}</p>
            <p><b>New Date:</b> ${newTravelDate}</p>
            <p><b>Change Fee:</b> USD ${changeFee}</p>
            <p><b>Fare Difference:</b> USD ${fareDifference}</p>
            <p><b>Confirmation No:</b> ${confirmationNumber}</p>
          `;
          break;

        case "flight_cancellation":
          message = `
            <p>Your flight booking has been cancelled successfully.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Cancellation Date:</b> ${cancellationDate}</p>
            <p><b>Confirmation No:</b> ${confirmationNumber}</p>
          `;
          break;

        case "refund_request":
          message = `
            <p>Your refund request has been received and is under processing.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Refund Amount:</b> USD ${refundAmount}</p>
            <p><b>Confirmation No:</b> ${confirmationNumber}</p>
            <p>Amount will be credited within 5–10 business days.</p>
          `;
          break;

        case "seat_addons":
          message = `
            <p>Your seat selection / add-ons request has been confirmed.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Confirmation No:</b> ${confirmationNumber}</p>
          `;
          break;

        case "name_correction":
          message = `
            <p>Your name correction request has been received.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Confirmation No:</b> ${confirmationNumber}</p>
            <p>Our team will verify and update shortly.</p>
          `;
          break;

        case "add_pet":
          message = `
            <p>Your pet addition request has been confirmed.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Confirmation No:</b> ${confirmationNumber}</p>
          `;
          break;

        case "hotel_booking":
          message = `
            <p>Your hotel booking has been successfully confirmed.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Hotel:</b> ${hotelName || "Not specified"}</p>
            <p><b>Room Type:</b> ${roomType || "Standard"}</p>
            <p><b>Booking Reference:</b> ${confirmationNumber}</p>
          `;
          break;

        case "car_rental":
          message = `
            <p>Your car rental booking has been confirmed.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Car Type:</b> ${carType || "Standard"}</p>
            <p><b>Rental Days:</b> ${rentalDays || "1"}</p>
            <p><b>Booking Reference:</b> ${confirmationNumber}</p>
          `;
          break;

        case "customer_support":
          message = `
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p>${customMessage || "Thank you for contacting FareBuzzer support."}</p>
          `;
          break;

        case "holiday_package":
          message = `
            <p>Your holiday package booking has been confirmed.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Package Name:</b> ${packageName || "Holiday Package"}</p>
            <p><b>Duration:</b> ${packageNights || "1"} night(s)</p>
            <p><b>Travel Dates:</b> ${packageStartDate || "Not specified"} to ${packageEndDate || "Not specified"}</p>
            <p><b>Number of Persons:</b> ${numberOfPersons || "2"}</p>
            <p><b>Package Price:</b> USD ${packagePrice || "0.00"}</p>
            <p><b>Booking Reference:</b> ${confirmationNumber}</p>
          `;
          break;

        case "travel_insurance":
          message = `
            <p>Your travel insurance has been successfully booked.</p>
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p><b>Insurance Type:</b> ${insuranceType || "Comprehensive Travel Insurance"}</p>
            <p><b>Coverage:</b> ${insuranceCoverage || "Standard Coverage"}</p>
            <p><b>Booking Reference:</b> ${confirmationNumber}</p>
          `;
          break;

        default:
          message = `
            <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
            <p><b>Email:</b> ${billingEmail}</p>
            <p>Thank you for choosing FareBuzzer.</p>
          `;
      }
    }

    /* ---------------- FINAL HTML ---------------- */
    const html = `
      <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
        <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
          <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
        </div>
        <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
        <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
        <p style="margin-bottom:20px;">
          Thank you for your enquiry ${dynamicGreeting}.
        </p>
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

    /* ---------------- SEND EMAIL ---------------- */
    await transporter.sendMail({
      from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
      to: billingEmail,
      replyTo: "besttripmakers@gmail.com",
      subject,
      html,
      attachments
    });

    /* ---------------- SAVE TO CRM INBOX ---------------- */
    await Email.create({
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
        // NEW: Package fields
        packageName,
        packageNights,
        packageStartDate,
        packageEndDate,
        packagePrice,
        numberOfPersons,
        // NEW: Hotel fields
        hotelName,
        roomType,
        // NEW: Car rental fields
        carType,
        rentalDays,
        // NEW: Insurance fields
        insuranceType,
        insuranceCoverage,
        // FLIGHT TICKET FIELDS
        chargeReference,
        cabinClass,
        departureTime,
        arrivalTime,
        ticketNumber,
        flightNumber,
        fareType,
        departureTerminal,
        arrivalTerminal
      }
    });

    res.status(200).json({
      status: "success",
      message: emailType === "new_reservation" || emailType === "flight_confirmation" 
        ? "Email sent successfully with e-ticket" 
        : `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
      data: { 
        customerName, 
        customerPhone, 
        billingEmail, 
        emailType,
        dynamicGreeting,
        templateUsed: templateUsed || null
      }
    });

  } catch (error) {
    console.error("Send email error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to send email",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
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
