import { openai } from "../lib/openAi.js";

export async function analyzeFraud(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `
Analyze this invoice/bill for fraud, corruption, scams, illegal charges, etc.

Detect:
- Duplicate charges
- Service manipulation
- Overpricing
- Missing legal details
- Fake taxes
- Illogical fees
- Window dressing or inflated entries
- Misuse of codes
- Illegal billing patterns
- Red flags found in hospital bills or service invoices

Return response in JSON:
{
  "is_suspicious": boolean,
  "suspicious_items": [],
  "severity_score": 0-100,
  "summary": "",
  "suggestions": []
}

Text:
${text}
`
      }
    ]
  });

  return response.choices[0].message.content;
}
