"use client";

import { useState, useTransition } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdvisorConsole() {
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-cyan" />AI Startup Advisor</CardTitle></CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            startTransition(async () => {
              const response = await fetch("/api/advisor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: form.get("prompt"), mode: form.get("mode") })
              });
              const data = await response.json();
              setResult(JSON.stringify(data.response ?? data, null, 2));
            });
          }}
        >
          <select name="mode" className="h-11 rounded-md border border-border bg-slate-950/70 px-3 text-sm text-white">
            <option value="advisor">Strategy</option>
            <option value="market">Market research</option>
            <option value="growth">Growth experiments</option>
            <option value="fundraising">Fundraising</option>
          </select>
          <Textarea name="prompt" placeholder="Describe your startup, customer, bottleneck, and what decision you need to make." required />
          <Button type="submit" disabled={isPending}><Send className="h-4 w-4" />{isPending ? "Thinking..." : "Generate guidance"}</Button>
        </form>
        {result ? <pre className="mt-5 overflow-auto rounded-md border border-border bg-slate-950/80 p-4 text-sm leading-6 text-slate-200">{result}</pre> : null}
      </CardContent>
    </Card>
  );
}

export function PitchDeckConsole() {
  const [deck, setDeck] = useState("");
  const [isPending, startTransition] = useTransition();
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-purple" />AI Pitch Deck Generator</CardTitle></CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            startTransition(async () => {
              const response = await fetch("/api/pitch-decks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  startup: form.get("startup"),
                  market: form.get("market"),
                  businessModel: form.get("businessModel")
                })
              });
              const data = await response.json();
              setDeck(JSON.stringify(data.deck ?? data, null, 2));
            });
          }}
        >
          <Input name="startup" placeholder="Startup name and one-line concept" required />
          <Input name="market" placeholder="Market and target customer" required />
          <Input name="businessModel" placeholder="Business model and pricing" required />
          <Button type="submit" disabled={isPending}>{isPending ? "Building deck..." : "Generate deck"}</Button>
        </form>
        {deck ? <pre className="mt-5 overflow-auto rounded-md border border-border bg-slate-950/80 p-4 text-sm leading-6 text-slate-200">{deck}</pre> : null}
      </CardContent>
    </Card>
  );
}
