// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import os from "os";
// import QRCode from "qrcode";

// // Utility functions
// const generatePNR = () => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let pnr = '';
//   for (let i = 0; i < 6; i++) {
//     pnr += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return pnr;
// };

// const generateTicketNumber = (airline) => {
//   const airlineCodes = {
//     'American Airlines': '001',
//     'Delta Air Lines': '006',
//     'United Airlines': '016',
//     'Lufthansa': '220',
//     'British Airways': '125',
//     'Emirates': '176',
//     'Qatar Airways': '157',
//     'Air France': '057',
//     'KLM': '074',
//     'Air Canada': '014'
//   };
//   const airlineCode = airlineCodes[airline] || '001';
//   const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
//   return `${airlineCode}${randomDigits}`;
// };

// const formatDate = () => {
//   return new Date().toLocaleDateString('en-US', {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // Layout constants for consistent spacing
// const LAYOUT = {
//   MARGIN: 40,
//   SECTION_SPACING: 20,
//   BOX_SPACING: 15,
//   LINE_HEIGHT: 15,
//   SMALL_SPACING: 5,
//   FOOTER_HEIGHT: 60
// };

// // Section rendering functions
// const renderHeader = (doc, data) => {
//   // Blue header background
//   doc.rect(0, 0, doc.page.width, 60)
//      .fill('#1E3A8A');
  
//   // Airline name
//   doc.fillColor('#FFFFFF')
//      .fontSize(24)
//      .font('Helvetica-Bold')
//      .text(`${data.airline.toUpperCase()}`, LAYOUT.MARGIN, 20);
  
//   // Document title
//   doc.fontSize(16)
//      .text('ELECTRONIC TICKET RECEIPT', LAYOUT.MARGIN, 45);
  
//   // Issuer in top right
//   doc.fontSize(10)
//      .font('Helvetica-Bold')
//      .text('ISSUED BY FAREBUZZER', 
//            doc.page.width - LAYOUT.MARGIN - 120, 
//            25, 
//            { width: 120, align: 'right' });
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderTicketInfo = (doc, data, pnr, ticketNumber) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 60;
  
//   // Info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F0F9FF')
//      .stroke('#3B82F6');
  
//   // Column headers
//   doc.fillColor('#1E40AF')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('PASSENGER NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('BOOKING REFERENCE', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('TICKET NUMBER', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Column values
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(data.customerName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25)
//      .text(pnr, LAYOUT.MARGIN + 210, boxY + 25)
//      .text(ticketNumber, LAYOUT.MARGIN + 410, boxY + 25);
  
//   // Status row headers
//   doc.fillColor('#1E40AF')
//      .font('Helvetica-Bold')
//      .fontSize(11)
//      .text('ISSUED DATE', LAYOUT.MARGIN + 10, boxY + 40)
//      .text('ISSUED BY', LAYOUT.MARGIN + 210, boxY + 40)
//      .text('STATUS', LAYOUT.MARGIN + 410, boxY + 40);
  
//   // Status row values
//   const issuedDate = formatDate();
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text(issuedDate, LAYOUT.MARGIN + 10, boxY + 55)
//      .text(data.chargeReference || 'FAREBUZZER TRAVEL', LAYOUT.MARGIN + 210, boxY + 55);
  
//   doc.fillColor('#059669')
//      .font('Helvetica-Bold')
//      .fontSize(12)
//      .text('CONFIRMED ✓', LAYOUT.MARGIN + 410, boxY + 55);
  
//   doc.moveDown(2);
//   return doc.y;
// };

// const renderPassengerDetails = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('PASSENGER DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 90;
  
//   // Passenger box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .stroke('#E5E7EB');
  
//   // Column headers
//   doc.fillColor('#374151')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('CONTACT INFORMATION', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('FARE TYPE', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Passenger name
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(data.customerName, LAYOUT.MARGIN + 10, boxY + 25);
  
//   // Contact information
//   doc.fontSize(10)
//      .text(`Email: ${data.billingEmail}`, LAYOUT.MARGIN + 210, boxY + 25)
//      .text(`Phone: ${data.customerPhone}`, LAYOUT.MARGIN + 210, boxY + 40);
  
//   // Fare type
// //   doc.fontSize(12)
// //      .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 410, boxY + 25);

//       // Fare type - use provided cabin class or default
//   doc.fontSize(12)
//      .text(data.cabinClass || 'NOT SPECIFIED', LAYOUT.MARGIN + 410, boxY + 25);
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderFlightDetails = (doc, data) => {
//   // Check if we need a new page
//   const requiredHeight = 180;
//   if (doc.y + requiredHeight > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//   }
  
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('FLIGHT DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 150;
  
//   // Flight info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#FEF3C7')
//      .stroke('#F59E0B');
  
//   // Flight header row
//   doc.fillColor('#92400E')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('FLIGHT', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('DEPARTURE', LAYOUT.MARGIN + 110, boxY + 10)
//      .text('ARRIVAL', LAYOUT.MARGIN + 260, boxY + 10)
//      .text('DURATION', LAYOUT.MARGIN + 360, boxY + 10)
//      .text('CLASS', LAYOUT.MARGIN + 440, boxY + 10);
  
//   const flightRowY = boxY + 30;
  
//   // Flight data
//   doc.fillColor('#000000')
//      .fontSize(12)
//      .font('Helvetica')
//      .text(data.airlineCode || 'AA 1234', LAYOUT.MARGIN + 10, flightRowY)
//      .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 110, flightRowY)
//      .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 260, flightRowY)
//      .text(data.duration || '2h 30m', LAYOUT.MARGIN + 360, flightRowY)
//      .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 440, flightRowY);
  
//   // Departure details
// //   doc.fillColor('#6B7280')
// //      .fontSize(10)
// //      .font('Helvetica-Oblique')
// //      .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 110, flightRowY + 15)
// //      .text(`Time: ${data.departureTime || '14:30'}`, LAYOUT.MARGIN + 110, flightRowY + 30)
// //      .text(`Terminal: ${data.departureTerminal || 'T1'}`, LAYOUT.MARGIN + 110, flightRowY + 45)
// //      .text(`Gate: To be announced`, LAYOUT.MARGIN + 110, flightRowY + 60);
  
//  // Departure details - use provided times or show placeholder
//   doc.fillColor('#6B7280')
//      .fontSize(10)
//      .font('Helvetica-Oblique')
//      .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 110, flightRowY + 15)
//      .text(`Time: ${data.departureTime || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 30)
//      .text(`Terminal: ${data.departureTerminal || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 45)
//      .text(`Gate: To be announced`, LAYOUT.MARGIN + 110, flightRowY + 60);


//   // Arrival details
// //   doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 260, flightRowY + 15)
// //      .text(`Time: ${data.arrivalTime || '17:00'}`, LAYOUT.MARGIN + 260, flightRowY + 30)
// //      .text(`Terminal: ${data.arrivalTerminal || 'T2'}`, LAYOUT.MARGIN + 260, flightRowY + 45)
// //      .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 260, flightRowY + 60);
  
//   // Arrival details
//   doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 260, flightRowY + 15)
//      .text(`Time: ${data.arrivalTime || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 30)
//      .text(`Terminal: ${data.arrivalTerminal || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 45)
//      .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 260, flightRowY + 60);

//   doc.moveDown(4);
//   return doc.y;
// };

// const renderImportantInfo = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Check if we need a new page
//   if (sectionTitleY + 120 > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//     doc.y = LAYOUT.MARGIN;
//   }
  
//   // Section title
//   doc.fillColor('#DC2626')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('IMPORTANT INFORMATION', LAYOUT.MARGIN, sectionTitleY);
  
//   const listY = sectionTitleY + LAYOUT.SECTION_SPACING;
  
//   // Information list
//   doc.fillColor('#000000')
//      .fontSize(9)
//      .font('Helvetica')
//      .list([
//        `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
//        `Baggage allowance: 1 carry-on (max 7kg) + 1 personal item`,
//        `Boarding begins 2 hours before departure`,
//        `Government-issued photo ID required for all passengers`,
//        `Electronic ticket - No physical ticket required`,
//        `Changes/Cancellations: Fees apply. Visit airline website for details`
//      ], LAYOUT.MARGIN, listY, {
//        bulletRadius: 2,
//        indent: 20,
//        textIndent: 10,
//        lineGap: LAYOUT.SMALL_SPACING
//      });
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderPaymentSummary = (doc, data) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 100;
  
//   // Payment box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F3F4F6')
//      .stroke('#9CA3AF');
  
//   // Section title
//   doc.fillColor('#1F2937')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('PAYMENT SUMMARY', LAYOUT.MARGIN + 10, boxY + 15);
  
//   // Column headers
//   doc.fillColor('#4B5563')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('DESCRIPTION', LAYOUT.MARGIN + 10, boxY + 35)
//      .text('AMOUNT (USD)', LAYOUT.MARGIN + 360, boxY + 35);
  
//   // Line items
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text('Base Fare', LAYOUT.MARGIN + 10, boxY + 50)
//      .text(`$${Number(data.bookingAmount * 0.7).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 50)
//      .text('Taxes & Fees', LAYOUT.MARGIN + 10, boxY + 65)
//      .text(`$${Number(data.bookingAmount * 0.3).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 65);
  
//   // Divider line
//   doc.moveTo(LAYOUT.MARGIN + 340, boxY + 80)
//      .lineTo(LAYOUT.MARGIN + 460, boxY + 80)
//      .stroke('#000000', 0.5);
  
//   // Total
//   doc.fillColor('#1E3A8A')
//      .fontSize(12)
//      .font('Helvetica-Bold')
//      .text('TOTAL PAID', LAYOUT.MARGIN + 10, boxY + 85)
//      .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 85);
  
//   // Payment details
//   const issuedDate = formatDate();
//   doc.fillColor('#6B7280')
//      .fontSize(8)
//      .text(`Charged to card ending in 2180 • ${issuedDate}`, 
//            LAYOUT.MARGIN + 10, 
//            boxY + 105);
  
//   return boxY + boxHeight + LAYOUT.SECTION_SPACING;
// };

// const renderBarcodeAndQR = async (doc, pnr, ticketNumber, yPosition) => {
//   // Generate QR code
//   const qrData = `PNR:${pnr} TICKET:${ticketNumber}`;
//   const qrImage = await QRCode.toDataURL(qrData);
  
//   // QR Code
//   await doc.image(qrImage, 
//                   doc.page.width - LAYOUT.MARGIN - 100, 
//                   yPosition, 
//                   { width: 100, height: 100 });
  
//   // Barcode area
//   doc.rect(LAYOUT.MARGIN, yPosition, 300, 40)
//      .stroke('#000000');
  
//   // Barcode text
//   doc.fillColor('#000000')
//      .fontSize(8)
//      .text(`PNR: ${pnr} | TICKET: ${ticketNumber}`, 
//            LAYOUT.MARGIN + 5, 
//            yPosition + 15);
  
//   return yPosition + 50;
// };

// const renderFooter = (doc) => {
//   const footerY = doc.page.height - LAYOUT.FOOTER_HEIGHT;
  
// //   doc.fillColor('#6B7280')
// //      .fontSize(7)
// //      .text(
// //        'This document is valid for travel and must be presented with government-issued photo ID.',
// //        LAYOUT.MARGIN,
// //        footerY,
// //        { 
// //          width: doc.page.width - (LAYOUT.MARGIN * 2), 
// //          align: 'center' 
// //        }
// //      )
// //      .text(
// //        'FareBuzzer Travel • support@farebuzzer.com • +1-800-123-4567 • www.farebuzzer.com',
// //        LAYOUT.MARGIN,
// //        footerY + 15,
// //        { 
// //          width: doc.page.width - (LAYOUT.MARGIN * 2), 
// //          align: 'center' 
// //        }
// //      );


// doc
//   .fillColor('#6B7280')
//   .fontSize(7)
//   .text(
//     'This document is valid for travel and must be presented with government-issued photo ID.\n' +
//     'FareBuzzer Travel • support@farebuzzer.com • +1-800-123-4567 • www.farebuzzer.com',
//     LAYOUT.MARGIN,
//     footerY,
//     {
//       width: doc.page.width - (LAYOUT.MARGIN * 2),
//       align: 'center',
//       lineGap: 2   // 👈 controls gap between lines
//     }
//   );

// };

// // export const generateETicket = async (data) => {

// //   if (!data.confirmationNumber) {
// //     throw new Error("confirmationNumber missing for ticket generation");
// //   }

// //   const filePath = path.join(
// //     os.tmpdir(),
// //     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
// //   );

// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       const doc = new PDFDocument({ 
// //         size: "A4", 
// //         margin: LAYOUT.MARGIN,
// //         info: {
// //           Title: `E-Ticket ${data.confirmationNumber}`,
// //           Author: 'FareBuzzer Travel',
// //           Subject: 'Electronic Flight Ticket'
// //         }
// //       });
      
// //       const stream = fs.createWriteStream(filePath);
// //       doc.pipe(stream);

// //       // Generate ticket identifiers
// //       const pnr = generatePNR();
// //       const ticketNumber = generateTicketNumber(data.airline);

// //       // Render sections in sequence
// //       renderHeader(doc, data);
      
// //       renderTicketInfo(doc, data, pnr, ticketNumber);
      
// //       renderPassengerDetails(doc, data);
      
// //       renderFlightDetails(doc, data);
      
// //       renderImportantInfo(doc, data);
      
// //       const paymentEndY = renderPaymentSummary(doc, data);
      
// //       await renderBarcodeAndQR(doc, pnr, ticketNumber, paymentEndY);
      
// //       renderFooter(doc);

// //       doc.end();
      
// //       stream.on("finish", () => resolve(filePath));
// //       stream.on("error", reject);

// //     } catch (err) {
// //       reject(err);
// //     }
// //   });
// // };


// // Update the generateETicket function to accept and use all provided data
// export const generateETicket = async (data) => {
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   // Use the provided confirmationNumber as PNR
//   const pnr = data.confirmationNumber;
  
//   // Use provided ticket number or generate one
//   const ticketNumber = data.ticketNumber || generateTicketNumber(data.airline);

//   const filePath = path.join(
//     os.tmpdir(),
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise(async (resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ 
//         size: "A4", 
//         margin: LAYOUT.MARGIN,
//         info: {
//           Title: `E-Ticket ${data.confirmationNumber}`,
//           Author: 'FareBuzzer Travel',
//           Subject: 'Electronic Flight Ticket'
//         }
//       });
      
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Render sections in sequence
//       renderHeader(doc, data);
      
//       renderTicketInfo(doc, data, pnr, ticketNumber);
      
//       renderPassengerDetails(doc, data);
      
//       renderFlightDetails(doc, data);
      
//       renderImportantInfo(doc, data);
      
//       const paymentEndY = renderPaymentSummary(doc, data);
      
//       await renderBarcodeAndQR(doc, pnr, ticketNumber, paymentEndY);
      
//       renderFooter(doc);

//       doc.end();
      
//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);

//     } catch (err) {
//       reject(err);
//     }
//   });
// };




//=====23 jan============


/*


import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import os from "os";
import QRCode from "qrcode";

// Utility functions
const generatePNR = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
};

const generateTicketNumber = (airline) => {
  const airlineCodes = {
    'American Airlines': '001',
    'Delta Air Lines': '006',
    'United Airlines': '016',
    'Lufthansa': '220',
    'British Airways': '125',
    'Emirates': '176',
    'Qatar Airways': '157',
    'Air France': '057',
    'KLM': '074',
    'Air Canada': '014'
  };
  const airlineCode = airlineCodes[airline] || '001';
  const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
  return `${airlineCode}${randomDigits}`;
};

const formatDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate duration from departure and arrival times
const calculateDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return 'N/A';
  
  try {
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
    
    let totalMinutes = (arrHours * 60 + arrMinutes) - (depHours * 60 + depMinutes);
    
    // Handle overnight flights
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  } catch (error) {
    return 'N/A';
  }
};

// Layout constants for consistent spacing
const LAYOUT = {
  MARGIN: 40,
  SECTION_SPACING: 20,
  BOX_SPACING: 15,
  LINE_HEIGHT: 15,
  SMALL_SPACING: 5,
  FOOTER_HEIGHT: 60
};

// Fare type mapping
const fareTypeMapping = {
  'SAVER': 'Saver Fare',
  'REGULAR': 'Regular Fare',
  'FLEXIBLE': 'Flexible Fare',
  'REFUNDABLE': 'Fully Refundable Fare',
  'PROMO': 'Promotional Fare',
  'NON_REFUNDABLE': 'Non-Refundable Fare',
  'CORPORATE': 'Corporate Fare',
  'STUDENT': 'Student Fare'
};

// Section rendering functions
const renderHeader = (doc, data) => {
  // Blue header background
  doc.rect(0, 0, doc.page.width, 60)
     .fill('#1E3A8A');
  
  // Airline name
  doc.fillColor('#FFFFFF')
     .fontSize(24)
     .font('Helvetica-Bold')
     .text(`${data.airline.toUpperCase()}`, LAYOUT.MARGIN, 20);
  
  // Document title
  doc.fontSize(16)
     .text('ELECTRONIC TICKET RECEIPT', LAYOUT.MARGIN, 45);
  
  // Issuer in top right
  doc.fontSize(10)
     .font('Helvetica-Bold')
     .text('ISSUED BY FAREBUZZER', 
           doc.page.width - LAYOUT.MARGIN - 120, 
           25, 
           { width: 120, align: 'right' });
  
  doc.moveDown(3);
  return doc.y;
};

const renderTicketInfo = (doc, data, pnr, ticketNumber) => {
  const boxY = doc.y;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 60;
  
  // Info box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .fill('#F0F9FF')
     .stroke('#3B82F6');
  
  // Column headers
  doc.fillColor('#1E40AF')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('PASSENGER NAME', LAYOUT.MARGIN + 10, boxY + 10)
     .text('BOOKING REFERENCE', LAYOUT.MARGIN + 210, boxY + 10)
     .text('TICKET NUMBER', LAYOUT.MARGIN + 410, boxY + 10);
  
  // Column values
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(12)
     .text(data.customerName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25)
     .text(pnr, LAYOUT.MARGIN + 210, boxY + 25)
     .text(ticketNumber, LAYOUT.MARGIN + 410, boxY + 25);
  
  // Status row headers
  doc.fillColor('#1E40AF')
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('ISSUED DATE', LAYOUT.MARGIN + 10, boxY + 40)
     .text('ISSUED BY', LAYOUT.MARGIN + 210, boxY + 40)
     .text('STATUS', LAYOUT.MARGIN + 410, boxY + 40);
  
  // Status row values
  const issuedDate = formatDate();
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(11)
     .text(issuedDate, LAYOUT.MARGIN + 10, boxY + 55)
     .text(data.chargeReference || 'FAREBUZZER TRAVEL', LAYOUT.MARGIN + 210, boxY + 55);
  
  doc.fillColor('#059669')
     .font('Helvetica-Bold')
     .fontSize(12)
     .text('CONFIRMED ✓', LAYOUT.MARGIN + 410, boxY + 55);
  
  doc.moveDown(2);
  return doc.y;
};

const renderPassengerDetails = (doc, data) => {
  const sectionTitleY = doc.y;
  
  // Section title
  doc.fillColor('#1E3A8A')
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('PASSENGER DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
  const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 90;
  
  // Passenger box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .stroke('#E5E7EB');
  
  // Column headers
  doc.fillColor('#374151')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('NAME', LAYOUT.MARGIN + 10, boxY + 10)
     .text('CONTACT INFORMATION', LAYOUT.MARGIN + 210, boxY + 10)
     .text('FARE TYPE', LAYOUT.MARGIN + 410, boxY + 10);
  
  // Passenger name
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(12)
     .text(data.customerName, LAYOUT.MARGIN + 10, boxY + 25);
  
  // Contact information
  doc.fontSize(10)
     .text(`Email: ${data.billingEmail}`, LAYOUT.MARGIN + 210, boxY + 25)
     .text(`Phone: ${data.customerPhone}`, LAYOUT.MARGIN + 210, boxY + 40);
  
  // Fare type - use provided fare type or default
  const fareType = data.fareType || 'REGULAR';
  const fareTypeDisplay = fareTypeMapping[fareType] || fareType;
  doc.fontSize(12)
     .text(fareTypeDisplay, LAYOUT.MARGIN + 410, boxY + 25);
  
  doc.moveDown(3);
  return doc.y;
};



// const renderFlightDetails = (doc, data) => {
//   // Check if we need a new page
//   const requiredHeight = 180;
//   if (doc.y + requiredHeight > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//   }
  
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('FLIGHT DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 150;
  
//   // Flight info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#FEF3C7')
//      .stroke('#F59E0B');
  
//   // Flight header row
//   doc.fillColor('#92400E')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('FLIGHT', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('DEPARTURE', LAYOUT.MARGIN + 110, boxY + 10)
//      .text('ARRIVAL', LAYOUT.MARGIN + 260, boxY + 10)
//      .text('DURATION', LAYOUT.MARGIN + 360, boxY + 10)
//      .text('CLASS', LAYOUT.MARGIN + 440, boxY + 10);
  
//   const flightRowY = boxY + 30;
  
//   // Calculate duration automatically
//   const duration = calculateDuration(data.departureTime, data.arrivalTime);
//     // Add baggage information
//   const baggageInfoY = flightRowY + 75;
//   if (data.checkInBaggage || data.carryOnBaggage) {
//     doc.fillColor('#92400E')
//        .fontSize(10)
//        .font('Helvetica-Bold')
//        .text('BAGGAGE ALLOWANCE', LAYOUT.MARGIN + 110, baggageInfoY);

//   // Flight data
//   doc.fillColor('#000000')
//      .fontSize(12)
//      .font('Helvetica')

//           .text(`${data.carryOnBaggage || '7 kg'} carry-on`, LAYOUT.MARGIN + 110, baggageInfoY + 12)
//        .text(`${data.checkInBaggage || 'As per fare'} checked`, LAYOUT.MARGIN + 110, baggageInfoY + 24)
//      .text(data.flightNumber || `${data.airlineCode || 'AA'} ${Math.floor(Math.random() * 9000 + 1000)}`, LAYOUT.MARGIN + 10, flightRowY)
//      .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 110, flightRowY)
//      .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 260, flightRowY)
//      .text(duration, LAYOUT.MARGIN + 360, flightRowY)
//      .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 440, flightRowY);
  
//   // Departure details
//   doc.fillColor('#6B7280')
//      .fontSize(10)
//      .font('Helvetica-Oblique')
//      .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 110, flightRowY + 15)
//      .text(`Time: ${data.departureTime || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 30)
//      .text(`Terminal: ${data.departureTerminal || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 45)
//      .text(`Gate: To be announced`, LAYOUT.MARGIN + 110, flightRowY + 60);
  
//   // Arrival details
//   doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 260, flightRowY + 15)
//      .text(`Time: ${data.arrivalTime || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 30)
//      .text(`Terminal: ${data.arrivalTerminal || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 45)
//      .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 260, flightRowY + 60);

//   doc.moveDown(4);
//   return doc.y;
// };



const renderFlightDetails = (doc, data) => {
  // Check if we need a new page
  const requiredHeight = 180;
  if (doc.y + requiredHeight > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
    doc.addPage();
  }
  
  const sectionTitleY = doc.y;
  
  // Section title
  doc.fillColor('#1E3A8A')
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('FLIGHT DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
  const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 150;
  
  // Flight info box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .fill('#FEF3C7')
     .stroke('#F59E0B');
  
  // Flight header row
  doc.fillColor('#92400E')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('FLIGHT', LAYOUT.MARGIN + 10, boxY + 10)
     .text('DEPARTURE', LAYOUT.MARGIN + 110, boxY + 10)
     .text('ARRIVAL', LAYOUT.MARGIN + 260, boxY + 10)
     .text('DURATION', LAYOUT.MARGIN + 360, boxY + 10)
     .text('CLASS', LAYOUT.MARGIN + 440, boxY + 10);
  
  const flightRowY = boxY + 30;
  
  // Calculate duration automatically
  const duration = calculateDuration(data.departureTime, data.arrivalTime);
  
  // Flight data
  doc.fillColor('#000000')
     .fontSize(12)
     .font('Helvetica')
     .text(data.flightNumber || `${data.airlineCode || 'AA'} ${Math.floor(Math.random() * 9000 + 1000)}`, LAYOUT.MARGIN + 10, flightRowY)
     .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 110, flightRowY)
     .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 260, flightRowY)
     .text(duration, LAYOUT.MARGIN + 360, flightRowY)
     .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 440, flightRowY);
  
  // Departure details
  doc.fillColor('#6B7280')
     .fontSize(10)
     .font('Helvetica-Oblique')
     .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 110, flightRowY + 15)
     .text(`Time: ${data.departureTime || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 30)
     .text(`Terminal: ${data.departureTerminal || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 45)
     .text(`Gate: To be announced`, LAYOUT.MARGIN + 110, flightRowY + 60);
  
  // Arrival details
  doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 260, flightRowY + 15)
     .text(`Time: ${data.arrivalTime || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 30)
     .text(`Terminal: ${data.arrivalTerminal || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 45)
     .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 260, flightRowY + 60);
  
  // Add baggage information
  const baggageInfoY = flightRowY + 75;
  if (data.checkInBaggage || data.carryOnBaggage) {
    doc.fillColor('#92400E')
       .fontSize(10)
       .font('Helvetica-Bold')
       .text('BAGGAGE ALLOWANCE', LAYOUT.MARGIN + 110, baggageInfoY);
    
    doc.fillColor('#000000')
       .fontSize(9)
       .font('Helvetica')
       .text(`${data.carryOnBaggage || '7 kg'} carry-on`, LAYOUT.MARGIN + 110, baggageInfoY + 12)
       .text(`${data.checkInBaggage || 'As per fare'} checked`, LAYOUT.MARGIN + 110, baggageInfoY + 24);
  }

  doc.moveDown(4);
  return doc.y;
};



// const renderImportantInfo = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Check if we need a new page
//   if (sectionTitleY + 120 > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//     doc.y = LAYOUT.MARGIN;
//   }
  
//   // Section title
//   doc.fillColor('#DC2626')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('IMPORTANT INFORMATION', LAYOUT.MARGIN, sectionTitleY);
  
//   const listY = sectionTitleY + LAYOUT.SECTION_SPACING;
//    // Get baggage information
//   const checkInBaggageText = data.checkInBaggage ? `Check-in: ${data.checkInBaggage}` : "Check-in: As per fare";
//   const carryOnBaggageText = data.carryOnBaggage ? `Carry-on: ${data.carryOnBaggage}` : "Carry-on: Up to 7 kg + 1 personal item";
//   // Information list
//   doc.fillColor('#000000')
//      .fontSize(9)
//      .font('Helvetica')
//      .list([
//        `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
//       //  `Baggage allowance: 1 carry-on (max 7kg) + 1 personal item`,
//    `Baggage allowance: ${carryOnBaggageText}, ${checkInBaggageText}`,
// `Cabin Baggage (Carry-on): Up to 7 kg (1 bag) + 1 personal item`,
// ` Checked Baggage: As per fare (0 kg / 15 kg / 1 piece / 2 pieces)`,
//        `Boarding begins 2 hours before departure`,
//        `Government-issued photo ID required for all passengers`,
//        `Electronic ticket - No physical ticket required`,
//        `Changes/Cancellations: Fees apply. Visit airline website for details`
//      ], LAYOUT.MARGIN, listY, {
//        bulletRadius: 2,
//        indent: 20,
//        textIndent: 10,
//        lineGap: LAYOUT.SMALL_SPACING
//      });
  
//   doc.moveDown(3);
//   return doc.y;
// };



const renderImportantInfo = (doc, data) => {
  const sectionTitleY = doc.y;
  
  // Check if we need a new page
  if (sectionTitleY + 120 > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
    doc.addPage();
    doc.y = LAYOUT.MARGIN;
  }
  
  // Section title
  doc.fillColor('#DC2626')
     .fontSize(14)
     .font('Helvetica-Bold')
     .text('IMPORTANT INFORMATION', LAYOUT.MARGIN, sectionTitleY);
  
  const listY = sectionTitleY + LAYOUT.SECTION_SPACING;
  
  // Information list
  doc.fillColor('#000000')
     .fontSize(9)
     .font('Helvetica')
     .list([
       `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
       `Boarding begins 2 hours before departure`,
       `Government-issued photo ID required for all passengers`,
       `Electronic ticket - No physical ticket required`,
       `Changes/Cancellations: Fees apply. Visit airline website for details`
     ], LAYOUT.MARGIN, listY, {
       bulletRadius: 2,
       indent: 20,
       textIndent: 10,
       lineGap: LAYOUT.SMALL_SPACING
     });
  
  doc.moveDown(3);
  return doc.y;
};


const renderPaymentSummary = (doc, data) => {
  const boxY = doc.y;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 100;
  
  // Payment box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .fill('#F3F4F6')
     .stroke('#9CA3AF');
  
  // Section title
  doc.fillColor('#1F2937')
     .fontSize(14)
     .font('Helvetica-Bold')
     .text('PAYMENT SUMMARY', LAYOUT.MARGIN + 10, boxY + 15);
  
  // Column headers
  doc.fillColor('#4B5563')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('DESCRIPTION', LAYOUT.MARGIN + 10, boxY + 35)
     .text('AMOUNT (USD)', LAYOUT.MARGIN + 360, boxY + 35);
  
  // Line items
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(11)
     .text('Base Fare', LAYOUT.MARGIN + 10, boxY + 50)
     .text(`$${Number(data.bookingAmount * 0.7).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 50)
     .text('Taxes & Fees', LAYOUT.MARGIN + 10, boxY + 65)
     .text(`$${Number(data.bookingAmount * 0.3).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 65);
  
  // Divider line
  doc.moveTo(LAYOUT.MARGIN + 340, boxY + 80)
     .lineTo(LAYOUT.MARGIN + 460, boxY + 80)
     .stroke('#000000', 0.5);
  
  // Total
  doc.fillColor('#1E3A8A')
     .fontSize(12)
     .font('Helvetica-Bold')
     .text('TOTAL PAID', LAYOUT.MARGIN + 10, boxY + 85)
     .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 85);
  
  // Payment details
  // const issuedDate = formatDate();
  
  // doc.fillColor('#6B7280')
  //    .fontSize(8)
  //    .text(`Charged to card ending in xxxx • ${issuedDate}`, 
  //          LAYOUT.MARGIN + 10, 
  //          boxY + 105);


  // Payment details
const issuedDate = formatDate();
// Get cardLastFour from the data, or show "xxxx" if not provided
const cardLastFour = data.cardLastFour || "xxxx";

doc.fillColor('#6B7280')
   .fontSize(8)
   .text(`Charged to card ending in ${cardLastFour} • ${issuedDate}`, 
         LAYOUT.MARGIN + 10, 
         boxY + 105);
  
  return boxY + boxHeight + LAYOUT.SECTION_SPACING;
};

const renderBarcodeAndQR = async (doc, pnr, ticketNumber, yPosition) => {
  // Generate QR code
  const qrData = `PNR:${pnr} TICKET:${ticketNumber}`;
  const qrImage = await QRCode.toDataURL(qrData);
  
  // QR Code
  await doc.image(qrImage, 
                  doc.page.width - LAYOUT.MARGIN - 100, 
                  yPosition, 
                  { width: 100, height: 100 });
  
  // Barcode area
  doc.rect(LAYOUT.MARGIN, yPosition, 300, 40)
     .stroke('#000000');
  
  // Barcode text
  doc.fillColor('#000000')
     .fontSize(8)
     .text(`PNR: ${pnr} | TICKET: ${ticketNumber}`, 
           LAYOUT.MARGIN + 5, 
           yPosition + 15);
  
  return yPosition + 50;
};

const renderFooter = (doc) => {
  const footerY = doc.page.height - LAYOUT.FOOTER_HEIGHT;
  
  doc
    .fillColor('#6B7280')
    .fontSize(7)
    .text(
      'This document is valid for travel and must be presented with government-issued photo ID.\n' +
      'FareBuzzer Travel • enquiry@farebuzzertravel.com • 844 784 3676 • www.farebuzzertravel.com',


      // 'FareBuzzer Travel • support@farebuzzer.com • +1-800-123-4567 • www.farebuzzer.com',

      LAYOUT.MARGIN,
      footerY,
      {
        width: doc.page.width - (LAYOUT.MARGIN * 2),
        align: 'center',
        lineGap: 2
      }
    );
};

export const generateETicket = async (data) => {
  if (!data.confirmationNumber) {
    throw new Error("confirmationNumber missing for ticket generation");
  }

  // Use the provided confirmationNumber as PNR
  const pnr = data.confirmationNumber;
  
  // Use provided ticket number or generate one
  const ticketNumber = data.ticketNumber || generateTicketNumber(data.airline);

  const filePath = path.join(
    os.tmpdir(),
    `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
  );

  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: "A4", 
        margin: LAYOUT.MARGIN,
        info: {
          Title: `E-Ticket ${data.confirmationNumber}`,
          Author: 'FareBuzzer Travel',
          Subject: 'Electronic Flight Ticket'
        }
      });
      
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Render sections in sequence
      renderHeader(doc, data);
      renderTicketInfo(doc, data, pnr, ticketNumber);
      renderPassengerDetails(doc, data);
      renderFlightDetails(doc, data);
      renderImportantInfo(doc, data);
      const paymentEndY = renderPaymentSummary(doc, data);
      await renderBarcodeAndQR(doc, pnr, ticketNumber, paymentEndY);
      renderFooter(doc);

      doc.end();
      
      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
};

*/

//================10 feb======================



import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import os from "os";
import QRCode from "qrcode";


// Add this utility function at the top// Add a utility function for calculating connection time (optional):
const formatConnectionTime = (minutes) => {
  if (!minutes) return 'N/A';
  
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
};


// Utility functions
const generatePNR = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
};

const generateTicketNumber = (airline) => {
  const airlineCodes = {
    'American Airlines': '001',
    'Delta Air Lines': '006',
    'United Airlines': '016',
    'Lufthansa': '220',
    'British Airways': '125',
    'Emirates': '176',
    'Qatar Airways': '157',
    'Air France': '057',
    'KLM': '074',
    'Air Canada': '014'
  };
  const airlineCode = airlineCodes[airline] || '001';
  const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
  return `${airlineCode}${randomDigits}`;
};

const formatDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate duration from departure and arrival times
const calculateDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return 'N/A';
  
  try {
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
    
    let totalMinutes = (arrHours * 60 + arrMinutes) - (depHours * 60 + depMinutes);
    
    // Handle overnight flights
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  } catch (error) {
    return 'N/A';
  }
};

// Layout constants for consistent spacing
// const LAYOUT = {
//   MARGIN: 40,
//   SECTION_SPACING: 20,
//   BOX_SPACING: 15,
//   LINE_HEIGHT: 15,
//   SMALL_SPACING: 5,
//   FOOTER_HEIGHT: 60
// };

// Update LAYOUT constants to give more vertical space
const LAYOUT = {
  MARGIN: 40,
  SECTION_SPACING: 20,
  BOX_SPACING: 15,
  LINE_HEIGHT: 18, // Increased from 15
  SMALL_SPACING: 5,
  FOOTER_HEIGHT: 60,
  NAME_LINE_HEIGHT: 14 // Added for name spacing
};

// Fare type mapping
const fareTypeMapping = {
  'SAVER': 'Saver Fare',
  'REGULAR': 'Regular Fare',
  'FLEXIBLE': 'Flexible Fare',
  'REFUNDABLE': 'Fully Refundable Fare',
  'PROMO': 'Promotional Fare',
  'NON_REFUNDABLE': 'Non-Refundable Fare',
  'CORPORATE': 'Corporate Fare',
  'STUDENT': 'Student Fare'
};

// Section rendering functions
const renderHeader = (doc, data) => {
  // Blue header background
  doc.rect(0, 0, doc.page.width, 60)
     .fill('#1E3A8A');
  
  // Airline name
  doc.fillColor('#FFFFFF')
     .fontSize(24)
     .font('Helvetica-Bold')
     .text(`${data.airline.toUpperCase()}`, LAYOUT.MARGIN, 20);
  
  // Document title
  doc.fontSize(16)
     .text('ELECTRONIC TICKET RECEIPT', LAYOUT.MARGIN, 45);
  
  // Issuer in top right
  doc.fontSize(10)
     .font('Helvetica-Bold')
     .text('ISSUED BY FAREBUZZER', 
           doc.page.width - LAYOUT.MARGIN - 120, 
           25, 
           { width: 120, align: 'right' });
  
  doc.moveDown(3);
  return doc.y;
};

// const renderTicketInfo = (doc, data, pnr, ticketNumber) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 60;
  
//   // Info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F0F9FF')
//      .stroke('#3B82F6');
  
//   // Column headers
//   doc.fillColor('#1E40AF')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('PASSENGER NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('BOOKING REFERENCE', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('TICKET NUMBER', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Build full name for ticket header
//   const prefixMap = {
//     'mr': 'Mr.',
//     'mrs': 'Mrs.',
//     'miss': 'Miss',
//     'master': 'Master'
//   };
  
//   const prefix = data.customerPrefix ? prefixMap[data.customerPrefix.toLowerCase()] || '' : '';
//   let ticketFullName = '';
  
//   if (prefix) ticketFullName += `${prefix} `;
//   if (data.customerFirstName) ticketFullName += `${data.customerFirstName} `;
//   if (data.customerMiddleName) ticketFullName += `${data.customerMiddleName} `;
//   if (data.customerLastName) ticketFullName += data.customerLastName;
  
//   // If no breakdown provided, use the original customerName
//   if (!ticketFullName.trim() && data.customerName) {
//     ticketFullName = data.customerName;
//   }
  
//   // Column values
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(ticketFullName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25)
//      .text(pnr, LAYOUT.MARGIN + 210, boxY + 25)
//      // Show "UNTICKETED" when no ticket number
//      .text(ticketNumber || 'UNTICKETED', LAYOUT.MARGIN + 410, boxY + 25);
  
//   // Status row headers
//   doc.fillColor('#1E40AF')
//      .font('Helvetica-Bold')
//      .fontSize(11)
//      .text('ISSUED DATE', LAYOUT.MARGIN + 10, boxY + 40)
//      .text('ISSUED BY', LAYOUT.MARGIN + 210, boxY + 40)
//      .text('STATUS', LAYOUT.MARGIN + 410, boxY + 40);
  
//   // Status row values
//   const issuedDate = formatDate();
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text(issuedDate, LAYOUT.MARGIN + 10, boxY + 55)
//      .text(data.chargeReference || 'FAREBUZZER TRAVEL', LAYOUT.MARGIN + 210, boxY + 55);
  
//   // If no ticket number, show different status
//   if (!data.ticketNumber) {
//     doc.fillColor('#F59E0B') // Orange for pending
//        .font('Helvetica-Bold')
//        .fontSize(12)
//        .text('PENDING TICKET ISSUE', LAYOUT.MARGIN + 410, boxY + 55);
//   } else {
//     doc.fillColor('#059669') // Green for confirmed
//        .font('Helvetica-Bold')
//        .fontSize(12)
//        .text('CONFIRMED ✓', LAYOUT.MARGIN + 410, boxY + 55);
//   }
  
//   doc.moveDown(2);
//   return doc.y;
// };

// const renderPassengerDetails = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('PASSENGER DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 110; // Increased height for additional details
  
//   // Passenger box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .stroke('#E5E7EB');
  
//   // Column headers
//   doc.fillColor('#374151')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('NAME & PERSONAL DETAILS', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('CONTACT INFORMATION', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('FARE TYPE', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Build full name with prefix
//   const prefixMap = {
//     'mr': 'Mr.',
//     'mrs': 'Mrs.',
//     'miss': 'Miss',
//     'master': 'Master'
//   };
  
//   const prefix = data.customerPrefix ? prefixMap[data.customerPrefix.toLowerCase()] || '' : '';
  
//   // Create full name from parts
//   let fullName = '';
//   if (prefix) fullName += `${prefix} `;
//   if (data.customerFirstName) fullName += `${data.customerFirstName} `;
//   if (data.customerMiddleName) fullName += `${data.customerMiddleName} `;
//   if (data.customerLastName) fullName += data.customerLastName;
  
//   // If no breakdown provided, use the original customerName
//   if (!fullName.trim() && data.customerName) {
//     fullName = data.customerName;
//   }
  
//   // Passenger name
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(fullName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25);
  
//   // Additional personal details
//   const detailsY = boxY + 40;
//   if (data.customerDOB || data.customerGender) {
//     doc.fontSize(9)
//        .fillColor('#6B7280');
    
//     let detailLine = '';
//     if (data.customerDOB) {
//       detailLine += `DOB: ${data.customerDOB}`;
//     }
//     if (data.customerGender) {
//       if (detailLine) detailLine += ' | ';
//       detailLine += `Gender: ${data.customerGender}`;
//     }
    
//     if (detailLine) {
//       doc.text(detailLine, LAYOUT.MARGIN + 10, detailsY);
//     }
//   }
  
//   // Contact information
//   const contactY = boxY + 25;
//   doc.fillColor('#000000')
//      .fontSize(10)
//      .text(`Email: ${data.billingEmail}`, LAYOUT.MARGIN + 210, contactY)
//      .text(`Phone: ${data.customerPhone}`, LAYOUT.MARGIN + 210, contactY + 15);
  
//   // Fare type - use provided fare type or default
//   const fareType = data.fareType || 'REGULAR';
//   const fareTypeDisplay = fareTypeMapping[fareType] || fareType;
//   doc.fontSize(12)
//      .fillColor('#000000')
//      .text(fareTypeDisplay, LAYOUT.MARGIN + 410, boxY + 25);
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderTicketInfo = (doc, data, pnr, ticketNumber) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 60;
  
//   // Info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F0F9FF')
//      .stroke('#3B82F6');
  
//   // Column headers
//   doc.fillColor('#1E40AF')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('PASSENGER NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('BOOKING REFERENCE', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('TICKET NUMBER', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Build full name for ticket header - FIXED VERSION
//   const prefixMap = {
//     'mr': 'Mr.',
//     'mrs': 'Mrs.',
//     'miss': 'Miss',
//     'master': 'Master'
//   };
  
//   const prefix = data.customerPrefix ? prefixMap[data.customerPrefix.toLowerCase()] || '' : '';
//   let ticketFullName = '';
  
//   // Try individual parts first
//   if (data.customerFirstName || data.customerLastName) {
//     if (prefix) ticketFullName += `${prefix} `;
//     if (data.customerFirstName) ticketFullName += `${data.customerFirstName} `;
//     if (data.customerMiddleName) ticketFullName += `${data.customerMiddleName} `;
//     if (data.customerLastName) ticketFullName += data.customerLastName;
//   } 
//   // Fallback to combined name
//   else if (data.customerName) {
//     ticketFullName = data.customerName;
//   }
//   // Last resort
//   else {
//     ticketFullName = "PASSENGER NAME";
//   }
  
//   ticketFullName = ticketFullName.trim();
  
//   // Column values
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(ticketFullName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25, {
//        width: 180
//      })
//      .text(pnr, LAYOUT.MARGIN + 210, boxY + 25)
//      .text(ticketNumber || 'UNTICKETED', LAYOUT.MARGIN + 410, boxY + 25);
  
//   // Status row headers
//   doc.fillColor('#1E40AF')
//      .font('Helvetica-Bold')
//      .fontSize(11)
//      .text('ISSUED DATE', LAYOUT.MARGIN + 10, boxY + 40)
//      .text('ISSUED BY', LAYOUT.MARGIN + 210, boxY + 40)
//      .text('STATUS', LAYOUT.MARGIN + 410, boxY + 40);
  
//   // Status row values
//   const issuedDate = formatDate();
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text(issuedDate, LAYOUT.MARGIN + 10, boxY + 55)
//      .text(data.chargeReference || 'FAREBUZZER TRAVEL', LAYOUT.MARGIN + 210, boxY + 55);
  
//   // If no ticket number, show different status
//   if (!data.ticketNumber) {
//     doc.fillColor('#F59E0B')
//        .font('Helvetica-Bold')
//        .fontSize(12)
//        .text('PENDING TICKET ISSUE', LAYOUT.MARGIN + 410, boxY + 55);
//   } else {
//     doc.fillColor('#059669')
//        .font('Helvetica-Bold')
//        .fontSize(12)
//        .text('CONFIRMED ✓', LAYOUT.MARGIN + 410, boxY + 55);
//   }
  
//   doc.moveDown(2);
//   return doc.y;
// };

const renderTicketInfo = (doc, data, pnr, ticketNumber) => {
  const boxY = doc.y;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 70; // Increased from 60 to 70
  
  // Info box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .fill('#F0F9FF')
     .stroke('#3B82F6');
  
  // Column headers
  doc.fillColor('#1E40AF')
     .fontSize(10) // Reduced from 11
     .font('Helvetica-Bold')
     .text('PASSENGER NAME', LAYOUT.MARGIN + 10, boxY + 10)
     .text('BOOKING REFERENCE', LAYOUT.MARGIN + 210, boxY + 10)
     .text('TICKET NUMBER', LAYOUT.MARGIN + 410, boxY + 10);
  
  // Build full name for ticket header
  const prefixMap = {
    'mr': 'Mr.',
    'mrs': 'Mrs.',
    'miss': 'Miss',
    'master': 'Master'
  };
  
  const prefix = data.customerPrefix ? prefixMap[data.customerPrefix.toLowerCase()] || '' : '';
  let ticketFullName = '';
  
  // Try individual parts first
  if (data.customerFirstName || data.customerLastName) {
    if (prefix) ticketFullName += `${prefix} `;
    if (data.customerFirstName) ticketFullName += `${data.customerFirstName} `;
    if (data.customerMiddleName) ticketFullName += `${data.customerMiddleName} `;
    if (data.customerLastName) ticketFullName += data.customerLastName;
  } 
  // Fallback to combined name
  else if (data.customerName) {
    ticketFullName = data.customerName;
  }
  // Last resort
  else {
    ticketFullName = "PASSENGER NAME";
  }
  
  ticketFullName = ticketFullName.trim();
  
  // Passenger name with auto-wrap
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(11) // Reduced from 12
     .text(ticketFullName.toUpperCase(), 
           LAYOUT.MARGIN + 10, 
           boxY + 25, 
           {
             width: 180,
             height: 30, // Give height for wrapping
             align: 'left',
             lineGap: 3
           });
  
  // Booking reference
  doc.fontSize(12)
     .text(pnr, LAYOUT.MARGIN + 210, boxY + 25);
  
  // Ticket number
  doc.text(ticketNumber || 'UNTICKETED', LAYOUT.MARGIN + 410, boxY + 25);
  
  // Status row headers
  doc.fillColor('#1E40AF')
     .font('Helvetica-Bold')
     .fontSize(10)
     .text('ISSUED DATE', LAYOUT.MARGIN + 10, boxY + 50)
     .text('ISSUED BY', LAYOUT.MARGIN + 210, boxY + 50)
     .text('STATUS', LAYOUT.MARGIN + 410, boxY + 50);
  
  // Status row values
  const issuedDate = formatDate();
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(10)
     .text(issuedDate, LAYOUT.MARGIN + 10, boxY + 63)
     .text(data.chargeReference || 'FAREBUZZER TRAVEL', LAYOUT.MARGIN + 210, boxY + 63);
  
  // If no ticket number, show different status
  if (!data.ticketNumber) {
    doc.fillColor('#F59E0B')
       .font('Helvetica-Bold')
       .fontSize(11)
       .text('PENDING TICKET ISSUE', LAYOUT.MARGIN + 410, boxY + 63);
  } else {
    doc.fillColor('#059669')
       .font('Helvetica-Bold')
       .fontSize(11)
       .text('CONFIRMED ✓', LAYOUT.MARGIN + 410, boxY + 63);
  }
  
  doc.moveDown(2);
  return doc.y;
};


// const renderPassengerDetails = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('PASSENGER DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 110;
  
//   // Passenger box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .stroke('#E5E7EB');
  
//   // Column headers
//   doc.fillColor('#374151')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('NAME & PERSONAL DETAILS', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('CONTACT INFORMATION', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('FARE TYPE', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Build full name with prefix - FIXED VERSION
//   const prefixMap = {
//     'mr': 'Mr.',
//     'mrs': 'Mrs.',
//     'miss': 'Miss',
//     'master': 'Master'
//   };
  
//   const prefix = data.customerPrefix ? prefixMap[data.customerPrefix.toLowerCase()] || '' : '';
  
//   // Create full name from parts with better handling
//   let fullName = '';
  
//   // Try to build from individual parts first
//   if (data.customerFirstName || data.customerLastName) {
//     if (prefix) fullName += `${prefix} `;
//     if (data.customerFirstName) fullName += `${data.customerFirstName} `;
//     if (data.customerMiddleName) fullName += `${data.customerMiddleName} `;
//     if (data.customerLastName) fullName += data.customerLastName;
//   } 
//   // If no individual parts, try the combined name
//   else if (data.customerName) {
//     fullName = data.customerName;
//   }
//   // If nothing is provided, show a placeholder
//   else {
//     fullName = "PASSENGER NAME NOT PROVIDED";
//   }
  
//   // Trim any extra spaces
//   fullName = fullName.trim();
  
//   // Passenger name
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(fullName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25, {
//        width: 180, // Limit width to prevent overflow
//        ellipsis: true // Add ellipsis if too long
//      });
  
//   // Additional personal details
//   const detailsY = boxY + 40;
//   doc.fontSize(9)
//      .fillColor('#6B7280');
  
//   let detailLine = '';
//   if (data.customerDOB) {
//     detailLine += `DOB: ${data.customerDOB}`;
//   }
//   if (data.customerGender) {
//     if (detailLine) detailLine += ' | ';
//     detailLine += `Gender: ${data.customerGender}`;
//   }
  
//   if (detailLine) {
//     doc.text(detailLine, LAYOUT.MARGIN + 10, detailsY);
//   }
  
//   // Contact information - with better validation
//   const contactY = boxY + 25;
//   doc.fillColor('#000000')
//      .fontSize(10);
  
//   // Email
//   if (data.billingEmail) {
//     doc.text(`Email: ${data.billingEmail}`, LAYOUT.MARGIN + 210, contactY);
//   } else {
//     doc.text(`Email: Not provided`, LAYOUT.MARGIN + 210, contactY);
//   }
  
//   // Phone
//   if (data.customerPhone) {
//     doc.text(`Phone: ${data.customerPhone}`, LAYOUT.MARGIN + 210, contactY + 15);
//   } else {
//     doc.text(`Phone: Not provided`, LAYOUT.MARGIN + 210, contactY + 15);
//   }
  
//   // Fare type - use provided fare type or default
//   const fareType = data.fareType || 'REGULAR';
//   const fareTypeDisplay = fareTypeMapping[fareType] || fareType;
//   doc.fontSize(12)
//      .fillColor('#000000')
//      .text(fareTypeDisplay, LAYOUT.MARGIN + 410, boxY + 25, {
//        width: 150
//      });
  
//   doc.moveDown(3);
//   return doc.y;
// };


const renderPassengerDetails = (doc, data) => {
  const sectionTitleY = doc.y;
  
  // Section title
  doc.fillColor('#1E3A8A')
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('PASSENGER DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
  const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 120; // Increased from 110 to 120
  
  // Passenger box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .stroke('#E5E7EB');
  
  // Column headers
  doc.fillColor('#374151')
     .fontSize(10) // Reduced from 11
     .font('Helvetica-Bold')
     .text('NAME & PERSONAL DETAILS', LAYOUT.MARGIN + 10, boxY + 10)
     .text('CONTACT INFORMATION', LAYOUT.MARGIN + 210, boxY + 10)
     .text('FARE TYPE', LAYOUT.MARGIN + 410, boxY + 10);
  
  // Build full name with prefix
  const prefixMap = {
    'mr': 'Mr.',
    'mrs': 'Mrs.',
    'miss': 'Miss',
    'master': 'Master'
  };
  
  const prefix = data.customerPrefix ? prefixMap[data.customerPrefix.toLowerCase()] || '' : '';
  
  // Create full name from parts with better handling
  let fullName = '';
  
  // Try to build from individual parts first
  if (data.customerFirstName || data.customerLastName) {
    if (prefix) fullName += `${prefix} `;
    if (data.customerFirstName) fullName += `${data.customerFirstName} `;
    if (data.customerMiddleName) fullName += `${data.customerMiddleName} `;
    if (data.customerLastName) fullName += data.customerLastName;
  } 
  // If no individual parts, try the combined name
  else if (data.customerName) {
    fullName = data.customerName;
  }
  // If nothing is provided, show a placeholder
  else {
    fullName = "PASSENGER NAME NOT PROVIDED";
  }
  
  // Trim any extra spaces
  fullName = fullName.trim();
  
  // Passenger name with better spacing
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(11) // Reduced from 12
     .text(fullName.toUpperCase(), 
           LAYOUT.MARGIN + 10, 
           boxY + 25, 
           {
             width: 180,
             height: 35, // Increased height for wrapping
             align: 'left',
             lineGap: 4
           });
  
  // Additional personal details - moved down
  const detailsY = boxY + 65; // Moved down from 40
  doc.fontSize(9)
     .fillColor('#6B7280');
  
  let detailLine = '';
  if (data.customerDOB) {
    detailLine += `DOB: ${data.customerDOB}`;
  }
  if (data.customerGender) {
    if (detailLine) detailLine += ' | ';
    detailLine += `Gender: ${data.customerGender}`;
  }
  
  if (detailLine) {
    doc.text(detailLine, LAYOUT.MARGIN + 10, detailsY, {
      width: 180
    });
  }
  
  // Contact information - with better positioning
  const contactY = boxY + 25;
  doc.fillColor('#000000')
     .fontSize(10)
     .text(`Email:`, LAYOUT.MARGIN + 210, contactY);
  
  // Email with wrapping
  if (data.billingEmail) {
    doc.fontSize(9)
       .text(data.billingEmail, 
             LAYOUT.MARGIN + 210, 
             contactY + 12, 
             { width: 180, lineGap: 2 });
  } else {
    doc.fontSize(9)
       .text('Not provided', LAYOUT.MARGIN + 210, contactY + 12);
  }
  
  // Phone
  doc.fontSize(10)
     .text(`Phone:`, LAYOUT.MARGIN + 210, contactY + 35);
  
  if (data.customerPhone) {
    doc.fontSize(9)
       .text(data.customerPhone, LAYOUT.MARGIN + 210, contactY + 47);
  } else {
    doc.fontSize(9)
       .text('Not provided', LAYOUT.MARGIN + 210, contactY + 47);
  }
  
  // Fare type - use provided fare type or default
  const fareType = data.fareType || 'REGULAR';
  const fareTypeDisplay = fareTypeMapping[fareType] || fareType;
  
  // Fare type with better positioning
  doc.fontSize(11)
     .fillColor('#000000')
     .text(fareTypeDisplay, 
           LAYOUT.MARGIN + 410, 
           boxY + 25, 
           { 
             width: 150,
             height: 35,
             align: 'left'
           });
  
  doc.moveDown(3);
  return doc.y;
};

// const renderFlightDetails = (doc, data) => {
//   // Check if we need a new page
//   const requiredHeight = 200; // Increased height
//   if (doc.y + requiredHeight > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//   }
  
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('FLIGHT DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 140; // Increased height
  
//   // Flight info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#FEF3C7')
//      .stroke('#F59E0B');
  
//   // Flight header row
//   doc.fillColor('#92400E')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('FLIGHT', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('DEPARTURE', LAYOUT.MARGIN + 100, boxY + 10)
//      .text('ARRIVAL', LAYOUT.MARGIN + 250, boxY + 10)
//      .text('DURATION', LAYOUT.MARGIN + 350, boxY + 10)
//      .text('CLASS', LAYOUT.MARGIN + 430, boxY + 10);
  
//   const flightRowY = boxY + 30;
  
//   // Calculate duration automatically
//   const duration = calculateDuration(data.departureTime, data.arrivalTime);
  
//   // Calculate connection/waiting time if provided
//   const connectionTime = data.connectionTime || 'N/A';
  
//   // Flight data
//   doc.fillColor('#000000')
//      .fontSize(12)
//      .font('Helvetica')
//      .text(data.flightNumber || `${data.airlineCode || 'AA'} ${Math.floor(Math.random() * 9000 + 1000)}`, LAYOUT.MARGIN + 10, flightRowY)
//      .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 100, flightRowY)
//      .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 250, flightRowY)
//      .text(duration, LAYOUT.MARGIN + 350, flightRowY)
//      .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 430, flightRowY);
  
//   // Departure details
//   doc.fillColor('#6B7280')
//      .fontSize(10)
//      .font('Helvetica-Oblique')
//      .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 100, flightRowY + 15)
//      .text(`Time: ${data.departureTime || 'To be announced'}`, LAYOUT.MARGIN + 100, flightRowY + 30)
//      .text(`Terminal: ${data.departureTerminal || 'To be announced'}`, LAYOUT.MARGIN + 100, flightRowY + 45)
//      .text(`Gate: To be announced`, LAYOUT.MARGIN + 100, flightRowY + 60);
  
//   // Arrival details
//   doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 250, flightRowY + 15)
//      .text(`Time: ${data.arrivalTime || 'To be announced'}`, LAYOUT.MARGIN + 250, flightRowY + 30)
//      .text(`Terminal: ${data.arrivalTerminal || 'To be announced'}`, LAYOUT.MARGIN + 250, flightRowY + 45)
//      .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 250, flightRowY + 60);
  
//   // Connection/Waiting Time
//   doc.fillColor('#92400E')
//      .fontSize(10)
//      .font('Helvetica-Bold')
//      .text('CONNECTION TIME:', LAYOUT.MARGIN + 350, flightRowY + 15);
  
//   doc.fillColor('#000000')
//      .fontSize(10)
//      .font('Helvetica')
//      .text(connectionTime, LAYOUT.MARGIN + 350, flightRowY + 30);
  
//   // Add baggage information
//   const baggageInfoY = flightRowY + 85;
//   if (data.checkInBaggage || data.carryOnBaggage) {
//     doc.fillColor('#92400E')
//        .fontSize(10)
//        .font('Helvetica-Bold')
//        .text('BAGGAGE ALLOWANCE', LAYOUT.MARGIN + 100, baggageInfoY);
    
//     doc.fillColor('#000000')
//        .fontSize(9)
//        .font('Helvetica')
//        .text(`${data.carryOnBaggage || '7 kg'} carry-on`, LAYOUT.MARGIN + 100, baggageInfoY + 12)
//        .text(`${data.checkInBaggage || 'As per fare'} checked`, LAYOUT.MARGIN + 100, baggageInfoY + 24);
//   }

//   doc.moveDown(4);
//   return doc.y;
// };


const renderFlightDetails = (doc, data) => {
  // Check if we need a new page
  const requiredHeight = 210; // Increased from 200
  if (doc.y + requiredHeight > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
    doc.addPage();
  }
  
  const sectionTitleY = doc.y;
  
  // Section title
  doc.fillColor('#1E3A8A')
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('FLIGHT DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
  const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 230; // Increased from 140
  
  // Flight info box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .fill('#FEF3C7')
     .stroke('#F59E0B');
  
  // Flight header row - adjust spacing
  doc.fillColor('#92400E')
     .fontSize(10) // Reduced from 11
     .font('Helvetica-Bold')
     .text('FLIGHT', LAYOUT.MARGIN + 10, boxY + 12)
     .text('DEPARTURE', LAYOUT.MARGIN + 100, boxY + 12)
     .text('ARRIVAL', LAYOUT.MARGIN + 250, boxY + 12)
     .text('DURATION', LAYOUT.MARGIN + 350, boxY + 12)
     .text('CLASS', LAYOUT.MARGIN + 430, boxY + 12);
  
  const flightRowY = boxY + 32; // Increased from 30
  
  // Calculate duration automatically
  const duration = calculateDuration(data.departureTime, data.arrivalTime);
  
  // Calculate connection/waiting time if provided
  const connectionTime = data.connectionTime || 'N/A';
  
  // Flight data - adjust font sizes
  doc.fillColor('#000000')
     .fontSize(11) // Reduced from 12
     .font('Helvetica')
     .text(data.flightNumber || `${data.airlineCode || 'AA'} ${Math.floor(Math.random() * 9000 + 1000)}`, 
           LAYOUT.MARGIN + 10, flightRowY)
     .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 100, flightRowY)
     .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 250, flightRowY)
     .text(duration, LAYOUT.MARGIN + 350, flightRowY)
     .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 430, flightRowY);
  
  // Departure details
  doc.fillColor('#6B7280')
     .fontSize(9) // Reduced from 10
     .font('Helvetica-Oblique')
     .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 100, flightRowY + 17) // Adjusted spacing
     .text(`Time: ${data.departureTime || 'To be announced'}`, LAYOUT.MARGIN + 100, flightRowY + 32)
     .text(`Terminal: ${data.departureTerminal || 'To be announced'}`, LAYOUT.MARGIN + 100, flightRowY + 47)
     .text(`Gate: To be announced`, LAYOUT.MARGIN + 100, flightRowY + 62);
  
  // Arrival details
  doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 250, flightRowY + 17)
     .text(`Time: ${data.arrivalTime || 'To be announced'}`, LAYOUT.MARGIN + 250, flightRowY + 32)
     .text(`Terminal: ${data.arrivalTerminal || 'To be announced'}`, LAYOUT.MARGIN + 250, flightRowY + 47)
     .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 250, flightRowY + 62);
  
  // Connection/Waiting Time
  doc.fillColor('#92400E')
     .fontSize(9) // Reduced from 10
     .font('Helvetica-Bold')
     .text('CONNECTION TIME:', LAYOUT.MARGIN + 350, flightRowY + 17);
  
  doc.fillColor('#000000')
     .fontSize(9) // Reduced from 10
     .font('Helvetica')
     .text(connectionTime, LAYOUT.MARGIN + 350, flightRowY + 32);
  
  // Add baggage information
  const baggageInfoY = flightRowY + 85;
  if (data.checkInBaggage || data.carryOnBaggage) {
    doc.fillColor('#92400E')
       .fontSize(9) // Reduced from 10
       .font('Helvetica-Bold')
       .text('BAGGAGE ALLOWANCE', LAYOUT.MARGIN + 100, baggageInfoY);
    
    doc.fillColor('#000000')
       .fontSize(8) // Reduced from 9
       .font('Helvetica')
       .text(`${data.carryOnBaggage || '7 kg'} carry-on`, LAYOUT.MARGIN + 100, baggageInfoY + 13)
       .text(`${data.checkInBaggage || 'As per fare'} checked`, LAYOUT.MARGIN + 100, baggageInfoY + 26);
  }

  doc.moveDown(4);
  return doc.y;
};


const renderImportantInfo = (doc, data) => {
  const sectionTitleY = doc.y;
  
  // Check if we need a new page
  if (sectionTitleY + 120 > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
    doc.addPage();
    doc.y = LAYOUT.MARGIN;
  }
  
  // Section title
  doc.fillColor('#DC2626')
     .fontSize(14)
     .font('Helvetica-Bold')
     .text('IMPORTANT INFORMATION', LAYOUT.MARGIN, sectionTitleY);
  
  const listY = sectionTitleY + LAYOUT.SECTION_SPACING;
  
  // Information list
  doc.fillColor('#000000')
     .fontSize(9)
     .font('Helvetica')
     .list([
       `Check-in opens 24 hours before departure and you can do the checkin on the airlines website (${data.airline})/mobile app`,
       `Boarding begins 2 hours before departure`,
       `Government-issued photo ID required for all passengers`,
       `Electronic ticket - No physical ticket required`,
       `Changes/Cancellations: Fees apply. Visit airline website for details`
     ], LAYOUT.MARGIN, listY, {
       bulletRadius: 2,
       indent: 20,
       textIndent: 10,
       lineGap: LAYOUT.SMALL_SPACING
     });
  
  doc.moveDown(3);
  return doc.y;
};

// const renderPaymentSummary = (doc, data) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 100;
  
//   // Payment box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F3F4F6')
//      .stroke('#9CA3AF');
  
//   // Section title
//   doc.fillColor('#1F2937')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('PAYMENT SUMMARY', LAYOUT.MARGIN + 10, boxY + 15);
  
//   // Column headers
//   doc.fillColor('#4B5563')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('DESCRIPTION', LAYOUT.MARGIN + 10, boxY + 35)
//      .text('AMOUNT (USD)', LAYOUT.MARGIN + 360, boxY + 35);
  
//   // Line items
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text('Base Fare', LAYOUT.MARGIN + 10, boxY + 50)
//      .text(`$${Number(data.bookingAmount * 0.7).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 50)
//      .text('Taxes & Fees', LAYOUT.MARGIN + 10, boxY + 65)
//      .text(`$${Number(data.bookingAmount * 0.3).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 65);
  
//   // Divider line
//   doc.moveTo(LAYOUT.MARGIN + 340, boxY + 80)
//      .lineTo(LAYOUT.MARGIN + 460, boxY + 80)
//      .stroke('#000000', 0.5);
  
//   // Total
//   doc.fillColor('#1E3A8A')
//      .fontSize(12)
//      .font('Helvetica-Bold')
//      .text('TOTAL PAID', LAYOUT.MARGIN + 10, boxY + 85)
//      .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 85);


//   // Payment details
// const issuedDate = formatDate();
// // Get cardLastFour from the data, or show "xxxx" if not provided
// const cardLastFour = data.cardLastFour || "xxxx";

// doc.fillColor('#6B7280')
//    .fontSize(8)
//    .text(`Charged to card ending in ${cardLastFour} • ${issuedDate}`, 
//          LAYOUT.MARGIN + 10, 
//          boxY + 105);
  
//   return boxY + boxHeight + LAYOUT.SECTION_SPACING;
// };


const renderPaymentSummary = (doc, data) => {
  const boxY = doc.y;
  const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
  const boxHeight = 110; // Increased from 100
  
  // Payment box
  doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
     .fill('#F3F4F6')
     .stroke('#9CA3AF');
  
  // Section title
  doc.fillColor('#1F2937')
     .fontSize(14)
     .font('Helvetica-Bold')
     .text('PAYMENT SUMMARY', LAYOUT.MARGIN + 10, boxY + 18); // Adjusted position
  
  // Column headers
  doc.fillColor('#4B5563')
     .fontSize(10) // Reduced from 11
     .font('Helvetica-Bold')
     .text('DESCRIPTION', LAYOUT.MARGIN + 10, boxY + 40) // Adjusted position
     .text('AMOUNT (USD)', LAYOUT.MARGIN + 360, boxY + 40);
  
  // Line items
  doc.fillColor('#000000')
     .font('Helvetica')
     .fontSize(10) // Reduced from 11
     .text('Base Fare', LAYOUT.MARGIN + 10, boxY + 55)
     .text(`$${Number(data.bookingAmount * 0.7).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 55)
     .text('Taxes & Fees', LAYOUT.MARGIN + 10, boxY + 70)
     .text(`$${Number(data.bookingAmount * 0.3).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 70);
  
  // Divider line
  doc.moveTo(LAYOUT.MARGIN + 340, boxY + 85)
     .lineTo(LAYOUT.MARGIN + 460, boxY + 85)
     .stroke('#000000', 0.5);
  
  // Total
  doc.fillColor('#1E3A8A')
     .fontSize(11) // Reduced from 12
     .font('Helvetica-Bold')
     .text('TOTAL PAID', LAYOUT.MARGIN + 10, boxY + 90)
     .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 90);

  // Payment details
  const issuedDate = formatDate();
  const cardLastFour = data.cardLastFour || "xxxx";

  doc.fillColor('#6B7280')
     .fontSize(7) // Reduced from 8
     .text(`Charged to card ending in ${cardLastFour} • ${issuedDate}`, 
           LAYOUT.MARGIN + 10, 
           boxY + 110); // Adjusted position
  
  return boxY + boxHeight + LAYOUT.SECTION_SPACING + 10; // Added extra space
};



// const renderBarcodeAndQR = async (doc, pnr, ticketNumber, yPosition) => {
//   // Generate QR code
//   const qrData = `PNR:${pnr} TICKET:${ticketNumber || 'UNTICKETED'}`;
//   const qrImage = await QRCode.toDataURL(qrData);
  
//   // QR Code
//   await doc.image(qrImage, 
//                   doc.page.width - LAYOUT.MARGIN - 100, 
//                   yPosition, 
//                   { width: 100, height: 100 });
  
//   // Barcode area
//   doc.rect(LAYOUT.MARGIN, yPosition, 300, 40)
//      .stroke('#000000');
  
//   // Barcode text
//   doc.fillColor('#000000')
//      .fontSize(8)
//      .text(`PNR: ${pnr} | TICKET: ${ticketNumber || 'UNTICKETED'}`, 
//            LAYOUT.MARGIN + 5, 
//            yPosition + 15);
  
//   return yPosition + 50;
// };

const renderBarcodeAndQR = async (doc, pnr, ticketNumber, yPosition) => {
  const qrData = `PNR:${pnr} TICKET:${ticketNumber || 'UNTICKETED'}`;
  const qrImage = await QRCode.toDataURL(qrData);

  // Move QR upward
  const QR_OFFSET_TOP = 20;

  await doc.image(
    qrImage,
    doc.page.width - LAYOUT.MARGIN - 100,
    yPosition - QR_OFFSET_TOP,
    { width: 100, height: 100 }
  );

  // Barcode area (unchanged)
  doc.rect(LAYOUT.MARGIN, yPosition, 300, 40)
     .stroke('#000000');

  // Barcode text
  // doc.fillColor('#000000')
  //    .fontSize(8)
  //    .text(
  //      `PNR: ${pnr} | TICKET: ${ticketNumber || 'UNTICKETED'}`,
  //      LAYOUT.MARGIN + 5,
  //      yPosition + 15
  //    );

  // return yPosition + 50;


  // Small barcode-style box
const boxHeight = 22;
const boxWidth = 260;

doc
  .rect(LAYOUT.MARGIN, yPosition, boxWidth, boxHeight)
  .stroke('#000000');

// Center text vertically inside box
doc
  .fillColor('#000000')
  .fontSize(8)
  .text(
    `PNR: ${pnr} | TICKET: ${ticketNumber || 'UNTICKETED'}`,
    LAYOUT.MARGIN + 6,
    yPosition + 7
  );

return yPosition + boxHeight + 10;

};



// const renderFooter = (doc) => {
//   const footerY = doc.page.height - LAYOUT.FOOTER_HEIGHT;
  
//   doc
//     .fillColor('#6B7280')
//     .fontSize(6)
//     .text(
//       'Please present this document with a valid ticket number and a government-issued photo ID.\n' +
//       'Please scan this QR code using your mobile phone camera or Google Lens.\n' +
//       'FareBuzzer Travel • enquiry@farebuzzertravel.com • 844 784 3676 • www.farebuzzertravel.com',

//       LAYOUT.MARGIN,
//       footerY,
//       {
//         width: doc.page.width - (LAYOUT.MARGIN * 2),
//         align: 'center',
//         lineGap: 2
//       }
//     );
// };
// const renderFooter = (doc) => {
//   const FOOTER_OFFSET_TOP = 18;
//   const footerY = doc.page.height - LAYOUT.FOOTER_HEIGHT - FOOTER_OFFSET_TOP;

//   doc
//     .fillColor('#6B7280')
//     .fontSize(6)
//     .text(
//       'Please present this document with a valid ticket number and a government-issued photo ID.\n' +
//       'Please scan this QR code using your mobile phone camera or Google Lens.\n' +
//       'FareBuzzer Travel • enquiry@farebuzzertravel.com • 844 784 3676 • www.farebuzzertravel.com',
//       LAYOUT.MARGIN,
//       footerY,
//       {
//         width: doc.page.width - (LAYOUT.MARGIN * 2),
//         align: 'center',
//         lineGap: 2
//       }
//     );
// };

const renderFooter = (doc) => {
  const FOOTER_OFFSET_TOP = 18;   // footer ko page bottom se upar laane ke liye
  const FOOTER_TOP_PADDING = 10;  // 👈 footer ke andar top margin

  const footerY =
    doc.page.height - LAYOUT.FOOTER_HEIGHT - FOOTER_OFFSET_TOP;

  doc
    .fillColor('#6B7280')
    .fontSize(6)
    .text(
      'Please present this document with a valid ticket number and a government-issued photo ID.\n' +
      'Please scan this QR code using your mobile phone camera or Google Lens.\n' +
      'FareBuzzer Travel • enquiry@farebuzzertravel.com • 844 784 3676 • www.farebuzzertravel.com',
      LAYOUT.MARGIN,
      footerY + FOOTER_TOP_PADDING, // ✅ yahin se gap aayega
      {
        width: doc.page.width - (LAYOUT.MARGIN * 2),
        align: 'center',
        lineGap: 2
      }
    );
};


// export const generateETicket = async (data) => {
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   // Use the provided confirmationNumber as PNR
//   const pnr = data.confirmationNumber;
  
//   // Use provided ticket number or show "UNTICKETED"
//   const ticketNumber = data.ticketNumber || null; // Keep null to trigger "UNTICKETED"

//   const filePath = path.join(
//     os.tmpdir(),
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise(async (resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ 
//         size: "A4", 
//         margin: LAYOUT.MARGIN,
//         info: {
//           Title: `E-Ticket ${data.confirmationNumber}`,
//           Author: 'FareBuzzer Travel',
//           Subject: 'Electronic Flight Ticket'
//         }
//       });
      
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Render sections in sequence
//       renderHeader(doc, data);
//       renderTicketInfo(doc, data, pnr, ticketNumber);
//       renderPassengerDetails(doc, data);
//       renderFlightDetails(doc, data);
//       renderImportantInfo(doc, data);
//       const paymentEndY = renderPaymentSummary(doc, data);
//       await renderBarcodeAndQR(doc, pnr, ticketNumber || 'UNTICKETED', paymentEndY);
//       renderFooter(doc);

//       doc.end();
      
//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);

//     } catch (err) {
//       reject(err);
//     }
//   });
// };


// export const generateETicket = async (data) => {
//   console.log("🎫 E-Ticket Generation Data:", {
//     confirmationNumber: data.confirmationNumber,
//     customerName: data.customerName,
//     customerPrefix: data.customerPrefix,
//     customerFirstName: data.customerFirstName,
//     customerMiddleName: data.customerMiddleName,
//     customerLastName: data.customerLastName,
//     customerDOB: data.customerDOB,
//     customerGender: data.customerGender,
//     customerPhone: data.customerPhone,
//     billingEmail: data.billingEmail
//   });
  
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   // Use the provided confirmationNumber as PNR
//   const pnr = data.confirmationNumber;
  
//   // Use provided ticket number or show "UNTICKETED"
//   const ticketNumber = data.ticketNumber || null;

//   const filePath = path.join(
//     os.tmpdir(),
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise(async (resolve, reject) => {
//     try {

//       const doc = new PDFDocument({ 
//         size: "A4", 
//         margin: LAYOUT.MARGIN,
//         info: {
//           Title: `E-Ticket ${data.confirmationNumber}`,
//           Author: 'FareBuzzer Travel',
//           Subject: 'Electronic Flight Ticket'
//         }
//       });
      
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Render sections in sequence
//       renderHeader(doc, data);
//       renderTicketInfo(doc, data, pnr, ticketNumber);
//       renderPassengerDetails(doc, data);
//       renderFlightDetails(doc, data);
//       renderImportantInfo(doc, data);
//       const paymentEndY = renderPaymentSummary(doc, data);
//       await renderBarcodeAndQR(doc, pnr, ticketNumber || 'UNTICKETED', paymentEndY);
//       renderFooter(doc);

//       doc.end();
      
//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);







//     } catch (err) {
//       console.error("❌ E-Ticket Generation Error:", err);
//       reject(err);
//     }
//   });
// };

export const generateETicket = async (data) => {
  console.log("🎫 E-Ticket Generation Data:", {
    confirmationNumber: data.confirmationNumber,
    customerName: data.customerName,
    customerPrefix: data.customerPrefix,
    customerFirstName: data.customerFirstName,
    customerMiddleName: data.customerMiddleName,
    customerLastName: data.customerLastName,
    fullName: `${data.customerPrefix ? data.customerPrefix + ' ' : ''}${data.customerFirstName || ''} ${data.customerMiddleName || ''} ${data.customerLastName || ''}`.trim(),
    customerDOB: data.customerDOB,
    customerGender: data.customerGender,
    customerPhone: data.customerPhone,
    billingEmail: data.billingEmail
  });
  
  if (!data.confirmationNumber) {
    throw new Error("confirmationNumber missing for ticket generation");
  }

  // Use the provided confirmationNumber as PNR
  const pnr = data.confirmationNumber;
  
  // Use provided ticket number or show "UNTICKETED"
  const ticketNumber = data.ticketNumber || null;

  const filePath = path.join(
    os.tmpdir(),
    `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
  );

  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: "A4", 
        margin: LAYOUT.MARGIN,
        info: {
          Title: `E-Ticket ${data.confirmationNumber}`,
          Author: 'FareBuzzer Travel',
          Subject: 'Electronic Flight Ticket'
        }
      });
      
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Render sections in sequence with adjusted spacing
      renderHeader(doc, data);
      doc.moveDown(0.5); // Reduced spacing
      
      renderTicketInfo(doc, data, pnr, ticketNumber);
      doc.moveDown(0.5); // Reduced spacing
      
      renderPassengerDetails(doc, data);
      doc.moveDown(0.5); // Reduced spacing
      
      renderFlightDetails(doc, data);
      doc.moveDown(0.5); // Reduced spacing
      
      renderImportantInfo(doc, data);
      doc.moveDown(0.5); // Reduced spacing
      
      const paymentEndY = renderPaymentSummary(doc, data);
      await renderBarcodeAndQR(doc, pnr, ticketNumber || 'UNTICKETED', paymentEndY);
      renderFooter(doc);

      doc.end();
      
      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);

    } catch (err) {
      console.error("❌ E-Ticket Generation Error:", err);
      reject(err);
    }
  });
};




















//=======29 jan=  Base Fare $65.00,  Fuel Surcharge (YQ) $12.00,  Airport Taxes $8.00 ,Service Fee $15.00

// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import os from "os";
// import QRCode from "qrcode";

// // Utility functions
// const generatePNR = () => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let pnr = '';
//   for (let i = 0; i < 6; i++) {
//     pnr += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return pnr;
// };

// const generateTicketNumber = (airline) => {
//   const airlineCodes = {
//     'American Airlines': '001',
//     'Delta Air Lines': '006',
//     'United Airlines': '016',
//     'Lufthansa': '220',
//     'British Airways': '125',
//     'Emirates': '176',
//     'Qatar Airways': '157',
//     'Air France': '057',
//     'KLM': '074',
//     'Air Canada': '014'
//   };
//   const airlineCode = airlineCodes[airline] || '001';
//   const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
//   return `${airlineCode}${randomDigits}`;
// };

// const formatDate = () => {
//   return new Date().toLocaleDateString('en-US', {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // ✅ STEP 1: CALCULATE FARE BREAKUP - YAHI ADD KARO
// const calculateFareBreakup = (totalAmount, type = "international") => {
//   const baseFarePercent = type === "domestic" ? 0.62 : 0.72;
//   const yqPercent = type === "domestic" ? 0.18 : 0.12;
//   const airportPercent = 0.08;
//   const serviceFee = 15;

//   const baseFare = totalAmount * baseFarePercent;
//   const fuelSurcharge = totalAmount * yqPercent;
//   const airportTaxes = totalAmount * airportPercent;

//   const gst =
//     type === "domestic"
//       ? (baseFare + fuelSurcharge) * 0.05
//       : 0;

//   const calculatedTotal =
//     baseFare + fuelSurcharge + airportTaxes + gst + serviceFee;

//   // Adjustment to avoid rounding mismatch
//   const adjustment = totalAmount - calculatedTotal;

//   return {
//     baseFare: +(baseFare + adjustment).toFixed(2),
//     fuelSurcharge: +fuelSurcharge.toFixed(2),
//     airportTaxes: +airportTaxes.toFixed(2),
//     gst: +gst.toFixed(2),
//     serviceFee: +serviceFee.toFixed(2)
//   };
// };

// // Calculate duration from departure and arrival times
// const calculateDuration = (departureTime, arrivalTime) => {
//   if (!departureTime || !arrivalTime) return 'N/A';
  
//   try {
//     const [depHours, depMinutes] = departureTime.split(':').map(Number);
//     const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
    
//     let totalMinutes = (arrHours * 60 + arrMinutes) - (depHours * 60 + depMinutes);
    
//     // Handle overnight flights
//     if (totalMinutes < 0) {
//       totalMinutes += 24 * 60;
//     }
    
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;
    
//     return `${hours}h ${minutes}m`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // Layout constants for consistent spacing
// const LAYOUT = {
//   MARGIN: 40,
//   SECTION_SPACING: 20,
//   BOX_SPACING: 15,
//   LINE_HEIGHT: 15,
//   SMALL_SPACING: 5,
//   FOOTER_HEIGHT: 60
// };

// // Fare type mapping
// const fareTypeMapping = {
//   'SAVER': 'Saver Fare',
//   'REGULAR': 'Regular Fare',
//   'FLEXIBLE': 'Flexible Fare',
//   'REFUNDABLE': 'Fully Refundable Fare',
//   'PROMO': 'Promotional Fare',
//   'NON_REFUNDABLE': 'Non-Refundable Fare',
//   'CORPORATE': 'Corporate Fare',
//   'STUDENT': 'Student Fare'
// };

// // Section rendering functions
// const renderHeader = (doc, data) => {
//   // Blue header background
//   doc.rect(0, 0, doc.page.width, 60)
//      .fill('#1E3A8A');
  
//   // Airline name
//   doc.fillColor('#FFFFFF')
//      .fontSize(24)
//      .font('Helvetica-Bold')
//      .text(`${data.airline.toUpperCase()}`, LAYOUT.MARGIN, 20);
  
//   // Document title
//   doc.fontSize(16)
//      .text('ELECTRONIC TICKET RECEIPT', LAYOUT.MARGIN, 45);
  
//   // Issuer in top right
//   doc.fontSize(10)
//      .font('Helvetica-Bold')
//      .text('ISSUED BY FAREBUZZER', 
//            doc.page.width - LAYOUT.MARGIN - 120, 
//            25, 
//            { width: 120, align: 'right' });
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderTicketInfo = (doc, data, pnr, ticketNumber) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 60;
  
//   // Info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F0F9FF')
//      .stroke('#3B82F6');
  
//   // Column headers
//   doc.fillColor('#1E40AF')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('PASSENGER NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('BOOKING REFERENCE', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('TICKET NUMBER', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Column values
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(data.customerName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25)
//      .text(pnr, LAYOUT.MARGIN + 210, boxY + 25)
//      .text(ticketNumber, LAYOUT.MARGIN + 410, boxY + 25);
  
//   // Status row headers
//   doc.fillColor('#1E40AF')
//      .font('Helvetica-Bold')
//      .fontSize(11)
//      .text('ISSUED DATE', LAYOUT.MARGIN + 10, boxY + 40)
//      .text('ISSUED BY', LAYOUT.MARGIN + 210, boxY + 40)
//      .text('STATUS', LAYOUT.MARGIN + 410, boxY + 40);
  
//   // Status row values
//   const issuedDate = formatDate();
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text(issuedDate, LAYOUT.MARGIN + 10, boxY + 55)
//      .text(data.chargeReference || 'FAREBUZZER TRAVEL', LAYOUT.MARGIN + 210, boxY + 55);
  
//   doc.fillColor('#059669')
//      .font('Helvetica-Bold')
//      .fontSize(12)
//      .text('CONFIRMED ✓', LAYOUT.MARGIN + 410, boxY + 55);
  
//   doc.moveDown(2);
//   return doc.y;
// };

// const renderPassengerDetails = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('PASSENGER DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 90;
  
//   // Passenger box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .stroke('#E5E7EB');
  
//   // Column headers
//   doc.fillColor('#374151')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('CONTACT INFORMATION', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('FARE TYPE', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Passenger name
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(data.customerName, LAYOUT.MARGIN + 10, boxY + 25);
  
//   // Contact information
//   doc.fontSize(10)
//      .text(`Email: ${data.billingEmail}`, LAYOUT.MARGIN + 210, boxY + 25)
//      .text(`Phone: ${data.customerPhone}`, LAYOUT.MARGIN + 210, boxY + 40);
  
//   // Fare type - use provided fare type or default
//   const fareType = data.fareType || 'REGULAR';
//   const fareTypeDisplay = fareTypeMapping[fareType] || fareType;
//   doc.fontSize(12)
//      .text(fareTypeDisplay, LAYOUT.MARGIN + 410, boxY + 25);
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderFlightDetails = (doc, data) => {
//   // Check if we need a new page
//   const requiredHeight = 180;
//   if (doc.y + requiredHeight > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//   }
  
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('FLIGHT DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 150;
  
//   // Flight info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#FEF3C7')
//      .stroke('#F59E0B');
  
//   // Flight header row
//   doc.fillColor('#92400E')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('FLIGHT', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('DEPARTURE', LAYOUT.MARGIN + 110, boxY + 10)
//      .text('ARRIVAL', LAYOUT.MARGIN + 260, boxY + 10)
//      .text('DURATION', LAYOUT.MARGIN + 360, boxY + 10)
//      .text('CLASS', LAYOUT.MARGIN + 440, boxY + 10);
  
//   const flightRowY = boxY + 30;
  
//   // Calculate duration automatically
//   const duration = calculateDuration(data.departureTime, data.arrivalTime);
  
//   // Flight data
//   doc.fillColor('#000000')
//      .fontSize(12)
//      .font('Helvetica')
//      .text(data.flightNumber || `${data.airlineCode || 'AA'} ${Math.floor(Math.random() * 9000 + 1000)}`, LAYOUT.MARGIN + 10, flightRowY)
//      .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 110, flightRowY)
//      .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 260, flightRowY)
//      .text(duration, LAYOUT.MARGIN + 360, flightRowY)
//      .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 440, flightRowY);
  
//   // Departure details
//   doc.fillColor('#6B7280')
//      .fontSize(10)
//      .font('Helvetica-Oblique')
//      .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 110, flightRowY + 15)
//      .text(`Time: ${data.departureTime || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 30)
//      .text(`Terminal: ${data.departureTerminal || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 45)
//      .text(`Gate: To be announced`, LAYOUT.MARGIN + 110, flightRowY + 60);
  
//   // Arrival details
//   doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 260, flightRowY + 15)
//      .text(`Time: ${data.arrivalTime || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 30)
//      .text(`Terminal: ${data.arrivalTerminal || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 45)
//      .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 260, flightRowY + 60);
  
//   // Add baggage information
//   const baggageInfoY = flightRowY + 75;
//   if (data.checkInBaggage || data.carryOnBaggage) {
//     doc.fillColor('#92400E')
//        .fontSize(10)
//        .font('Helvetica-Bold')
//        .text('BAGGAGE ALLOWANCE', LAYOUT.MARGIN + 110, baggageInfoY);
    
//     doc.fillColor('#000000')
//        .fontSize(9)
//        .font('Helvetica')
//        .text(`${data.carryOnBaggage || '7 kg'} carry-on`, LAYOUT.MARGIN + 110, baggageInfoY + 12)
//        .text(`${data.checkInBaggage || 'As per fare'} checked`, LAYOUT.MARGIN + 110, baggageInfoY + 24);
//   }

//   doc.moveDown(4);
//   return doc.y;
// };

// const renderImportantInfo = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Check if we need a new page
//   if (sectionTitleY + 120 > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//     doc.y = LAYOUT.MARGIN;
//   }
  
//   // Section title
//   doc.fillColor('#DC2626')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('IMPORTANT INFORMATION', LAYOUT.MARGIN, sectionTitleY);
  
//   const listY = sectionTitleY + LAYOUT.SECTION_SPACING;
  
//   // Information list
//   doc.fillColor('#000000')
//      .fontSize(9)
//      .font('Helvetica')
//      .list([
//        `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
//        `Boarding begins 2 hours before departure`,
//        `Government-issued photo ID required for all passengers`,
//        `Electronic ticket - No physical ticket required`,
//        `Changes/Cancellations: Fees apply. Visit airline website for details`
//      ], LAYOUT.MARGIN, listY, {
//        bulletRadius: 2,
//        indent: 20,
//        textIndent: 10,
//        lineGap: LAYOUT.SMALL_SPACING
//      });
  
//   doc.moveDown(3);
//   return doc.y;
// };

// // ✅ STEP 2: UPDATED RENDER PAYMENT SUMMARY
// const renderPaymentSummary = (doc, data) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 145;

//   // Decide domestic / international
//   const travelType =
//     data.departureCountry === "India" &&
//     data.arrivalCountry === "India"
//       ? "domestic"
//       : "international";

//   const fare = calculateFareBreakup(
//     Number(data.bookingAmount),
//     travelType
//   );

//   // Box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F3F4F6')
//      .stroke('#9CA3AF');

//   // Title
//   doc.fillColor('#1F2937')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('PAYMENT SUMMARY', LAYOUT.MARGIN + 10, boxY + 12);

//   // Headers
//   doc.fillColor('#4B5563')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('DESCRIPTION', LAYOUT.MARGIN + 10, boxY + 35)
//      .text('AMOUNT (USD)', LAYOUT.MARGIN + 360, boxY + 35);

//   let rowY = boxY + 50;

//   const row = (label, value) => {
//     doc.fillColor('#000000')
//        .font('Helvetica')
//        .fontSize(11)
//        .text(label, LAYOUT.MARGIN + 10, rowY)
//        .text(`$${value.toFixed(2)}`, LAYOUT.MARGIN + 360, rowY);
//     rowY += 14;
//   };

//   row('Base Fare', fare.baseFare);
//   row('Fuel Surcharge (YQ)', fare.fuelSurcharge);
//   row('Airport Taxes', fare.airportTaxes);

//   if (fare.gst > 0) {
//     row('GST (5%)', fare.gst);
//   }

//   row('Service Fee', fare.serviceFee);

//   // Divider
//   doc.moveTo(LAYOUT.MARGIN + 340, rowY + 3)
//      .lineTo(LAYOUT.MARGIN + 460, rowY + 3)
//      .stroke('#000000', 0.5);

//   rowY += 8;

//   // Total
//   doc.fillColor('#1E3A8A')
//      .fontSize(12)
//      .font('Helvetica-Bold')
//      .text('TOTAL PAID', LAYOUT.MARGIN + 10, rowY)
//      .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, LAYOUT.MARGIN + 360, rowY);

//   // Payment info
//   const issuedDate = formatDate();
//   const cardLastFour = data.cardLastFour || "xxxx";

//   doc.fillColor('#6B7280')
//      .fontSize(8)
//      .font('Helvetica')
//      .text(
//        `Charged to card ending in ${cardLastFour} • ${issuedDate}`,
//        LAYOUT.MARGIN + 10,
//        rowY + 18
//      );

//   return boxY + boxHeight + LAYOUT.SECTION_SPACING;
// };

// const renderBarcodeAndQR = async (doc, pnr, ticketNumber, yPosition) => {
//   // Generate QR code
//   const qrData = `PNR:${pnr} TICKET:${ticketNumber}`;
//   const qrImage = await QRCode.toDataURL(qrData);
  
//   // QR Code
//   await doc.image(qrImage, 
//                   doc.page.width - LAYOUT.MARGIN - 100, 
//                   yPosition, 
//                   { width: 100, height: 100 });
  
//   // Barcode area
//   doc.rect(LAYOUT.MARGIN, yPosition, 300, 40)
//      .stroke('#000000');
  
//   // Barcode text
//   doc.fillColor('#000000')
//      .fontSize(8)
//      .text(`PNR: ${pnr} | TICKET: ${ticketNumber}`, 
//            LAYOUT.MARGIN + 5, 
//            yPosition + 15);
  
//   return yPosition + 50;
// };

// const renderFooter = (doc) => {
//   const footerY = doc.page.height - LAYOUT.FOOTER_HEIGHT;
  
//   doc
//     .fillColor('#6B7280')
//     .fontSize(7)
//     .text(
//       'This document is valid for travel and must be presented with government-issued photo ID.\n' +
//       'FareBuzzer Travel • enquiry@farebuzzertravel.com • 844 784 3676 • www.farebuzzertravel.com',
//       LAYOUT.MARGIN,
//       footerY,
//       {
//         width: doc.page.width - (LAYOUT.MARGIN * 2),
//         align: 'center',
//         lineGap: 2
//       }
//     );
// };

// // ✅ STEP 3: MAIN FUNCTION (NO CHANGE NEEDED)
// export const generateETicket = async (data) => {
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   // Use the provided confirmationNumber as PNR
//   const pnr = data.confirmationNumber;
  
//   // Use provided ticket number or generate one
//   const ticketNumber = data.ticketNumber || generateTicketNumber(data.airline);

//   const filePath = path.join(
//     os.tmpdir(),
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise(async (resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ 
//         size: "A4", 
//         margin: LAYOUT.MARGIN,
//         info: {
//           Title: `E-Ticket ${data.confirmationNumber}`,
//           Author: 'FareBuzzer Travel',
//           Subject: 'Electronic Flight Ticket'
//         }
//       });
      
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Render sections in sequence
//       renderHeader(doc, data);
//       renderTicketInfo(doc, data, pnr, ticketNumber);
//       renderPassengerDetails(doc, data);
//       renderFlightDetails(doc, data);
//       renderImportantInfo(doc, data);
//       const paymentEndY = renderPaymentSummary(doc, data);
//       await renderBarcodeAndQR(doc, pnr, ticketNumber, paymentEndY);
//       renderFooter(doc);

//       doc.end();
      
//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);

//     } catch (err) {
//       reject(err);
//     }
//   });
// };




//==========28 jan=========

// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import os from "os";
// import QRCode from "qrcode";

// // Utility functions
// const generatePNR = () => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let pnr = '';
//   for (let i = 0; i < 6; i++) {
//     pnr += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return pnr;
// };

// const generateTicketNumber = (airline) => {
//   const airlineCodes = {
//     'American Airlines': '001',
//     'Delta Air Lines': '006',
//     'United Airlines': '016',
//     'Lufthansa': '220',
//     'British Airways': '125',
//     'Emirates': '176',
//     'Qatar Airways': '157',
//     'Air France': '057',
//     'KLM': '074',
//     'Air Canada': '014'
//   };
//   const airlineCode = airlineCodes[airline] || '001';
//   const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
//   return `${airlineCode}${randomDigits}`;
// };

// const formatDate = () => {
//   return new Date().toLocaleDateString('en-US', {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // Calculate duration from departure and arrival times
// const calculateDuration = (departureTime, arrivalTime) => {
//   if (!departureTime || !arrivalTime) return 'N/A';
  
//   try {
//     const [depHours, depMinutes] = departureTime.split(':').map(Number);
//     const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
    
//     let totalMinutes = (arrHours * 60 + arrMinutes) - (depHours * 60 + depMinutes);
    
//     // Handle overnight flights
//     if (totalMinutes < 0) {
//       totalMinutes += 24 * 60;
//     }
    
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;
    
//     return `${hours}h ${minutes}m`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // Extract airline code from airline name
// const extractAirlineCode = (airlineName) => {
//   if (!airlineName) return 'AA';
  
//   const airlineCodeMap = {
//     'american airlines': 'AA',
//     'delta air lines': 'DL',
//     'united airlines': 'UA',
//     'lufthansa': 'LH',
//     'british airways': 'BA',
//     'emirates': 'EK',
//     'qatar airways': 'QR',
//     'air france': 'AF',
//     'klm': 'KL',
//     'air canada': 'AC',
//     'jetblue': 'B6',
//     'southwest': 'WN',
//     'spirit': 'NK',
//     'frontier': 'F9',
//     'alaska': 'AS'
//   };
  
//   const normalizedName = airlineName.toLowerCase().trim();
//   return airlineCodeMap[normalizedName] || 
//          airlineName.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
// };

// // Layout constants for consistent spacing
// const LAYOUT = {
//   MARGIN: 40,
//   SECTION_SPACING: 20,
//   BOX_SPACING: 15,
//   LINE_HEIGHT: 15,
//   SMALL_SPACING: 5,
//   FOOTER_HEIGHT: 80  // Increased for better spacing
// };

// // Fare type mapping
// const fareTypeMapping = {
//   'SAVER': 'Saver Fare',
//   'REGULAR': 'Regular Fare',
//   'FLEXIBLE': 'Flexible Fare',
//   'REFUNDABLE': 'Fully Refundable Fare',
//   'PROMO': 'Promotional Fare',
//   'NON_REFUNDABLE': 'Non-Refundable Fare',
//   'CORPORATE': 'Corporate Fare',
//   'STUDENT': 'Student Fare'
// };

// // Section rendering functions
// const renderHeader = (doc, data) => {
//   // Blue header background
//   doc.rect(0, 0, doc.page.width, 60)
//      .fill('#1E3A8A');
  
//   // Airline name
//   doc.fillColor('#FFFFFF')
//      .fontSize(24)
//      .font('Helvetica-Bold')
//      .text(`${data.airline.toUpperCase()}`, LAYOUT.MARGIN, 20);
  
//   // Document title
//   doc.fontSize(16)
//      .text('ELECTRONIC TICKET RECEIPT', LAYOUT.MARGIN, 45);
  
//   // Issuer in top right
//   doc.fontSize(10)
//      .font('Helvetica-Bold')
//      .text('ISSUED BY FAREBUZZER', 
//            doc.page.width - LAYOUT.MARGIN - 120, 
//            25, 
//            { width: 120, align: 'right' });
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderTicketInfo = (doc, data, pnr, ticketNumber) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 60;
  
//   // Info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F0F9FF')
//      .stroke('#3B82F6');
  
//   // Column headers
//   doc.fillColor('#1E40AF')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('PASSENGER NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('BOOKING REFERENCE', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('TICKET NUMBER', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Column values
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(data.customerName.toUpperCase(), LAYOUT.MARGIN + 10, boxY + 25)
//      .text(pnr, LAYOUT.MARGIN + 210, boxY + 25)
//      .text(ticketNumber, LAYOUT.MARGIN + 410, boxY + 25);
  
//   // Status row headers
//   doc.fillColor('#1E40AF')
//      .font('Helvetica-Bold')
//      .fontSize(11)
//      .text('ISSUED DATE', LAYOUT.MARGIN + 10, boxY + 40)
//      .text('ISSUED BY', LAYOUT.MARGIN + 210, boxY + 40)
//      .text('STATUS', LAYOUT.MARGIN + 410, boxY + 40);
  
//   // Status row values
//   const issuedDate = formatDate();
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text(issuedDate, LAYOUT.MARGIN + 10, boxY + 55)
//      .text(data.chargeReference || 'FAREBUZZER TRAVEL', LAYOUT.MARGIN + 210, boxY + 55);
  
//   doc.fillColor('#059669')
//      .font('Helvetica-Bold')
//      .fontSize(12)
//      .text('CONFIRMED ✓', LAYOUT.MARGIN + 410, boxY + 55);
  
//   doc.moveDown(2);
//   return doc.y;
// };

// const renderPassengerDetails = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('PASSENGER DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 90;
  
//   // Passenger box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .stroke('#E5E7EB');
  
//   // Column headers
//   doc.fillColor('#374151')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('NAME', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('CONTACT INFORMATION', LAYOUT.MARGIN + 210, boxY + 10)
//      .text('FARE TYPE', LAYOUT.MARGIN + 410, boxY + 10);
  
//   // Passenger name
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(12)
//      .text(data.customerName, LAYOUT.MARGIN + 10, boxY + 25);
  
//   // Contact information
//   doc.fontSize(10)
//      .text(`Email: ${data.billingEmail}`, LAYOUT.MARGIN + 210, boxY + 25)
//      .text(`Phone: ${data.customerPhone}`, LAYOUT.MARGIN + 210, boxY + 40);
  
//   // Fare type - use provided fare type or default
//   const fareType = data.fareType || 'REGULAR';
//   const fareTypeDisplay = fareTypeMapping[fareType] || fareType;
//   doc.fontSize(12)
//      .text(fareTypeDisplay, LAYOUT.MARGIN + 410, boxY + 25);
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderFlightDetails = (doc, data) => {
//   // Check if we need a new page
//   const requiredHeight = 180;
//   if (doc.y + requiredHeight > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//   }
  
//   const sectionTitleY = doc.y;
  
//   // Section title
//   doc.fillColor('#1E3A8A')
//      .fontSize(16)
//      .font('Helvetica-Bold')
//      .text('FLIGHT DETAILS', LAYOUT.MARGIN, sectionTitleY);
  
//   const boxY = sectionTitleY + LAYOUT.SECTION_SPACING;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 150;
  
//   // Flight info box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#FEF3C7')
//      .stroke('#F59E0B');
  
//   // Flight header row
//   doc.fillColor('#92400E')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('FLIGHT', LAYOUT.MARGIN + 10, boxY + 10)
//      .text('DEPARTURE', LAYOUT.MARGIN + 110, boxY + 10)
//      .text('ARRIVAL', LAYOUT.MARGIN + 260, boxY + 10)
//      .text('DURATION', LAYOUT.MARGIN + 360, boxY + 10)
//      .text('CLASS', LAYOUT.MARGIN + 440, boxY + 10);
  
//   const flightRowY = boxY + 30;
  
//   // Calculate duration automatically
//   const duration = calculateDuration(data.departureTime, data.arrivalTime);
  
//   // Extract airline code if not provided
//   const airlineCode = extractAirlineCode(data.airline);
//   const flightNumber = data.flightNumber || `${airlineCode} ${Math.floor(Math.random() * 9000 + 1000)}`;
  
//   // Flight data
//   doc.fillColor('#000000')
//      .fontSize(12)
//      .font('Helvetica')
//      .text(flightNumber, LAYOUT.MARGIN + 10, flightRowY)
//      .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 110, flightRowY)
//      .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 260, flightRowY)
//      .text(duration, LAYOUT.MARGIN + 360, flightRowY)
//      .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 440, flightRowY);
  
//   // Departure details
//   doc.fillColor('#6B7280')
//      .fontSize(10)
//      .font('Helvetica-Oblique')
//      .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 110, flightRowY + 15)
//      .text(`Time: ${data.departureTime || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 30)
//      .text(`Terminal: ${data.departureTerminal || 'To be announced'}`, LAYOUT.MARGIN + 110, flightRowY + 45)
//      .text(`Gate: To be announced`, LAYOUT.MARGIN + 110, flightRowY + 60);
  
//   // Arrival details
//   doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 260, flightRowY + 15)
//      .text(`Time: ${data.arrivalTime || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 30)
//      .text(`Terminal: ${data.arrivalTerminal || 'To be announced'}`, LAYOUT.MARGIN + 260, flightRowY + 45)
//      .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 260, flightRowY + 60);

//   doc.moveDown(4);
//   return doc.y;
// };

// const renderImportantInfo = (doc, data) => {
//   const sectionTitleY = doc.y;
  
//   // Check if we need a new page
//   if (sectionTitleY + 120 > doc.page.height - LAYOUT.MARGIN - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//     doc.y = LAYOUT.MARGIN;
//   }
  
//   // Section title
//   doc.fillColor('#DC2626')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('IMPORTANT INFORMATION', LAYOUT.MARGIN, sectionTitleY);
  
//   const listY = sectionTitleY + LAYOUT.SECTION_SPACING;
  
//   // Information list
//   doc.fillColor('#000000')
//      .fontSize(9)
//      .font('Helvetica')
//      .list([
//        `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
//        `Baggage allowance: 1 carry-on (max 7kg) + 1 personal item`,
//        `Boarding begins 2 hours before departure`,
//        `Government-issued photo ID required for all passengers`,
//        `Electronic ticket - No physical ticket required`,
//        `Changes/Cancellations: Fees apply. Visit airline website for details`
//      ], LAYOUT.MARGIN, listY, {
//        bulletRadius: 2,
//        indent: 20,
//        textIndent: 10,
//        lineGap: LAYOUT.SMALL_SPACING
//      });
  
//   doc.moveDown(3);
//   return doc.y;
// };

// const renderPaymentSummary = (doc, data) => {
//   const boxY = doc.y;
//   const boxWidth = doc.page.width - (LAYOUT.MARGIN * 2);
//   const boxHeight = 100;
  
//   // Payment box
//   doc.rect(LAYOUT.MARGIN, boxY, boxWidth, boxHeight)
//      .fill('#F3F4F6')
//      .stroke('#9CA3AF');
  
//   // Section title
//   doc.fillColor('#1F2937')
//      .fontSize(14)
//      .font('Helvetica-Bold')
//      .text('PAYMENT SUMMARY', LAYOUT.MARGIN + 10, boxY + 15);
  
//   // Column headers
//   doc.fillColor('#4B5563')
//      .fontSize(11)
//      .font('Helvetica-Bold')
//      .text('DESCRIPTION', LAYOUT.MARGIN + 10, boxY + 35)
//      .text('AMOUNT (USD)', LAYOUT.MARGIN + 360, boxY + 35);
  
//   // Line items
//   doc.fillColor('#000000')
//      .font('Helvetica')
//      .fontSize(11)
//      .text('Base Fare', LAYOUT.MARGIN + 10, boxY + 50)
//      .text(`$${Number(data.bookingAmount * 0.7).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 50)
//      .text('Taxes & Fees', LAYOUT.MARGIN + 10, boxY + 65)
//      .text(`$${Number(data.bookingAmount * 0.3).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 65);
  
//   // Divider line
//   doc.moveTo(LAYOUT.MARGIN + 340, boxY + 80)
//      .lineTo(LAYOUT.MARGIN + 460, boxY + 80)
//      .stroke('#000000', 0.5);
  
//   // Total
//   doc.fillColor('#1E3A8A')
//      .fontSize(12)
//      .font('Helvetica-Bold')
//      .text('TOTAL PAID', LAYOUT.MARGIN + 10, boxY + 85)
//      .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, LAYOUT.MARGIN + 360, boxY + 85);
  
//   // Payment details
//   const issuedDate = formatDate();
//   doc.fillColor('#6B7280')
//      .fontSize(8)
//      .text(`Charged to card ending in xxxx • ${issuedDate}`, 
//            LAYOUT.MARGIN + 10, 
//            boxY + 105);
  
//   return boxY + boxHeight + LAYOUT.SECTION_SPACING;
// };

// const renderBarcodeAndQR = async (doc, pnr, ticketNumber, yPosition) => {
//   // Check if we need to add a new page for barcode/QR
//   if (yPosition + 120 > doc.page.height - LAYOUT.FOOTER_HEIGHT) {
//     doc.addPage();
//     yPosition = LAYOUT.MARGIN;
//   }
  
//   // Generate QR code
//   const qrData = `PNR:${pnr} TICKET:${ticketNumber}`;
//   const qrImage = await QRCode.toDataURL(qrData);
  
//   // QR Code
//   await doc.image(qrImage, 
//                   doc.page.width - LAYOUT.MARGIN - 100, 
//                   yPosition, 
//                   { width: 100, height: 100 });
  
//   // Barcode area
//   doc.rect(LAYOUT.MARGIN, yPosition, 300, 40)
//      .stroke('#000000');
  
//   // Barcode text
//   doc.fillColor('#000000')
//      .fontSize(8)
//      .text(`PNR: ${pnr} | TICKET: ${ticketNumber}`, 
//            LAYOUT.MARGIN + 5, 
//            yPosition + 15);
  
//   return yPosition + 120; // Return new y position
// };

// const renderFooter = (doc) => {
//   const footerY = doc.page.height - LAYOUT.FOOTER_HEIGHT;
  
//   // Footer background
//   doc.rect(0, footerY, doc.page.width, LAYOUT.FOOTER_HEIGHT)
//      .fill('#F3F4F6');
  
//   // Footer text
//   doc.fillColor('#6B7280')
//      .fontSize(8)
//      .text(
//        'This document is valid for travel and must be presented with government-issued photo ID.\n' +
//        'FareBuzzer Travel • enquiry@farebuzzertravel.com • 844 784 3676 • www.farebuzzertravel.com',
//        LAYOUT.MARGIN,
//        footerY + 20,
//        {
//          width: doc.page.width - (LAYOUT.MARGIN * 2),
//          align: 'center',
//          lineGap: 3
//        }
//      );
  
//   // Copyright line
//   doc.fontSize(7)
//      .text(
//        `© ${new Date().getFullYear()} FareBuzzer Travel. All rights reserved. Electronic ticket generated on ${formatDate()}`,
//        LAYOUT.MARGIN,
//        footerY + 50,
//        {
//          width: doc.page.width - (LAYOUT.MARGIN * 2),
//          align: 'center'
//        }
//      );
// };

// export const generateETicket = async (data) => {
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   // Use the provided confirmationNumber as PNR
//   const pnr = data.confirmationNumber;
  
//   // Use provided ticket number or generate one
//   const ticketNumber = data.ticketNumber || generateTicketNumber(data.airline);

//   const filePath = path.join(
//     os.tmpdir(),
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise(async (resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ 
//         size: "A4", 
//         margin: LAYOUT.MARGIN,
//         info: {
//           Title: `E-Ticket ${data.confirmationNumber}`,
//           Author: 'FareBuzzer Travel',
//           Subject: 'Electronic Flight Ticket',
//           Creator: 'FareBuzzer Travel System',
//           CreationDate: new Date()
//         }
//       });
      
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Render sections in sequence
//       renderHeader(doc, data);
//       renderTicketInfo(doc, data, pnr, ticketNumber);
//       renderPassengerDetails(doc, data);
//       renderFlightDetails(doc, data);
//       renderImportantInfo(doc, data);
//       const paymentEndY = renderPaymentSummary(doc, data);
//       const barcodeEndY = await renderBarcodeAndQR(doc, pnr, ticketNumber, paymentEndY);
      
//       // Ensure we have enough space before footer
//       if (barcodeEndY > doc.page.height - LAYOUT.FOOTER_HEIGHT - 20) {
//         doc.addPage();
//       }
      
//       renderFooter(doc);

//       doc.end();
      
//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);

//     } catch (err) {
//       reject(err);
//     }
//   });
// };