import { createContext, useContext, useState } from "react";
import instance from "../api/axios";

const CommentsContext = createContext();

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  const getComments = async (event_id) => {
    try {
      const res = await ruta_protegida().get(`/comments?event_id=${event_id}`);
      console.log("respuesta al traer comentarios", res);
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (event_id, comment_text) => {
    try {
      const res = await ruta_protegida().post(`/comments`, {
        comment_text,
        event_id,
      });
      console.log("----", res.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <CommentsContext.Provider
      value={{
        comments,
        getComments,
        createComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
