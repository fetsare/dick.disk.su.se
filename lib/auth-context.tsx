"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "sonner";

type Role = "admin" | "member";

type AuthUser = {
  id: string;
  role: Role;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  logout: () => void;
  login: (user: AuthUser) => void;
};

const STORAGE_KEY = "auth:user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
    setUser(null);
    toast.success("Du har loggats ut.");
  }, []);

   const login = useCallback((nextUser: AuthUser) => {
     setUser(nextUser);
     try {
       if (typeof window !== "undefined") {
         window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
       }
     } catch {
       // ignore
     }
   }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setUser(null);
        return;
      }

      const parsed = JSON.parse(stored) as AuthUser;
      if (parsed && typeof parsed.id === "string" && parsed.role) {
        setUser(parsed);
        toast.success("Välkommen tillbaka!");
      } else {
        setUser(null);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
