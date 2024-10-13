import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

interface AuthContextInterface {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });
  const saveToken = (userToken: string | null) => {
    setToken(userToken);
    if (userToken) {
      localStorage.setItem("token", userToken);
      toast.success("Logged in successfully!");
    } else {
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    saveToken(null);
    toast.success("Logged out.");
  };

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
