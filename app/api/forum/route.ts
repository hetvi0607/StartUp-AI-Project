import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(4),
  body: z.string().min(12),
  tags: z.preprocess(
    (value) => (typeof value === "string" ? value.split(",").map((tag) => tag.trim()).filter(Boolean) : value),
    z.array(z.string()).default([])
  )
});

export async function GET() {
  const posts = await prisma.forumPost.findMany({
    include: {
      author: { select: { name: true, image: true, role: true } },
      comments: true,
      likes: true
    },
    orderBy: { updatedAt: "desc" },
    take: 50
  });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const contentType = request.headers.get("content-type") ?? "";
  const input =
    contentType.includes("application/json")
      ? schema.parse(await request.json())
      : schema.parse(Object.fromEntries(await request.formData()));
  const post = await prisma.forumPost.create({ data: { ...input, authorId: session.user.id } });
  if (!contentType.includes("application/json")) {
    return NextResponse.redirect(new URL("/community", request.url));
  }
  return NextResponse.json({ post }, { status: 201 });
}
