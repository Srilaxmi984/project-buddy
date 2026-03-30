import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search } from "lucide-react";

export default function TopNavbar() {
  const { user } = useAuth();
  if (!user) return null;

  const roleBadgeColor = {
    MANAGER: "bg-primary/10 text-primary",
    DEVELOPER: "bg-success/10 text-success",
    REPORTER: "bg-warning/10 text-warning",
  }[user.role];

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-lg border border-input bg-secondary pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleBadgeColor}`}>
              {user.role}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
        </div>
      </div>
    </header>
  );
}
