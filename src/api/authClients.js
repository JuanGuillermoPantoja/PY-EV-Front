import axios from "./axios";

export const clientRegisterRequest = (client) => axios.post(`/registerClients`, client);

export const clientLoginRequest = (client) => axios.post(`/loginClients`, client);

export const verifyClientTokenRequest = () => axios.get(`/clientVerify`)
  
