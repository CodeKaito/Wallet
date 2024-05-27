import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const logout = useCallback(() => {
    setIsLogged(false);
    setToken("");
    localStorage.removeItem("token");
    localStorage.setItem("isLogged", "false");

    const url = new URL(window.location.href);
    url.searchParams.delete("accessToken");
    window.history.replaceState({}, document.title, url.toString());

    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  const login = (token) => {
    setToken(token);
    setIsLogged(true);
    localStorage.setItem("token", token);
    localStorage.setItem("isLogged", "true");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLogged");

    if (storedToken && isLoggedIn === "true") {
      setToken(storedToken);
      setIsLogged(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLogged,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
