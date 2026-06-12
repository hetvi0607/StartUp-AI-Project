import { AppShell } from "@/components/app-shell";
import { KanbanBoard } from "@/components/dashboard/kanban";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkspacePage() {
  return (
    <AppShell>
      <Card>
        <CardHeader><CardTitle>Team Workspace</CardTitle></CardHeader>
        <CardContent><KanbanBoard /></CardContent>
      </Card>
    </AppShell>
  );
}
