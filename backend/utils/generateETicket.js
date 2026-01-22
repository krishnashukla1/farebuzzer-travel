// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// export const generateETicket = async (data) => {
//   const filePath = path.join(
//     process.cwd(),
//     "tmp",
//     `e-ticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise((resolve) => {
//     const doc = new PDFDocument({ size: "A4", margin: 40 });
//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     // HEADER
//     doc.fontSize(20).text("ELECTRONIC TICKET (E-TICKET)", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(12).text(`Booking Reference: ${data.confirmationNumber}`);
//     doc.text(`Issued By: ${data.chargeReference}`);
//     doc.moveDown();

//     // PASSENGER
//     doc.fontSize(14).text("Passenger Details", { underline: true });
//     doc.fontSize(11).text(`Name: ${data.customerName}`);
//     doc.text(`Email: ${data.billingEmail}`);
//     doc.text(`Phone: ${data.customerPhone}`);
//     doc.moveDown();

//     // FLIGHT
//     doc.fontSize(14).text("Flight Information", { underline: true });
//     doc.fontSize(11)
//       .text(`Airline: ${data.airline}`)
//       .text(`Route: ${data.departure} → ${data.arrival}`)
//       .text(`Date: ${data.travelDate}`)
//       .text(`Ticket Type: Economy Class`);
//     doc.moveDown();

//     // PAYMENT
//     doc.fontSize(14).text("Payment Summary", { underline: true });
//     doc.fontSize(11)
//       .text(`Amount Paid: USD ${data.bookingAmount}`)
//       .text(`Charged As: ${data.chargeReference}`)
//       .text(`Card: **** **** **** 2180`);
//     doc.moveDown();

//     // TERMS
//     doc.fontSize(9).text(
//       "This ticket is non-refundable and non-transferable unless otherwise stated. " +
//       "Please arrive at the airport at least 3 hours prior to departure.",
//       { align: "justify" }
//     );

//     doc.end();

//     stream.on("finish", () => resolve(filePath));
//   });
// };




// import fs from "fs";
// import path from "path";

// export const generateETicket = async (data) => {
//   const tmpDir = path.join(process.cwd(), "tmp");
  

//   // ✅ Ensure folder exists
//   if (!fs.existsSync(tmpDir)) {
//     fs.mkdirSync(tmpDir);
//   }

//   const filePath = path.join(
//     tmpDir,
//     `e-ticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ size: "A4", margin: 40 });
//       const stream = fs.createWriteStream(filePath);

//       doc.pipe(stream);
//       doc.fontSize(20).text("ELECTRONIC TICKET", { align: "center" });
//       doc.end();

//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };


//==================================correct=========


// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import os from "os";

// export const generateETicket = async (data) => {
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   const filePath = path.join(
//     os.tmpdir(), // SAFE for servers
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ size: "A4", margin: 40 });
//       const stream = fs.createWriteStream(filePath);

//       doc.pipe(stream);

//       /* ---------- HEADER ---------- */
//       doc
//         .fontSize(20)
//         .text("✈️ FareBuzzer Travel", { align: "center" })
//         .moveDown(0.5)
//         .fontSize(14)
//         .text("Electronic Flight Ticket (E-Ticket)", { align: "center" });

//       doc.moveDown();

//       /* ---------- BOOKING ---------- */
//       doc.fontSize(11)
//         .text(`Booking Reference: ${data.confirmationNumber}`)
//         .text(`Issued By: ${data.chargeReference || "LowfareStudio"}`)
//         .moveDown();

//       /* ---------- PASSENGER ---------- */
//       doc.fontSize(14).text("Passenger Details", { underline: true });
//       doc.fontSize(11)
//         .text(`Name: ${data.customerName}`)
//         .text(`Email: ${data.billingEmail}`)
//         .text(`Phone: ${data.customerPhone}`);

//       doc.moveDown();

//       /* ---------- FLIGHT ---------- */
//       doc.fontSize(14).text("Flight Information", { underline: true });
//       doc.fontSize(11)
//         .text(`Airline: ${data.airline}`)
//         .text(`Route: ${data.departure} → ${data.arrival}`)
//         .text(`Date: ${data.travelDate}`)
//         .text(`Cabin Class: Economy`);

//       doc.moveDown();

//       /* ---------- PAYMENT ---------- */
//       doc.fontSize(14).text("Payment Summary", { underline: true });
//       doc.fontSize(11)
//         .text(`Amount Paid: USD ${Number(data.bookingAmount || 0)}`)
//         .text(`Charged As: ${data.chargeReference || "LOWFARESTUDIO*TRAVEL"}`)
//         .text(`Payment Method: Card (**** **** **** 2180)`);

//       doc.moveDown();

//       /* ---------- FOOTER ---------- */
//       doc
//         .fontSize(9)
//         .text(
//           "This e-ticket is non-refundable and non-transferable unless stated otherwise. " +
//           "Please arrive at the airport at least 3 hours before departure.",
//           { align: "justify" }
//         );

//       doc.end();

//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);

//     } catch (err) {
//       reject(err);
//     }
//   });
// };
//===============correct=====main========


// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import os from "os";

// export const generateETicket = async (data) => {
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   // Generate PNR/Record Locator (6 alphanumeric characters)
//   const generatePNR = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let pnr = '';
//     for (let i = 0; i < 6; i++) {
//       pnr += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return pnr;
//   };

//   // Generate ticket number (13 digits starting with airline code)
//   const generateTicketNumber = () => {
//     const airlineCodes = {
//       'American Airlines': '001',
//       'Delta Air Lines': '006',
//       'United Airlines': '016',
//       'Lufthansa': '220',
//       'British Airways': '125',
//       'Emirates': '176',
//       'Qatar Airways': '157',
//       'Air France': '057',
//       'KLM': '074',
//       'Air Canada': '014'
//     };
//     const airlineCode = airlineCodes[data.airline] || '001';
//     const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
//     return `${airlineCode}${randomDigits}`;
//   };

//   const filePath = path.join(
//     os.tmpdir(),
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ 
//         size: "A4", 
//         margin: 40,
//         info: {
//           Title: `E-Ticket ${data.confirmationNumber}`,
//           Author: 'FareBuzzer Travel',
//           Subject: 'Electronic Flight Ticket'
//         }
//       });
      
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Generate ticket data
//       const pnr = generatePNR();
//       const ticketNumber = generateTicketNumber();
//       const issuedDate = new Date().toLocaleDateString('en-US', {
//         weekday: 'short',
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//       const boardingTime = "2 hours before departure";
//       const gate = "To be announced";
//       const seat = "To be assigned at check-in";

//       /* ---------- HEADER WITH AIRLINE STYLING ---------- */
//       // Top blue banner
//       doc.rect(0, 0, doc.page.width, 60)
//          .fill('#1E3A8A');
      
//       doc.fillColor('#FFFFFF')
//          .fontSize(24)
//          .font('Helvetica-Bold')
//          .text(`${data.airline.toUpperCase()}`, 50, 20)
//          .fontSize(16)
//          .text('ELECTRONIC TICKET RECEIPT', 50, 45);
      
//       // Airline logo placeholder
//       doc.rect(doc.page.width - 120, 15, 100, 30)
//          .stroke('#FFFFFF')
//          .fillColor('#FFFFFF')
//          .fontSize(10)
//          .text('AIRLINE LOGO', doc.page.width - 110, 25);

//       doc.moveDown(3);

//       /* ---------- TICKET INFO BOX ---------- */
//       doc.rect(40, 100, doc.page.width - 80, 60)
//          .fill('#F0F9FF')
//          .stroke('#3B82F6');
      
//       doc.fillColor('#1E40AF')
//          .fontSize(11)
//          .font('Helvetica-Bold')
//          .text('PASSENGER NAME', 50, 110)
//          .text('BOOKING REFERENCE', 250, 110)
//          .text('TICKET NUMBER', 400, 110);
      
//       doc.fillColor('#000000')
//          .font('Helvetica')
//          .fontSize(14)
//          .text(data.customerName.toUpperCase(), 50, 125)
//          .fontSize(12)
//          .text(pnr, 250, 125)
//          .text(ticketNumber, 400, 125);
      
//       doc.fillColor('#1E40AF')
//          .font('Helvetica-Bold')
//          .fontSize(11)
//          .text('ISSUED DATE', 50, 145)
//          .text('ISSUED BY', 250, 145)
//          .text('STATUS', 400, 145);
      
//       doc.fillColor('#000000')
//          .font('Helvetica')
//          .fontSize(12)
//          .text(issuedDate, 50, 160)
//          .text(data.chargeReference || 'FAREBUZZER TRAVEL', 250, 160)
//          .fillColor('#059669')
//          .text('CONFIRMED ✓', 400, 160);

//       doc.moveDown(4);

//       /* ---------- PASSENGER DETAILS ---------- */
//       doc.fillColor('#1E3A8A')
//          .fontSize(16)
//          .font('Helvetica-Bold')
//          .text('PASSENGER DETAILS', 40, 220);
      
//       doc.moveDown(0.5);
      
//       doc.rect(40, 240, doc.page.width - 80, 60)
//          .stroke('#E5E7EB');
      
//       const passengerY = 250;
//       doc.fillColor('#374151')
//          .fontSize(11)
//          .font('Helvetica-Bold')
//          .text('NAME', 50, passengerY)
//          .text('CONTACT INFORMATION', 250, passengerY)
//          .text('FARE TYPE', 400, passengerY);
      
//       doc.fillColor('#000000')
//          .font('Helvetica')
//          .fontSize(12)
//          .text(data.customerName, 50, passengerY + 15)
//          .fontSize(10)
//          .text(`Email: ${data.billingEmail}`, 250, passengerY + 15)
//          .text(`Phone: ${data.customerPhone}`, 250, passengerY + 30)
//          .fontSize(12)
//          .text('ECONOMY', 400, passengerY + 15);

//       doc.moveDown(3);

//       /* ---------- FLIGHT DETAILS ---------- */
//       doc.fillColor('#1E3A8A')
//          .fontSize(16)
//          .font('Helvetica-Bold')
//          .text('FLIGHT DETAILS', 40, 330);
      
//       doc.moveDown(0.5);
      
//       // Flight details box
//       doc.rect(40, 350, doc.page.width - 80, 100)
//          .fill('#FEF3C7')
//          .stroke('#F59E0B');
      
//       // Header row
//       doc.fillColor('#92400E')
//          .fontSize(11)
//          .font('Helvetica-Bold')
//          .text('FLIGHT', 50, 360)
//          .text('DEPARTURE', 150, 360)
//          .text('ARRIVAL', 300, 360)
//          .text('DURATION', 400, 360)
//          .text('CLASS', 480, 360);
      
//       // Flight data row
//       const flightY = 380;
//       doc.fillColor('#000000')
//          .font('Helvetica')
//          .fontSize(12)
//          .text(data.airlineCode || 'AA 1234', 50, flightY)
//          .text(data.departure.toUpperCase(), 150, flightY)
//          .text(data.arrival.toUpperCase(), 300, flightY)
//          .text(data.duration || '2h 30m', 400, flightY)
//          .text('ECONOMY', 480, flightY);
      
//       // Date and time
//       doc.fillColor('#6B7280')
//          .fontSize(10)
//          .font('Helvetica-Oblique')
//          .text(`Date: ${data.travelDate}`, 150, flightY + 20)
//          .text(`Time: ${data.departureTime || '14:30'}`, 150, flightY + 35)
//          .text(`Date: ${data.travelDate}`, 300, flightY + 20)
//          .text(`Time: ${data.arrivalTime || '17:00'}`, 300, flightY + 35);
      
//       // Terminal/Gate info
//       doc.fillColor('#374151')
//          .fontSize(10)
//          .font('Helvetica-Bold')
//          .text(`Terminal: ${data.departureTerminal || 'T1'}`, 150, flightY + 55)
//          .text(`Gate: ${gate}`, 150, flightY + 70)
//          .text(`Terminal: ${data.arrivalTerminal || 'T2'}`, 300, flightY + 55)
//          .text(`Seat: ${seat}`, 300, flightY + 70);

//       /* ---------- IMPORTANT INFORMATION ---------- */
//       doc.moveDown(6);
      
//       doc.fillColor('#DC2626')
//          .fontSize(14)
//          .font('Helvetica-Bold')
//          .text('IMPORTANT INFORMATION', 40, 480);
      
//       doc.fillColor('#000000')
//          .fontSize(9)
//          .font('Helvetica')
//          .list([
//            `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
//            `Baggage allowance: 1 carry-on (max 7kg) + 1 personal item`,
//            `Boarding begins ${boardingTime}`,
//            `Government-issued photo ID required for all passengers`,
//            `Electronic ticket - No physical ticket required`,
//            `Changes/Cancellations: Fees apply. Visit airline website for details`
//          ], 40, 500, {
//            bulletRadius: 2,
//            indent: 20,
//            textIndent: 10,
//            lineGap: 5
//          });

//       /* ---------- PAYMENT SUMMARY ---------- */
//       doc.moveDown(8);
      
//       doc.rect(40, 620, doc.page.width - 80, 80)
//          .fill('#F3F4F6')
//          .stroke('#9CA3AF');
      
//       doc.fillColor('#1F2937')
//          .fontSize(14)
//          .font('Helvetica-Bold')
//          .text('PAYMENT SUMMARY', 50, 635);
      
//       const paymentY = 655;
//       doc.fillColor('#4B5563')
//          .fontSize(11)
//          .font('Helvetica-Bold')
//          .text('DESCRIPTION', 50, paymentY)
//          .text('AMOUNT (USD)', 400, paymentY);
      
//       doc.fillColor('#000000')
//          .font('Helvetica')
//          .fontSize(11)
//          .text('Base Fare', 50, paymentY + 15)
//          .text(`$${Number(data.bookingAmount * 0.7).toFixed(2)}`, 400, paymentY + 15)
//          .text('Taxes & Fees', 50, paymentY + 30)
//          .text(`$${Number(data.bookingAmount * 0.3).toFixed(2)}`, 400, paymentY + 30);
      
//       // Total line
//       doc.moveTo(380, paymentY + 45)
//          .lineTo(500, paymentY + 45)
//          .stroke('#000000', 0.5);
      
//       doc.fillColor('#1E3A8A')
//          .fontSize(12)
//          .font('Helvetica-Bold')
//          .text('TOTAL PAID', 50, paymentY + 50)
//          .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, 400, paymentY + 50);
      
//       doc.fillColor('#6B7280')
//          .fontSize(8)
//          .text(`Charged to card ending in 2180 • ${issuedDate}`, 50, paymentY + 70);

//       /* ---------- BARCODE AND QR CODE PLACEHOLDER ---------- */
//       doc.moveDown(10);
      
//       // Barcode placeholder
//       doc.rect(40, 720, 300, 40)
//          .fill('#FFFFFF')
//          .stroke('#000000');
      
//       doc.fillColor('#000000')
//          .fontSize(8)
//          .text(`PNR: ${pnr} | TICKET: ${ticketNumber}`, 45, 735);
      
//       // QR Code placeholder
//       doc.rect(doc.page.width - 140, 720, 100, 40)
//          .fill('#FFFFFF')
//          .stroke('#000000');
      
//       doc.fillColor('#666666')
//          .fontSize(6)
//          .text('QR CODE', doc.page.width - 135, 735)
//          .text('SCAN FOR FLIGHT INFO', doc.page.width - 135, 745);

//       /* ---------- FOOTER ---------- */
//       doc.fillColor('#6B7280')
//          .fontSize(7)
//          .text('This document is valid for travel and must be presented with government-issued photo ID.', 
//                40, 780, { width: doc.page.width - 80, align: 'center' })
//          .text('FareBuzzer Travel • support@farebuzzer.com • +1-800-123-4567 • www.farebuzzer.com', 
//                40, 800, { width: doc.page.width - 80, align: 'center' });

//       doc.end();

//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);

//     } catch (err) {
//       reject(err);
//     }
//   });
// };

//============correct 2=====

// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import os from "os";
// import QRCode from "qrcode";

// export const generateETicket = async (data) => {
//   if (!data.confirmationNumber) {
//     throw new Error("confirmationNumber missing for ticket generation");
//   }

//   // Generate PNR/Record Locator (6 alphanumeric)
//   const generatePNR = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let pnr = '';
//     for (let i = 0; i < 6; i++) {
//       pnr += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return pnr;
//   };

//   // Generate ticket number (13 digits)
//   const generateTicketNumber = () => {
//     const airlineCodes = {
//       'American Airlines': '001',
//       'Delta Air Lines': '006',
//       'United Airlines': '016',
//       'Lufthansa': '220',
//       'British Airways': '125',
//       'Emirates': '176',
//       'Qatar Airways': '157',
//       'Air France': '057',
//       'KLM': '074',
//       'Air Canada': '014'
//     };
//     const airlineCode = airlineCodes[data.airline] || '001';
//     const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
//     return `${airlineCode}${randomDigits}`;
//   };

//   const filePath = path.join(
//     os.tmpdir(),
//     `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
//   );

//   return new Promise(async (resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ size: "A4", margin: 40 });
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Ticket Data
//       const pnr = generatePNR();
//       const ticketNumber = generateTicketNumber();
//       const issuedDate = new Date().toLocaleDateString('en-US', {
//         weekday: 'short',
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//       const boardingTime = "2 hours before departure";
//       const gate = "To be announced";
//       const seat = "To be assigned at check-in";

//       // ---------- HEADER ----------
//       doc.rect(0, 0, doc.page.width, 60).fill('#1E3A8A');
//       doc.fillColor('#FFFFFF')
//         .fontSize(24)
//         .font('Helvetica-Bold')
//         .text(`${data.airline.toUpperCase()}`, 50, 20)
//         .fontSize(16)
//         .text('ELECTRONIC TICKET RECEIPT', 50, 45);

//       if (data.airlineLogo) {
//         doc.image(data.airlineLogo, doc.page.width - 120, 15, { width: 100, height: 30 });
//       } else {
//         doc.rect(doc.page.width - 120, 15, 100, 30).stroke('#FFFFFF').fillColor('#FFFFFF').fontSize(10).text('AIRLINE LOGO', doc.page.width - 110, 25);
//       }

//       // ---------- TICKET INFO BOX ----------
//       doc.rect(40, 100, doc.page.width - 80, 60).fill('#F0F9FF').stroke('#3B82F6');
//       doc.fillColor('#1E40AF')
//         .fontSize(11)
//         .font('Helvetica-Bold')
//         .text('PASSENGER NAME', 50, 110)
//         .text('BOOKING REFERENCE', 250, 110)
//         .text('TICKET NUMBER', 400, 110);

//       doc.fillColor('#000000')
//         .font('Helvetica')
//         .fontSize(12)
//         .text(data.customerName.toUpperCase(), 50, 125)
//         .text(pnr, 250, 125)
//         .text(ticketNumber, 400, 125);

//       doc.fillColor('#1E40AF')
//         .font('Helvetica-Bold')
//         .fontSize(11)
//         .text('ISSUED DATE', 50, 145)
//         .text('ISSUED BY', 250, 145)
//         .text('STATUS', 400, 145);

//       doc.fillColor('#059669')
//         .font('Helvetica-Bold')
//         .fontSize(12)
//         .text('CONFIRMED ✓', 400, 160);

//       // ---------- PASSENGER DETAILS ----------
//       doc.fillColor('#1E3A8A').fontSize(16).font('Helvetica-Bold').text('PASSENGER DETAILS', 40, 180);
//       doc.rect(40, 200, doc.page.width - 80, 60).stroke('#E5E7EB');
//       const passengerY = 210;
//       doc.fillColor('#374151').fontSize(11).font('Helvetica-Bold')
//         .text('NAME', 50, passengerY)
//         .text('CONTACT INFORMATION', 250, passengerY)
//         .text('FARE TYPE', 400, passengerY);

//       doc.fillColor('#000000').font('Helvetica').fontSize(12)
//         .text(data.customerName, 50, passengerY + 15)
//         .fontSize(10)
//         .text(`Email: ${data.billingEmail}`, 250, passengerY + 15)
//         .text(`Phone: ${data.customerPhone}`, 250, passengerY + 30)
//         .fontSize(12)
//         .text(data.cabinClass || 'ECONOMY', 400, passengerY + 15);

//       // ---------- FLIGHT DETAILS ----------
//       doc.fillColor('#1E3A8A').fontSize(16).font('Helvetica-Bold').text('FLIGHT DETAILS', 40, 270);
//       doc.rect(40, 290, doc.page.width - 80, 100).fill('#FEF3C7').stroke('#F59E0B');

//       doc.fillColor('#92400E').fontSize(11).font('Helvetica-Bold')
//         .text('FLIGHT', 50, 300)
//         .text('DEPARTURE', 150, 300)
//         .text('ARRIVAL', 300, 300)
//         .text('DURATION', 400, 300)
//         .text('CLASS', 480, 300);

//       const flightY = 320;
//       doc.fillColor('#000000').fontSize(12).font('Helvetica')
//         .text(data.airlineCode || 'AA 1234', 50, flightY)
//         .text(data.departure.toUpperCase(), 150, flightY)
//         .text(data.arrival.toUpperCase(), 300, flightY)
//         .text(data.duration || '2h 30m', 400, flightY)
//         .text(data.cabinClass || 'ECONOMY', 480, flightY);

//       // Date, Time, Terminal, Gate, Seat
//       doc.fillColor('#6B7280').fontSize(10).font('Helvetica-Oblique')
//         .text(`Date: ${data.travelDate}`, 150, flightY + 20)
//         .text(`Time: ${data.departureTime || '14:30'}`, 150, flightY + 35)
//         .text(`Date: ${data.travelDate}`, 300, flightY + 20)
//         .text(`Time: ${data.arrivalTime || '17:00'}`, 300, flightY + 35);

//       doc.fillColor('#374151').fontSize(10).font('Helvetica-Bold')
//         .text(`Terminal: ${data.departureTerminal || 'T1'}`, 150, flightY + 55)
//         .text(`Gate: ${gate}`, 150, flightY + 70)
//         .text(`Terminal: ${data.arrivalTerminal || 'T2'}`, 300, flightY + 55)
//         .text(`Seat: ${seat}`, 300, flightY + 70);

//       // ---------- IMPORTANT INFORMATION ----------
//       doc.fillColor('#DC2626').fontSize(14).font('Helvetica-Bold').text('IMPORTANT INFORMATION', 40, 410);
//       doc.fillColor('#000000').fontSize(9).font('Helvetica')
//         .list([
//           `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
//           `Baggage allowance: 1 carry-on (max 7kg) + 1 personal item`,
//           `Boarding begins ${boardingTime}`,
//           `Government-issued photo ID required for all passengers`,
//           `Electronic ticket - No physical ticket required`,
//           `Changes/Cancellations: Fees apply. Visit airline website for details`
//         ], 40, 430, { bulletRadius: 2, indent: 20, textIndent: 10, lineGap: 5 });

//       // ---------- PAYMENT SUMMARY ----------
//       doc.rect(40, 560, doc.page.width - 80, 80).fill('#F3F4F6').stroke('#9CA3AF');
//       doc.fillColor('#1F2937').fontSize(14).font('Helvetica-Bold').text('PAYMENT SUMMARY', 50, 575);
//       const paymentY = 595;
//       doc.fillColor('#4B5563').fontSize(11).font('Helvetica-Bold')
//         .text('DESCRIPTION', 50, paymentY)
//         .text('AMOUNT (USD)', 400, paymentY);

//       doc.fillColor('#000000').font('Helvetica').fontSize(11)
//         .text('Base Fare', 50, paymentY + 15)
//         .text(`$${Number(data.bookingAmount * 0.7).toFixed(2)}`, 400, paymentY + 15)
//         .text('Taxes & Fees', 50, paymentY + 30)
//         .text(`$${Number(data.bookingAmount * 0.3).toFixed(2)}`, 400, paymentY + 30);

//       doc.moveTo(380, paymentY + 45).lineTo(500, paymentY + 45).stroke('#000000', 0.5);
//       doc.fillColor('#1E3A8A').fontSize(12).font('Helvetica-Bold').text('TOTAL PAID', 50, paymentY + 50)
//         .text(`USD $${Number(data.bookingAmount).toFixed(2)}`, 400, paymentY + 50);

//       doc.fillColor('#6B7280').fontSize(8)
//         .text(`Charged to card ending in 2180 • ${issuedDate}`, 50, paymentY + 70);

//       // ---------- BARCODE & QR ----------
//       const qrData = `PNR:${pnr} TICKET:${ticketNumber}`;
//       const qrImage = await QRCode.toDataURL(qrData);
//       doc.image(qrImage, doc.page.width - 140, 650, { width: 100, height: 100 });
//       doc.rect(40, 650, 300, 40).stroke('#000000');
//       doc.fillColor('#000000').fontSize(8).text(`PNR: ${pnr} | TICKET: ${ticketNumber}`, 45, 660);

//       // ---------- FOOTER ----------
//       doc.fillColor('#6B7280').fontSize(7)
//         .text('This document is valid for travel and must be presented with government-issued photo ID.', 40, 780, { width: doc.page.width - 80, align: 'center' })
//         .text('FareBuzzer Travel • support@farebuzzer.com • +1-800-123-4567 • www.farebuzzer.com', 40, 800, { width: doc.page.width - 80, align: 'center' });

//       doc.end();
//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);

//     } catch (err) {
//       reject(err);
//     }
//   });
// };


//--
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

// Layout constants for consistent spacing
const LAYOUT = {
  MARGIN: 40,
  SECTION_SPACING: 20,
  BOX_SPACING: 15,
  LINE_HEIGHT: 15,
  SMALL_SPACING: 5,
  FOOTER_HEIGHT: 60
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
  
  // Fare type
  doc.fontSize(12)
     .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 410, boxY + 25);
  
  doc.moveDown(3);
  return doc.y;
};

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
  
  // Flight data
  doc.fillColor('#000000')
     .fontSize(12)
     .font('Helvetica')
     .text(data.airlineCode || 'AA 1234', LAYOUT.MARGIN + 10, flightRowY)
     .text(data.departure.toUpperCase(), LAYOUT.MARGIN + 110, flightRowY)
     .text(data.arrival.toUpperCase(), LAYOUT.MARGIN + 260, flightRowY)
     .text(data.duration || '2h 30m', LAYOUT.MARGIN + 360, flightRowY)
     .text(data.cabinClass || 'ECONOMY', LAYOUT.MARGIN + 440, flightRowY);
  
  // Departure details
  doc.fillColor('#6B7280')
     .fontSize(10)
     .font('Helvetica-Oblique')
     .text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 110, flightRowY + 15)
     .text(`Time: ${data.departureTime || '14:30'}`, LAYOUT.MARGIN + 110, flightRowY + 30)
     .text(`Terminal: ${data.departureTerminal || 'T1'}`, LAYOUT.MARGIN + 110, flightRowY + 45)
     .text(`Gate: To be announced`, LAYOUT.MARGIN + 110, flightRowY + 60);
  
  // Arrival details
  doc.text(`Date: ${data.travelDate}`, LAYOUT.MARGIN + 260, flightRowY + 15)
     .text(`Time: ${data.arrivalTime || '17:00'}`, LAYOUT.MARGIN + 260, flightRowY + 30)
     .text(`Terminal: ${data.arrivalTerminal || 'T2'}`, LAYOUT.MARGIN + 260, flightRowY + 45)
     .text(`Seat: To be assigned at check-in`, LAYOUT.MARGIN + 260, flightRowY + 60);
  
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
       `Check-in opens 24 hours before departure at ${data.airline}.com or via mobile app`,
       `Baggage allowance: 1 carry-on (max 7kg) + 1 personal item`,
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
  const issuedDate = formatDate();
  doc.fillColor('#6B7280')
     .fontSize(8)
     .text(`Charged to card ending in 2180 • ${issuedDate}`, 
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
  
  doc.fillColor('#6B7280')
     .fontSize(7)
     .text(
       'This document is valid for travel and must be presented with government-issued photo ID.',
       LAYOUT.MARGIN,
       footerY,
       { 
         width: doc.page.width - (LAYOUT.MARGIN * 2), 
         align: 'center' 
       }
     )
     .text(
       'FareBuzzer Travel • support@farebuzzer.com • +1-800-123-4567 • www.farebuzzer.com',
       LAYOUT.MARGIN,
       footerY + 15,
       { 
         width: doc.page.width - (LAYOUT.MARGIN * 2), 
         align: 'center' 
       }
     );
};

export const generateETicket = async (data) => {
  if (!data.confirmationNumber) {
    throw new Error("confirmationNumber missing for ticket generation");
  }

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

      // Generate ticket identifiers
      const pnr = generatePNR();
      const ticketNumber = generateTicketNumber(data.airline);

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