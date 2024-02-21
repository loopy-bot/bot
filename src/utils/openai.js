import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

export async function reply(prefix, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `${prefix} \n \n ${content}` }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
