import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Network, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";
import { AICoreScene, MiniGalaxy } from "@/components/three/ai-core";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { metrics, startups } from "@/lib/demo-data";

const capabilities = [
  { icon: Rocket, title: "Startup Marketplace", body: "Rank ideas by demand, traction, category, and investor relevance." },
  { icon: Users, title: "Co-founder Matching", body: "Match by skill gaps, working style, equity appetite, and domain conviction." },
  { icon: Sparkles, title: "AI Operating Partner", body: "Generate strategy, research, pitch decks, experiments, and investor memos." },
  { icon: Network, title: "Investor Network Globe", body: "Map warm paths to investors by thesis, check size, and portfolio adjacency." }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background bg-aurora-grid mesh">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold text-white">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-blue shadow-glow"><Cpu className="h-5 w-5" /></span>
          StartupHub AI
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/advisor">Advisor</Link>
          <Link href="/investors">Investors</Link>
          <Link href="/community">Community</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="secondary" size="sm"><Link href="/login">Login</Link></Button>
          <Button asChild size="sm"><Link href="/register">Start free</Link></Button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Badge className="border-cyan/30 bg-cyan/10 text-cyan">AI-native founder operating system</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-normal text-white md:text-7xl">
            StartupHub AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Discover investable startup ideas, recruit co-founders, run product execution, collaborate in real time, and turn messy founder questions into crisp AI-backed decisions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/dashboard">Open dashboard <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="secondary" size="lg"><Link href="/pitch-deck">Generate pitch deck</Link></Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["SOC2-ready architecture", "Realtime collaboration", "Role-based access"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-success" />{item}</div>
            ))}
          </div>
        </div>
        <AICoreScene />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-5">
                <div className="text-sm text-slate-400">{metric.label}</div>
                <div className="mt-3 text-3xl font-bold text-white">{metric.value}</div>
                <div className="mt-2 text-sm text-success">{metric.trend} this quarter</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 md:grid-cols-2 md:px-6">
        <div className="grid gap-4">
          {capabilities.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><item.icon className="h-5 w-5 text-cyan" />{item.title}</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm leading-6 text-slate-300">{item.body}</p></CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader><CardTitle>Startup Galaxy</CardTitle></CardHeader>
          <CardContent>
            <MiniGalaxy />
            <div className="mt-5 grid gap-3">
              {startups.map((startup) => (
                <div key={startup.name} className="flex items-center justify-between rounded-md border border-border bg-white/5 p-3">
                  <div>
                    <div className="font-medium text-white">{startup.name}</div>
                    <div className="text-xs text-slate-400">{startup.category} · {startup.stage}</div>
                  </div>
                  <Badge>{startup.score}% fit</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-slate-500">
        Deployment-ready Next.js, Prisma, NextAuth, Socket.io, OpenAI, Cloudinary, and React Three Fiber.
      </footer>
    </main>
  );
}
