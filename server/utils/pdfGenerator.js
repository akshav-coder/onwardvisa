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

  doc.moveDown(2);

  const addSectionTitle = (title) => {
    doc
      .fontSize(16)
      .fillColor("#102781")
      .font("Helvetica-Bold")
      .text(title, { underline: true });
    doc.moveDown(0.5);
  };

  const addDetail = (label, value) => {
    if (value) {
      doc
        .fontSize(12)
        .fillColor("#333")
        .font("Helvetica-Bold")
        .text(label + ":", { continued: true });
      doc
        .font("Helvetica")
        .fillColor("#555")
        .text(" " + value);
      doc.moveDown(0.25);
    }
  };

  addSectionTitle("Guest Information");
  if (Array.isArray(formData.guests) && formData.guests.length > 0) {
    const g = formData.guests[0];
    addDetail("Name", `${g.title || ""} ${g.firstName} ${g.lastName}`.trim());
    addDetail("Email", g.email);
    addDetail("Phone", g.phone);
  } else {
    addDetail("Name", formData.fullName);
    addDetail("Email", formData.email);
  }

  if (formData.type === "flight" || formData.type === "both") {
    doc.moveDown(0.5);
    addSectionTitle("Flight Details");
    if (formData.tripType === "multicity" && Array.isArray(formData.multiCity)) {
      formData.multiCity.forEach((leg, i) => {
        addDetail(`Leg ${i + 1}`, `${leg.from} -> ${leg.to} on ${leg.date}`);
      });
    } else {
      addDetail("From", formData.from);
      addDetail("To", formData.to);
      addDetail("Departure", formData.departureDate);
      if (formData.returnDate) addDetail("Return", formData.returnDate);
      if (formData.travelers) addDetail("Travelers", formData.travelers);
    }
  }

  if (formData.type === "hotel" || formData.type === "both") {
    doc.moveDown(0.5);
    addSectionTitle("Hotel Details");
    addDetail("Hotel", formData.hotelName);
    addDetail("City", formData.place || formData.destinationCountry);
    addDetail("Check-In", formData.checkInDate);
    addDetail("Check-Out", formData.checkOutDate);
    if (formData.adults) addDetail("Adults", formData.adults);
  }

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
    "place",
    "checkInDate",
    "checkOutDate",
    "adults",
    "guests",
    "payment",
  ];

  const additionalEntries = Object.entries(formData).filter(
    ([key, value]) => !commonFields.includes(key) && value
  );
  if (additionalEntries.length) {
    doc.moveDown(0.5);
    addSectionTitle("Additional Details");
    additionalEntries.forEach(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      addDetail(formattedKey, value);
    });
  }
}

module.exports = { generateTicketPDF };
