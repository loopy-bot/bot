import * as gemini from "./gemini.js";
import * as openai from "./openai.js";
import * as qwen from "./qwen.js";
import { AI_MODAL } from "../../../config.js";

export const createAI = (mode = AI_MODAL) => {
  if (mode === "openai") return openai.reply;
  if (mode === "gemini") return gemini.reply;
  if (mode === "qwen") return qwen.reply;
};
export const reply = createAI();
