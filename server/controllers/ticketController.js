const { generateTicketPDF } = require("../utils/pdfGenerator");
const Ticket = require("../models/Ticket");
const PDFDocument = require("pdfkit");

// Controller function to create a ticket and generate its PDF
const createTicket = async (req, res) => {
  try {
    const formData = req.body;
    const ticket = await Ticket.create(formData);

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
    generateTicketPDF(doc, formData);

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
      "Thank you for choosing us!",
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
