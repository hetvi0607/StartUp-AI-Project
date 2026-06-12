import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-border bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-200", className)}>
      {children}
    </span>
  );
}
