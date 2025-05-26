const Ticket = require("../models/Ticket");
const PDFDocument = require("pdfkit");

const createTicket = async (req, res) => {
  try {
    const formData = req.body;
    const ticket = await Ticket.create(formData);

    // Generate PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="ticket.pdf"');
    doc.pipe(res);

    doc.fontSize(20).text("Ticket Details", { align: "center" });
    doc.moveDown();
    Object.entries(formData).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${value}`);
    });
    doc.end();
    // No need to send res.status(200).json, as PDF is being streamed
  } catch (error) {
    res.status(500).json({ message: "Something went wrong ❌", error });
  }
};

module.exports = { createTicket };
