import { AppShell } from "@/components/app-shell";
import { MiniGalaxy } from "@/components/three/ai-core";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { investors } from "@/lib/demo-data";

export default function InvestorsPage() {
  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader><CardTitle>Investor Network Globe</CardTitle></CardHeader>
          <CardContent><MiniGalaxy /></CardContent>
        </Card>
        <div className="grid gap-4">
          {investors.map((investor) => (
            <Card key={investor.firm}>
              <CardContent className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
                <div>
                  <h2 className="font-semibold text-white">{investor.firm}</h2>
                  <p className="mt-1 text-sm text-slate-300">{investor.thesis}</p>
                </div>
                <div className="flex items-center gap-3"><Badge>{investor.check}</Badge><Button asChild><a href={`mailto:intros@startuphub.ai?subject=Investor intro: ${investor.firm}`}>Request intro</a></Button></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
