import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const founder = await prisma.user.upsert({
    where: { email: "founder@startuphub.ai" },
    update: {},
    create: {
      name: "Hetvi Founder",
      email: "founder@startuphub.ai",
      role: "FOUNDER",
      headline: "AI SaaS Founder",
      location: "San Francisco / Remote",
      skills: ["LLMs", "Product", "GTM", "Fundraising"],
      passwordHash: await bcrypt.hash("startuphub123", 12)
    }
  });

  const startup = await prisma.startup.upsert({
    where: { slug: "helioops" },
    update: {},
    create: {
      name: "HelioOps",
      slug: "helioops",
      tagline: "AI operating layer for climate infrastructure teams",
      description: "HelioOps helps climate operators forecast field risk, prioritize maintenance, and write investor-grade operational updates.",
      category: "Climate AI",
      stage: "MVP",
      traction: "14 design partners, 3 paid pilots",
      revenue: 18000,
      fundingGoal: 1200000,
      founderId: founder.id
    }
  });

  const team = await prisma.team.create({
    data: {
      name: "HelioOps Core",
      startupId: startup.id,
      members: { create: { userId: founder.id, role: "CEO" } }
    }
  });

  const project = await prisma.project.create({
    data: {
      name: "Pilot Launch",
      description: "Ship the first investor-visible customer workflow.",
      ownerId: founder.id,
      startupId: startup.id,
      teamId: team.id
    }
  });

  await prisma.task.createMany({
    data: [
      { title: "Finalize ICP interview synthesis", status: "IN_PROGRESS", projectId: project.id, assigneeId: founder.id },
      { title: "Investor memo v2", status: "REVIEW", projectId: project.id, assigneeId: founder.id },
      { title: "Launch waitlist experiment", status: "TODO", projectId: project.id, assigneeId: founder.id }
    ]
  });

  await prisma.notification.create({
    data: {
      userId: founder.id,
      type: "AI",
      title: "Advisor insight ready",
      body: "Your strongest wedge is climate ops teams with unavoidable compliance reporting."
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
