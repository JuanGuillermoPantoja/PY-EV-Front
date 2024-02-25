import React, { useState } from 'react';
import axios from 'axios';
import chatImg from '../img/chat-bot.png';
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
				<button onClick={openModal}>
					<img className='w-[100%] md:w-[80%] lg:w-[70%]' src={chatImg} alt='chatBot' />
				</button>
			</div>
			{isModalOpen && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-[#865832] text-[#FFEEB3] flex flex-col items-center p-8 rounded-lg w-[80%] sm:w-[70%] lg:w-[40%]'>
						<h1 className='text-2xl my-4'>Charla con nosotros!</h1>

						<div className='flex justify-center bg-[#c2985a] items-center flex-col w-full'>
							<SimpleBar autoHide className='w-full' style={{ maxHeight: 300 }}>
								{history.map((item, index) => (
									<div key={index} className='flex'>
										<div
											className={`p-2 m-2 rounded-xl ${
												item.role === 'user'
													? 'bg-[#94663bfb] text-white'
													: 'bg-[#6d4a2afb] text-white'
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
                                    <div className="text-white flex justify-center bg-none text-3xl">
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
								className='w-full bg-[#FFEEB3] rounded-sm text-[#AC703E] placeholder:text-[#AC703E] p-2 mt-2 font-bold '
								placeholder='Pregunta aquí!'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>
						<div className='w-full flex justify-center'>
							<button
								onClick={sendMessage}
								className='mx-2 w-1/2 sm:w-1/4 lg:w-1/3 xl:w-1/4 bg-[#FFEEB3] text-[#AC703E] font-bold mt-4 p-2 rounded-full hover:bg-[#d5935c] hover:text-[#FFEEB3] duration-300'
							>
								Preguntar
							</button>
							<button
								onClick={closeModal}
								className='mx-2 w-1/2 sm:w-1/4 lg:w-1/3 xl:w-1/4 bg-red-600 text-white font-bold mt-4 p-2 rounded-full hover:bg-red-700 duration-300'
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
