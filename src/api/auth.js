import instance from "./axios";
import axios from "./axios";

const ruta_protegida = () => {
    // Recuperar el token del localStorage
    const token = localStorage.getItem("token");
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


export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verityTokenRequest = () => ruta_protegida().get(`/verify`);
