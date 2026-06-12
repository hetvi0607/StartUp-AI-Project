import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between text-sm text-slate-400">
          {label}
          <span className="inline-flex items-center gap-1 text-success"><ArrowUpRight className="h-4 w-4" />{trend}</span>
        </div>
        <div className="mt-4 text-3xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
