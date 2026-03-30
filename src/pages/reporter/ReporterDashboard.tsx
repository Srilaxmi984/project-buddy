import { Bug, FileText, CheckCircle, MessageSquare } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/Badges";
import { issues, feedbacks } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function ReporterDashboard() {
  const { user } = useAuth();
  const myIssues = issues.filter(i => i.reporterId === user?.id);
  const done = myIssues.filter(i => i.status === "DONE").length;
  const myFeedbacks = feedbacks.filter(f => f.reporterId === user?.id);

  return (
    <div>
      <PageHeader title="Reporter Dashboard" description={`Welcome back, ${user?.name}`} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="My Complaints" value={myIssues.length} icon={FileText} />
        <StatCard title="Open" value={myIssues.length - done} icon={Bug} />
        <StatCard title="Resolved" value={done} icon={CheckCircle} />
        <StatCard title="Feedback Given" value={myFeedbacks.length} icon={MessageSquare} />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Complaints</h3>
        </div>
        <div className="divide-y divide-border">
          {myIssues.slice(0, 5).map(issue => (
            <div key={issue.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-foreground">{issue.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{issue.projectName} · {issue.updatedAt}</p>
              </div>
              <StatusBadge status={issue.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
