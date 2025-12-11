import { generateLetter } from "./letterAi.js";

/**
 * Main entry: builds the hybrid counter bill.
 */
export async function buildCounterBill({ originalText, fraudReport }) {
  const {
    fraud_detected,
    severity_score,
    suspicious_terms = [],
    invalid_gst_values = [],
    duplicate_entries = [],
    overpricing_amounts = [],
  } = fraudReport || {};

  // 1. Extract all numbers from the text (rough heuristic)
  const allAmounts = extractNumbers(originalText);
  const originalTotal = allAmounts.length ? Math.max(...allAmounts) : null;

  // 2. Estimate overcharge from fraud report (hybrid: backend math)
  const estimatedOvercharge =
    Array.isArray(overpricing_amounts) && overpricing_amounts.length
      ? overpricing_amounts.reduce((sum, n) => sum + Number(n || 0), 0)
      : 0;

  const correctedTotal =
    originalTotal !== null ? originalTotal - estimatedOvercharge : null;

  // 3. Build corrected_items / removed_items (basic v1)
  // For now we just summarize; later you can map to actual lines.
  const correctedItems = [];
  const removedItems = [];

  if (correctedTotal !== null) {
    correctedItems.push({
      label: "Corrected Total (after removing suspicious/overpriced charges)",
      amount: correctedTotal,
    });
  }

  if (estimatedOvercharge > 0) {
    removedItems.push({
      label: "Estimated overcharged amount (sum of overpriced/suspicious fees)",
      amount: estimatedOvercharge,
    });
  }

  // 4. Hybrid: we DO NOT delete lines from original text;
  // we just compute what the fair total should be.
  const hybridSummary = {
    is_fraudulent: Boolean(fraud_detected),
    severity_score: severity_score ?? null,
    original_total: originalTotal,
    corrected_total: correctedTotal,
    estimated_overcharge: estimatedOvercharge,
    suspicious_terms,
    invalid_gst_values,
    duplicate_entries,
    corrected_items: correctedItems,
    removed_items: removedItems,
  };

  // 5. Ask AI ONLY for explanation + dispute letter (small, cheap call)
  const { explanation, disputeLetter } = await generateLetter({
    originalText,
    fraudReport,
    hybridSummary,
  });

  return {
    ...hybridSummary,
    explanation,
    dispute_letter: disputeLetter,
  };
}

/**
 * Extracts all numeric values from the invoice text.
 * Very simple v1: finds standalone numbers like 450, 675.50, etc.
 */
function extractNumbers(text) {
  if (!text) return [];
  const matches = text.match(/\b\d+(\.\d+)?\b/g);
  if (!matches) return [];
  return matches.map((n) => Number(n));
}
