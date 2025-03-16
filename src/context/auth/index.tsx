"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ajuste aqui!
import { ToastContainer } from "react-toastify";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authBearerToken");
    setIsAuthenticated(!!token);

    if (!token && window.location.pathname !== "/") {
      router.push("/");
    }

    if (token && window.location.pathname == "/") {
      router.push("/dashboard");
    }
  }, [router]);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}

      <ToastContainer />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
