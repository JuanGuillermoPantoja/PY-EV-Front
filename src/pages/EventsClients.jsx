import React, { useEffect, useState } from 'react';
import dayjs, { utc } from 'dayjs';
import { getEventsClientsRequest } from '../api/event';
import { useClientAuth } from '../context/ClientContex';
import { useComments } from '../context/CommentsContext';
import NavbarHome from '../components/NavbarHome';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import Chat from '../components/Chat';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useNavigate } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import bgCard from "../img/bg-card.png"
import threeGrainCoffe from "../img/3grain-coffe.png"
import coffeGrain from "../img/Coffe-grano.png"
import coffe from "../img/coffe.png"
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
		addLike,
		addDisLike,
	} = useComments();
	const { isClientAuthenticated, client } = useClientAuth();
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [comment, setComment] = useState('');
	const [editingComment, setEditingComment] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getEventsClientsRequest();
				setEvents(
					res.data.filter((event) => event.done !== false && event.done !== 0),
				);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const handleLike = async (event) => {
		console.log(event.id);
		try {
			await addLike(event.id, client.client.id);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDisLike = async (event) => {
		console.log(event.id);
		try {
			await addDisLike(event.id, client.client.id);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = async () => {
		if (!isClientAuthenticated) {
			showAlert('Debes iniciar sesión para comentar', 'error');
			return;
		}

		try {
			if (editingComment) {
				await updateComment(editingComment.id, client.client.id, comment);
				const updateComments = comments.map((c) =>
					c.id === editingComment ? { ...c, comment_text: comment } : c,
				);
				setComment(updateComments);
				setEditingComment(null);
			} else {
				if (selectedEvent && selectedEvent.id) {
					await createComment(selectedEvent.id, comment, client.client.id);
					await getComments(selectedEvent.id);
				} else {
					showAlert('Selecciona un evento antes de comentar', 'warning');
					return;
				}
			}
			setComment('');
		} catch (error) {
			console.error(error);
		}
	};

	const showAlert = (message, type) => {
		Swal.fire({
			title: message,
			icon: type,
			color: '#AC703E',
			iconColor: '#AC703E',
			background: '#FFEEB3',
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
			console.error('El evento seleccionado es inválido.');
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
		if (isClientAuthenticated) navigate('/');
	}, [isClientAuthenticated]);

	const handleMoreInfoClick = (eventId) => {
		// Navega a la ruta de InfoEvents con el ID del evento como parámetro
		navigate(`/info-event/${eventId}`);
	};

	return (
		<>
			<NavbarHome />
			<SimpleBar className='bg-white w-full bg-fixed bg-cover bg-center h-screen'>
				<div className='h-full w-full text-center text-textBlack flex flex-col justify-center items-center'>
					<div className='h-screen w-full flex flex-col items-center justify-center bg-primary '>
						<div className='bg-white h-1/2 w-3/4 rounded-tr-full rounded-bl-full flex flex-col justify-center items-center animate-fade-in animate-duration-700'>
							<h1 className='text-textBlack text-8xl'>
								Bienvenidos a <span className='text-acent'>EventsBrew</span>
							</h1>
							<h2 className='text-2xl animate-slide-in-left'>
								Descubre, saborea, disfruta: ¡Tu próximo evento comienza aquí!
							</h2>
						</div>
					</div>
					{/* <p className="text-center font-bold">
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
                  <div className="w-full flex justify-around">
                      <button onClick={()=>handleLike(event)}><AiFillLike color="#FFEEB3" size="35"/></button>
                      <button onClick={()=>handleDisLike(event)}><AiFillDislike color="#FFEEB3" size="35"/></button>
                  </div>
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
            ></textarea> */}
					<h1 className='text-left w-[80%]'>Eventos disponibles</h1>
					<div className='w-[80%]  h-[550px] flex justify-between items-center flex-wrap'>
						{events.length === 0 && (
							<h1 className='h-screen bg-cover w-full bg-center text-center'>
								No se han agregado eventos
							</h1>
						)}
						{events.map((event) => (
							<div
								key={event.id}
								className='w-[24%] h-[80%] rounded-2xl text-primary my-2 shadow-complete shadow-gray-400'
							>
								{/* <div className=' w-full h-full bg-primary rounded-t-lg'>
									<img
										src={
											event.img_event
												? `https://events-cqtw.onrender.com/uploads/${event.img_event}`
												: 'https://cdn-icons-png.flaticon.com/512/5225/5225572.png'
										}
										alt=''
									/>
								</div> */}
								<div className='flex flex-col justify-between items-center h-full w-full relative'>
									<div className='flex-col w-full h-full'>
										<div
											className='flex flex-col justify-center w-full h-full mb-2 relative overflow-hidden'
											style={{
												backgroundImage: `url(${bgCard})`,
											}}
										>
											<div
												className='w-full h-[50%] bg-amber-900 bg-cover bg-center flex flex-col justify-end items-center relative'
												style={{
													backgroundImage: `url(${`https://events-cqtw.onrender.com/uploads/${event.img_event}`})`,
												}}
											>
												<div className='bg-black h-full w-full absolute opacity-40'></div>
												<h2 className='h-[20%] w-[75%] text-white flex justify-center items-center relative bottom-10 z-10'>
													{event.title}
												</h2>
												<p className='h-[20%] bg-acent text-textBlack  w-[75%] flex justify-center items-center relative z-10'>
													{event.description}
												</p>
												<p className='h-10% bg-textBlack text-acent w-[75%] relative z-10'>
													{dayjs(event.dates)
														.utc()
														.format('DD [de] MMMM [del] YYYY')}
												</p>
											</div>
											<div className='w-full h-[50%] bg-cover bg-center flex flex-col justify-start items-center relative z-10'>
												<p className='bg-primary w-[75%] h-[40%] text-white'>
													{event.address}
												</p>
												{/* <button
													onClick={() => handleOpenModal(event)}
													className='w-[35%] h-8 text-base bg-[#FFEEB3] text-[#AC703E] m-2 font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300'
												>
													Comentarios
												</button> */}
												{/* <button
													onClick={() => {
														handleMoreInfoClick(event.id);
													}}
												>
													Más información
												</button> */}
											</div>
											<img
												className='z-0 absolute left-24 bottom-28'
												src={threeGrainCoffe}
												alt=''
											/>
											<img
												className='z-0 absolute right-40 top-32'
												src={coffeGrain}
												alt=''
											/>
											<img
												className='absolute top-2/3 left-0 right-0 mx-auto '
												src={coffe}
												alt=''
											/>
										</div>
									</div>
								</div>
							</div>
						))}
						<hr className='h-7 bg-none w-full border-none' />
					</div>
				</div>
			</SimpleBar>
			{selectedEvent && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 animate-fade-in animate-duration-300'>
					<div className='bg-[#AC703E] text-[#FFEEB3] p-8 rounded-lg w-1/2'>
						<h2 className='mb-4'>{selectedEvent.title}</h2>
						<textarea
							value={comment}
							onChange={handleCommentChange}
							className='w-full bg-[#FFEEB3] text-[#AC703E] placeholder:text-[#AC703E] pl-2 font-bold'
							placeholder='Escribe tu comentario aquí...'
						></textarea>

						<div className='mt-4'>
							<SimpleBar autoHide style={{ maxHeight: 300 }}>
								{comments.map((comment, index) => (
									<div
										key={index}
										className='bg-[#FFEEB3] text-[#AC703E] rounded-xl mb-1  flex w-full items-center justify-between'
									>
										<p className='font-bold '>{comment.client}</p>
										<p className='w-full pl-2 '>{comment.comment_text}</p>
										<p className='pr-2'>
											{dayjs(comment.created_at).utc().format('HH:mm')}
										</p>
										<p className='pr-2'>
											{dayjs(comment.created_at).utc().format('DD/MM/YYYY')}
										</p>
										{client && client.client.id === comment.client_id && (
											<div className='flex'>
												<button
													onClick={() => handleDeleteComment(comment.id)}
													className='text-red-600 font-bold mx-2'
												>
													Eliminar
												</button>
												<span> | </span>
												<button
													onClick={() => handleEditComment(comment)}
													className='text-[#AC703E] font-bold mx-2'
												>
													Editar
												</button>
											</div>
										)}
									</div>
								))}
							</SimpleBar>
						</div>
						<div className='w-full flex justify-center'>
							<button
								onClick={handleCommentSubmit}
								className='mx-2 w-1/4 bg-[#FFEEB3] text-[#AC703E] font-bold mt-4 p-2 rounded-full hover:bg-[#d5935c] hover:text-[#FFEEB3] duration-300'
							>
								{editingComment ? 'Guardar cambios' : 'Comentar'}
							</button>
							<button
								onClick={handleCloseModal}
								className='mx-2 w-1/4 bg-red-600 text-white font-bold mt-4 p-2 rounded-full hover:bg-red-700 duration-300'
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
