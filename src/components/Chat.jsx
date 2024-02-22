import React, { useState } from 'react';
import axios from 'axios';
import chatImg from '../img/chat-bot.png';

function Chat() {
	const [history, setHistory] = useState([]);
	const [message, setMessage] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const sendMessage = async () => {
		const requestBody = {
			history: history,
			question: message,
		};

		try {
			const response = await axios.post(
				'https://events-cqtw.onrender.com/chat',
				requestBody,
			);
			const updatedHistory = response.data.history;
			setHistory(updatedHistory);
			setMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
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
			<div className='fixed right-4 bottom-4 z-50'>
				<button onClick={openModal}>
					<img className='w-[80%]' src={chatImg} alt='chatBot' />
				</button>
			</div>
			{isModalOpen && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-[#AC703E] text-[#FFEEB3] flex flex-col items-center p-8 rounded-lg w-[40%]'>
						<h1 className='text-2xl my-4'>
							Charla con el Bot y preguntale tus dudas sobre EventsBrews
						</h1>
						<div className='flex justify-center items-center flex-col w-full'>
							<Scrollbars autoHide style={{ height: 300 }}>
								{history.map((item, index) => (
									<div
										className='bg-[#5c3b1f] text-lg p-2 m-2 max-w-md rounded-xl'
										key={index}
									>
										{item.role} : {item.parts}
									</div>
								))}
							</Scrollbars>
						</div>
						<div className='flex justify-center w-full'>
							<input
								type='text'
								className='w-full bg-[#FFEEB3] rounded-sm text-[#AC703E] placeholder:text-[#AC703E] p-2 m-2 font-bold '
								placeholder='Pregunta aquí!'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>
						<div className='w-full flex justify-center'>
							<button
								onClick={sendMessage}
								className='mx-2 w-1/4 bg-[#FFEEB3] text-[#AC703E] font-bold mt-4 p-2 rounded-full hover:bg-[#d5935c] hover:text-[#FFEEB3] duration-300'
							>
								Preguntar
							</button>
							<button
								onClick={closeModal}
								className='mx-2 w-1/4 bg-red-600 text-white font-bold mt-4 p-2 rounded-full hover:bg-red-700 duration-300'
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
