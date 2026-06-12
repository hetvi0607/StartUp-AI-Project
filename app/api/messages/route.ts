import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  content: z.string().min(1),
  channel: z.string().default("general"),
  recipientId: z.string().optional()
});

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const channel = searchParams.get("channel") ?? "general";
  const messages = await prisma.message.findMany({
    where: { channel },
    include: { sender: { select: { id: true, name: true, image: true } } },
    orderBy: { createdAt: "asc" },
    take: 100
  });
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = schema.parse(await request.json());
  const message = await prisma.message.create({
    data: { ...input, senderId: session.user.id },
    include: { sender: { select: { id: true, name: true, image: true } } }
  });
  return NextResponse.json({ message }, { status: 201 });
}
