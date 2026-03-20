

//========13 feb=======add more passenger=====



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

// const generateInvoicePaymentSection = (invoice, confirmationNumber, customerName, billingEmail, customerPhone, bookingAmount) => {
//   const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
  
//   // ✅ FIXED: Create payment link from Code 2
//   const params = new URLSearchParams({
//     customerName: customerName || '',
//     email: billingEmail || '',
//     phone: customerPhone || '',
//     amount: bookingAmount,
//     bookingRef: confirmationNumber || '',
//     source: 'email',
//     timestamp: Date.now().toString(),
//     invoiceNumber: invoice.invoiceNumber || '' // Add invoice number
//   });
  
//   const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
  
//   // ✅ FIXED: Invoice view link (backend route)
//   const invoiceViewLink = `${process.env.BACKEND_URL || 'https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host'}/api/invoices/${invoice.invoiceNumber}/view`;
  
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
//       <a href="${invoiceViewLink}" 
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
      
//       <!-- PAY NOW BUTTON (FIXED: Uses paymentLink from Code 2) -->
//       <a href="${paymentLink}" 
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

// ✅ MAIN FUNCTION

const generateInvoicePaymentSection = (invoice, confirmationNumber, customerName, billingEmail, customerPhone, bookingAmount) => {
  const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
  
  const params = new URLSearchParams({
    customerName: customerName || '',
    email: billingEmail || '',
    phone: customerPhone || '',
    amount: bookingAmount,
    bookingRef: confirmationNumber || '',
    source: 'email',
    timestamp: Date.now().toString(),
    invoiceNumber: invoice.invoiceNumber || ''
  });
  
  const paymentLink = `${frontendUrl}/payment?${params.toString()}`;
  
  const invoiceViewLink = `${process.env.BACKEND_URL || 'https://farebuzzer-travel-backend.onrender.com'}/api/invoices/${invoice.invoiceNumber}/view`;
  
  // return `
  //   <hr style="margin:20px 0; border-top:2px solid #10b981;">
    
  //   <div style="text-align:center; margin:30px 0; padding:25px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:15px; border:2px solid #10b981;">
  //     <h3 style="color:#065f46; margin-bottom:15px; font-size:22px;">📋 Your Invoice & Payment</h3>
      
  //     <div style="background:white; padding:15px; border-radius:10px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  //       <p style="margin:0; color:#374151; font-size:16px;">
  //         <span style="color:#64748b;">Invoice Number:</span> 
  //         <strong style="color:#065f46;">${invoice.invoiceNumber}</strong>
  //       </p>
  //       <p style="margin:10px 0 0; color:#374151; font-size:16px;">
  //         <span style="color:#64748b;">Due Date:</span> 
  //         <strong style="color:#065f46;">${new Date(invoice.dueDate).toLocaleDateString()}</strong>
  //       </p>
  //       <p style="margin:10px 0 0; color:#374151; font-size:16px;">
  //         <span style="color:#64748b;">Amount Due:</span> 
  //         <strong style="color:#065f46; font-size:20px;">USD ${invoice.amount}</strong>
  //       </p>
  //     </div>
      
  //     <!-- VIEW INVOICE BUTTON -->
  //     <a href="${invoiceViewLink}" 
  //        style="display:inline-block; 
  //               background: #3b82f6;
  //               color: white; 
  //               padding: 12px 30px; 
  //               text-decoration: none; 
  //               border-radius: 50px; 
  //               font-weight: bold; 
  //               font-size: 16px; 
  //               margin: 10px 5px;
  //               border: 2px solid #2563eb;">
  //       📄 View Invoice
  //     </a>
      
  //     <!-- PAY NOW BUTTON -->
  //     <a href="${paymentLink}" 
  //        style="display:inline-block; 
  //               background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  //               color: white; 
  //               padding: 12px 30px; 
  //               text-decoration: none; 
  //               border-radius: 50px; 
  //               font-weight: bold; 
  //               font-size: 16px; 
  //               box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  //               margin: 10px 5px;
  //               border: 2px solid #059669;">
  //       💳 Pay Now - USD ${invoice.amount}
  //     </a>
      
  //     <!-- PAYMENT OPTIONS -->
  //     <div style="margin-top:20px;">
  //       <p style="color:#047857; font-size:14px; margin-bottom:10px;">
  //         <strong>Accepted Payment Methods:</strong>
  //       </p>
  //       <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap;">
  //         <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ PayPal</span>
  //         <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Credit Card</span>
  //         <span style="font-size:12px; color:#6b7280; background:#f3f4f6; padding:4px 8px; border-radius:4px;">✅ Debit Card</span>
  //       </div>
  //     </div>
      
  //     <!-- ALTERNATIVE INSTRUCTIONS -->
  //     <div style="margin-top:20px; padding:15px; background:#fef3c7; border-radius:8px;">
  //       <p style="color:#92400e; font-size:14px; margin:0;">
  //         <strong>⚠️ Important:</strong> Please complete payment before ${new Date(invoice.dueDate).toLocaleDateString()} to confirm your booking.
  //       </p>
  //     </div>
  //   </div>
  // `;


  return `
    <hr style="margin:15px 0; border-top:1px solid #10b981;">
    
    <div style="text-align:center; margin:15px 0; padding:15px; background:linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border-radius:12px; border:1px solid #10b981;">
      <h3 style="color:#065f46; margin-bottom:10px; font-size:18px;">📋 Your Invoice & Payment</h3>
      
      <div style="background:white; padding:12px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
        <p style="margin:0; color:#374151; font-size:14px;">
          <span style="color:#64748b;">Invoice:</span> 
          <strong style="color:#065f46;">${invoice.invoiceNumber}</strong>
        </p>
        <p style="margin:8px 0 0; color:#374151; font-size:14px;">
          <span style="color:#64748b;">Due:</span> 
          <strong style="color:#065f46;">${new Date(invoice.dueDate).toLocaleDateString()}</strong>
        </p>
        <p style="margin:8px 0 0; color:#374151; font-size:14px;">
          <span style="color:#64748b;">Amount:</span> 
          <strong style="color:#065f46; font-size:18px;">USD ${invoice.amount}</strong>
        </p>
      </div>
      
      <!-- BUTTONS -->
      <div style="margin:5px 0;">
        <a href="${invoiceViewLink}" 
           style="display:inline-block; 
                  background: #3b82f6;
                  color: white; 
                  padding: 8px 20px; 
                  text-decoration: none; 
                  border-radius: 40px; 
                  font-weight: bold; 
                  font-size: 14px; 
                  margin: 5px 3px;
                  border: 1px solid #2563eb;">
          📄 View Invoice
        </a>
        
        <a href="${paymentLink}" 
           style="display:inline-block; 
                  background: #10b981;
                  color: white; 
                  padding: 8px 20px; 
                  text-decoration: none; 
                  border-radius: 40px; 
                  font-weight: bold; 
                  font-size: 14px; 
                  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
                  margin: 5px 3px;
                  border: 1px solid #059669;">
        
           💳 Pay Now - USD ${invoice.amount}
        </a>
      </div>
      
      <!-- PAYMENT METHODS -->
      <div style="margin-top:12px;">
        <p style="color:#047857; font-size:12px; margin-bottom:6px;">
          
              <strong>Accepted Payment Methods:</strong>
        </p>
        <div>
          <span style="font-size:11px; color:#6b7280; background:#f3f4f6; padding:3px 6px; border-radius:3px;">PayPal</span>
          <span style="font-size:11px; color:#6b7280; background:#f3f4f6; padding:3px 6px; border-radius:3px; margin-left:5px;">Credit Card</span>
          <span style="font-size:11px; color:#6b7280; background:#f3f4f6; padding:3px 6px; border-radius:3px; margin-left:5px;">Debit</span>
        </div>
      </div>
      
      <!-- DUE DATE NOTE -->
      <div style="margin-top:12px; padding:8px; background:#fef3c7; border-radius:6px;">
        <p style="color:#92400e; font-size:12px; margin:0;">
        <strong>⚠️ Important:</strong> Please complete payment before ${new Date(invoice.dueDate).toLocaleDateString()} to confirm your booking.

        </p>
      </div>
    </div>
  `;

};

export const sendCustomerEmail = async (req, res) => {
  try {
    console.log("📧 Received email request:", req.body.emailType);
    
    const {
      emailType,
      templateUsed,
       customerPrefix, // "mr", "miss", "mrs", "master"
  customerFirstName,
  customerMiddleName,
  customerLastName,
  customerDOB,
  customerGender,
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
    // if (!customerName || !billingEmail || !customerPhone) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "Customer name, phone number, and billing email are required"
    //   });
    // }

    // ✅ VALIDATION - Update validation for new fields
    // ✅ NEW VALIDATION - Check passengers array
    const passengers = req.body.passengers || [];
    
    if (!passengers || passengers.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "At least one passenger is required"
      });
    }

    // Validate first passenger has required fields
    const primaryPassenger = passengers[0];
    if (!primaryPassenger.firstName || !primaryPassenger.lastName) {
      return res.status(400).json({
        status: "fail",
        message: "Passenger first name and last name are required"
      });
    }

    // Validate prefix if provided
    const validPrefixes = ["mr", "miss", "mrs", "master"];
    if (primaryPassenger.prefix && !validPrefixes.includes(primaryPassenger.prefix.toLowerCase())) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid prefix. Must be mr, miss, mrs, or master"
      });
    }

    // Validate phone and email
    if (!customerPhone) {
      return res.status(400).json({
        status: "fail",
        message: "Customer phone number is required"
      });
    }

    if (!billingEmail) {
      return res.status(400).json({
        status: "fail",
        message: "Billing email is required"
      });
    }
// ✅ Create full customer name from parts
// ✅ Create full customer name from passengers array
// const passengers = req.body.passengers || [];
let fullCustomerName = "";

if (passengers.length > 0) {
  const primary = passengers[0];
  fullCustomerName = [
    primary.prefix ? primary.prefix.toUpperCase() + '.' : '',
    primary.firstName,
    primary.middleName,
    primary.lastName
  ].filter(Boolean).join(' ');
}

// Use the full name in your email
const customerNameToUse = fullCustomerName || "Valued Customer";
console.log(`👤 Primary passenger: ${fullCustomerName}`);


    
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
  
    
    // Create invoice object with passengers
    const invoiceData = {
      invoiceNumber,
      passengers, // ✅ NEW: Store all passengers
      // Keep single fields for backward compatibility
      customerName: fullCustomerName,
      customerPrefix,
      customerFirstName,
      customerMiddleName,
      customerLastName,
      customerDOB,
      customerGender,
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
        quantity: passengers.length || 1, // ✅ NEW: Use passenger count
        unitPrice: parseFloat(bookingAmount) / (passengers.length || 1),
        total: parseFloat(bookingAmount)
      }],
      paymentLink: `${process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host'}/invoice/${invoiceNumber}`
    };
    
    console.log("📋 Invoice data:", invoiceData);
    
    // Create invoice in database
    invoice = await Invoice.create(invoiceData);
    
    console.log("✅ Invoice created:", invoice.invoiceNumber);
    console.log("📊 Invoice ID:", invoice._id);
    
    invoicePaymentSection = generateInvoicePaymentSection(
      invoice, 
      confirmationNumber, 
      fullCustomerName, 
      billingEmail, 
      customerPhone, 
      bookingAmount
    );
    
  } catch (invoiceError) {
    console.error("❌ Error creating invoice:", invoiceError);
  }
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
      <p>Dear ${fullCustomerName || 'Valued Customer'}</p>
      <p>Greetings of the day!</p>
      <p>As per our telephonic conversation, we have ${finalUpdateType} your reservation for the following itinerary for your travel. We request you to kindly check the itinerary, name(s), and the price details carefully. Please note that the name(s) of the passenger(s) must match exactly as they appear on the Government issued ID.</p>
      <hr style="margin:20px 0; border-top:1px dashed #ccc;">
    `;


 // ✅ CUSTOMER DETAILS - Show ALL passengers
let passengerDetailsHTML = '';
passengers.forEach((passenger, index) => {
  const passengerName = [
    passenger.prefix ? passenger.prefix.toUpperCase() + '.' : '',
    passenger.firstName,
    passenger.middleName,
    passenger.lastName
  ].filter(Boolean).join(' ');
  
  passengerDetailsHTML += `
    <div style="margin-bottom: 8px; padding: 8px; background: ${index % 2 === 0 ? '#f8fafc' : 'white'}; border-radius: 4px; border-left: 3px solid #10b981;">
      <strong>Passenger ${index + 1}:</strong> ${passengerName || 'N/A'}
      ${passenger.dob ? `<br><span style="font-size: 12px; color: #64748b;">DOB: ${passenger.dob}</span>` : ''}
      ${passenger.gender ? `<span style="font-size: 12px; color: #64748b; margin-left: 10px;">Gender: ${passenger.gender}</span>` : ''}
    </div>
  `;
});

let customerDetails = `
  <p><b>Contact Details:</b></p>
  <p><b>Phone:</b> ${customerPhone}</p>
  <p><b>Email:</b> ${billingEmail}</p>
  <hr style="margin:15px 0; border-top:1px dashed #ccc;">
  <p><b>Passenger Information (${passengers.length}):</b></p>
  ${passengerDetailsHTML}
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
      const backendUrl = process.env.BACKEND_URL || 'https://farebuzzer-travel-backend.onrender.com';
      // const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(customerName)}`;
      const agreementLink = `${backendUrl}/api/agreement/submit?email=${encodeURIComponent(billingEmail)}&booking=${encodeURIComponent(confirmationNumber)}&name=${encodeURIComponent(fullCustomerName || customerName || '')}`;
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
          <p style="font-size:14px; color:#92400e;">
        Your IP address will be automatically recorded for verification
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
    // ✅ NEW: Get passengers from request
    const passengers = req.body.passengers || [];
    
    // Format passengers for e-ticket
    const formattedPassengers = passengers.map(p => ({
      prefix: p.prefix,
      firstName: p.firstName,
      middleName: p.middleName,
      lastName: p.lastName,
      dob: p.dob,
      gender: p.gender,
      fullName: `${p.prefix ? p.prefix.toUpperCase() + '.' : ''} ${p.firstName} ${p.middleName ? p.middleName + ' ' : ''}${p.lastName}`.trim()
    }));
    
    // If no passengers array, fallback to single passenger
    if (formattedPassengers.length === 0) {
      formattedPassengers.push({
        prefix: customerPrefix,
        firstName: customerFirstName,
        middleName: customerMiddleName,
        lastName: customerLastName,
        dob: customerDOB,
        gender: customerGender,
        fullName: fullCustomerName || customerName
      });
    }
    
    const ticketPath = await generateETicket({
      passengers: formattedPassengers, // ✅ NEW: Pass array of passengers
      // Keep single fields for backward compatibility
      confirmationNumber,
      customerPrefix,
      customerFirstName,
      customerMiddleName,
      customerLastName,
      customerDOB,
      customerGender,
      customerName: fullCustomerName || customerName,
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
      connectionTime: req.body.connectionTime || "",
      cardLastFour: cardLastFour || "",
    });

    attachments.push({
      filename: `FareBuzzer-Eticket-${confirmationNumber}.pdf`,
      path: ticketPath,
      contentType: "application/pdf"
    });
    console.log("✅ E-ticket generated and attached with", formattedPassengers.length, "passenger(s)");
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
       <p style="font-size:16px; margin-bottom:10px;"><strong>Dear ${fullCustomerName || 'Valued Customer'},</strong></p>
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


    // ✅ SAVE TO CRM DATABASE
const emailDoc = await Email.create({
  type: "sent",
  emailType,
  from: process.env.GMAIL_USER,
  to: billingEmail,
  subject,
  html, // You should remove this if you're not storing HTML
  text: "Email sent successfully", // Add a text summary
  templateUsed: templateUsed || null,
  
  // ✅ NEW: Store all passengers
  passengers: req.body.passengers || [],
  
  meta: {
    // Keep individual fields for backward compatibility
    customerPrefix,
    customerFirstName,
    customerMiddleName,
    customerLastName,
    customerDOB,
    customerGender,
    customerName: fullCustomerName,
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
    numberOfPersons: numberOfPersons || (req.body.passengers ? req.body.passengers.length : 1),
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
    connectionTime: req.body.connectionTime,
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
console.log("👥 Passengers saved:", req.body.passengers ? req.body.passengers.length : 1);

    console.log("✅ Email saved to CRM with ID:", emailDoc._id);

    // ✅ PREPARE RESPONSE DATA
    const responseData = {
      // customerName, 
        customerName: fullCustomerName || customerName || 'Customer', 
      customerPhone, 
      billingEmail, 
      emailType,
      dynamicGreeting,
      templateUsed: templateUsed || null,
      messageId: messageId,
      bookingData: {
        // customerName,
            customerName: fullCustomerName || customerName || 'Customer', 
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
        : `Email sent to ${fullCustomerName || customerName || 'Customer'} & saved successfully`, 
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
