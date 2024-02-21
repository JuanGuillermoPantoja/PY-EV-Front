import React, { useEffect, useState } from "react";
import { getEventsClientsRequest } from "../api/event";
import { useClientAuth } from "../context/ClientContex";
import { useComments } from "../context/CommentsContext";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function EventsClients() {
  const { createComment, comments, getComments, deleteComment } = useComments();
  const { isClientAuthenticated, client } = useClientAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [comment, setComment] = useState("");

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

  const handleCommentSubmit = async (data) => {
    if (!isClientAuthenticated) {
      Swal.fire({
        title: "Debes iniciar sesion para comentar",
        icon: "error",
        color: "#AC703E",
        iconColor: "#AC703E",
        background: "#FFEEB3",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    createComment(selectedEvent.id, comment, client.client.id);
    //limpia el comentario despues de enviarlo
    setComment("");
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    getComments(event.id);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, client.client.id); // Llamar a la función deleteComment con el ID del comentario
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="h-screen overflow-auto bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover bg-center flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl text-[#FFEEB3]">
          Eventos disponibles
        </h1>
        <div className="w-full flex h-full justify-center items-center gap-3 flex-wrap">
          {events.length === 0 && (
            <h1 className='h-screen bg-cover w-full bg-center bg-[url("https://i.ibb.co/LQf91TG/fondo-EB.webp")] text-7xl text-center'>
              No se han agregado eventos
            </h1>
          )}
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#000000a4] w-[24%] h-[90%] flex flex-col justify-between rounded-2xl text-[#FFEEB3] my-2 shadow-xl shadow-black "
            >
              <img
                className="w-full h-2/5 rounded-t-lg"
                src={`https://events-cqtw.onrender.com/uploads/${event.img_event}`}
                alt=""
              />
              <div className="flex flex-col justify-between items-center h-[60%] w-full">
                <div className="flex-col  bg-black w-full p-1">
                  <div className="flex justify-between w-full h-[50%] mb-2">
                    <div className="w-[65%]">
                      <p className="text-left font-bold text-sm">
                        Nombre del local:
                      </p>
                      <p className="text-left text-sm mb-2 text-[#e6d48e]">
                        {event.title}
                      </p>
                    </div>
                    <div className="w-[35%]">
                      <p className="text-right font-bold text-sm">
                        Fecha del evento:
                      </p>
                      <p className="text-right text-sm">
                        {dayjs(event.dates).utc().format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                  <p className="text-left font-bold text-xs">Direccion:</p>
                  <p className="text-left text-sm">{event.address}</p>
                </div>

                <p className="text-center text-sm font-bold">
                  Informacion del evento:
                </p>
                <p className="text-center text-sm h-[30%]">
                  {event.description}
                </p>
                <button
                  onClick={() => handleOpenModal(event)}
                  className="w-[25%] h-[10%] bg-[#FFEEB3] text-[#AC703E] text-xl m-2 font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300"
                >
                  Comentarios
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal de comentarios */}
      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#AC703E] text-[#FFEEB3] p-8 rounded-lg w-1/2">
            <h2 className="text-3xl mb-4">{selectedEvent.title}</h2>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full bg-[#FFEEB3] text-[#AC703E] text-lg placeholder:text-[#AC703E]   font-bold"
              placeholder="Escribe tu comentario aquí..."
            ></textarea>

            {/* Mostrar comentarios */}

            <div className="mt-4">
              {comments.map((comment, index) => (
                <div key={index} className="rounded-xl mb-1">
                  <p className="bg-[#FFEEB3] text-[#AC703E] text-lg flex justify-between px-2 rounded-xl">
                    {comment.comment_text}{" "}
                    <span>
                      {dayjs(comment.created_at)
                        .utc()
                        .format("DD/MM/YYYY - HH:mm")}
                      <button
                        className="ml-8"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Eliminar
                      </button>
                    </span>
                  </p>
                  {console.log(comments)}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar
              </button>
              <button
                onClick={handleCommentSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Enviar comentario
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default EventsClients;
