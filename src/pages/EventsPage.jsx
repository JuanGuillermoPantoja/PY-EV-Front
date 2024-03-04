import { useEffect, useState } from 'react';
import { useEvents } from '../context/EventContext';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Navbar from '../components/Navbar';
import FooterAdmin from '../components/FooterAdmin';
import bgCard from '../img/bg-card.png';
import 'dayjs/locale/es'; // Importa el idioma español

dayjs.locale('es');

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
dayjs.extend(utc);

function EventsPage() {
	const { getEvents, events, deleteEvent, toggleEventDone } = useEvents();
	const navigate = useNavigate();
	const changeColor = async (eventId) => {
		await toggleEventDone(eventId);
		getEvents();
	};

	useEffect(() => {
		getEvents();
	}, []);

	const handleMoreInfoClick = (eventId) => {
		// Navega a la ruta de InfoEvents con el ID del evento como parámetro
		navigate(`/info-events/${eventId}`);
	};

	return (
		<>
			<Navbar />
			<SimpleBar className='bg-white w-full bg-fixed bg-cover bg-center h-screen'>
				<div className='h-full pb-4 bg-cover bg-center flex flex-col justify-center items-center'>
					<h1 className='text-textBlack text-center text-[60px] w-1/2 bg-gradient-orange rounded-br-full rounded-bl-full mb-4'>
						Mis eventos
					</h1>
					<div className='w-full flex h-[550px] justify-center items-center gap-3 flex-wrap'>
						{events.length === 0 && (
							<h1 className='h-screen bg-cover w-full bg-center text-center'>
								No se han agregado eventos
							</h1>
						)}

						{Array.isArray(events) ? (
							events.map((event) => (
								<div
									key={event.id}
									className='w-[24%] h-[80%] rounded-2xl text-primary my-2 shadow-complete shadow-black'
								>
									{/* <img
										className='w-full h-2/5 border-[#AC703E] rounded-t-lg'
										src={
                      event.img_event
                      ? `https://events-cqtw.onrender.com/uploads/${event.img_event}`
                      : 'https://cdn-icons-png.flaticon.com/512/5225/5225572.png'
										}
										alt=''
									/> */}
									<div className='flex flex-col justify-between items-center h-full w-full relative'>
										<button
											className='w-full h-full hover:bg-black z-10'
											onClick={() => {
												handleMoreInfoClick(event.id);
											}}
										>
											<div className='flex-col w-full h-full'>
												<div
													className='flex flex-col justify-center w-full h-full mb-2 relative overflow-hidden'
													style={{
														backgroundImage: `url(${bgCard})`,
													}}
												>
													<div
														className='w-full h-[50%] bg-amber-900 bg-cover bg-center flex flex-col justify-end items-center relative '
														style={{
															backgroundImage: `url(${`https://events-cqtw.onrender.com/uploads/${event.img_event}`})`,
														}}
													>
														<div className='bg-black h-full w-full absolute opacity-40'></div>
														<h2 className='text-center h-[20%] w-[75%] text-white flex justify-center items-center relative bottom-10 z-10'>
															{event.title}
														</h2>
														<p className='h-[20%] bg-acent text-textBlack  w-[75%] flex justify-center items-center relative z-10'>
															{event.promotion}
														</p>
														<p className='text-center h-10% bg-textBlack text-acent w-[75%] relative z-10'>
															{dayjs(event.dates)
																.utc()
																.format('DD [de] MMMM [del] YYYY')}
														</p>
													</div>

													<div className='flex flex-col justify-between items-center h-[60%] w-full'>
														{/* <div className='flex-col bg-black w-full h-2/5'>
											<div className='flex justify-between w-full h-[50%] mb-2'>
												<div className='w-[60%]'>
													<p className='text-left font-bold'>
														Nombre del local:
													</p>
													<p className='text-left'>{event.title}</p>
												</div>
												<div className='w-[40%]'>
													<p className='text-right font-bold'>
														Fecha del evento:
													</p>
													<p className='text-right'>
														{dayjs(event.dates).utc().format('YYYY/MM/DD')}
													</p>
												</div>
											</div>
											<p className='text-left font-bold '>Direccion:</p>
											<p className='text-left'>{event.address}</p>
										</div> */}
														{/* <p className='text-center h-10% bg-primary text-white w-[75%] relative z-10'>
														Descripción:
													</p>
													<p className='text-center h-10% bg-primary text-white w-[75%] relative z-10'>
														{event.description}
													</p> */}
														<div className='w-full h-[50%] bg-cover bg-center flex flex-col justify-start items-center relative z-10'>
															<p className='bg-primary text-center w-[75%] h-[40%] text-white'>
																{event.address}
															</p>
														</div>
													</div>
												</div>
											</div>
										</button>
										<div className='w-full flex justify-between items-center'>
											<Link
												className='flex items-center justify-center bg-acent text-center text-black text-base m-2 font-bold h-8 w-1/2 rounded-md mt-2 hover:bg-gold hover:text-[#FFEEB3] duration-300'
												to={`/events/${event.id}`}
											>
												Editar evento
											</Link>
											<button
												className='bg-red-500 text-white text-base m-2 font-bold h-8 w-1/3 rounded-md mt-2 hover:bg-red-700 hover:text-[#FFEEB3] duration-300'
												onClick={() => {
													deleteEvent(event.id);
												}}
											>
												Eliminar
											</button>
											{/* <img className='h-12 m-2' src={notification} alt="" /> */}

											<button
												className={
													event.done === 1
														? 'bg-green-700 text-white text-base m-2 font-bold h-8 w-1/3 rounded-md mt-2 duration-300 '
														: 'bg-acent text-black text-base m-2 font-bold h-8 w-1/3 rounded-md mt-2 duration-300 '
												}
												onClick={() => changeColor(event.id)}
											>
												{event.done === 1 ? 'Ocultar' : 'Publicar'}
											</button>
										</div>
									</div>
								</div>
							))
						) : (
							<p>No se encontraron eventos falló al iniciar sesion</p>
						)}
						<hr className='h-7 bg-none w-full border-none' />
					</div>
				</div>
			</SimpleBar>
			<FooterAdmin />
		</>
	);
}

export default EventsPage;
