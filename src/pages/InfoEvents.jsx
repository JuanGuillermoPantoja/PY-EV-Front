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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
        }
      }
      await getComments(filteredEvent.id);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarHome />
			<div className=' w-full'>
				<div className='w-full h-full'>
					{filteredEvent ? (
						<div className='flex w-full h-full bg-gradient-orange flex-col lg:flex-row lg:justify-between'>
							<div className='lg:w-[60%] xl:w-[70%] md:w-[90%] md:self-center flex flex-col'>
								<div className='flex justify-center w-full h-full p-2 flex-col gap-2 xl:gap-10 xl:flex-row'>
									<div className='lg:w-full'>
										<img
											className=' lg:w-auto lg:h-auto rounded-xl'
											src={`https://events-cqtw.onrender.com/uploads/${filteredEvent.img_event}`}
											alt='Cover Image'
										/>
									</div>
									<div className='w-[90%] xl:w-[45%] lg:h-1/2 self-center'>
										<Slider className='' {...settings}>
											{images?.images?.map((image, index) => (
												<div className='' key={index}>
													<img
														className='lg:h-[300px] md:w-full xl:h-[280px] 2xl:h-[400px] md:h-[350px] rounded-xl'
														src={`https://events-cqtw.onrender.com/uploads/${image}`} // Ruta de la imagen
														alt={`Image ${index}`}
													/>
												</div>
											))}
										</Slider>
									</div>
								</div>



                <div className='w-[100%] h-full p-4 md:p-0 md:mt-4 text-white flex justify-center'>
									<div className='flex justify-center w-full h-full p-2 flex-col 2xl:flex-row 2xl:w-full'>
										<div className='lg:w-full self-center bg-[#fdf7f7] text-textBlack rounded-sm shadow-inner p-2 shadow-amber-950'>
											<h2 className='mb-8 font-bold text-xl'>{filteredEvent.title}</h2>
											<p className='font-bold'>Descripción del evento:</p>
											<p className='mb-4'>{filteredEvent.description}</p>
											<p className='font-bold'>Dirección del evento:</p>
											<p className='mb-4'>{filteredEvent.address}</p>
											<p className='font-bold'>Fecha del evento:</p>
											<p>
												{dayjs(filteredEvent.dates)
													.utc()
													.format('DD [de] MMMM [del] YYYY')}
											</p>
										</div>
										<div className='lg:w-full bg-[#fdf7f7] text-textBlack rounded-sm shadow-inner p-2 shadow-amber-950'>
											<div className='flex w-full justify-center gap-4'>
												<button
													className={`bg-slate-500 rounded-md p-2 mb-2 ${showPositiveComments ? 'bg-opacity-100' : 'bg-opacity-50'}`}
													onClick={() => (setShowPositiveComments(true), setShowNegativeComments(false))}
												>
													<h1 className='text-base'>Comentarios positivos</h1>
												</button>
												<button
													className={`bg-slate-700 rounded-md p-2 mb-2 ${showNegativeComments ? 'bg-opacity-100' : 'bg-opacity-50'}`}
													onClick={() => (setShowNegativeComments(true), setShowPositiveComments(false))}
												>
													<h1 className='text-base'>Comentarios negativos</h1>
												</button>
											</div>



                      {console.log("comentarios", comments)}
                      {showPositiveComments && comments ? (
                        comments.filter(
                          (comment) =>
                            comment.possitive_comments && comment.created_at
                        ).length > 0 ? (
                          <SimpleBar
                            direction="vertical"
                            style={{ maxHeight: 350 }}
                          >
                            {comments.map(
                              (comment, index) =>
                                comment.possitive_comments &&
                                comment.created_at && (
                                  <div
                                    key={index}
                                    className="bg-amber-200 text-amber-900 rounded-sm mb-1 flex w-full items-center justify-between"
                                  >
                                    <div className="w-2/3 break-words">
                                      {comment.possitive_comments}
                                    </div>
                                    <div>
                                      {dayjs(comment.created_at)
                                        .utc()
                                        .local()
                                        .format("HH:mm")}{" "}
                                      {dayjs(comment.created_at)
                                        .utc()
                                        .format("DD/MM/YYYY")}
                                    </div>
                                  </div>
                                )
                            )}
                          </SimpleBar>
                        ) : (
                          <p>No hay comentarios positivos</p>
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
                            style={{ maxHeight: 600 }}
                          >
                            {comments.map(
                              (comment, index) =>
                                comment.negative_comments &&
                                comment.created_at && (
                                  <div
                                    key={index}
                                    className="bg-amber-200 text-amber-900 rounded-sm mb-1 flex w-full items-center justify-between"
                                  >
                                    <div className="w-2/3 break-words">
                                      {comment.negative_comments}
                                      {console.log("comment", comment)}
                                    </div>
                                    <div>
                                      {dayjs(comment.created_at)
                                        .utc()
                                        .local()
                                        .format("HH:mm")}{" "}
                                      {dayjs(comment.created_at)
                                        .utc()
                                        .format("DD/MM/YYYY")}
                                    </div>
                                  </div>
                                )
                            )}
                          </SimpleBar>
                        ) : (
                          <p>No hay comentarios negativos</p>
                        )
                      ) : comments ? null : (
                        <p className="text-white">Cargando comentarios...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[90%] self-center lg:self-start md:w-[88%] lg:w-[35%] lg:h-[700px] lg:m-2 xl:h-full xl:w-[27%] xl:m-0 mb-2">
                <div className="bg-white text-textBlack p-4 xl:p-2 w-full h-full flex flex-col justify-between shadow-sm shadow-amber-950">
                  <div className="mt-4 overflow-hidden">
                    <h2 className="">Comentarios</h2>
                    <SimpleBar
                      autoHide
                      over
                      direction="vertical"
                      style={{ maxHeight: 600 }}
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
                          className="flex flex-col justify-center items-center text-center"
                          onClick={() => handleLike(event)}
                        >
                          <div className="flex flex-col items-center justify-center text-center">
                            <AiFillLike color="#ff9800" size={25} />
                            <span className="ml-2">{likesCount}</span>
                          </div>
                        </button>
                        <button
                          className="flex flex-col justify-center items-center text-center"
                          onClick={() => handleDisLike(event)}
                        >
                          <div className="flex flex-col items-center justify-center text-center">
                            <AiFillDislike color="#ff9800" size={25} />
                            <span className="ml-2">{dislikesCount}</span>
                          </div>
                        </button>
                      </div>
                      <div className="w-3/4 flex justify-around">
                        <button
                          onClick={handleCommentSubmit}
                          className="w-2/3 bg-amber-500 text-amber-950 font-bold p-2 rounded-lg hover:bg-amber-600 duration-300"
                        >
                          {editingComment ? "Guardar cambios" : "Comentar"}
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
      </div>
      <Footer />
    </>
  );
}

export default InfoEvents;
