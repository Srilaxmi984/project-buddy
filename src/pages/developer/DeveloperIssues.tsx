import PageHeader from "@/components/shared/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import { issues, STATUSES } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye } from "lucide-react";
import type { Issue } from "@/data/mockData";

export default function DeveloperIssues() {
  const { user } = useAuth();
  const myIssues = issues.filter(i => i.assignedTo === user?.id);
  const [detail, setDetail] = useState<Issue | null>(null);

  return (
    <div>
      <PageHeader title="My Issues" description="View and update your assigned issues" />

      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Title</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Project</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Priority</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Status</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myIssues.map(issue => (
                <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-foreground">{issue.title}</td>
                  <td className="px-6 py-3 text-muted-foreground">{issue.projectName}</td>
                  <td className="px-6 py-3"><PriorityBadge priority={issue.priority} /></td>
                  <td className="px-6 py-3"><StatusBadge status={issue.status} /></td>
                  <td className="px-6 py-3">
                    <Button variant="ghost" size="sm" onClick={() => setDetail(issue)}>
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </td>
                </tr>
              ))}
              {myIssues.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">No issues assigned</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setDetail(null)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{detail.title}</h3>
              <span className="text-xs text-muted-foreground font-mono">{detail.id.toUpperCase()}</span>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <PriorityBadge priority={detail.priority} />
                <StatusBadge status={detail.status} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <p className="text-sm text-foreground mt-1">{detail.description}</p>
              </div>
              {detail.stepsToReproduce && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Steps to Reproduce</label>
                  <pre className="text-sm text-foreground mt-1 whitespace-pre-wrap bg-secondary rounded-lg p-3">{detail.stepsToReproduce}</pre>
                </div>
              )}
              {detail.impact && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Impact</label>
                  <p className="text-sm text-foreground mt-1">{detail.impact}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Project:</span> <span className="text-foreground font-medium ml-1">{detail.projectName}</span></div>
                <div><span className="text-muted-foreground">Reporter:</span> <span className="text-foreground font-medium ml-1">{detail.reporterName}</span></div>
                <div><span className="text-muted-foreground">Category:</span> <span className="text-foreground font-medium ml-1">{detail.category}</span></div>
                <div><span className="text-muted-foreground">Updated:</span> <span className="text-foreground font-medium ml-1">{detail.updatedAt}</span></div>
              </div>
              {/* Status update */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Update Status</label>
                <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" defaultValue={detail.status}>
                  {STATUSES.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" size="sm" onClick={() => setDetail(null)}>Close</Button>
                <Button size="sm" onClick={() => setDetail(null)}>Update</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
