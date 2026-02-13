import PDFDocument from "pdfkit";

export function createDisputePDF(text) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      // Collect PDF data into chunks
      doc.on('data', (chunk) => chunks.push(chunk));

      // When finished, concatenate chunks into a buffer
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });

      // Handle errors
      doc.on('error', (err) => reject(err));

      // Create PDF content
      doc.fontSize(18).text("LEGAL DISPUTE LETTER", { align: "center" });
      doc.moveDown(2);
      doc.fontSize(12).text(text);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
