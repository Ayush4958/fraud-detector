import { openai } from "../lib/openAi.js";

export async function extractText(fileBuffer) {
  const base64 = fileBuffer.toString("base64");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "input_image", image_url: `data:application/pdf;base64,${base64}` },
          { type: "text", text: "Extract all readable text from this document. Return only text." }
        ]
      }
    ]
  });

  return response.choices[0].message.content;
}
