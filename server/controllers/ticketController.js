const Ticket = require("../models/Ticket");
const PDFDocument = require("pdfkit");

const createTicket = async (req, res) => {
  try {
    const formData = req.body;
    // Assuming Ticket.create(formData) successfully saves the data and returns the ticket.
    // The formData object is used directly for PDF generation.
    const ticket = await Ticket.create(formData);

    // Initialize PDFDocument with A4 size and custom margins
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="ticket.pdf"');
    doc.pipe(res); // Pipe the PDF to the response stream

    // --- PDF Design Improvements Start Here ---

    // Set the default font for the document
    doc.font("Helvetica");

    // Header Section
    doc
      .fontSize(28) // Larger font size for the main title
      .fillColor("#000") // Black color
      .text("Event Ticket", { align: "center" }); // Centered main title

    doc.moveDown(0.5); // Move down half a line

    doc
      .fontSize(14) // Smaller font for the subtitle
      .fillColor("#555") // Dark gray color
      .text("Your Gateway to an Amazing Experience", { align: "center" }); // Centered subtitle

    doc.moveDown(1.5); // Move down for spacing

    // Horizontal Line Separator
    doc
      .strokeColor("#ccc") // Light gray stroke color
      .lineWidth(1) // Thin line
      .moveTo(doc.page.margins.left, doc.y) // Start from left margin at current Y position
      .lineTo(doc.page.width - doc.page.margins.right, doc.y) // End at right margin at current Y position
      .stroke(); // Draw the line
    doc.moveDown(1); // Move down after the line

    // Ticket Information Section Title
    doc
      .fontSize(18) // Medium font size for section title
      .fillColor("#333") // Darker gray color
      .text("Ticket Information", { align: "left" }); // Left-aligned section title

    doc.moveDown(0.8); // Move down for spacing

    // Helper function to add a detail row (label: value)
    const addDetail = (label, value) => {
      // Only add the detail if a value exists
      if (value) {
        doc
          .fontSize(12) // Standard font size for details
          .fillColor("#666") // Gray color for label
          .font("Helvetica-Bold") // Bold font for label
          .text(`${label}:`, { continued: true }); // Label, continued on the same line

        doc
          .font("Helvetica") // Regular font for value
          .fillColor("#000") // Black color for value
          .text(` ${value}`); // Value, appended to the label

        doc.moveDown(0.5); // Small spacing after each detail row
      }
    };

    // Display common ticket fields in a structured way
    addDetail("Ticket ID", formData.ticketId || "N/A");
    addDetail("Event Name", formData.eventName || "N/A");
    addDetail("Customer Name", formData.customerName || "N/A");
    addDetail("Date", formData.date || "N/A");
    addDetail("Time", formData.time || "N/A");
    addDetail("Location", formData.location || "N/A");
    addDetail("Price", formData.price ? `$${formData.price}` : "N/A"); // Format price with a dollar sign
    addDetail("Seat", formData.seat || "N/A");

    // Add a section for any additional details not explicitly listed above
    doc.moveDown(0.5);
    doc
      .fontSize(14)
      .fillColor("#333")
      .text("Additional Details:", { align: "left" });
    doc.moveDown(0.5);

    // Iterate through all formData keys and add any not already processed
    Object.entries(formData).forEach(([key, value]) => {
      // List of common fields already handled
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
      // If the key is not in the common fields and has a value, add it
      if (!commonFields.includes(key) && value) {
        // Format the key to be more readable (e.g., "ticketId" becomes "Ticket Id")
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        addDetail(formattedKey, value);
      }
    });

    // --- PDF Design Improvements End Here ---

    // Footer Section
    // Calculate the Y position for the footer to place it near the bottom
    // We subtract from page height to ensure it's positioned correctly from the bottom edge.
    const footerY = doc.page.height - doc.page.margins.bottom - 40; // 40 units from the bottom margin

    doc
      .fontSize(10) // Small font size for footer
      .fillColor("#999") // Light gray color for footer
      .text(
        `Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        doc.page.margins.left,
        footerY,
        {
          align: "center",
          width:
            doc.page.width - doc.page.margins.left - doc.page.margins.right,
        }
      ); // Centered date/time within the content width
    doc.text(
      "Thank you for choosing us!",
      doc.page.margins.left,
      footerY + 12,
      {
        align: "center",
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
      }
    ); // Centered thank you message, slightly below the date

    doc.end(); // Finalize the PDF and send it

    // No need to send res.status(200).json, as PDF is being streamed
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error generating PDF:", error);
    // Send a 500 status with a user-friendly message and the error message
    res
      .status(500)
      .json({ message: "Something went wrong ❌", error: error.message });
  }
};

module.exports = { createTicket };
