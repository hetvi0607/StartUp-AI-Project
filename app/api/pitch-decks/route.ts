import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { generateStartupAdvice } from "@/lib/openai";

const schema = z.object({
  startup: z.string().min(2),
  market: z.string().min(2),
  businessModel: z.string().min(2)
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const input = schema.parse(await request.json());
  const deck = await generateStartupAdvice(
    `Generate a 10-slide investor pitch deck outline for ${input.startup}. Market: ${input.market}. Model: ${input.businessModel}. Return JSON with slides array.`
  );
  return NextResponse.json({ deck });
}
