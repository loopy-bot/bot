import OpenAI from "openai";
import { OPENAI_KEY } from "../../../config.js";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

export async function reply(prefix, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `${prefix} \n \n ${content}` }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
