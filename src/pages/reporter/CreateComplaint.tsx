import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { projects, PRIORITIES, CATEGORIES } from "@/data/mockData";
import { toast } from "sonner";

export default function CreateComplaint() {
  const [form, setForm] = useState({
    title: "", description: "", category: CATEGORIES[0], priority: "MEDIUM" as const,
    projectId: projects[0]?.id || "", stepsToReproduce: "", impact: "",
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required");
      return;
    }
    toast.success("Complaint submitted successfully!");
    setForm({ title: "", description: "", category: CATEGORIES[0], priority: "MEDIUM", projectId: projects[0]?.id || "", stepsToReproduce: "", impact: "" });
  };

  return (
    <div>
      <PageHeader title="Submit Complaint" description="Fill out the structured form to report an issue" />
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
            <input type="text" value={form.title} onChange={update("title")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Brief summary of the issue" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description *</label>
            <textarea value={form.description} onChange={update("description")} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Detailed description..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Project</label>
              <select value={form.projectId} onChange={update("projectId")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <select value={form.category} onChange={update("category")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
            <select value={form.priority} onChange={update("priority")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Steps to Reproduce</label>
            <textarea value={form.stepsToReproduce} onChange={update("stepsToReproduce")} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="1. Go to...\n2. Click on...\n3. Observe..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Impact</label>
            <input type="text" value={form.impact} onChange={update("impact")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="How does this affect users?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Attach File</label>
            <input type="file" className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>
          <Button type="submit" className="w-full">Submit Complaint</Button>
        </form>
      </div>
    </div>
  );
}
