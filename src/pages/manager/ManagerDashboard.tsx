import { LayoutDashboard, FolderKanban, Bug, BarChart3, Star } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import { issues, projects, feedbacks } from "@/data/mockData";

export default function ManagerDashboard() {
  const avgRating = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : "N/A";
  const recentIssues = [...issues].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  return (
    <div>
      <PageHeader title="Manager Dashboard" description="Overview of projects, issues, and feedback" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value={projects.length} icon={FolderKanban} trend="2 this month" trendUp />
        <StatCard title="Total Issues" value={issues.length} icon={Bug} trend="5 this week" trendUp />
        <StatCard title="Avg. Rating" value={avgRating} icon={Star} trend="vs 3.8 last month" trendUp />
        <StatCard title="Open Issues" value={issues.filter(i => i.status !== "DONE").length} icon={LayoutDashboard} />
      </div>

      {/* Status Distribution */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Issues by Status</h3>
          <div className="space-y-3">
            {(["SUBMITTED","ASSIGNED","IN_PROGRESS","TESTING","DONE"] as const).map(status => {
              const count = issues.filter(i => i.status === status).length;
              const pct = issues.length ? Math.round((count / issues.length) * 100) : 0;
              return (
                <div key={status} className="flex items-center gap-3">
                  <StatusBadge status={status} />
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Issues by Priority</h3>
          <div className="space-y-3">
            {(["CRITICAL","HIGH","MEDIUM","LOW"] as const).map(p => {
              const count = issues.filter(i => i.priority === p).length;
              const pct = issues.length ? Math.round((count / issues.length) * 100) : 0;
              return (
                <div key={p} className="flex items-center gap-3">
                  <PriorityBadge priority={p} />
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Title</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Project</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Priority</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Status</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map(issue => (
                <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-foreground">{issue.title}</td>
                  <td className="px-6 py-3 text-muted-foreground">{issue.projectName}</td>
                  <td className="px-6 py-3"><PriorityBadge priority={issue.priority} /></td>
                  <td className="px-6 py-3"><StatusBadge status={issue.status} /></td>
                  <td className="px-6 py-3 text-muted-foreground">{issue.assignedToName || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
