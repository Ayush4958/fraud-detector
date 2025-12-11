import { supabase } from "../lib/supabase.js";
import { buildCounterBill } from "../services/counter.js";
import { getUser } from "../services/authUser.js";

export async function generateCounterBill(req, res) {
  try {
    const { scanId } = req.params;

    const user = await getUser(req);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login first."
    });
  }

  const userId = user.id;

    // ✅ 2. Fetch scan from DB
    const { data: scan, error: scanError } = await supabase
      .from("scans")
      .select("*")
      .eq("id", scanId)
      .single();

    if (scanError || !scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    // ✅ 3. Build hybrid counter bill
    const counterResult = await buildCounterBill({
      originalText: scan.original_text,
      fraudReport: scan.fraud_report,
    });

    // ✅ 4. Store in counter_bills table
    const { data: counterRow, error: insertError } = await supabase
      .from("counter_bills")
      .insert({
        scan_id: scan.id,
        user_id: userId,
        original_total: counterResult.original_total,
        corrected_total: counterResult.corrected_total,
        estimated_overcharge: counterResult.estimated_overcharge,
        removed_items: counterResult.removed_items,
        corrected_items: counterResult.corrected_items,
        explanation: counterResult.explanation.join("\n"),
        dispute_letter: counterResult.dispute_letter,
      })
      .select()
      .single();

    if (insertError) {
      console.error("DB Insert Error:", insertError);
      return res.status(500).json({
        success: false,
        message: "Failed to store counter bill",
      });
    }

    // ✅ 5. Update scan status
    await supabase
      .from("scans")
      .update({
        counter_generated: true,
        counter_summary: `Overcharge: ₹${counterResult.estimated_overcharge}`,
      })
      .eq("id", scan.id);

    // ✅ 6. Final Response
    return res.status(200).json({
      success: true,
      message: "Counter bill generated successfully",
      counter_bill_id: counterRow.id,
      data: counterResult,
    });

  } catch (error) {
    console.error("Counter Bill Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate counter bill",
    });
  }
}
