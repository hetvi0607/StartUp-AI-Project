import Link from "next/link";
import { BarChart3, Bot, BriefcaseBusiness, Compass, LayoutDashboard, MessageSquare, Shield, Sparkles, Users, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/marketplace", label: "Marketplace", icon: Compass },
  { href: "/advisor", label: "AI Advisor", icon: Bot },
  { href: "/cofounders", label: "Co-founders", icon: Users },
  { href: "/workspace", label: "Workspace", icon: BriefcaseBusiness },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/investors", label: "Investors", icon: WalletCards },
  { href: "/pitch-deck", label: "Pitch Deck", icon: Sparkles },
  { href: "/admin", label: "Admin", icon: Shield }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background bg-aurora-grid mesh">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-border bg-primary/75 p-5 backdrop-blur-xl lg:block">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold text-white">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-blue shadow-glow">
            <BarChart3 className="h-5 w-5" />
          </span>
          StartupHub AI
        </Link>
        <nav className="mt-8 grid gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="lg:pl-72">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/70 px-4 backdrop-blur-xl md:px-8">
          <Link href="/" className="font-semibold text-white lg:hidden">StartupHub AI</Link>
          <div className="hidden text-sm text-slate-400 md:block">Founder command center</div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="secondary" size="sm"><Link href="/profile">Profile</Link></Button>
            <Button asChild size="sm"><Link href="/advisor">Ask AI</Link></Button>
          </div>
        </header>
        <div className="px-4 py-6 md:px-8">{children}</div>
      </section>
    </main>
  );
}
