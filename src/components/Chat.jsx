import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sendMessage = async () => {
        const requestBody = {
            history: history,
            question: message
        };

        try {
            const response = await axios.post('https://events-cqtw.onrender.com/chat', requestBody);
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
            <button onClick={openModal}>Open Chat</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div>
                            {history.map((item, index) => (
                                <div key={index}>
                                    {item.role}: {item.parts}
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                        <button onClick={closeModal}>Close Chat</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chat;
