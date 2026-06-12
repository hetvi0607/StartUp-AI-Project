import { AppShell } from "@/components/app-shell";
import { AdvisorConsole } from "@/components/ai-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdvisorPage() {
  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.45fr]">
        <AdvisorConsole />
        <Card>
          <CardHeader><CardTitle>Advisor Memory</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <p>StartupHub stores AI chat history in the AIChat model so strategy threads can become durable operating context.</p>
            <p>Modes are optimized for strategy, market research, growth, and fundraising.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
