import { cn } from "@/lib/utils";
import { Issue } from "@/data/mockData";

const STATUS_STYLES: Record<Issue["status"], string> = {
  SUBMITTED: "bg-muted text-muted-foreground",
  ASSIGNED: "bg-info/10 text-info",
  IN_PROGRESS: "bg-warning/10 text-warning",
  TESTING: "bg-primary/10 text-primary",
  DONE: "bg-success/10 text-success",
};

const PRIORITY_STYLES: Record<Issue["priority"], string> = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-info/10 text-info",
  HIGH: "bg-warning/10 text-warning",
  CRITICAL: "bg-destructive/10 text-destructive",
};

export function StatusBadge({ status }: { status: Issue["status"] }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", STATUS_STYLES[status])}>
      {status.replace("_", " ")}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Issue["priority"] }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", PRIORITY_STYLES[priority])}>
      {priority}
    </span>
  );
}
