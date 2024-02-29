import React, { useState } from 'react';
import axios from 'axios';
import chatImg from '../img/bot-chat.png';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';



function Chat() {
	const [history, setHistory] = useState([]);
	const [message, setMessage] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isBotResponding, setIsBotResponding] = useState(false);

	const sendMessage = async () => {
		const requestBody = {
			history: history,
			question: message,
		};

		try {
			setIsBotResponding(true); // Iniciar la animación de puntos
			const response = await axios.post(
				'https://events-cqtw.onrender.com/chat',
				requestBody,
			);
			const updatedHistory = response.data.history;
			setHistory(updatedHistory);
			setMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
		} finally {
			setIsBotResponding(false); // Detener la animación de puntos
		}
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className='fixed left-[80%] md:left-[85%] bottom-[2%] z-50 w-[18%]'>
				<button  onClick={openModal}>
					<img className='w-[100%] md:w-[80%] lg:w-[50%]' src={chatImg} alt='chatBot' />
				</button>
			</div>
			{isModalOpen && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70'>
					<div className='bg-primary text-acent border-2 flex flex-col items-center p-8 rounded-lg w-[80%] sm:w-[70%] lg:w-[40%]'>
						<h1 className='text-2xl my-4'>Charla con nosotros!</h1>

						<div className='animate-fade-in flex justify-center items-center flex-col w-full bg-primary rounded-sm'>
							<SimpleBar autoHide className='w-full' style={{ maxHeight: 300 }}>
								{history.map((item, index) => (
									<div key={index} className='flex'>
										<div
											className={`p-2 m-2 text-base font-semibold rounded-xl ${
												item.role === 'user'
													? 'bg-acent text-textBlack'
													: 'bg-gold text-textBlack'
											}`}
											style={{
												alignSelf:
													item.role === 'user' ? 'flex-start' : 'flex-end',
											}}
										>
											{item.parts}
										</div>
									</div>
								))}
								{/* Mostrar puntos animados si el bot está respondiendo */}
                                {isBotResponding && (
                                    <div className="text-acent flex justify-center bg-none text-3xl">
										<div className='animate-bouncing animate-delay-100 animate-iteration-count-infinite'>.</div>
										<div className='animate-bouncing animate-delay-200 animate-iteration-count-infinite'>.</div>
										<div className='animate-bouncing animate-delay-300 animate-iteration-count-infinite'>.</div>
									</div>
                                )}
							</SimpleBar>
						</div>
						<div className='flex justify-center w-full'>
							<input
								type='text'
								className='w-full bg-acent rounded-sm text-textBlack placeholder:text-gold p-2 mt-2 font-bold '
								placeholder='Pregunta aquí!'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>
						<div className='w-1/2 flex justify-around'>
							<button
								onClick={sendMessage}
								className='bg-acent h-12 text-primary font-bold mt-4 p-2 rounded-xl hover:bg-gold hover:text-black duration-300'
							>
								Preguntar
							</button>
							<button
								onClick={closeModal}
								className='bg-red-600 h-12 text-white font-bold mt-4 p-2 rounded-xl hover:bg-red-700 duration-300'
							>
								Cerrar Chat
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Chat;
