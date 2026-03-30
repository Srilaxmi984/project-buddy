import { Bug, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import { issues } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function DeveloperDashboard() {
  const { user } = useAuth();
  const myIssues = issues.filter(i => i.assignedTo === user?.id);
  const done = myIssues.filter(i => i.status === "DONE").length;
  const inProgress = myIssues.filter(i => i.status === "IN_PROGRESS").length;

  return (
    <div>
      <PageHeader title="Developer Dashboard" description={`Welcome back, ${user?.name}`} />
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <StatCard title="Assigned Issues" value={myIssues.length} icon={Bug} />
        <StatCard title="In Progress" value={inProgress} icon={Clock} />
        <StatCard title="Completed" value={done} icon={CheckCircle} />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">My Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Title</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Project</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Priority</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {myIssues.map(issue => (
                <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-foreground">{issue.title}</td>
                  <td className="px-6 py-3 text-muted-foreground">{issue.projectName}</td>
                  <td className="px-6 py-3"><PriorityBadge priority={issue.priority} /></td>
                  <td className="px-6 py-3"><StatusBadge status={issue.status} /></td>
                </tr>
              ))}
              {myIssues.length === 0 && (
                <tr><td colSpan={4} className="text-center py-12 text-muted-foreground">No issues assigned</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
