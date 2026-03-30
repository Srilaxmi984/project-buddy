import PageHeader from "@/components/shared/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import { issues, KANBAN_COLUMNS, Issue } from "@/data/mockData";

const COLUMN_LABELS: Record<string, string> = {
  SUBMITTED: "Backlog",
  ASSIGNED: "To Do",
  IN_PROGRESS: "In Progress",
  TESTING: "Testing",
  DONE: "Done",
};

function KanbanCard({ issue }: { issue: Issue }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab">
      <div className="flex items-center justify-between mb-2">
        <PriorityBadge priority={issue.priority} />
        <span className="text-[10px] text-muted-foreground font-mono">{issue.id.toUpperCase()}</span>
      </div>
      <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-2">{issue.title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-1">{issue.projectName}</p>
      {issue.assignedToName && (
        <div className="flex items-center gap-1.5 mt-3">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
            {issue.assignedToName.split(" ").map(n => n[0]).join("")}
          </div>
          <span className="text-xs text-muted-foreground">{issue.assignedToName}</span>
        </div>
      )}
    </div>
  );
}

export default function KanbanBoard({ filteredIssues }: { filteredIssues?: Issue[] }) {
  const data = filteredIssues || issues;

  return (
    <div>
      {!filteredIssues && <PageHeader title="Kanban Board" description="Drag and drop issues across workflow stages" />}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map(col => {
          const colIssues = data.filter(i => i.status === col);
          return (
            <div key={col} className="min-w-[260px] flex-1">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{COLUMN_LABELS[col]}</h3>
                  <span className="bg-secondary text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">{colIssues.length}</span>
                </div>
              </div>
              <div className="space-y-3 bg-secondary/30 rounded-xl p-3 min-h-[200px]">
                {colIssues.map(issue => <KanbanCard key={issue.id} issue={issue} />)}
                {colIssues.length === 0 && (
                  <div className="text-center py-8 text-xs text-muted-foreground">No issues</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
