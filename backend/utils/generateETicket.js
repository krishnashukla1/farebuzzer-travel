import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateETicket = async (data) => {
  const filePath = path.join(
    process.cwd(),
    "tmp",
    `e-ticket-${data.confirmationNumber}.pdf`
  );

  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // HEADER
    doc.fontSize(20).text("ELECTRONIC TICKET (E-TICKET)", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Booking Reference: ${data.confirmationNumber}`);
    doc.text(`Issued By: ${data.chargeReference}`);
    doc.moveDown();

    // PASSENGER
    doc.fontSize(14).text("Passenger Details", { underline: true });
    doc.fontSize(11).text(`Name: ${data.customerName}`);
    doc.text(`Email: ${data.billingEmail}`);
    doc.text(`Phone: ${data.customerPhone}`);
    doc.moveDown();

    // FLIGHT
    doc.fontSize(14).text("Flight Information", { underline: true });
    doc.fontSize(11)
      .text(`Airline: ${data.airline}`)
      .text(`Route: ${data.departure} → ${data.arrival}`)
      .text(`Date: ${data.travelDate}`)
      .text(`Ticket Type: Economy Class`);
    doc.moveDown();

    // PAYMENT
    doc.fontSize(14).text("Payment Summary", { underline: true });
    doc.fontSize(11)
      .text(`Amount Paid: USD ${data.bookingAmount}`)
      .text(`Charged As: ${data.chargeReference}`)
      .text(`Card: **** **** **** 2180`);
    doc.moveDown();

    // TERMS
    doc.fontSize(9).text(
      "This ticket is non-refundable and non-transferable unless otherwise stated. " +
      "Please arrive at the airport at least 3 hours prior to departure.",
      { align: "justify" }
    );

    doc.end();

    stream.on("finish", () => resolve(filePath));
  });
};
