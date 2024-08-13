'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLogin: boolean;
  toggleAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <AuthContext.Provider value={{ isLogin, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
