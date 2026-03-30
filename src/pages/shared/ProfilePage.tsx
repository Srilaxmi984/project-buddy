import PageHeader from "@/components/shared/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const roleBadgeColor = {
    MANAGER: "bg-primary/10 text-primary",
    DEVELOPER: "bg-success/10 text-success",
    REPORTER: "bg-warning/10 text-warning",
  }[user.role];

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account details" />
      <div className="max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 ${roleBadgeColor}`}>{user.role}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{user.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Joined {user.createdAt}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Role: {user.role}</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <Button size="sm" variant="outline">Edit Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
