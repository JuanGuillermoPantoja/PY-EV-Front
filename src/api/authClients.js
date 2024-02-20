import axios from "./axios";
import instance from "./axios";

const ruta_protegida = () => {
  // Recuperar el token del localStorage
  const token = localStorage.getItem("clienToken");
  if (token) {
    const clienteAxios = instance.create({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return clienteAxios;
  } else {
    const clienteAxios = instance.create({
      headers: {
        authorization: `Bearer null`,
      },
    });
    return clienteAxios;
  }
};

export const clientRegisterRequest = (client) =>
  axios.post(`/registerClients`, client);

export const clientLoginRequest = (client) =>
  axios.post(`/loginClients`, client);

export const formContactRequest = (data) => axios.post(`/contact`, data);

export const verifyClientTokenRequest = () =>
  ruta_protegida().get(`/clientVerify`);
