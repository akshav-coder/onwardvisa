// pdfGenerator.js
const PDFDocument = require("pdfkit");

function generateTicketPDF(doc, formData) {
  doc.font("Helvetica");
  doc.fontSize(28).fillColor("#000").text("Event Ticket", { align: "center" });
  doc.moveDown(0.5);
  doc
    .fontSize(14)
    .fillColor("#555")
    .text("Your Gateway to an Amazing Experience", { align: "center" });
  doc.moveDown(1.5);
  doc
    .strokeColor("#ccc")
    .lineWidth(1)
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .stroke();
  doc.moveDown(1);
  doc
    .fontSize(18)
    .fillColor("#333")
    .text("Ticket Information", { align: "left" });
  doc.moveDown(0.8);
  const addDetail = (label, value) => {
    if (value) {
      doc
        .fontSize(12)
        .fillColor("#666")
        .font("Helvetica-Bold")
        .text(label + ":", { continued: true });
      doc
        .font("Helvetica")
        .fillColor("#000")
        .text(" " + value);
      doc.moveDown(0.5);
    }
  };
  addDetail("Ticket ID", formData.ticketId || "N/A");
  addDetail("Event Name", formData.eventName || "N/A");
  addDetail("Customer Name", formData.customerName || "N/A");
  addDetail("Date", formData.date || "N/A");
  addDetail("Time", formData.time || "N/A");
  addDetail("Location", formData.location || "N/A");
  addDetail("Price", formData.price ? "$" + formData.price : "N/A");
  addDetail("Seat", formData.seat || "N/A");
  doc.moveDown(0.5);
  doc
    .fontSize(14)
    .fillColor("#333")
    .text("Additional Details:", { align: "left" });
  doc.moveDown(0.5);
  const commonFields = [
    "ticketId",
    "eventName",
    "customerName",
    "date",
    "time",
    "location",
    "price",
    "seat",
  ];
  Object.entries(formData).forEach(([key, value]) => {
    if (!commonFields.includes(key) && value) {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      addDetail(formattedKey, value);
    }
  });
}

module.exports = { generateTicketPDF };
