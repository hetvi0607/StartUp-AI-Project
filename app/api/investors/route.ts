import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const investors = await prisma.investor.findMany({
    include: { user: { select: { name: true, image: true, location: true } }, portfolio: { include: { startup: true } } },
    orderBy: { createdAt: "desc" },
    take: 40
  });
  return NextResponse.json({ investors });
}
