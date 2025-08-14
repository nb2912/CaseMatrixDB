import React, { createContext, useContext, useState, ReactNode } from "react";

type User = { email: string } | null;

interface AuthContextProps {
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = (email: string, password: string) => {
    // Future enhancement: Replace with API call for authentication
    setUser({ email });
    console.log(`User logged in: ${email}`);
  };

  const logout = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
