import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { startups } from "@/lib/demo-data";

export default function MarketplacePage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Startup Marketplace</h1>
        <p className="mt-2 text-slate-400">Discover, filter, bookmark, and evaluate startup opportunities.</p>
      </div>
      <form className="mb-6 flex flex-col gap-3 md:flex-row" action="/marketplace">
        <div className="relative flex-1"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><Input name="q" className="pl-9" placeholder="Search by sector, stage, traction, founder..." /></div>
        <Button type="submit"><SlidersHorizontal className="h-4 w-4" />Apply filters</Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {startups.map((startup) => (
          <Card key={startup.name}>
            <CardHeader>
              <div className="flex items-center justify-between"><Badge>{startup.stage}</Badge><span className="text-sm text-success">{startup.score}%</span></div>
              <CardTitle>{startup.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-300">{startup.category} company raising {startup.raise} with strong founder-market fit.</p>
              <Button asChild className="w-full" variant="secondary"><Link href={`/advisor?startup=${startup.name}`}>Analyze startup</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
