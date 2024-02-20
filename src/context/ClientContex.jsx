import { createContext, useContext, useEffect, useState } from "react";
import {
  clientRegisterRequest,
  clientLoginRequest,
  verifyClientTokenRequest,
  formContactRequest,
} from "../api/authClients";
import Swal from "sweetalert2";

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

  const formContact = async (data) => {
    try {
      const res = await formContactRequest(data);
      console.log("contact", res);
      if (res.status === 200) {
        Swal.fire({
          title: "Mensaje enviado correctamente",
          footer: `<h1> Gracias por contactarnos </h1>`,
          icon: "success",
          color: "#AC703E",
          iconColor: "#AC703E",
          background: "#FFEEB3",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clientLogout = () => {
    localStorage.removeItem("clienToken");
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
      const clientToken = localStorage.getItem("clienToken");

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
        formContact,
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
