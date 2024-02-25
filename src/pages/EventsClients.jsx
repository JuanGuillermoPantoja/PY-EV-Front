import React, { useEffect, useState } from "react";
import dayjs, { utc } from "dayjs";
import { getEventsClientsRequest } from "../api/event";
import { useClientAuth } from "../context/ClientContex";
import { useComments } from "../context/CommentsContext";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import Chat from "../components/Chat";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useNavigate } from "react-router-dom";
dayjs.extend(utc);

function EventsClients() {
  const navigate = useNavigate();
  const {
    createComment,
    comments,
    getComments,
    deleteComment,
    updateComment,
    setComments,
  } = useComments();
  const { isClientAuthenticated, client } = useClientAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEventsClientsRequest();
        setEvents(
          res.data.filter((event) => event.done !== false && event.done !== 0)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!isClientAuthenticated) {
      showAlert("Debes iniciar sesión para comentar", "error");
      return;
    }

    try {
      if (editingComment) {
        await updateComment(editingComment.id, client.client.id, comment);
        const updateComments = comments.map((c) =>
          c.id === editingComment ? { ...c, comment_text: comment } : c
        );
        setComment(updateComments);
        setEditingComment(null);
      } else {
        if (selectedEvent && selectedEvent.id) {
          await createComment(selectedEvent.id, comment, client.client.id);
          await getComments(selectedEvent.id);
        } else {
          showAlert("Selecciona un evento antes de comentar", "warning");
          return;
        }
      }
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const showAlert = (message, type) => {
    Swal.fire({
      title: message,
      icon: type,
      color: "#AC703E",
      iconColor: "#AC703E",
      background: "#FFEEB3",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const handleOpenModal = async (event) => {
    if (event && event.id) {
      // Verificar si event es válido y tiene la propiedad id
      setSelectedEvent(event);
      await getComments(event.id);
    } else {
      console.error("El evento seleccionado es inválido.");
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, client.client.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setComment(comment.comment_text);
  };

  useEffect(() => {
    if (isClientAuthenticated) navigate("/");
  }, [isClientAuthenticated]);

  return (
    <>
      <NavbarHome />
      <SimpleBar className="bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-fixed bg-cover bg-center flex flex-col h-[840px]">
        <div className="h-[550px]  justify-center items-center">
          <h1 className="text-center text-[#FFEEB3] text-[60px]">
            Eventos disponibles
          </h1>
          <div className="w-full flex h-full justify-center items-center gap-3 flex-wrap">
            {events.length === 0 && (
              <h1 className='h-screen bg-cover w-full bg-center text-center'>
                No se han agregado eventos
              </h1>
            )}
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#000000a4] w-[20%] h-full flex flex-col justify-between rounded-2xl text-[#FFEEB3] my-2 shadow-xl shadow-black"
              >
                <img
                  className="w-full h-2/5 rounded-t-lg"
                  src={
                    event.img_event
                      ? `https://events-cqtw.onrender.com/uploads/${event.img_event}`
                      : 'https://cdn-icons-png.flaticon.com/512/5225/5225572.png'
                  }
                  alt=""
                />
                <div className="flex flex-col justify-between items-center h-[60%] w-full">
                  <div className="flex-col  bg-black w-full">
                    <div className="flex justify-between w-full h-[50%] mb-2">
                      <div className="w-[60%]">
                        <p className="text-left font-bold ">
                          Nombre del local:
                        </p>
                        <p className="text-left mb-2 text-[#e6d48e]">
                          {event.title}
                        </p>
                      </div>
                      <div className="w-[40%]">
                        <p className="text-right font-bold">
                          Fecha del evento:
                        </p>
                        <p className="text-right text-[#e6d48e]">
                          {dayjs(event.dates).utc().format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>
                    <p className="text-left font-bold">
                      Dirección:
                    </p>
                    <p className="text-left text-[#e6d48e]">
                      {event.address}
                    </p>
                  </div>

                  <p className="text-center font-bold">
                    Información del evento:
                  </p>
                  <p className="text-center p-1">
                    {event.description}
                  </p>
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="w-[35%] h-8 text-base bg-[#FFEEB3] text-[#AC703E] m-2 font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300"
                  >
                    Comentarios
                  </button>
                </div>
              </div>
            ))}
            <hr className="h-7 bg-none w-full border-none" />
          </div>
        </div>
      </SimpleBar>
      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 animate-fade-in animate-duration-300">
          <div className="bg-[#AC703E] text-[#FFEEB3] p-8 rounded-lg w-1/2">
            <h2 className="mb-4">{selectedEvent.title}</h2>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full bg-[#FFEEB3] text-[#AC703E] placeholder:text-[#AC703E] pl-2 font-bold"
              placeholder="Escribe tu comentario aquí..."
            ></textarea>

            <div className="mt-4">
              <SimpleBar autoHide style={{ maxHeight: 300 }}>
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-[#FFEEB3] text-[#AC703E] rounded-xl mb-1  flex w-full items-center justify-between"
                  >
                    <p className="font-bold ">{comment.client}</p>
                    <p className="w-full pl-2 ">
                      {comment.comment_text}
                    </p>
                    <p className="pr-2">
                      {dayjs(comment.created_at).utc().format("HH:mm")}
                    </p>
                    <p className="pr-2">
                      {dayjs(comment.created_at).utc().format("DD/MM/YYYY")}
                    </p>
                    {client && client.client.id === comment.client_id && (
                      <div className="flex">
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-600 font-bold mx-2"
                        >
                          Eliminar
                        </button>
                        <span> | </span>
                        <button
                          onClick={() => handleEditComment(comment)}
                          className="text-[#AC703E] font-bold mx-2"
                        >
                          Editar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </SimpleBar>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={handleCommentSubmit}
                className="mx-2 w-1/4 bg-[#FFEEB3] text-[#AC703E] font-bold mt-4 p-2 rounded-full hover:bg-[#d5935c] hover:text-[#FFEEB3] duration-300"
              >
                {editingComment ? "Guardar cambios" : "Comentar"}
              </button>
              <button
                onClick={handleCloseModal}
                className="mx-2 w-1/4 bg-red-600 text-white font-bold mt-4 p-2 rounded-full hover:bg-red-700 duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      <Chat />
      <Footer />
    </>
  );
}

export default EventsClients;
