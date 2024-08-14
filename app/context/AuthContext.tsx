"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login } from "../apiCilent/apiClient";

interface AuthContextType {
  isLogin: boolean;
  toggleAuth: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  logoutUser: () => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check localStorage for existing auth state on mount
  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
  }, []);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay

      if (email === "adaura@gmail.com" && password === "adaura") {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", JSON.stringify(true)); // Save auth state
        setIsLoading(false);
        return true;
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
      return false;
    }
  };
  
  const toggleAuth = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const logoutUser = () => {
    // Clear the state
    setIsAuthenticated(false);
    // setUser(null);

    // Remove from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };
  const signupUser = async (
    email: string,
    password: string,
    companyID: string
  ): Promise<void> => {
    try {
      setIsLoading(true);
      // Here, you can integrate your signup API call
      // For example, using an API client method like signup(email, password, companyID):
    //   await signup(email, password, companyID);

      // Simulate signup success
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true)); // Save auth state
      setIsLoading(false);
    } catch (error) {
      console.error("Signup failed", error);
      setIsLoading(false);
    }
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
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
