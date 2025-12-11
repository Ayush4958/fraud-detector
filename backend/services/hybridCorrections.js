exports.applyHybridCorrection = (text, report) => {
  const suspiciousTerms = report.suspicious_terms || [];
  const invalidGST = report.invalid_gst_values || [];
  const duplicateEntries = report.duplicate_entries || [];
  const overpricing = report.overpricing_amounts || [];

  // Extract all numbers from invoice
  const numbers = text.match(/\b\d+(\.\d+)?\b/g)?.map(Number) || [];

  const originalTotal = Math.max(...numbers);

  // Remove overpricing amounts from total
  const removedTotal = overpricing.reduce((sum, n) => sum + n, 0);

  // Normalize GST — if >18%, set to 18%
  let correctedGST = 0;
  if (invalidGST.length) {
    correctedGST = 18; 
  }

  const correctedTotal = originalTotal - removedTotal;

  return {
    is_fraudulent: report.fraud_detected,
    original_total: originalTotal,
    corrected_total: correctedTotal,
    estimated_overcharge: removedTotal,
    removed_items: [
      ...suspiciousTerms.map(t => ({ label: t, reason: "Suspicious fee" })),
      ...duplicateEntries.map(d => ({ label: d, reason: "Duplicate entry" })),
      ...invalidGST.map(g => ({ label: g, reason: "Illegal tax rate" }))
    ],
    corrected_items: [
      { label: "Corrected Base Total", amount: correctedTotal },
      { label: "Valid GST (18%)", amount: correctedTotal * 0.18 }
    ]
  };
};
