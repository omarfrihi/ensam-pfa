import { ReactNode, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({
  token: "",
  login: (data: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const login = (data: string) => {
    window.localStorage.setItem("accessToken", data);
    navigate("/dashboard");
  };

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      token: window.localStorage.getItem("accessToken") as string,
      login,
      logout,
    }),
    [window.localStorage.getItem("accessToken")]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
