import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  headline: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  skills: z.string().optional()
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = schema.parse(Object.fromEntries(await request.formData()));
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: input.name,
      headline: input.headline,
      location: input.location,
      bio: input.bio,
      skills: input.skills?.split(",").map((skill) => skill.trim()).filter(Boolean) ?? []
    },
    select: { id: true, name: true, headline: true, location: true, bio: true, skills: true }
  });
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.json({ user });
}
