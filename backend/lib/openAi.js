import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Check if dev mode is enabled
 * @returns {boolean} true if DEV_MODE=true in .env
 */
export function isDevMode() {
  return process.env.DEV_MODE === 'true';
}
