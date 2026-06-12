import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { founders } from "@/lib/demo-data";

export default function CofoundersPage() {
  return (
    <AppShell>
      <h1 className="mb-2 text-3xl font-bold text-white">Co-Founder Matching</h1>
      <p className="mb-6 text-slate-400">Match with operators who complement your execution gaps and founder style.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {founders.map((founder) => (
          <Card key={founder.name}>
            <CardHeader><CardTitle>{founder.name}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Badge>{founder.fit} match</Badge>
              <p className="text-sm text-slate-300">{founder.role}</p>
              <p className="text-xs text-slate-500">{founder.skills}</p>
              <Button asChild className="w-full"><a href={`mailto:intros@startuphub.ai?subject=Intro request: ${founder.name}`}>Request intro</a></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
