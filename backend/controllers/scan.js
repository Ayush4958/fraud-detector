import { scanInvoice } from "../services/scan.js";

export async function scanDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not found" });
    }

    const result = await scanInvoice(req.file);

    return res.json({
      success: true,
      data: result
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to scan document",
      error: err.message
    });
  }
}
