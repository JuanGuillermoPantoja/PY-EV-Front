import { createContext, useContext, useEffect, useState } from "react";
import {
  clientRegisterRequest,
  clientLoginRequest,
  verifyClientTokenRequest,
} from "../api/authClients";
import Cookies from "js-cookie";

export const ClientsContext = createContext();

export const useClientAuth = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClientAuth must be used within a ClientAuthProvider");
  }
  return context;
};

export const ClientAuthProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isClientAuthenticated, setIsClientAuthenticated] = useState(false);
  const [clientErrors, setClientErrors] = useState([]);
  const [clientLoading, setClientLoading] = useState(true);

  useEffect(() => {
    console.log("autenticated", isClientAuthenticated);
  });

  const clientSignup = async (client) => {
    try {
      const res = await clientRegisterRequest(client);
      if (res.data === 200) {
        setClient(res.data);
        setIsClientAuthenticated(true);
      }
    } catch (error) {
      setClientErrors(error.response.data);
    }
  };

  const clientSignin = async (client) => {
    try {
      const res = await clientLoginRequest(client);
      console.log("client", res.data.token);
      localStorage.setItem("clienToken", res.data.token);
      setIsClientAuthenticated(true);
      setClient(res.data);
      console.log("res", res);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setClientErrors(error.response.data);
      }
      setClientErrors([error.response.data.message]);
    }
  };

  const clientLogout = () => {
    Cookies.remove("clientToken");
    setIsClientAuthenticated(false);
    setClient(null);
  };

  useEffect(() => {
    if (clientErrors.length > 0) {
      const timer = setTimeout(() => {
        setClientErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [clientErrors]);

  useEffect(() => {
    async function checkLogin() {
      const clientToken = localStorage.getItem("clientToken");

      if (!clientToken) {
        setIsClientAuthenticated(false);
        setClientLoading(false);
        return setClient(null);
      }

      try {
        const res = await verifyClientTokenRequest(clientToken);
        console.log(res);
        if (!res.data) {
          setIsClientAuthenticated(false);
          setClientLoading(false);
          return;
        }

        setIsClientAuthenticated(true);
        setClient(res.data);
        setClientLoading(false);
      } catch (error) {
        console.log(error);
        setIsClientAuthenticated(false);
        setClient(null);
        setClientLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <ClientsContext.Provider
      value={{
        clientSignup,
        clientSignin,
        clientLogout,
        clientLoading,
        client,
        isClientAuthenticated,
        clientErrors,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
