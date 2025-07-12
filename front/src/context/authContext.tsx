// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import api from "../api/axios";

interface AuthContextType {
  accessToken: string | null;
  user: { username: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<{
    username: string;
    email: string;
  } | null>(null);

  // Attach interceptor to refresh token on 401
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const origReq = err.config;
        if (
          err.response?.status === 401 &&
          !origReq._retry &&
          localStorage.getItem("refreshToken")
        ) {
          origReq._retry = true;
          const refresh = localStorage.getItem("refreshToken")!;
          const { data } = await api.post("/api/token/refresh/", { refresh });
          const newAccess = data.access;
          setAccessToken(newAccess);
          localStorage.setItem("accessToken", newAccess);
          origReq.headers["Authorization"] = `Bearer ${newAccess}`;
          return api(origReq);
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/api/token/", { email, password });
    const { access, refresh } = data;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setAccessToken(access);

    // Optionally fetch user profile
    const profile = await api.get("/api/profile/", {
      headers: { Authorization: `Bearer ${access}` },
    });
    setUser(profile.data);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Attach access token to every request
  useEffect(() => {
    api.defaults.headers.common[
      "Authorization"
    ] = accessToken ? `Bearer ${accessToken}` : "";
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
