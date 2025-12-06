import { getUser } from "../services/authUser.js";
import { scanInvoice } from "../services/scan.js";
import supabase from "../lib/supabase.js";

// import { getUser } from "../services/authUser.js";

export async function scanDocument(req, res) {

  try {

  const user = await getUser(req);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login first."
    });
  }

  const userId = user.id;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // 1. Perform scan
    const result = await scanInvoice(file);

    // 2. Store in DB
    const { data, error: dbError } = await supabase
      .from("scans")
      .insert({
        user_id: user.id,
        original_text: result.extracted_text,
        fraud_report: result.fraud_report,
        severity_score: result.fraud_report?.severity_score,
        fraud_detected: result.fraud_report?.fraud_detected
      })
      .select()
      .single();

    if (dbError) {
      console.log(dbError);
      return res.status(500).json({
        success: false,
        message: "Failed to store scan result",
      });
    }

    return res.status(200).json({
      success: true,
      scanId: data.id,
      result
    });

  } 

  catch (err) {
    console.error("Scan Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to scan document",
    });
  }

}
