import PageHeader from "@/components/shared/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import { issues } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function MyComplaints() {
  const { user } = useAuth();
  const myIssues = issues.filter(i => i.reporterId === user?.id);

  return (
    <div>
      <PageHeader title="My Complaints" description="Track the status of your submitted issues" />
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Title</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Project</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Category</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Priority</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Status</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {myIssues.map(issue => (
                <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-foreground">{issue.title}</td>
                  <td className="px-6 py-3 text-muted-foreground">{issue.projectName}</td>
                  <td className="px-6 py-3"><span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium text-foreground">{issue.category}</span></td>
                  <td className="px-6 py-3"><PriorityBadge priority={issue.priority} /></td>
                  <td className="px-6 py-3"><StatusBadge status={issue.status} /></td>
                  <td className="px-6 py-3 text-xs text-muted-foreground">{issue.updatedAt}</td>
                </tr>
              ))}
              {myIssues.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">No complaints submitted yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
