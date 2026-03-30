import React from "react";
import { Link } from "react-router-dom";
import { Bug, Shield, Code, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  { title: "Reporter", desc: "Submit complaints and track their resolution", icon: FileText, loginPath: "/reporter-login", signupPath: "/reporter-signup", color: "bg-warning/10 text-warning" },
  { title: "Manager", desc: "Manage projects, assign issues, and analyze feedback", icon: Shield, loginPath: "/manager-login", signupPath: "/manager-signup", color: "bg-primary/10 text-primary" },
  { title: "Developer", desc: "Work on assigned issues and update status", icon: Code, loginPath: "/developer-login", signupPath: null, color: "bg-success/10 text-success" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-5xl mx-auto px-6 py-20 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Bug className="w-4 h-4" /> Issue Tracking System
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            Track Issues.<br />Resolve Faster.
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            A modern issue tracking platform with role-based dashboards, Kanban boards, and feedback analytics.
          </p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map(role => (
            <div key={role.title} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl ${role.color} flex items-center justify-center mb-4`}>
                <role.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-5">{role.desc}</p>
              <div className="space-y-2">
                <Link to={role.loginPath}>
                  <Button className="w-full" size="sm">
                    Login <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                {role.signupPath && (
                  <Link to={role.signupPath}>
                    <Button variant="outline" className="w-full" size="sm">Sign Up</Button>
                  </Link>
                )}
                {!role.signupPath && (
                  <p className="text-xs text-muted-foreground text-center">Created by Manager only</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
