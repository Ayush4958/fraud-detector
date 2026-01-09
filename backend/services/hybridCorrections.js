export function extractOriginalTotalByLabel(text) {
  if (!text) return null;

  const lines = text.split("\n").map(l => l.trim());

  const totalPatterns = [
    /total\s+due/i,
    /grand\s+total/i,
    /amount\s+payable/i,
    /^total$/i,
    /net\s+amount/i,
  ];

  for (const line of lines) {
    if (totalPatterns.some(rx => rx.test(line))) {
      const match = line.match(/₹?\s*([\d,]+(\.\d{1,2})?)/);
      if (match) {
        return Number(match[1].replace(/,/g, ""));
      }
    }
  }

  return null;
}
