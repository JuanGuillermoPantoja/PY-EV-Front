// import React, { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
// import { getEventsClientsRequest } from '../api/event';
// import { useClientAuth } from '../context/ClientContex';
// import { useComments } from '../context/CommentsContext';
// import NavbarHome from '../components/NavbarHome';
// import Footer from '../components/Footer';
// import Swal from 'sweetalert2';

// function EventsClients() {
// 	const {
// 		createComment,
// 		comments,
// 		getComments,
// 		deleteComment,
// 		updateComment,
// 	} = useComments();
// 	const { isClientAuthenticated, client } = useClientAuth();
// 	const [events, setEvents] = useState([]);
// 	const [selectedEvent, setSelectedEvent] = useState(null);
// 	const [comment, setComment] = useState('');
// 	const [editingComment, setEditingComment] = useState(null);
// 	const [isEditing, setIsEditing] = useState(false);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const res = await getEventsClientsRequest();
// 				setEvents(
// 					res.data.filter((event) => event.done !== false && event.done !== 0),
// 				);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};
// 		fetchData();
// 	}, []);

// 	const handleCommentChange = (e) => {
// 		setComment(e.target.value);
// 	};

// 	const handleCommentSubmit = async () => {
// 		if (!isClientAuthenticated) {
//       Swal.fire({
//         title: 'Debes iniciar sesion para comentar',
//         icon: 'error',
//         color: '#AC703E',
//         iconColor: '#AC703E',
//         background: '#FFEEB3',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }

// 			if (!selectedEvent) {
// 				alert('Selecciona un evento antes de comentar');
// 				return;
// 			}

// 			if (isEditing) {
// 				try {
// 					await updateComment(editingComment.id, client.client.id, comment);
// 					setEditingComment(null); // Limpiar el estado de edición después de actualizar el comentario
// 					setComment('');
// 				} catch (error) {
// 					console.error(error);
// 				}
// 			} else {
// 				createComment(selectedEvent.id, comment, client.client.id);
// 				setComment('');
// 			}
// 	};

// 	const handleOpenModal = (event) => {
// 		setSelectedEvent(event);
// 		getComments(event.id);
// 	};

// 	const handleCloseModal = () => {
// 		setSelectedEvent(null);
// 	};

// 	const handleDeleteComment = async (commentId) => {
// 		try {
// 			await deleteComment(commentId, client.client.id); // Llamar a la función deleteComment con el ID del comentario
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	const handleEditComment = (comment) => {
// 		setEditingComment(comment); // Establecer el comentario en edición
// 		setComment(comment.comment_text); // Establecer el texto del comentario en el campo de entrada
// 		setIsEditing(true);
// 	};

// 	// const handleUpdateComment = async (commentId) => {
// 	//   // try {
// 	//   //   await updateComment(commentId, client.client.id, comment); // Pasar el nuevo texto del comentario a la función de actualización
// 	//   //   setEditingComment(null); // Limpiar el estado de edición después de actualizar el comentario
// 	//   //   setComment("");
// 	//   // } catch (error) {
// 	//   //   console.error(error);
// 	//   // }

// 	// };
// 	return (
// 		<>
// 			<NavbarHome />
// 			<div className="h-screen overflow-auto bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover bg-center flex flex-col justify-center items-center">
// 				<h1
// 					className='text-4xl text-[#FFEEB3]
//         xl:text-7xl
//         md:text-6xl
//         sm:text-5xl'
// 				>
// 					Eventos disponibles
// 				</h1>
// 				<div className='w-full flex h-full justify-center items-center gap-3 flex-wrap'>
// 					{events.length === 0 && (
// 						<h1 className='h-screen bg-cover w-full bg-center bg-[url("https://i.ibb.co/LQf91TG/fondo-EB.webp")] text-4xl text-center'>
// 							No se han agregado eventos
// 						</h1>
// 					)}
// 					{events.map((event) => (
// 						<div
// 							key={event.id}
// 							className='bg-[#000000a4] w-[60%] h-2/3 flex flex-col justify-between rounded-2xl text-[#FFEEB3] my-2 shadow-xl shadow-black
//             xl:w-[30%]
//             lg:w-[27%] lg:h-[90%]
//             sm:w-2/5 sm:h-4/5'
// 						>
// 							<img
// 								className='w-full h-2/5 rounded-t-lg'
// 								src={`https://events-cqtw.onrender.com/uploads/${event.img_event}`}
// 								alt=''
// 							/>
// 							<div className='flex flex-col justify-between items-center h-[60%] w-full'>
// 								<div className='flex-col  bg-black w-full'>
// 									<div className='flex justify-between w-full h-[50%] mb-2'>
// 										<div className='w-[65%]'>
// 											<p
// 												className='text-left font-bold text-sm
//                       lg:text-base'
// 											>
// 												Nombre del local:
// 											</p>
// 											<p
// 												className='text-left text-sm mb-2 text-[#e6d48e]
//                       md:text-base'
// 											>
// 												{event.title}
// 											</p>
// 										</div>
// 										<div className='w-[35%]'>
// 											<p
// 												className='text-right font-bold text-sm
//                        md:text-base'
// 											>
// 												Fecha del evento:
// 											</p>
// 											<p
// 												className='text-right text-sm
//                        md:text-base'
// 											>
// 												{dayjs(event.dates).utc().format('DD/MM/YYYY')}
// 											</p>
// 										</div>
// 									</div>
// 									<p
// 										className='text-left font-bold text-xs
//                    md:text-base'
// 									>
// 										Direccion:
// 									</p>
// 									<p
// 										className='text-left text-sm
//                    md:text-base'
// 									>
// 										{event.address}
// 									</p>
// 								</div>

// 								<p
// 									className='text-center text-sm font-bold
//                  md:text-base'
// 								>
// 									Informacion del evento:
// 								</p>
// 								<p
// 									className='text-center text-sm h-[30%]
//                  md:text-base'
// 								>
// 									{event.description}
// 								</p>
// 								<button
// 									onClick={() => handleOpenModal(event)}
// 									className='w-[35%] h-8 bg-[#FFEEB3] text-[#AC703E] text-sm m-2 font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300  md:text-base'
// 								>
// 									Comentarios
// 								</button>
// 							</div>
// 						</div>
// 					))}
// 					<hr className='h-7 bg-none w-full border-none' />
// 				</div>
// 			</div>
// 			{/* Modal de comentarios */}
// 			{selectedEvent && (
// 				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50'>
// 					<div className='bg-gray-950 p-8 rounded-lg w-1/2'>
// 						<h2 className='text-2xl mb-4'>{selectedEvent.title}</h2>
// 						<textarea
// 							value={comment}
// 							onChange={handleCommentChange}
// 							className='w-full bg-[#FFEEB3] text-[#AC703E] placeholder:text-[#AC703E] pl-2 font-bold'
// 							placeholder='Escribe tu comentario aquí...'
// 						></textarea>

// 						{/* Mostrar comentarios */}

// 						<div className='mt-4'>
// 							{comments.map((comment, index) => (
// 								<div key={index} className='rounded-xl mb-1'>
// 									<p className='bg-[#FFEEB3] text-[#AC703E] text-lg flex justify-between px-2 rounded-xl'>
//                   {editingComment && editingComment.id === comment.id ? (
//                       <textarea
//                         value={comment.comment_text}
//                         onChange={(e) => {
//                           const updatedComments = [...comments];
//                           updatedComments[index].comment_text = e.target.value;
//                           setComment(updatedComments);
//                         }}
//                         className="w-full bg-[#FFEEB3] text-[#AC703E] placeholder:text-[#AC703E] pl-2 font-bold"
//                         placeholder='Escribe tu comentario aquí'
//                       />
//                     ) : (
//                       comment.comment_text
//                     )}
//                     <span>
//                       {dayjs(comment.created_at)
//                         .utc()
//                         .format('DD/MM/YYYY - HH:mm')}
//                       {!editingComment || editingComment.id !== comment.id ? (
//                         <>
//                           <button
//                             className='ml-8'
//                             onClick={() => handleDeleteComment(comment.id)}
//                           >
//                             Eliminar
//                           </button>
//                           <span> | </span>
//                           <button onClick={() => handleEditComment(comment)}>
//                             Editar
//                           </button>
//                         </>
//                       ) : (
//                         <button onClick={() => handleCommentSubmit()}>
//                           Guardar
//                         </button>
//                       )}
//                     </span>
//                   </p>
//                 </div>
//               ))}
//             </div>

// 						<div className='flex justify-between mt-4'>
// 							<button
// 								onClick={handleCloseModal}
// 								className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
// 							>
// 								Cerrar
// 							</button>
// 							<button
// 								onClick={handleCommentSubmit}
// 								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
// 							>
// 								{isEditing ? "Guardar comentario" : "Enviar comentario"}
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			<Footer />
// 		</>
// 	);
// }

// export default EventsClients;

import React, { useEffect, useState } from 'react';
import dayjs, {utc} from 'dayjs';
import { getEventsClientsRequest } from '../api/event';
import { useClientAuth } from '../context/ClientContex';
import { useComments } from '../context/CommentsContext';
import NavbarHome from '../components/NavbarHome';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
dayjs.extend(utc);

function EventsClients() {
	const {
		createComment,
		comments,
		getComments,
		deleteComment,
		updateComment,
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

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = async () => {
		if (!isClientAuthenticated) {
			showAlert('Debes iniciar sesión para comentar', 'error');
			return;
		}

		if (!selectedEvent) {
			showAlert('Selecciona un evento antes de comentar', 'warning');
			return;
		}

		try {
			if (editingComment) {
				await updateComment(editingComment.id, client.client.id, comment);
				setEditingComment(null);
			} else {
				createComment(selectedEvent.id, comment, client.client.id);
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

	const handleOpenModal = (event) => {
		setSelectedEvent(event);
		getComments(event.id);
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

	return (
		<>
			<NavbarHome />
			<div className="h-screen overflow-auto bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover bg-center flex flex-col justify-center items-center">
				<h1 className='text-4xl text-[#FFEEB3] xl:text-7xl md:text-6xl sm:text-5xl'>
					Eventos disponibles
				</h1>
				<div className='w-full flex h-full justify-center items-center gap-3 flex-wrap'>
					{events.length === 0 && (
						<h1 className='h-screen bg-cover w-full bg-center bg-[url("https://i.ibb.co/LQf91TG/fondo-EB.webp")] text-4xl text-center'>
							No se han agregado eventos
						</h1>
					)}
					{events.map((event) => (
						<div
							key={event.id}
							className='bg-[#000000a4] w-[60%] h-2/3 flex flex-col justify-between rounded-2xl text-[#FFEEB3] my-2 shadow-xl shadow-black xl:w-[30%] lg:w-[27%] lg:h-[90%] sm:w-2/5 sm:h-4/5'
						>
							<img
								className='w-full h-2/5 rounded-t-lg'
								src={`https://events-cqtw.onrender.com/uploads/${event.img_event}`}
								alt=''
							/>
							<div className='flex flex-col justify-between items-center h-[60%] w-full'>
								<div className='flex-col  bg-black w-full'>
									<div className='flex justify-between w-full h-[50%] mb-2'>
										<div className='w-[65%]'>
											<p className='text-left font-bold text-sm lg:text-base'>
												Nombre del local:
											</p>
											<p className='text-left text-sm mb-2 text-[#e6d48e] md:text-base'>
												{event.title}
											</p>
										</div>
										<div className='w-[35%]'>
											<p className='text-right font-bold text-sm md:text-base'>
												Fecha del evento:
											</p>
											<p className='text-right text-sm md:text-base'>
												{dayjs(event.dates).utc().format('DD/MM/YYYY')}
											</p>
										</div>
									</div>
									<p className='text-left font-bold text-xs md:text-base'>
										Dirección:
									</p>
									<p className='text-left text-sm md:text-base'>
										{event.address}
									</p>
								</div>

								<p className='text-center text-sm font-bold md:text-base'>
									Información del evento:
								</p>
								<p className='text-center text-sm h-[30%] md:text-base'>
									{event.description}
								</p>
								<button
									onClick={() => handleOpenModal(event)}
									className='w-[35%] h-8 bg-[#FFEEB3] text-[#AC703E] text-sm m-2 font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300 md:text-base'
								>
									Comentarios
								</button>
							</div>
						</div>
					))}
					<hr className='h-7 bg-none w-full border-none' />
				</div>
			</div>
			{selectedEvent && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-[#AC703E] text-[#FFEEB3] p-8 rounded-lg w-1/2'>
						<h2 className='text-2xl mb-4'>{selectedEvent.title}</h2>
						<textarea
							value={comment}
							onChange={handleCommentChange}
							className='w-full bg-[#FFEEB3] text-[#AC703E] placeholder:text-[#AC703E] pl-2 font-bold'
							placeholder='Escribe tu comentario aquí...'
						></textarea>

						<div className='mt-4'>
							{comments.map((comment, index) => (
								<div
									key={index}
									className='bg-[#FFEEB3] text-[#AC703E] rounded-xl mb-1  flex w-full items-center justify-between'
								>
									<p className='text-lg font-bold '>{comment.client}</p>
									<p className='text-lg w-full pl-2 '>{comment.comment_text}</p>
                  <p className='text-sm pr-2'>{dayjs(comment.created_at).utc().format("HH:mm")}</p>
                  <p className='text-sm pr-2'>{dayjs(comment.created_at).utc().format("DD/MM/YYYY")}</p>
									{client.client.id === comment.client_id && (
										<div className='flex'>
											<button
												onClick={() => handleDeleteComment(comment.id)}
												className='text-sm text-red-600 font-bold mx-2'
											>
												Eliminar
											</button>
                      <span> | </span>
											<button
												onClick={() => handleEditComment(comment)}
												className='text-sm text-[#AC703E] font-bold mx-2'
											>
												Editar
											</button>
										</div>
									)}
								</div>
							))}
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
			<Footer />
		</>
	);
}

export default EventsClients;