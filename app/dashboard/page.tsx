import { Activity, Bell, BrainCircuit, DollarSign } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { KanbanBoard } from "@/components/dashboard/kanban";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MiniGalaxy } from "@/components/three/ai-core";
import { metrics, startups } from "@/lib/demo-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-slate-400">One command center for traction, team, tasks, investors, and AI guidance.</p>
        </div>
        <div className="flex gap-2 text-sm text-slate-300"><Bell className="h-4 w-4 text-cyan" /> 8 founder-critical alerts</div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">{metrics.map((metric) => <StatCard key={metric.label} {...metric} />)}</div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-blue" />Execution Board</CardTitle></CardHeader>
          <CardContent><KanbanBoard /></CardContent>
        </Card>
        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-purple" />AI Signal</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <p>Best next move: convert marketplace search data into a founder onboarding wedge for B2B teams.</p>
              <p className="text-success">Confidence 87% based on activation, investor fit, and demand density.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-success" />Fundraising Pipeline</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {startups.slice(0, 3).map((startup) => (
                <div key={startup.name} className="flex justify-between rounded-md border border-border bg-white/5 p-3 text-sm">
                  <span className="text-white">{startup.name}</span><span className="text-slate-400">{startup.raise}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <MiniGalaxy />
        </div>
      </div>
    </AppShell>
  );
}
