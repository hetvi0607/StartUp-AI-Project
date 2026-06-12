import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateStartupAdvice } from "@/lib/openai";

const schema = z.object({
  prompt: z.string().min(10),
  mode: z.enum(["advisor", "market", "growth", "fundraising"]).default("advisor")
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const input = schema.parse(await request.json());
    const response = await generateStartupAdvice(`[${input.mode}] ${input.prompt}`);
    const chat = await prisma.aIChat.create({
      data: {
        userId: session.user.id,
        prompt: input.prompt,
        mode: input.mode,
        response: JSON.stringify(response)
      }
    });
    return NextResponse.json({ chat, response });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Advisor failed" }, { status: 400 });
  }
}
