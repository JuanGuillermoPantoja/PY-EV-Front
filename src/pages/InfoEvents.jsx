import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import Slider from "react-slick"; // Importa el componente Slider de react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useForm } from "react-hook-form";
import logoeventBrew from "../img/eventsBrewDark.png";
import noContentImg from "../img/no-fotos.png";
import gato from "../img/gato.jpg";
dayjs.extend(utc);
import Footer from "../components/Footer";

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
    getLikesAndDisLikes,
  } = useComments();
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [events, setEvents] = useState([]);
  const { isClientAuthenticated, client } = useClientAuth();
  const [images, setImages] = useState([]);
  const filteredEvent = events.find((event) => event.id === parseInt(id));
  const [likesCount, setLikesCount] = useState(null);
  const [dislikesCount, setDislikesCount] = useState(null);
  const [showPositiveComments, setShowPositiveComments] = useState(false); // Estado para controlar la visualización de los comentarios positivos
  const [showNegativeComments, setShowNegativeComments] = useState(false); // Estado para controlar la visualización de los comentarios negativos
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);

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

  useEffect(() => {
    const fetchLikesAndDislikes = async () => {
      try {
        const res = await getLikesAndDisLikes(id);
        setLikesCount(res.total_likes);
        setDislikesCount(res.total_dislikes);
      } catch (error) {
        console.error("Error fetching likes and dislikes:", error);
      }
    };

    fetchLikesAndDislikes();
  }, [id, getLikesAndDisLikes]);

  const handleLike = async () => {
    try {
      if (!isClientAuthenticated) {
        showAlert(
          "Debes iniciar sesión para comentar o reaccionar al evento.",
          "error"
        );
        return;
      }
      if (filteredEvent) {
        const hasDislike = dislikesCount > 0;
        await addLike(filteredEvent.id, client.client.id);
        const res = await getLikesAndDisLikes(id);
        setLikesCount(res.total_likes);

        if (hasDislike) {
          setDislikesCount(res.total_dislikes);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisLike = async () => {
    try {
      if (!isClientAuthenticated) {
        showAlert(
          "Debes iniciar sesión para comentar o reaccionar al evento.",
          "error"
        );
        return;
      }
      await addDisLike(filteredEvent.id, client.client.id);
      const res = await getLikesAndDisLikes(id);
      setDislikesCount(res.total_dislikes);

      const hasLike = likesCount > 0;
      if (hasLike) {
        setLikesCount(res.total_likes);
      }
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

  const handleEditComment = async (comment) => {
    setEditingComment(comment);
    setComment(comment.comment_text);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    // Si el comentario no está vacío, actualiza el estado para indicar que se ha agregado un comentario
    setCommentAdded(!!e.target.value);
  };

  const showAlert = (message, type) => {
    Swal.fire({
      title: message,
      icon: type,
      color: "#ff9800",
      iconColor: "#ff9800",
      background: "#000000",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const settings = {
    dots: true,
    fade: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleCommentSubmit = async () => {
    if (!isClientAuthenticated) {
      showAlert(
        "Debes iniciar sesión para comentar o reaccionar al evento.",
        "error"
      );
      return;
    }

    // Verifica si se ha agregado un comentario antes de continuar
    if (!commentAdded) {
      showAlert("Debes agregar un comentario antes de comentar", "error");
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
        }
      }
      await getComments(filteredEvent.id);
      setComment("");
      // Después de enviar el comentario, actualiza el estado para indicar que no se ha agregado ningún comentario
      setCommentAdded(false);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { formContact } = useClientAuth();

  const onSubmit = handleSubmit((data) => {
    formContact(data);
  });

  return (
    <>
      <NavbarHome />
      <div className=" w-full flex">
        <div className="w-full h-full">
          {filteredEvent ? (
            <div className="flex w-full h-full bg-gradient-orange flex-col lg:flex-row lg:justify-between">
              <div className="lg:w-[60%] xl:w-[70%] md:w-[90%] md:self-center flex flex-col">
                <div className="flex justify-center w-full h-full p-2 flex-col gap-2 xl:gap-4 xl:flex-row">
                  <div
                    className="bg-contain bg-no-repeat bg-center bg-amber-900 rounded-xl w-[90%] sm:w-[95%] h-[200px] sm:h-[300px] md:w-full md:h-[350px] lg:w-full xl:h-[300px] 2xl:h-[400px] self-center"
                    style={{ backgroundImage: `url(${noContentImg})` }}
                  >
                    <img
                      className="border-2 w-full h-full rounded-xl"
                      src={`https://events-cqtw.onrender.com/uploads/${filteredEvent.img_event}`}
                      alt="Cover Image"
                    />
                  </div>
                  <div className="w-[88%] sm:w-[95%] md:w-full lg:w-full xl:w-[49%] self-center">
                    <Slider
                      className="bg-amber-900 bg-contain bg-center bg-no-repeat h-[400px] rounded-xl"
                      {...settings}
                      style={{ backgroundImage: `url(${noContentImg})` }}
                    >
                      {images?.images?.map((image, index) => (
                        <div key={index}>
                          <img
                            className="border-2 h-[180px] sm:h-[280px] md:h-[320px] xl:h-[290px] 2xl:h-[400px] w-full rounded-xl"
                            src={`https://events-cqtw.onrender.com/uploads/${image}`} // Ruta de la imagen
                            alt={`Image ${index}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>

                <div className="w-[100%] h-full p-4 md:p-0 md:mt-4 text-white flex justify-center">
                  <div className="flex justify-center w-full h-full p-2 flex-col 2xl:flex-row 2xl:w-full">
                    <div className="h-[400px] lg:w-full self-center bg-[#fef8ec] text-textBlack rounded-sm shadow-inner p-2 shadow-amber-950">
                      <h2 className="mb-8 font-bold text-xl">
                        {filteredEvent.title}
                      </h2>
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
                    <div className="w-full flex flex-col justify-around h-[400px] lg:w-full bg-[#fef8ec] rounded-sm shadow-inner px-4 shadow-amber-950">
                      <div className="flex w-full justify-center">
                        <div className="w-full self-center lg:self-start md:w-[88%] lg:w-[35%] h-[460px] lg:h-auto xl:w-[95%] mb-2">
                          <div className="bg-[#fef8ec] text-textBlack p-2 w-full h-full flex flex-col justify-between shadow-sm ">
                            <div className="overflow-hidden flex justify-center gap-2 w-full">
                              <button
                                className={`bg-[#ad4610] text-[#f5c054] rounded-md p-1 mb-1 ${
                                  showAllComments
                                    ? "bg-opacity-100"
                                    : "bg-opacity-50"
                                }`}
                                onClick={() => (
                                  setShowAllComments(true),
                                  setShowNegativeComments(false),
                                  setShowPositiveComments(false)
                                )}
                              >
                                Comentarios
                              </button>
                              <button
                                className={`bg-[#ad4610] text-[#f5c054] rounded-md p-1 mb-1 ${
                                  showPositiveComments
                                    ? "bg-opacity-100"
                                    : "bg-opacity-50"
                                }`}
                                onClick={() => (
                                  setShowPositiveComments(true),
                                  setShowAllComments(false),
                                  setShowNegativeComments(false)
                                )}
                              >
                                <h1 className="text-base">
                                  Comentarios positivos
                                </h1>
                              </button>
                              <button
                                className={`bg-[#ad4610] text-[#f5c054] rounded-md p-1 mb-1 ${
                                  showNegativeComments
                                    ? "bg-opacity-100"
                                    : "bg-opacity-50"
                                }`}
                                onClick={() => (
                                  setShowNegativeComments(true),
                                  setShowAllComments(false),
                                  setShowPositiveComments(false)
                                )}
                              >
                                <h1 className="text-base">
                                  Comentarios negativos
                                </h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {showAllComments && comments && comments.length > 0 ? (
                        <SimpleBar
                          autoHide
                          over
                          direction="vertical"
                          style={{ maxHeight: 100 }}
                        >
                          {comments.map((comment, index) => (
                            <div
                              key={index}
                              className="bg-amber-200 h-12 font-semibold text-amber-900 rounded-sm mb-1 flex w-full items-center justify-between"
                            >
                              <div className="w-2/3 break-words">
                                <p className="font-bold ">{comment.client}</p>
                                <p className="w-full pl-2 text-wrap font-semibold">
                                  {comment.comment_text}
                                </p>
                              </div>
                              <div className="w-1/3 flex justify-end flex-wrap text-amber-600">
                                <p className="pr-2">
                                  {dayjs(comment.created_at)
                                    .utc()
                                    .local()
                                    .format("HH:mm")}
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
                                        onClick={() =>
                                          handleEditComment(comment)
                                        }
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
                      ) : (
                        showAllComments && (
                          <div>
                            <img src={gato} className="w-[20%] m-auto" alt="" />
                            <p className="flex justify-center font-semibold text-xl text-[#742d13] ">
                              No hay comentarios
                            </p>
                          </div>
                        )
                      )}

                      {showPositiveComments && comments ? (
                        comments.filter(
                          (comment) =>
                            comment.possitive_comments && comment.created_at
                        ).length > 0 ? (
                          <SimpleBar
                            direction="vertical"
                            style={{ maxHeight: 100 }}
                          >
                            {comments.map(
                              (comment, index) =>
                                comment.possitive_comments &&
                                comment.created_at && (
                                  <div
                                    key={index}
                                    className="bg-amber-200 h-12 text-amber-900 rounded-sm mb-1 flex w-full items-center justify-between"
                                  >
                                    <div className="w-2/3 pl-2 font-semibold break-words">
                                      {comment.possitive_comments}
                                    </div>
                                    <div className="w-1/3 flex justify-end flex-wrap text-amber-600">
                                      <p className="pr-2">
                                        {dayjs(comment.created_at)
                                          .utc()
                                          .local()
                                          .format("HH:mm")}
                                      </p>
                                      <p className="pr-2">
                                        {dayjs(comment.created_at)
                                          .utc()
                                          .format("DD/MM/YYYY")}
                                      </p>
                                      {client &&
                                        client.client.id ===
                                          comment.client_id && (
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
                                              onClick={() =>
                                                handleEditComment(comment)
                                              }
                                              className="text-[#AC703E] mx-2 text-sm"
                                            >
                                              Editar
                                            </button>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                )
                            )}
                          </SimpleBar>
                        ) : (
                          <p className="flex justify-center font-semibold text-xl text-[#742d13] mt-8">
                            No hay comentarios positivos
                          </p>
                        )
                      ) : comments ? null : (
                        <p className="text-white">Cargando comentarios...</p>
                      )}

                      {showNegativeComments && comments ? (
                        comments.filter(
                          (comment) =>
                            comment.negative_comments && comment.created_at
                        ).length > 0 ? (
                          <SimpleBar
                            autoHide
                            over
                            direction="vertical"
                            style={{ maxHeight: 100 }}
                          >
                            {comments.map(
                              (comment, index) =>
                                comment.negative_comments &&
                                comment.created_at && (
                                  <div
                                    key={index}
                                    className="bg-amber-200 h-12 text-amber-900 rounded-sm mb-1 flex w-full items-center justify-between"
                                  >
                                    <div className="w-2/3 pl-2 break-words font-semibold">
                                      {comment.negative_comments}
                                    </div>
                                    <div className="w-1/3 flex justify-end flex-wrap text-amber-600">
                                      <p className="pr-2">
                                        {dayjs(comment.created_at)
                                          .utc()
                                          .local()
                                          .format("HH:mm")}
                                      </p>
                                      <p className="pr-2">
                                        {dayjs(comment.created_at)
                                          .utc()
                                          .format("DD/MM/YYYY")}
                                      </p>
                                      {client &&
                                        client.client.id ===
                                          comment.client_id && (
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
                                              onClick={() =>
                                                handleEditComment(comment)
                                              }
                                              className="text-[#AC703E] mx-2 text-sm"
                                            >
                                              Editar
                                            </button>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                )
                            )}
                          </SimpleBar>
                        ) : (
                          <p className="flex justify-center font-semibold text-xl text-[#742d13] mt-8">
                            No hay comentarios negativos
                          </p>
                        )
                      ) : comments ? null : (
                        <p className="text-white">Cargando comentarios...</p>
                      )}

                      <div>
                        <textarea
                          value={comment}
                          onChange={handleCommentChange}
                          className="w-full bg-amber-200 text-amber-900 placeholder:text-[#AC703E] pl-2 mt-4 outline-none font-bold"
                          placeholder="Escribe tu comentario aquí..."
                        ></textarea>
                        <div className="w-full h-[50%] flex justify-start items-center">
                          <div className="h-full flex justify-start items-center">
                            <button
                              className="flex flex-col justify-center items-center text-center"
                              onClick={() => handleLike(event)}
                            >
                              <div className="flex flex-col items-center justify-center text-center">
                                <AiFillLike color="#ff9800" size={25} />
                                <span className="ml-2 text-[#742d13] text-sm font-bold">
                                  {likesCount}
                                </span>
                              </div>
                            </button>
                            <button
                              className="flex flex-col justify-center items-center text-center"
                              onClick={() => handleDisLike(event)}
                            >
                              <div className="flex flex-col items-center justify-center text-center">
                                <AiFillDislike color="#ff9800" size={25} />
                                <span className="ml-2 text-[#742d13] text-sm font-bold">
                                  {dislikesCount}
                                </span>
                              </div>
                            </button>
                          </div>
                          <div className="w-3/4 ml-2">
                            <button
                              onClick={handleCommentSubmit}
                              className="w-1/4 bg-amber-500 text-amber-950 font-bold p-2 rounded-lg hover:bg-amber-600 duration-300"
                            >
                              {editingComment ? "Guardar cambios" : "Comentar"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 w-full lg:w-1/2 sm:w-11/12">
                <form
                  className=" bg-primary flex flex-col justify-between h-full rounded-md p-2 shadow-complete shadow-black"
                  onSubmit={onSubmit}
                >
                  <img src={logoeventBrew} className="m-auto w-[40%] " alt="" />
                  <div className="h-1/2">
                    <div className="text-white">
                      <h2 className=" text-center text-xl">
                        ¿Deseas agregar los eventos de tu establecimiento?
                      </h2>
                      <h2 className="font-bold text-center text-xl">
                        Contactanos
                      </h2>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base flex ">
                        Nombre:
                        <span>
                          {errors.name && (
                            <p className="text-red-500 text-base ml-4">
                              Este campo es requerido*
                            </p>
                          )}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="bg-white text-textBlack pl-2"
                        {...register("name", { required: true })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base mt-2 flex">
                        Correo:
                        <span className="flex justify-end">
                          {errors.email && (
                            <p className="text-red-500 text-base ml-4">
                              Correo electrónico inválido*
                            </p>
                          )}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="bg-white text-textBlack pl-2"
                        {...register("email", {
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Expresión regular para validar el formato del correo electrónico
                        })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base flex mt-2">
                        Motivo:{" "}
                        <span>
                          {errors.content && (
                            <p className="text-red-500 text-base ml-4">
                              Este campo es requerido*
                            </p>
                          )}
                        </span>
                      </label>
                      <textarea
                        cols="10"
                        rows="3"
                        className="bg-white text-textBlack pl-2"
                        {...register("content", { required: true })}
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="w-[30%] p-2 bg-acent text-primary shadow-complete shadow-black text-base m-2 text-center font-bold rounded-md mt-4 hover:bg-gold duration-300">
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <p>Cargando información del evento...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InfoEvents;
