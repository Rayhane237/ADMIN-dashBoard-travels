import { createContext, useContext, useState, useEffect } from "react";
import { authAxios, setAccessTokenForRequests } from "../api/axiosInstance";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // keep axios's token in sync whenever accessToken changes
  useEffect(() => {
    setAccessTokenForRequests(accessToken);
  }, [accessToken]);

  // on mount, try to silently restore a session via the httpOnly refresh cookie
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await authAxios.post("/refresh-token");
        setAccessToken(res.data.accessToken);
        setRole(res.data.role);
      } catch {
        setAccessToken(null);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };
    tryRefresh();
  }, []);

  const login = (newToken, newRole) => {
    setAccessToken(newToken);
    setRole(newRole);
  };

  const logout = async () => {
    await authAxios.post("/logout");
    setAccessToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}