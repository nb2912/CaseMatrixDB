"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = { id: string; email: string; role: string } | null;

export interface AuthContextProps {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: async () => {},
  checkSession: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    setUser(data.user);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  const checkSession = async () => {
    const res = await fetch('/api/auth/session');
    if (!res.ok) return setUser(null);
    const data = await res.json();
    if (data.authenticated) setUser(data.user);
    else setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
