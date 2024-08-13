"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { login } from "../apiCilent/apiClient";

interface AuthContextType {
  isLogin: boolean;
  toggleAuth: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (
    email: string,
    password: string,
    companyID: string
  ) => Promise<void>;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const loginUser = async (email: string, password: string) => {
    try {
      setIsloading(true);
      //   await login(email, password);

      await new Promise((resolve) => setTimeout(resolve, 3000)); // 2-second delay
      setIsAuthenticated(true);
      setIsloading(false);
    } catch (error) {
      console.error("Login failed", error);
      setIsloading(false);
    }
  };
  const signupUser = async (
    email: string,
    password: string,
    companyID: string
  ) => {
    try {
      setIsloading(true);
    //   await signupUser(email, password, companyID);

      await new Promise((resolve) => setTimeout(resolve, 3000)); // 2-second delay
      setIsloading(false);
    } catch (error) {
      console.error("Login failed", error);
      setIsloading(false);
    }
  };
  const toggleAuth = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        toggleAuth,
        isAuthenticated,
        loginUser,
        isLoading,
        signupUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
