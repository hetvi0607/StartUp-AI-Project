import { ShieldCheck, Users, WalletCards } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <AppShell>
      <h1 className="mb-6 text-3xl font-bold text-white">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Users" value="48,290" trend="+11%" />
        <StatCard label="Investor approvals" value="1,204" trend="+8%" />
        <StatCard label="Flagged posts" value="17" trend="-4%" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: Users, title: "Role-Based Access", body: "Promote founders, investors, mentors, and admins from one governance surface." },
          { icon: ShieldCheck, title: "Trust Controls", body: "Moderate forum activity, startup listings, investor claims, and suspicious messaging." },
          { icon: WalletCards, title: "Capital Ops", body: "Review investor applications and track intro quality across the platform." }
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader><CardTitle className="flex items-center gap-2"><item.icon className="h-5 w-5 text-cyan" />{item.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-300">{item.body}</CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
