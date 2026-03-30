import React, { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export type Role = "REPORTER" | "MANAGER" | "DEVELOPER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  profileImage?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: Role) => boolean;
  signup: (data: { name: string; email: string; password: string; phone?: string }, role: Role) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: User[] = [
  { id: "1", name: "John Reporter", email: "reporter@test.com", role: "REPORTER", phone: "1234567890", createdAt: "2024-01-15" },
  { id: "2", name: "Sarah Manager", email: "manager@test.com", role: "MANAGER", phone: "9876543210", createdAt: "2024-01-10" },
  { id: "3", name: "Mike Developer", email: "dev@test.com", role: "DEVELOPER", phone: "5551234567", createdAt: "2024-02-01" },
  { id: "4", name: "Alex Chen", email: "alex@test.com", role: "DEVELOPER", phone: "5559876543", createdAt: "2024-02-15" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string, role: Role): boolean => {
    const found = MOCK_USERS.find(u => u.email === email && u.role === role);
    if (found) {
      setUser(found);
      return true;
    }
    // Demo: accept any email with password "password"
    if (_password === "password") {
      setUser({ id: Date.now().toString(), name: email.split("@")[0], email, role, createdAt: new Date().toISOString() });
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((data: { name: string; email: string; password: string; phone?: string }, role: Role): boolean => {
    setUser({ id: Date.now().toString(), name: data.name, email: data.email, role, phone: data.phone, createdAt: new Date().toISOString() });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { MOCK_USERS };
