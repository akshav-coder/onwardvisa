const { generateTicketPDF } = require("../utils/pdfGenerator");
const Ticket = require("../models/Ticket");
const PDFDocument = require("pdfkit");
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// Helper to automatically book a hotel using Amadeus API
async function autoBookHotel(place) {
  const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({
    cityCode: place,
  });
  if (!hotelsList.data || hotelsList.data.length === 0) {
    throw new Error("No hotels found for this city");
  }
  return hotelsList.data[0];
}

// Controller function to create a ticket and generate its PDF
const createTicket = async (req, res) => {
  try {
    const formData = req.body;

    const ticketData = { ...formData };

    // If booking a hotel (either standalone or combined), get a hotel name
    if (formData.type === "hotel" || formData.type === "both") {
      const bookedHotel = await autoBookHotel(formData.place);
      ticketData.hotelName = bookedHotel.name;
    }

    const ticket = await Ticket.create(ticketData);

    // Initialize PDFDocument with A4 size and custom margins
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="ticket.pdf"');
    doc.pipe(res);

    // Generate the PDF content
    generateTicketPDF(doc, ticketData);

    // Footer Section
    const footerY = doc.page.height - doc.page.margins.bottom - 40;
    doc
      .fontSize(10)
      .fillColor("#999")
      .text(
        `Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        doc.page.margins.left,
        footerY,
        {
          align: "center",
          width:
            doc.page.width - doc.page.margins.left - doc.page.margins.right,
        }
      );
    doc.text(
      "Thank you for choosing OnwardVisa!",
      doc.page.margins.left,
      footerY + 12,
      {
        align: "center",
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
      }
    );

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res
      .status(500)
      .json({ message: "Something went wrong ❌", error: error.message });
  }
};

module.exports = { createTicket };
