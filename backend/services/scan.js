import { extractText } from "./ocr.js";
import { extractTextWithTesseract } from "./tesseract.js";
import { analyzeFraud } from "./fraud.js";

export async function scanInvoice(file) {

  try { 
    // Extract text using OpenAI OCR
    // const text = await extractText(file.buffer);
    
    // Extracting text using Tesseract
    const text = await extractTextWithTesseract(file.buffer);
    
    const report = await analyzeFraud(text);
    
    return {
      extracted_text: text,
      fraud_report: JSON.parse(report) 
    };
  }

  catch(error){
    console.error("Scan Invoice Error:", error);
    throw new Error("Failed to scan invoice");
  }

}
