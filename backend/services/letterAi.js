// src/services/letterAi.js
import { openai } from "../lib/openAi.js"; // adjust path if needed

/**
 * Uses a small OpenAI model to generate:
 * - explanation[] (bullet points)
 * - disputeLetter (full text)
 *
 * It relies on the already computed hybrid summary, not on raw text alone.
 */
export async function generateLetter({ originalText, fraudReport, hybridSummary }) {
  const prompt = `
You are helping a customer understand and dispute an overcharged or unfair invoice.
You are NOT a lawyer, so do not give legal advice. Just explain and draft a polite letter.

DATA:
- Original invoice text:
${originalText}

- Fraud analysis (JSON):
${JSON.stringify(fraudReport, null, 2)}

- Hybrid correction summary (JSON):
${JSON.stringify(hybridSummary, null, 2)}

Task:
1) Create a short list of 2–4 simple bullet points explaining what looks wrong or unfair on the invoice.
2) Write a polite but firm dispute letter that the customer can send to the business, asking for correction or clarification.

Rules:
- The letter should be respectful, clear, and not aggressive.
- Do NOT mention that an AI generated this.
- Do NOT give legal advice or mention specific laws.
- Assume this is a general consumer complaint, not a court case.

Respond ONLY in valid JSON with this exact structure:

{
  "explanation": ["point 1", "point 2"],
  "dispute_letter": "full letter text here"
}
  `.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You help consumers understand their bills and draft polite complaint letters. You are not a lawyer and do not give legal advice.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content?.trim() || "";

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse letter AI JSON, falling back.", err);
    parsed = {
      explanation: [
        "There appear to be suspicious or unfair charges on this invoice.",
        "The corrected total seems lower than the amount originally billed.",
      ],
      dispute_letter:
        "To Whom It May Concern,\n\nI recently received the attached invoice and, after reviewing the charges, I noticed some amounts that seem unclear or potentially incorrect. I kindly request a detailed explanation or a corrected bill reflecting only fair and agreed-upon charges.\n\nPlease review the fees, taxes, and totals and let me know if an updated invoice can be issued.\n\nThank you for your time and assistance.\n\nSincerely,\n[Your Name]",
    };
  }

  return {
    explanation: parsed.explanation || [],
    disputeLetter: parsed.dispute_letter || "",
  };
}
