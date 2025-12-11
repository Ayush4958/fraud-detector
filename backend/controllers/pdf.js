import { supabase } from "../lib/supabase.js";
import { createDisputePDF } from "../services/pdf.js";

export async function downloadCounterBillPDF(req, res) {
  try {
    const { counterBillId } = req.params;

    // ✅ 1. Fetch dispute letter from DB
    const { data, error } = await supabase
      .from("counter_bills")
      .select("dispute_letter")
      .eq("id", counterBillId)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: "Counter bill not found" });
    }

    // ✅ 2. Convert to PDF
    const pdfBuffer = await createDisputePDF(data.dispute_letter);

    // ✅ 3. Send file to user
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=counter-bill.pdf");

    res.set({
  "Content-Type": "application/pdf",
  "Content-Disposition": 'attachment; filename="dispute-letter.pdf"',
  "Content-Length": pdfBuffer.length,
});

res.send(pdfBuffer);
    
  } catch (err) {
    console.error("PDF Error:", err);
    res.status(500).json({ success: false, message: "Failed to generate PDF" });
  }
}
