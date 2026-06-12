import { tasks } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const columns = ["Todo", "In progress", "Review", "Done"];

export function KanbanBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {columns.map((column) => (
        <div key={column} className="rounded-lg border border-border bg-slate-950/35 p-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">{column}</h3>
            <Badge>{tasks.filter((task) => task.status === column).length}</Badge>
          </div>
          <div className="grid gap-3">
            {tasks.filter((task) => task.status === column).map((task) => (
              <Card key={task.title} className="p-4">
                <div className="text-sm font-medium text-white">{task.title}</div>
                <div className="mt-3 text-xs text-slate-400">{task.owner}</div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
