import Tesseract from "tesseract.js";

export async function extractTextWithTesseract(fileBuffer) {

  try {
    const result = await Tesseract.recognize(fileBuffer, "eng");
    return result.data.text;
  } 

  catch (error) {
    console.error("Tesseract OCR Error:", error);
    throw new Error("Failed to extract text (Tesseract)");
  }

}

// import Tesseract from "tesseract.js";

// export async function extractTextWithTesseract(fileBuffer) {
//   try {
//     const result = await Tesseract.recognize(fileBuffer, "eng", {
//       cacheMethod: "none",
//     });
//     return result.data.text;
//   } catch (error) {
//     console.error("Tesseract OCR Error:", error);
//     throw new Error("Failed to extract text (Tesseract)");
//   }
// }

