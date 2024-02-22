import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "../../../config.js";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// ...
export async function reply(prefix, prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prefix + prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
