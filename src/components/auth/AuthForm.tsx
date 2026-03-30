import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, Role } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Bug, ArrowLeft } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "signup";
  role: Role;
  title: string;
}

export default function AuthForm({ mode, role, title }: AuthFormProps) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      const success = login(form.email, form.password, role);
      if (success) navigate(`/${role.toLowerCase()}/dashboard`);
      else setError("Invalid credentials. Try password: 'password'");
    } else {
      if (!form.name || !form.email || !form.password) {
        setError("All fields are required");
        return;
      }
      const success = signup({ name: form.name, email: form.email, password: form.password, phone: form.phone }, role);
      if (success) navigate(`/${role.toLowerCase()}/dashboard`);
      else setError("Signup failed");
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Bug className="w-4 h-4 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <input type="text" value={form.name} onChange={update("name")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={update("phone")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Optional" />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={update("email")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input type="password" value={form.password} onChange={update("password")} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">{mode === "login" ? "Sign In" : "Create Account"}</Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Demo: use any email with password "password"
          </p>
        </div>
      </div>
    </div>
  );
}
