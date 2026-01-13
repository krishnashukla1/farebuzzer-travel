//=========fully correct=============

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
//     if (!billingEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer email is required"
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

//     const { data, error } = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: VERIFIED_TEST_EMAIL,
//       subject,
//       html: htmlContent
//     });

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






//================with added extra fileld===correct=======

// require("dotenv").config();
// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const VERIFIED_TEST_EMAIL = "backend.9developer@gmail.com";
// // const VERIFIED_TEST_EMAIL = "meneiljohnson@gmail.com";


// const subjectMap = {
//   new_reservation: "New Reservation Confirmation",
//   exchange_ticket: "Ticket Exchange Confirmation",
//   refund_request: "Refund Confirmation", // Updated to match your desire
//   flight_cancellation: "Flight Cancellation Confirmation",
//   seat_addons: "Seat / Add-ons Confirmation",
//   name_correction: "Name Correction Confirmation",
//   add_pet: "Pet Addition Confirmation",
//   flight_confirmation: "Flight Confirmation",
//   hotel_booking: "Hotel Booking Confirmation",
//   car_rental: "Car Rental Confirmation",
//   customer_support: "Customer Support"
// };


// exports.sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType = "customer_support",
//       customerName,
//       billingEmail,
//       confirmationNumber = "",

//       // New Booking
//       airline = "",
//       departure = "",
//       arrival = "",
//       travelDate = "",
//       bookingAmount = "",

//       // Exchange / Change
//       oldTravelDate = "",
//       newTravelDate = "",
//       changeFee = "",
//       fareDifference = "",

//       // Refund
//       refundAmount = "",
//       cancellationDate = "",
//       billingName = "",
//       billingAddress = "",
//       billingPhone = "",
//       travellers = "",
//       ticketType = "",
//       cardLast4 = "",

//       // Other
//       customMessage = ""
//     } = req.body;

//     if (!customerName) {
//       return res.status(400).json({ status: "fail", message: "Customer name is required" });
//     }
//     if (!billingEmail) {
//       return res.status(400).json({ status: "fail", message: "Customer email is required" });
//     }
//     if (emailType === "refund_request" && !refundAmount) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Refund amount is required for refund emails"
//   });
// }
// if (emailType === "new_reservation" && (!departure || !arrival || !travelDate)) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Incomplete booking details"
//   });
// }


//     const subject = subjectMap[emailType] || "Customer Notification";

//     let headerTitle = "";
//     let mainMessage = "";
//     let detailsRows = "";

//     /* =====================================================
//        TEMPLATE HANDLING
//     ===================================================== */

//     if (emailType === "new_reservation") {
//       headerTitle = "New Reservation Confirmed";
//       mainMessage = `
//         <p>Your booking with <strong>${airline || "Airline"}</strong> has been successfully confirmed.</p>
//         <p>We wish you a safe and pleasant journey!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//         <tr><td width="45%">Total Amount</td><td><strong>USD ${bookingAmount}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "exchange_ticket") {
//       headerTitle = "Ticket Exchange Confirmed";
//       mainMessage = `
//         <p>Your booking with <strong>${airline || "Airline"}</strong> has been successfully updated.</p>
//         <p>Thank you for your flexibility!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td width="45%">Old Travel Date</td><td><strong>${oldTravelDate}</strong></td></tr>
//         <tr><td width="45%">New Travel Date</td><td><strong>${newTravelDate}</strong></td></tr>
//         <tr><td width="45%">Change Fee</td><td><strong>USD ${changeFee || "0.00"}</strong></td></tr>
//         <tr><td width="45%">Fare Difference</td><td><strong>USD ${fareDifference || "0.00"}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "refund_request") {
//       headerTitle = "Refund Confirmation";
//       mainMessage = `
        
//         <p>Your refund request for the <strong>${airline || "booking"}</strong> has been received and is under processing.</p>

//         <p>The amount will be credited back to your original payment method within 5–10 business days.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td width="45%">Refund Amount</td><td><strong>USD ${refundAmount}</strong></td></tr>
//         ${cancellationDate ? `<tr><td width="45%">Cancellation Date</td><td><strong>${cancellationDate}</strong></td></tr>` : ""}
//         ${billingName ? `<tr><td width="45%">Billing Name</td><td><strong>${billingName}</strong></td></tr>` : ""}
//         ${billingAddress ? `<tr><td width="45%">Billing Address</td><td><strong>${billingAddress}</strong></td></tr>` : ""}
//         ${billingEmail ? `<tr><td width="45%">Billing Email</td><td><strong>${billingEmail}</strong></td></tr>` : ""}
//         ${billingPhone ? `<tr><td width="45%">Billing Phone</td><td><strong>${billingPhone}</strong></td></tr>` : ""}
//         ${travellers ? `<tr><td width="45%">Number of Travellers</td><td><strong>${travellers}</strong></td></tr>` : ""}
//         ${ticketType ? `<tr><td width="45%">Ticket Type</td><td><strong>${ticketType}</strong></td></tr>` : ""}
//         ${cardLast4 ? `<tr><td width="45%">Payment Method</td><td><strong>Card ending ****${cardLast4}</strong></td></tr>` : ""}
//       `;
//     }

//         // Simpler confirmation types – enhanced with details table where relevant
//     else if (emailType === "seat_addons") {
//       headerTitle = "Seat / Add-ons Confirmed";
//       mainMessage = `
//         <p>Your requested seat selection or additional add-ons have been successfully confirmed and added to your booking.</p>
//         <p>Thank you for enhancing your travel experience!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "name_correction") {
//       headerTitle = "Name Correction Completed";
//       mainMessage = `
//         <p>We have successfully updated the passenger name on your booking as requested.</p>
//         <p>Your ticket is now accurate and ready for check-in.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "add_pet") {
//       headerTitle = "Pet Added Successfully";
//       mainMessage = `
//         <p>Great news! Your pet has been successfully added to the booking and is approved for travel.</p>
//         <p>We look forward to welcoming your furry companion on board.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "flight_confirmation") {
//       headerTitle = "Flight Confirmed";
//       mainMessage = `
//         <p>Your flight booking is fully confirmed and all details are finalized.</p>
//         <p>Get ready for takeoff — we wish you a smooth and enjoyable journey!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "flight_cancellation") {
//       headerTitle = "Flight Cancellation Confirmed";
//       mainMessage = `
//         <p>Your flight has been successfully cancelled as per your request.</p>
//         <p>If you requested a refund, it will be processed within 5–10 business days.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${cancellationDate ? `<tr><td width="45%">Cancellation Date</td><td><strong>${cancellationDate}</strong></td></tr>` : ""}
//       `;
//     }

//     else if (emailType === "hotel_booking") {
//       headerTitle = "Hotel Booking Confirmed";
//       mainMessage = `
//         <p>Your hotel reservation has been successfully confirmed.</p>
//         <p>We hope you enjoy a comfortable and relaxing stay!</p>
//       `;
//       detailsRows = confirmationNumber ? `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber}</strong></td></tr>
//       ` : "";
//     }

//     else if (emailType === "car_rental") {
//       headerTitle = "Car Rental Confirmed";
//       mainMessage = `
//         <p>Your car rental booking has been successfully confirmed.</p>
//         <p>Your vehicle will be ready for pickup as scheduled.</p>
//       `;
//       detailsRows = confirmationNumber ? `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber}</strong></td></tr>
//       ` : "";
//     }

//     else { // customer_support or any unknown type
//       headerTitle = "Customer Support";
//       mainMessage = `
//         <p>${customMessage || "Thank you for reaching out. Our support team will get back to you as soon as possible."}</p>
//         <p>We appreciate your patience.</p>
//       `;
//       // No details table for generic support
//     }
//     /* =====================================================
//        EMAIL HTML TEMPLATE (Professional & Clean)
//     ===================================================== */

// //     const htmlContent = `
// // <!DOCTYPE html>
// // <html>
// // <head>
// //   <meta charset="UTF-8" />
// //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// // </head>
// // <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
// //   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:30px 0;">
// //     <tr>
// //       <td align="center">
// //         <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08); max-width:95%;">
// //           <!-- Header -->
// //           <tr>
// //             <td style="background:#0f4c81; padding:25px 30px; color:#ffffff; text-align:center;">
// //               <h2 style="margin:0; font-size:24px;">${headerTitle}</h2>
// //               ${confirmationNumber ? `<p style="margin:10px 0 0; font-size:15px; opacity:0.9;">Reference: <strong>${confirmationNumber}</strong></p>` : ""}
// //             </td>
// //           </tr>

// //           <!-- Body -->
// //           <tr>
// //             <td style="padding:30px; color:#1f2937; font-size:15px; line-height:1.6;">
// //               <p style="margin:0 0 20px;">Dear <strong>${customerName}</strong>,</p>

// //               <p style="margin:0 0 20px;">Thank you for choosing our services.</p>

// //               ${mainMessage}

// //               <!-- Details Table -->
// //               ${detailsRows ? `
// //               <table width="100%" cellpadding="12" cellspacing="0" style="background:#f8fafc; border-radius:8px; margin:30px 0;">
// //                 <tr>
// //                   <td colspan="2" style="font-weight:bold; color:#0f4c81; font-size:17px; padding-bottom:10px;">
// //                     ✈️ Booking Details
// //                   </td>
// //                 </tr>
// //                 ${detailsRows}
// //               </table>
// //               ` : ""}

// //               <p style="margin:40px 0 0;">
// //                 If you have any questions, feel free to reply to this email.<br/>
// //                 Warm regards,<br/>
// //                 <strong>Customer Support Team</strong>
// //               </p>
// //             </td>
// //           </tr>

// //           <!-- Footer -->
// //           <tr>
// //             <td style="background:#f8fafc; padding:20px; font-size:12px; color:#6b7280; text-align:center;">
// //               This is an automated email. Please do not reply directly.<br/>
// //               © 2025 Your Company. All rights reserved.
// //             </td>
// //           </tr>
// //         </table>
// //       </td>
// //     </tr>
// //   </table>
// // </body>
// // </html>
// //     `;


// const htmlContent = `
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

//               <p style="margin:0 0 20px;">Thank you for choosing our services.</p>

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
// `;

//     const { data, error } = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: VERIFIED_TEST_EMAIL, // Change to billingEmail when live
//       subject,
//       html: htmlContent
//     });

//     if (error) throw new Error(error.message);

//     return res.status(200).json({
//       status: "success",
//       message: "Email sent successfully",
//       emailId: data?.id
//     });

//   } catch (err) {
//     console.error("Email Error:", err);
//     return res.status(500).json({
//       status: "error",
//       message: err.message || "Failed to send email"
//     });
//   }
// };

//===================with recive email in crm inbox also==========

// import dotenv from "dotenv";
// import { Resend } from "resend";
// import Email from "../models/Email.js";


// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);

// const VERIFIED_TEST_EMAIL = "backend.9developer@gmail.com";
// // const VERIFIED_TEST_EMAIL = "meneiljohnson@gmail.com";


// const subjectMap = {
//   new_reservation: "New Reservation Confirmation",
//   exchange_ticket: "Ticket Exchange Confirmation",
//   refund_request: "Refund Confirmation", // Updated to match your desire
//   flight_cancellation: "Flight Cancellation Confirmation",
//   seat_addons: "Seat / Add-ons Confirmation",
//   name_correction: "Name Correction Confirmation",
//   add_pet: "Pet Addition Confirmation",
//   flight_confirmation: "Flight Confirmation",
//   hotel_booking: "Hotel Booking Confirmation",
//   car_rental: "Car Rental Confirmation",
//   customer_support: "Customer Support"
// };


// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType = "customer_support",
//       customerName,
//       billingEmail,
//       confirmationNumber = "",

//       // New Booking
//       airline = "",
//       departure = "",
//       arrival = "",
//       travelDate = "",
//       bookingAmount = "",

//       // Exchange / Change
//       oldTravelDate = "",
//       newTravelDate = "",
//       changeFee = "",
//       fareDifference = "",

//       // Refund
//       refundAmount = "",
//       cancellationDate = "",
//       billingName = "",
//       billingAddress = "",
//       billingPhone = "",
//       travellers = "",
//       ticketType = "",
//       cardLast4 = "",

//       // Other
//       customMessage = ""
//     } = req.body;

//     if (!customerName) {
//       return res.status(400).json({ status: "fail", message: "Customer name is required" });
//     }
//     if (!billingEmail) {
//       return res.status(400).json({ status: "fail", message: "Customer email is required" });
//     }
//     if (emailType === "refund_request" && !refundAmount) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Refund amount is required for refund emails"
//   });
// }
// if (emailType === "new_reservation" && (!departure || !arrival || !travelDate)) {
//   return res.status(400).json({
//     status: "fail",
//     message: "Incomplete booking details"
//   });
// }


//     const subject = subjectMap[emailType] || "Customer Notification";

//     let headerTitle = "";
//     let mainMessage = "";
//     let detailsRows = "";

//     /* =====================================================
//        TEMPLATE HANDLING
//     ===================================================== */

//     if (emailType === "new_reservation") {
//       headerTitle = "New Reservation Confirmed";
//       mainMessage = `
//         <p>Your booking with <strong>${airline || "Airline"}</strong> has been successfully confirmed.</p>
//         <p>We wish you a safe and pleasant journey!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//         <tr><td width="45%">Total Amount</td><td><strong>USD ${bookingAmount}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "exchange_ticket") {
//       headerTitle = "Ticket Exchange Confirmed";
//       mainMessage = `
//         <p>Your booking with <strong>${airline || "Airline"}</strong> has been successfully updated.</p>
//         <p>Thank you for your flexibility!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td width="45%">Old Travel Date</td><td><strong>${oldTravelDate}</strong></td></tr>
//         <tr><td width="45%">New Travel Date</td><td><strong>${newTravelDate}</strong></td></tr>
//         <tr><td width="45%">Change Fee</td><td><strong>USD ${changeFee || "0.00"}</strong></td></tr>
//         <tr><td width="45%">Fare Difference</td><td><strong>USD ${fareDifference || "0.00"}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "refund_request") {
//       headerTitle = "Refund Confirmation";
//       mainMessage = `
        
//         <p>Your refund request for the <strong>${airline || "booking"}</strong> has been received and is under processing.</p>

//         <p>The amount will be credited back to your original payment method within 5–10 business days.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         <tr><td width="45%">Refund Amount</td><td><strong>USD ${refundAmount}</strong></td></tr>
//         ${cancellationDate ? `<tr><td width="45%">Cancellation Date</td><td><strong>${cancellationDate}</strong></td></tr>` : ""}
//         ${billingName ? `<tr><td width="45%">Billing Name</td><td><strong>${billingName}</strong></td></tr>` : ""}
//         ${billingAddress ? `<tr><td width="45%">Billing Address</td><td><strong>${billingAddress}</strong></td></tr>` : ""}
//         ${billingEmail ? `<tr><td width="45%">Billing Email</td><td><strong>${billingEmail}</strong></td></tr>` : ""}
//         ${billingPhone ? `<tr><td width="45%">Billing Phone</td><td><strong>${billingPhone}</strong></td></tr>` : ""}
//         ${travellers ? `<tr><td width="45%">Number of Travellers</td><td><strong>${travellers}</strong></td></tr>` : ""}
//         ${ticketType ? `<tr><td width="45%">Ticket Type</td><td><strong>${ticketType}</strong></td></tr>` : ""}
//         ${cardLast4 ? `<tr><td width="45%">Payment Method</td><td><strong>Card ending ****${cardLast4}</strong></td></tr>` : ""}
//       `;
//     }

//         // Simpler confirmation types – enhanced with details table where relevant
//     else if (emailType === "seat_addons") {
//       headerTitle = "Seat / Add-ons Confirmed";
//       mainMessage = `
//         <p>Your requested seat selection or additional add-ons have been successfully confirmed and added to your booking.</p>
//         <p>Thank you for enhancing your travel experience!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "name_correction") {
//       headerTitle = "Name Correction Completed";
//       mainMessage = `
//         <p>We have successfully updated the passenger name on your booking as requested.</p>
//         <p>Your ticket is now accurate and ready for check-in.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "add_pet") {
//       headerTitle = "Pet Added Successfully";
//       mainMessage = `
//         <p>Great news! Your pet has been successfully added to the booking and is approved for travel.</p>
//         <p>We look forward to welcoming your furry companion on board.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "flight_confirmation") {
//       headerTitle = "Flight Confirmed";
//       mainMessage = `
//         <p>Your flight booking is fully confirmed and all details are finalized.</p>
//         <p>Get ready for takeoff — we wish you a smooth and enjoyable journey!</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${airline ? `<tr><td width="45%">Airline</td><td><strong>${airline}</strong></td></tr>` : ""}
//         <tr><td width="45%">Route</td><td><strong>${departure} → ${arrival}</strong></td></tr>
//         <tr><td width="45%">Travel Date</td><td><strong>${travelDate}</strong></td></tr>
//       `;
//     }

//     else if (emailType === "flight_cancellation") {
//       headerTitle = "Flight Cancellation Confirmed";
//       mainMessage = `
//         <p>Your flight has been successfully cancelled as per your request.</p>
//         <p>If you requested a refund, it will be processed within 5–10 business days.</p>
//       `;
//       detailsRows = `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber || "-"}</strong></td></tr>
//         ${cancellationDate ? `<tr><td width="45%">Cancellation Date</td><td><strong>${cancellationDate}</strong></td></tr>` : ""}
//       `;
//     }

//     else if (emailType === "hotel_booking") {
//       headerTitle = "Hotel Booking Confirmed";
//       mainMessage = `
//         <p>Your hotel reservation has been successfully confirmed.</p>
//         <p>We hope you enjoy a comfortable and relaxing stay!</p>
//       `;
//       detailsRows = confirmationNumber ? `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber}</strong></td></tr>
//       ` : "";
//     }

//     else if (emailType === "car_rental") {
//       headerTitle = "Car Rental Confirmed";
//       mainMessage = `
//         <p>Your car rental booking has been successfully confirmed.</p>
//         <p>Your vehicle will be ready for pickup as scheduled.</p>
//       `;
//       detailsRows = confirmationNumber ? `
//         <tr><td width="45%">Confirmation Number</td><td><strong>${confirmationNumber}</strong></td></tr>
//       ` : "";
//     }

//     else { // customer_support or any unknown type
//       headerTitle = "Customer Support";
//       mainMessage = `
//         <p>${customMessage || "Thank you for reaching out. Our support team will get back to you as soon as possible."}</p>
//         <p>We appreciate your patience.</p>
//       `;

//     }

// const htmlContent = `
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

//               <p style="margin:0 0 20px;">Thank you for choosing our services.</p>

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
// `;

//     const { data, error } = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: VERIFIED_TEST_EMAIL, // Change to billingEmail when live
//       subject,
//       html: htmlContent
//     });

//     if (error) throw new Error(error.message);

//         /* ================= SAVE TO CRM INBOX ================= */

//     // await Email.create({
//     //   from: "FareBuzzer Support",
//     //   to: billingEmail,
//     //   subject,
//     //   text: customMessage || "",
//     //   html: htmlContent,
//     //   receivedAt: new Date(),
//     // });
    
//     await Email.create({
//   type: "sent",
//   emailType,
//   from: "FareBuzzer Support",
//   to: billingEmail,
//   subject,
//   text: customMessage || "",
//   html: htmlContent,
//   meta: {
//     customerName,
//     confirmationNumber,
//     airline,
//     departure,
//     arrival,
//     travelDate,
//     refundAmount,
//     bookingAmount,
//   },
// });


//     return res.status(200).json({
//       status: "success",
//       message: "Email sent and saved to inbox",
//       emailId: data?.id,
//     });




//   } catch (err) {
//     console.error("Email Error:", err);
//     return res.status(500).json({
//       status: "error",
//       message: err.message || "Failed to send email"
//     });
//   }
// };


//=============================nodemailer 26 dec======correct fully============

// import transporter from "../utils/email.js";

// // POST /api/email/send
// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType = "other",
//       customerName,
//       billingEmail,
//       customMessage,
//       airline,
//       confirmationNumber,
//       travelDate,
//       departure,
//       arrival,
//       bookingAmount,
//       refundAmount
//     } = req.body;

//     if (!customerName || !billingEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name and email are required"
//       });
//     }

//     const subjectMap = {
//       new_booking: "New Booking Confirmation",
//       change_booking: "Booking Change Confirmation",
//       refund: "Refund Confirmation",
//       other: "Customer Support"
//     };

//     const subject = subjectMap[emailType] || "Customer Support";

//     let message = "";

//     if (emailType === "new_booking") {
//       message = `
//         <p>Your booking with <strong>${airline}</strong> has been confirmed.</p>
//         <p><b>Route:</b> ${departure} → ${arrival}</p>
//         <p><b>Date:</b> ${travelDate}</p>
//         <p><b>Amount:</b> USD ${bookingAmount}</p>
//         <p><b>Reference:</b> ${confirmationNumber}</p>
//       `;
//     } else if (emailType === "change_booking") {
//       message = `
//         <p>Your booking with <strong>${airline}</strong> has been updated.</p>
//         <p><b>Reference:</b> ${confirmationNumber}</p>
//       `;
//     } else if (emailType === "refund") {
//       message = `
//         <p>Your refund for <strong>${airline}</strong> has been processed.</p>
//         <p><b>Refund Amount:</b> USD ${refundAmount}</p>
//         <p><b>Reference:</b> ${confirmationNumber}</p>
//       `;
//     } else {
//       message = `<p>${customMessage || "Thank you for contacting our support team."}</p>`;
//     }

//     const html = `
//       <div style="font-family:Arial; background:#f4f6f8; padding:30px;">
//         <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px;">
//           <div style="background:#0f4c81; color:#fff; padding:20px; text-align:center;">
//             <h2>${subject}</h2>
//           </div>
//           <div style="padding:25px;">
//             <p>Dear <b>${customerName}</b>,</p>
//             ${message}
//             <br/>
//             <p>Regards,<br/><b>Customer Support Team</b></p>
//           </div>
//         </div>
//       </div>
//     `;

//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       subject,
//       html
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

//=====================with get mail in crm inbox==correct 2==only for new bookingh==========

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType = "other",
//       customerName,
//       billingEmail,
//       customMessage,
//       airline,
//       confirmationNumber,
//       travelDate,
//       departure,
//       arrival,
//       bookingAmount,
//       refundAmount
//     } = req.body;

//     if (!customerName || !billingEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name and email are required"
//       });
//     }

//     const subjectMap = {
//       new_booking: "New Booking Confirmation",
//       change_booking: "Booking Change Confirmation",
//       refund: "Refund Confirmation",
//       other: "Customer Support"
//     };

//     const subject = subjectMap[emailType];

//     let message = "";

//     if (emailType === "new_booking") {
//       message = `
//         <p>Your booking with <strong>${airline}</strong> has been confirmed.</p>
//         <p><b>Route:</b> ${departure} → ${arrival}</p>
//         <p><b>Date:</b> ${travelDate}</p>
//         <p><b>Amount:</b> USD ${bookingAmount}</p>
//         <p><b>Reference:</b> ${confirmationNumber}</p>
//       `;
//     } else if (emailType === "refund") {
//       message = `
//         <p>Your refund for <strong>${airline}</strong> has been processed.</p>
//         <p><b>Refund Amount:</b> USD ${refundAmount}</p>
//       `;
//     } else {
//       message = `<p>${customMessage || "Thank you for contacting our support team."}</p>`;
//     }

//     const html = `
//       <div style="font-family:Arial; padding:30px">
//         <h2>${subject}</h2>
//         <p>Dear ${customerName},</p>
//         ${message}
//         <p>Regards,<br/>FareBuzzer Support</p>
//       </div>
//     `;

//     // ✅ SEND EMAIL
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//         replyTo: "farebuzzertravel1@gmail.com", // 🔥 IMPORTANT
//       subject,
//       html,
//       replyTo: process.env.GMAIL_USER
//     });

//     // ✅ SAVE TO CRM INBOX (SENT)
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       meta: {
//         customerName,
//         airline,
//         confirmationNumber,
//         departure,
//         arrival,
//         travelDate,
//         bookingAmount,
//         refundAmount
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Email sent & saved to CRM inbox"
//     });

//   } catch (err) {
//     console.error("Email error:", err);
//     res.status(500).json({
//       status: "error",
//       message: err.message
//     });
//   }
// };

//==========================correct 3 with all ===========

// import transporter from "../utils/email.js";
// import Email from "../models/Email.js";

// export const sendCustomerEmail = async (req, res) => {
//   try {
//     const {
//       emailType,
//       customerName,
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
//       customMessage
//     } = req.body;

//     if (!customerName || !billingEmail) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Customer name and billing email are required"
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
//       customer_support: "Customer Support Response"
//     };

//     const subject = subjectMap[emailType] || "FareBuzzer Notification";

//     /* ---------------- EMAIL BODY ---------------- */
//     let message = "";

//     switch (emailType) {
//       case "new_reservation":
//         message = `
//           <p>Your flight reservation has been successfully confirmed.</p>
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
//           <p><b>Cancellation Date:</b> ${cancellationDate}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "refund_request":
//         message = `
//           <p>Your refund request has been received and is under processing.</p>
//           <p><b>Refund Amount:</b> USD ${refundAmount}</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           <p>Amount will be credited within 5–10 business days.</p>
//         `;
//         break;

//       case "seat_addons":
//         message = `
//           <p>Your seat selection / add-ons request has been confirmed.</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "name_correction":
//         message = `
//           <p>Your name correction request has been received.</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//           <p>Our team will verify and update shortly.</p>
//         `;
//         break;

//       case "add_pet":
//         message = `
//           <p>Your pet addition request has been confirmed.</p>
//           <p><b>Confirmation No:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "flight_confirmation":
//         message = `
//           <p>Your flight booking is fully confirmed.</p>
//           <p><b>Airline:</b> ${airline}</p>
//           <p><b>Route:</b> ${departure} → ${arrival}</p>
//           <p><b>Date:</b> ${travelDate}</p>
//         `;
//         break;

//       case "hotel_booking":
//         message = `
//           <p>Your hotel booking has been successfully confirmed.</p>
//           <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "car_rental":
//         message = `
//           <p>Your car rental booking has been confirmed.</p>
//           <p><b>Booking Reference:</b> ${confirmationNumber}</p>
//         `;
//         break;

//       case "customer_support":
//         message = `
//           <p>${customMessage || "Thank you for contacting FareBuzzer support."}</p>
//         `;
//         break;

//       default:
//         message = `<p>Thank you for choosing FareBuzzer.</p>`;
//     }

//     /* ---------------- FINAL HTML ---------------- */
//     const html = `
//       <div style="font-family:Arial; padding:30px">
//         <h2>${subject}</h2>
//         <p>Dear ${customerName},</p>
//         ${message}
//         <br/>
//         <p>Regards,<br/><b>FareBuzzer Support Team</b></p>
//       </div>
//     `;

//     /* ---------------- SEND EMAIL ---------------- */
//     await transporter.sendMail({
//       from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
//       to: billingEmail,
//       // replyTo: "farebuzzertravel1@gmail.com",

//        replyTo: "besttripmakers@gmail.com",
//       //  replyTo: "FareBuzzer Support",
//       subject,
//       html
//     });

//     /* ---------------- SAVE TO CRM INBOX ---------------- */
//     await Email.create({
//       type: "sent",
//       emailType,
//       from: process.env.GMAIL_USER,
//       to: billingEmail,
//       subject,
//       html,
//       meta: {
//         customerName,
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
//         cancellationDate
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Email sent & saved successfully"
//     });

//   } catch (error) {
//     console.error("Send email error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to send email"
//     });
//   }
// };

//=========================with add hn number also===============

import transporter from "../utils/email.js";
import Email from "../models/Email.js";

export const sendCustomerEmail = async (req, res) => {
  try {
    const {
      emailType,
      customerName,
      customerPhone, // NEW: Phone number field
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
      customMessage
    } = req.body;

    // UPDATED: Added phone validation
    if (!customerName || !billingEmail || !customerPhone) {
      return res.status(400).json({
        status: "fail",
        message: "Customer name, phone number, and billing email are required"
      });
    }

    /* ---------------- SUBJECT MAP ---------------- */
    const subjectMap = {
      new_reservation: "New Flight Reservation Confirmation",
      exchange_ticket: "Ticket Exchange Confirmation",
      flight_cancellation: "Flight Cancellation Confirmation",
      refund_request: "Refund Request Received",
      seat_addons: "Seat / Add-ons Confirmation",
      name_correction: "Name Correction Request Received",
      add_pet: "Pet Addition Confirmation",
      flight_confirmation: "Flight Booking Confirmation",
      hotel_booking: "Hotel Booking Confirmation",
      car_rental: "Car Rental Confirmation",
      customer_support: "Customer Support Response"
    };

    const subject = subjectMap[emailType] || "FareBuzzer Notification";

    /* ---------------- EMAIL BODY (UPDATED: Added phone in all cases) ---------------- */
    let message = "";

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

      case "flight_confirmation":
        message = `
          <p>Your flight booking is fully confirmed.</p>
          <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
          <p><b>Email:</b> ${billingEmail}</p>
          <p><b>Airline:</b> ${airline}</p>
          <p><b>Route:</b> ${departure} → ${arrival}</p>
          <p><b>Date:</b> ${travelDate}</p>
        `;
        break;

      case "hotel_booking":
        message = `
          <p>Your hotel booking has been successfully confirmed.</p>
          <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
          <p><b>Email:</b> ${billingEmail}</p>
          <p><b>Booking Reference:</b> ${confirmationNumber}</p>
        `;
        break;

      case "car_rental":
        message = `
          <p>Your car rental booking has been confirmed.</p>
          <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
          <p><b>Email:</b> ${billingEmail}</p>
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

      default:
        message = `
          <p><b>Customer:</b> ${customerName} (${customerPhone})</p>
          <p><b>Email:</b> ${billingEmail}</p>
          <p>Thank you for choosing FareBuzzer.</p>
        `;
    }

    /* ---------------- FINAL HTML (Greeting unchanged) ---------------- */
    const html = `
      <div style="font-family:Arial, sans-serif; padding:30px; max-width:600px; margin:0 auto; line-height:1.6; color:#333;">
        <div style="text-align:center; padding-bottom:20px; border-bottom:2px solid #10b981;">
          <h1 style="color:#10b981; margin:0; font-size:24px;">✈️ FareBuzzer Travel</h1>
        </div>
        <h2 style="color:#1e293b; margin:20px 0 10px 0;">${subject}</h2>
        <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${customerName},</strong></p>
        <p style="margin-bottom:20px;">
      Thank you for your enquiry regarding the Kashmir / Manali / Goa package / flight / Hotel or any other thing.
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
          © ${new Date().getFullYear()} FareBuzzer Travel. Prayagraj, UP, India.
        </p>
      </div>
    `;

    /* ---------------- SEND EMAIL ---------------- */
    await transporter.sendMail({
      from: `"FareBuzzer Support" <${process.env.GMAIL_USER}>`,
      to: billingEmail,
      replyTo: "besttripmakers@gmail.com",
      subject,
      html
    });

    /* ---------------- SAVE TO CRM INBOX (UPDATED: Added phone) ---------------- */
    await Email.create({
      type: "sent",
      emailType,
      from: process.env.GMAIL_USER,
      to: billingEmail,
      subject,
      html,
      meta: {
        customerName,
        customerPhone, // NEW
        billingEmail,  // NEW: Explicitly save email too
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
        cancellationDate
      }
    });

    res.status(200).json({
      status: "success",
      message: `Email sent to ${customerName} (${customerPhone}) & saved successfully`,
      data: { customerName, customerPhone, billingEmail, emailType }
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
