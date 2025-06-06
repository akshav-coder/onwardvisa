// pdfGenerator.js
const PDFDocument = require("pdfkit");

function generateTicketPDF(doc, formData) {
  // --- Header ---
  doc.rect(0, 0, doc.page.width, 60).fill("#102781");
  doc
    .fillColor("#fff")
    .fontSize(26)
    .font("Helvetica-Bold")
    .text("OnwardVisa Booking Confirmation", 0, 20, {
      align: "center",
    });

  doc.moveDown(3);
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
  addDetail("Name", formData.fullName);
  addDetail("Email", formData.email);
  addDetail("Booking Type", formData.type);
  if (formData.tripType) addDetail("Trip Type", formData.tripType);
  addDetail("From", formData.from);
  addDetail("To", formData.to);
  addDetail("Departure", formData.departureDate);
  if (formData.returnDate) addDetail("Return", formData.returnDate);
  if (formData.travelers) addDetail("Travelers", formData.travelers);
  if (formData.hotelName) addDetail("Hotel", formData.hotelName);
  if (formData.destinationCountry)
    addDetail("Destination", formData.destinationCountry);
  if (Array.isArray(formData.multiCity) && formData.multiCity.length > 0) {
    formData.multiCity.forEach((leg, i) => {
      addDetail(`Leg ${i + 1}`, `${leg.from} -> ${leg.to} on ${leg.date}`);
    });
  }
  doc.moveDown(0.5);
  doc
    .fontSize(14)
    .fillColor("#333")
    .text("Additional Details:", { align: "left" });
  doc.moveDown(0.5);
  const commonFields = [
    "fullName",
    "email",
    "type",
    "tripType",
    "from",
    "to",
    "departureDate",
    "returnDate",
    "travelers",
    "hotelName",
    "destinationCountry",
    "multiCity",
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
