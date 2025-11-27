"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  phone: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  accessToken: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------------- LOGIN ----------------
  const login = (user: User, access: string, refresh: string) => {
    setUser(user);
    setAccessToken(access);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    toast.success("Logged in");
  };

  // ---------------- LOGOUT ----------------
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setAccessToken(null);

    toast("Logged out");
  }, []);

  // ---------------- REFRESH ACCESS TOKEN ----------------
  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return logout();

      const res = await api.get("/auth/refresh");

      // console.log("res console in authcontext :", res.data);

      const newAccess = res.data.accessToken;

      setAccessToken(newAccess);
      localStorage.setItem("accessToken", newAccess);
    } catch (err) {
      console.error("Refresh failed:", err);
      logout();
    }
  }, [logout]);

  // Refresh every 14 min (backend handles validation)
  useEffect(() => {
    const interval = setInterval(refreshAccessToken, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshAccessToken]);

  // ---------------- INITIAL APP HYDRATION ----------------
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedAccess = localStorage.getItem("accessToken");
        const storedRefresh = localStorage.getItem("refreshToken");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedAccess) setAccessToken(storedAccess);

        if (storedRefresh) {
          await refreshAccessToken();
        }
      } catch (err) {
        logout();
      }

      setLoading(false);
    };

    loadAuth();
  }, [refreshAccessToken, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
