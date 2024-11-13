const PDFDocument = require("pdfkit");

async function pdfGenerator(attendance) {
  const doc = new PDFDocument();

  // Add PDF content
  doc.fontSize(12).text("Attendance Report", { align: "center" });
  doc.moveDown();

  for (const item of attendance) {
    
     return doc
      .fontSize(10)
      .text(`Date: ${item.date.toLocaleDateString()}`)
      .text(`Employee: ${item.userId.name}`)
      .text(`Check-in: ${item.checkIn.toLocaleTimeString()}`)
      .text(`Check-out: ${item.checkOut.toLocaleTimeString()}`)
      .text(`Work Hours: ${item.workHours}`)
      .text(`Status: ${item.status}`)
      .moveDown();
  }
  return doc;
}

module.exports = { pdfGenerator };
