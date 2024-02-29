import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios";
import { useComments } from "../context/CommentsContext";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import Swal from "sweetalert2";
import SimpleBar from "simplebar-react";
import { useClientAuth } from "../context/ClientContex";
import dayjs from "dayjs";
import { utc } from "dayjs";
import NavbarHome from "../components/NavbarHome";
import { getEventsClientsRequest } from "../api/event";
import axios from "axios";
dayjs.extend(utc);

function InfoEvents() {
  const { id } = useParams(); // Obtener el parámetro id de la URL
  const [event, setEvent] = useState(null);
  const {
    createComment,
    comments,
    getComments,
    deleteComment,
    updateComment,
    addLike,
    addDisLike,
  } = useComments();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [events, setEvents] = useState([]);
  const { isClientAuthenticated, client } = useClientAuth();
  const [images, setImages] = useState([]);
  const filteredEvent = events.find((event) => event.id === parseInt(id));

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://events-cqtw.onrender.com/events/${id}/images`
        ); // Realizar la solicitud al backend
        // Almacenar la información de las imágenes en el estado
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages(); // Llamar a la función para obtener la información de las imágenes
  }, []);

  useEffect(() => {
    // Función para obtener la información de los eventos
    const fetchEvent = async () => {
      try {
        const response = await getEventsClientsRequest();
        setEvents(
          response.data.filter(
            (event) => event.done !== false && event.done !== 0
          )
        );
        setEvent(filteredEvent);
        getComments(id);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent(); // Llamar a la función para obtener la información del evento
  }, [id]); // Hacer que useEffect se ejecute cada vez que el ID cambie en la URL

  const handleLike = async (event) => {
    try {
      await addLike(event.id, client.client.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisLike = async (event) => {
    try {
      await addDisLike(event.id, client.client.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, client.client.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleEditComment = async (comment) => {
    setEditingComment(comment);
    setComment(comment.comment_text);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
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
        if (isClientAuthenticated) {
          await createComment(filteredEvent.id, comment, client.client.id);
          await getComments(filteredEvent.id);
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

  return (
    <>
      <NavbarHome />
      <div className="h-screen w-full">
        <div className="w-full h-full">
          {filteredEvent ? (
            <div className="flex w-full h-full justify-between ">
              <div
                className="w-2/5 bg-black h-1/2 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${`https://events-cqtw.onrender.com/uploads/${filteredEvent.img_event}`})`,
                }}
              ></div>
              <div>
                {images.images.map((image, index) => {
                  <div key={index}>
                    <img
                      src={`url(${`https://events-cqtw.onrender.com/uploads/${filteredEvent.id.image_url}`})`}
                    />
                  </div>;
                })}
              </div>
              <div className="w-[30%] h-full bg-gradient-orange p-4 text-white flex items-center">
                <div className="w-full bg-white text-textBlack rounded-md shadow-inner p-2 shadow-amber-950">
                  <h2 className="mb-8 font-bold">{filteredEvent.title}</h2>
                  <p className="font-bold">Descripción del evento:</p>
                  <p className="mb-4">{filteredEvent.description}</p>
                  <p className="font-bold">Dirección del evento:</p>
                  <p className="mb-4">{filteredEvent.address}</p>
                  <p className="font-bold">Fecha del evento:</p>
                  <p>
                    {dayjs(filteredEvent.dates)
                      .utc()
                      .format("DD [de] MMMM [del] YYYY")}
                  </p>
                </div>
              </div>
              <div className="w-[30%] h-full">
                <div className="bg-white text-textBlack p-4 w-full h-full flex flex-col justify-between shadow-sm shadow-amber-950">
                  <div className="mt-4 overflow-hidden">
                    <h2 className="">Comentarios</h2>
                    <SimpleBar
                      autoHide
                      over
                      direction="vertical"
                      style={{ maxHeight: 550 }}
                    >
                      {comments.map((comment, index) => (
                        <div
                          key={index}
                          className="bg-amber-200 text-amber-900 rounded-sm mb-1 flex w-full items-center justify-between"
                        >
                          <div className="w-2/3 break-words">
                            <p className="font-bold ">{comment.client}</p>
                            <p className="w-full pl-2 text-wrap ">
                              {comment.comment_text}
                            </p>
                          </div>
                          <div className="w-1/3 flex justify-end flex-wrap text-amber-600">
                            <p className="pr-2">
                              {dayjs(comment.created_at).utc().format("HH:mm")}
                            </p>
                            <p className="pr-2">
                              {dayjs(comment.created_at)
                                .utc()
                                .format("DD/MM/YYYY")}
                            </p>
                            {client &&
                              client.client.id === comment.client_id && (
                                <div className="flex">
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                    className="text-red-600 mx-2 text-sm"
                                  >
                                    Eliminar
                                  </button>
                                  <span> | </span>
                                  <button
                                    onClick={() => handleEditComment(comment)}
                                    className="text-[#AC703E] mx-2 text-sm"
                                  >
                                    Editar
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </SimpleBar>
                  </div>
                  <div>
                    <textarea
                      value={comment}
                      onChange={handleCommentChange}
                      className="w-full bg-amber-200 text-amber-900 placeholder:text-[#AC703E] pl-2 font-bold"
                      placeholder="Escribe tu comentario aquí..."
                    ></textarea>
                    <div className="w-full h-[50%] flex justify-around items-center">
                      <div className="w-1/4 h-full flex justify-start items-center">
                        <button
                          className="h-full flex items-center"
                          onClick={() => handleLike(event)}
                        >
                          <AiFillLike color="#ff9800" size={25} />
                        </button>
                        <button onClick={() => handleDisLike(event)}>
                          <AiFillDislike color="#ff9800" size={25} />
                        </button>
                      </div>
                      <div className="w-3/4 flex justify-around">
                        <button
                          onClick={handleCommentSubmit}
                          className="w-1/2 bg-amber-500 text-amber-950 font-bold p-2 rounded-lg hover:bg-amber-600 duration-300"
                        >
                          {editingComment ? "Guardar cambios" : "Comentar"}
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="w-1/3 bg-red-600 text-white font-bold p-2 rounded-lg hover:bg-red-700 duration-300"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Cargando información del evento...</p>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default InfoEvents;
