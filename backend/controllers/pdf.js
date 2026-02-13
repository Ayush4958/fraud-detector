import { supabase } from "../lib/supabase.js";
import { createDisputePDF } from "../services/pdf.js";

export async function downloadCounterBillPDF(req, res) {
  try {
    const { counterId } = req.params;

    console.log('📥 PDF Download requested for counter ID:', counterId);

    // ✅ 1. Fetch dispute letter from DB
    const { data, error } = await supabase
      .from("counter_bills")
      .select("dispute_letter")
      .eq("id", counterId)
      .single();

    if (error || !data) {
      console.error('❌ Counter bill not found:', error);
      return res.status(404).json({ success: false, message: "Counter bill not found" });
    }

    if (!data.dispute_letter) {
      console.error('❌ No dispute letter found in counter bill');
      return res.status(404).json({ success: false, message: "No dispute letter found" });
    }

    console.log('✅ Found dispute letter, generating PDF...');

    // ✅ 2. Convert to PDF Buffer
    const pdfBuffer = await createDisputePDF(data.dispute_letter);

    console.log('✅ PDF generated successfully, size:', pdfBuffer.length, 'bytes');

    // ✅ 3. Send PDF to client
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="dispute-letter.pdf"',
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);

  } catch (err) {
    console.error("❌ PDF Error:", err);
    res.status(500).json({ success: false, message: "Failed to generate PDF" });
  }
}
