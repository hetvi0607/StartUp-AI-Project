import OpenAI from "openai";

export const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateStartupAdvice(prompt: string) {
  if (!openai) {
    return {
      summary: "OpenAI is not configured yet. Add OPENAI_API_KEY to enable live strategy generation.",
      actions: [
        "Define a narrow ICP and painful workflow.",
        "Interview ten buyers before building deeper automation.",
        "Ship one measurable activation loop this week."
      ]
    };
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are StartupHub AI, a precise startup operator. Return JSON with summary and actions array. Be candid, specific, and investor-grade."
      },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0]?.message.content ?? "{}");
}
