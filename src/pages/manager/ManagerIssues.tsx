import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/shared/Badges";
import { Button } from "@/components/ui/button";
import { issues, STATUSES, PRIORITIES, projects, MOCK_USERS } from "@/data/mockData";
import { MOCK_USERS as Users } from "@/contexts/AuthContext";
import { Plus, Filter } from "lucide-react";

export default function ManagerIssues() {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showModal, setShowModal] = useState(false);
  const devs = Users.filter(u => u.role === "DEVELOPER");

  const filtered = statusFilter === "ALL" ? issues : issues.filter(i => i.status === statusFilter);

  return (
    <div>
      <PageHeader title="Issues" description="Manage and assign all issues">
        <Button onClick={() => setShowModal(true)} size="sm"><Plus className="w-4 h-4 mr-1" /> Create Issue</Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {["ALL", ...STATUSES].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Title</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Project</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Category</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Priority</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Status</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Assigned To</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(issue => (
                <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3">
                    <p className="font-medium text-foreground">{issue.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{issue.description}</p>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{issue.projectName}</td>
                  <td className="px-6 py-3"><span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium text-foreground">{issue.category}</span></td>
                  <td className="px-6 py-3"><PriorityBadge priority={issue.priority} /></td>
                  <td className="px-6 py-3"><StatusBadge status={issue.status} /></td>
                  <td className="px-6 py-3 text-muted-foreground">{issue.assignedToName || "—"}</td>
                  <td className="px-6 py-3 text-muted-foreground text-xs">{issue.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No issues found</div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Create Issue</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                <input type="text" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Project</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Assign To</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Unassigned</option>
                    {devs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    {["Bug","Feature","Performance","Security","UI/UX"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setShowModal(false)}>Create Issue</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
