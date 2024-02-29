import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verityTokenRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userErrors, setUserErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.data === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      //console.log(error.response);
      setUserErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        setUser(res.data);
        console.log(res);
      } else {
        setIsAuthenticated(false);
        setUserErrors(["Correo o contraseña invalidos*"]);
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setUserErrors(error.response.data);
      }
      setUserErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (userErrors.length > 0) {
      const timer = setTimeout(() => {
        setUserErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [userErrors]);

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verityTokenRequest(token);
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        userErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
