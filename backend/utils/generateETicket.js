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



import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import os from "os";

export const generateETicket = async (data) => {
  if (!data.confirmationNumber) {
    throw new Error("confirmationNumber missing for ticket generation");
  }

  const filePath = path.join(
    os.tmpdir(), // SAFE for servers
    `FareBuzzer-Eticket-${data.confirmationNumber}.pdf`
  );

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      /* ---------- HEADER ---------- */
      doc
        .fontSize(20)
        .text("✈️ FareBuzzer Travel", { align: "center" })
        .moveDown(0.5)
        .fontSize(14)
        .text("Electronic Flight Ticket (E-Ticket)", { align: "center" });

      doc.moveDown();

      /* ---------- BOOKING ---------- */
      doc.fontSize(11)
        .text(`Booking Reference: ${data.confirmationNumber}`)
        .text(`Issued By: ${data.chargeReference || "LowfareStudio"}`)
        .moveDown();

      /* ---------- PASSENGER ---------- */
      doc.fontSize(14).text("Passenger Details", { underline: true });
      doc.fontSize(11)
        .text(`Name: ${data.customerName}`)
        .text(`Email: ${data.billingEmail}`)
        .text(`Phone: ${data.customerPhone}`);

      doc.moveDown();

      /* ---------- FLIGHT ---------- */
      doc.fontSize(14).text("Flight Information", { underline: true });
      doc.fontSize(11)
        .text(`Airline: ${data.airline}`)
        .text(`Route: ${data.departure} → ${data.arrival}`)
        .text(`Date: ${data.travelDate}`)
        .text(`Cabin Class: Economy`);

      doc.moveDown();

      /* ---------- PAYMENT ---------- */
      doc.fontSize(14).text("Payment Summary", { underline: true });
      doc.fontSize(11)
        .text(`Amount Paid: USD ${Number(data.bookingAmount || 0)}`)
        .text(`Charged As: ${data.chargeReference || "LOWFARESTUDIO*TRAVEL"}`)
        .text(`Payment Method: Card (**** **** **** 2180)`);

      doc.moveDown();

      /* ---------- FOOTER ---------- */
      doc
        .fontSize(9)
        .text(
          "This e-ticket is non-refundable and non-transferable unless stated otherwise. " +
          "Please arrive at the airport at least 3 hours before departure.",
          { align: "justify" }
        );

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
};
