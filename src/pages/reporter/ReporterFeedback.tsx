import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { issues, feedbacks } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function ReporterFeedback() {
  const { user } = useAuth();
  const doneIssues = issues.filter(i => i.reporterId === user?.id && i.status === "DONE");
  const feedbackIssueIds = feedbacks.filter(f => f.reporterId === user?.id).map(f => f.issueId);
  const eligibleIssues = doneIssues.filter(i => !feedbackIssueIds.includes(i.id));

  const [selectedIssue, setSelectedIssue] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [satisfaction, setSatisfaction] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue || !rating || !satisfaction) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Feedback submitted successfully!");
    setSelectedIssue(""); setRating(0); setComment(""); setSatisfaction("");
  };

  const myFeedbacks = feedbacks.filter(f => f.reporterId === user?.id);

  return (
    <div>
      <PageHeader title="Feedback" description="Submit feedback for resolved issues" />

      {eligibleIssues.length > 0 && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl mb-8 space-y-5">
          <h3 className="font-semibold text-foreground">Submit Feedback</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Select Issue</label>
            <select value={selectedIssue} onChange={e => setSelectedIssue(e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
              <option value="">Choose a resolved issue...</option>
              {eligibleIssues.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Rating</label>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <button key={i} type="button" onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(i)}>
                  <Star className={`w-7 h-7 transition-colors ${i <= (hoverRating || rating) ? "text-warning fill-warning" : "text-border"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Comment</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Satisfaction</label>
            <div className="flex gap-3">
              {["SATISFIED", "NEUTRAL", "NOT_SATISFIED"].map(s => (
                <button key={s} type="button" onClick={() => setSatisfaction(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${satisfaction === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit">Submit Feedback</Button>
        </form>
      )}

      {/* Past feedback */}
      {myFeedbacks.length > 0 && (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">My Feedback History</h3>
          </div>
          <div className="divide-y divide-border">
            {myFeedbacks.map(f => (
              <div key={f.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm text-foreground">{f.issueTitle}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${f.satisfaction === "SATISFIED" ? "bg-success/10 text-success" : f.satisfaction === "NEUTRAL" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                    {f.satisfaction.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center gap-1 my-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= f.rating ? "text-warning fill-warning" : "text-border"}`} />)}
                </div>
                <p className="text-sm text-muted-foreground">{f.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {eligibleIssues.length === 0 && myFeedbacks.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center shadow-sm">
          <p className="text-muted-foreground">No resolved issues available for feedback</p>
        </div>
      )}
    </div>
  );
}
