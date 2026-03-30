import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import { feedbacks, issues } from "@/data/mockData";
import { Star, TrendingUp, AlertTriangle, ThumbsUp } from "lucide-react";
import { MOCK_USERS } from "@/contexts/AuthContext";

export default function ManagerFeedback() {
  const avgRating = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : "0";
  const satisfied = feedbacks.filter(f => f.satisfaction === "SATISFIED").length;
  const lowRated = feedbacks.filter(f => f.rating <= 2);
  const devs = MOCK_USERS.filter(u => u.role === "DEVELOPER");

  // Dev performance
  const devPerf = devs.map(d => {
    const devFeedbacks = feedbacks.filter(f => f.assignedToName === d.name);
    const avg = devFeedbacks.length ? (devFeedbacks.reduce((s, f) => s + f.rating, 0) / devFeedbacks.length).toFixed(1) : "N/A";
    return { name: d.name, avg, count: devFeedbacks.length };
  });

  return (
    <div>
      <PageHeader title="Feedback Analytics" description="Review ratings and developer performance" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Avg. Rating" value={`${avgRating}/5`} icon={Star} />
        <StatCard title="Total Feedback" value={feedbacks.length} icon={TrendingUp} />
        <StatCard title="Satisfied" value={`${feedbacks.length ? Math.round((satisfied / feedbacks.length) * 100) : 0}%`} icon={ThumbsUp} />
        <StatCard title="Low Rated (≤2)" value={lowRated.length} icon={AlertTriangle} />
      </div>

      {/* Developer Performance */}
      <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Developer Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Developer</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Avg Rating</th>
                <th className="text-left px-6 py-3 text-muted-foreground font-medium">Total Reviews</th>
              </tr>
            </thead>
            <tbody>
              {devPerf.map(d => (
                <tr key={d.name} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-medium text-foreground">{d.name}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i <= parseFloat(d.avg) ? "text-warning fill-warning" : "text-border"}`} />
                      ))}
                      <span className="ml-1 text-muted-foreground">{d.avg}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{d.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Feedback */}
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">All Feedback</h3>
        </div>
        <div className="divide-y divide-border">
          {feedbacks.map(f => (
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
              <p className="text-xs text-muted-foreground mt-1">By {f.reporterName} · {f.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
