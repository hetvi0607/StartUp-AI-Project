import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(8),
  description: z.string().min(20),
  category: z.string().min(2),
  stage: z.enum(["IDEA", "VALIDATION", "MVP", "GROWTH", "SCALE"]).default("IDEA"),
  fundingGoal: z.number().int().positive().optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const stage = searchParams.get("stage") ?? undefined;

  const startups = await prisma.startup.findMany({
    where: {
      AND: [
        q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { category: { contains: q, mode: "insensitive" } }] } : {},
        stage ? { stage: stage as never } : {}
      ]
    },
    include: { founder: { select: { name: true, image: true } }, investors: true, bookmarks: true },
    orderBy: { updatedAt: "desc" },
    take: 40
  });

  return NextResponse.json({ startups });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const input = schema.parse(await request.json());
    const startup = await prisma.startup.create({
      data: { ...input, slug: `${slugify(input.name)}-${Date.now()}`, founderId: session.user.id }
    });
    return NextResponse.json({ startup }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create startup" }, { status: 400 });
  }
}
