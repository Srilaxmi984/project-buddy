import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, Role } from "@/contexts/AuthContext";
import AppSidebar from "./AppSidebar";
import TopNavbar from "./TopNavbar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ requiredRole }: { requiredRole: Role }) {
  const { user, isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!isAuthenticated || !user) return <Navigate to="/" replace />;
  if (user.role !== requiredRole) return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={cn("transition-all duration-300", collapsed ? "ml-[68px]" : "ml-[240px]")}>
        <TopNavbar />
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
