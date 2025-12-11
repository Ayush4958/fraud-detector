import fs from "fs";
import PDFDocument from "pdfkit";

export function createDisputePDF(text) {
  return new Promise((resolve) => {
    const path = `./public/dispute-${Date.now()}.pdf`;
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(18).text("LEGAL DISPUTE LETTER", { align: "center" });
      doc.moveDown(2);
    doc.fontSize(12).text(text);
    doc.end();

    resolve(path);
  });
}
