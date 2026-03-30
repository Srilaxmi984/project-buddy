import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, Role } from "@/contexts/AuthContext";
import {
  LayoutDashboard, FolderKanban, Bug, Users, BarChart3, User,
  LogOut, Kanban, FileText, MessageSquare, ChevronLeft, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const MENU_MAP: Record<Role, MenuItem[]> = {
  MANAGER: [
    { label: "Dashboard", path: "/manager/dashboard", icon: LayoutDashboard },
    { label: "Projects", path: "/manager/projects", icon: FolderKanban },
    { label: "Issues", path: "/manager/issues", icon: Bug },
    { label: "Kanban", path: "/manager/kanban", icon: Kanban },
    { label: "Developers", path: "/manager/developers", icon: Users },
    { label: "Feedback", path: "/manager/feedback", icon: BarChart3 },
    { label: "Profile", path: "/manager/profile", icon: User },
  ],
  DEVELOPER: [
    { label: "Dashboard", path: "/developer/dashboard", icon: LayoutDashboard },
    { label: "My Issues", path: "/developer/issues", icon: Bug },
    { label: "Kanban", path: "/developer/kanban", icon: Kanban },
    { label: "Profile", path: "/developer/profile", icon: User },
  ],
  REPORTER: [
    { label: "Dashboard", path: "/reporter/dashboard", icon: LayoutDashboard },
    { label: "New Complaint", path: "/reporter/create", icon: FileText },
    { label: "My Complaints", path: "/reporter/complaints", icon: Bug },
    { label: "Feedback", path: "/reporter/feedback", icon: MessageSquare },
    { label: "Profile", path: "/reporter/profile", icon: User },
  ],
};

export default function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;
  const items = MENU_MAP[user.role];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className={cn(
      "sidebar-gradient flex flex-col h-screen fixed left-0 top-0 z-30 transition-all duration-300 border-r border-sidebar-custom-border",
      collapsed ? "w-[68px]" : "w-[240px]"
    )}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-custom-border">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Bug className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="text-sidebar-custom-active-fg font-semibold text-base whitespace-nowrap">TrackIQ</span>}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {items.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-custom-fg hover:bg-sidebar-custom-hover hover:text-sidebar-custom-active-fg"
            )}
          >
            <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-custom-border space-y-1">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-custom-fg hover:bg-sidebar-custom-hover hover:text-destructive w-full transition-colors">
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button onClick={onToggle} className="flex items-center justify-center w-full py-2 text-sidebar-custom-fg hover:text-sidebar-custom-active-fg transition-colors">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
