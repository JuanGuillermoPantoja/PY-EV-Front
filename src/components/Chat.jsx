import React, { useState } from "react";
import axios from "axios";
import chatImg from "../img/bot-chat.png";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Swal from "sweetalert2";

function Chat() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBotResponding, setIsBotResponding] = useState(false);

  const sendMessage = async () => {
    const showAlert = (message, type) => {
      let iconType = "info";

      if (type === "error") {
        iconType = "error";
      } else if (type === "warning") {
        iconType = "warning";
      } else if (type === "success") {
        iconType = "success";
      }

      Swal.fire({
        title: message,
        icon: iconType,
        color: "#ff9800",
        iconColor: "#ff9800",
        background: "#000000",
        timer: 3000,
        showConfirmButton: false,
      });
    };
    if (message.trim() === "") {
      showAlert("Debes preguntar algo primero!", "error");
      return; // Detener el envío del mensaje si está vacío
    }

    const requestBody = {
      history: history,
      question: message,
    };

    try {
      setIsBotResponding(true); // Iniciar la animación de puntos
      const response = await axios.post(
        "https://events-cqtw.onrender.com/chat",
        requestBody
      );
      const updatedHistory = response.data.history;
      setHistory(updatedHistory);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
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
      {!isModalOpen && (
        <div className="fixed left-[80%] md:left-[90%] bottom-[2%] z-50 w-[18%]">
          <button onClick={openModal}>
            <img
              className="w-[100%] md:w-[80%] lg:w-[50%] opacity-25 hover:opacity-100"
              src={chatImg}
              alt="chatBot"
            />
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-end justify-end bottom-0 animate-slide-in-bottom animate-duration-1000">
          <div className='bg-amber-950 text-[#f8d98f] border-2 border-b-0 rounded-b-none flex flex-col items-center p-8 rounded-lg w-[80%] min-[500px]:w-[60%] sm:w-[70%] md:w-[60%] lg:w-[40%]'>
            <h1 className="text-lg md:text-2xl my-4">Charla con nosotros!</h1>

            <div className='animate-fade-in flex justify-center items-center flex-col w-full bg-amber-100 rounded-t-md'>
              <SimpleBar autoHide className="w-full" style={{ maxHeight: 300 }}>
                {history.map((item, index) => (
                  <div key={index} className="flex">
                    <div
                      className={`p-2 m-2 text-base font-semibold rounded-xl ${
                        item.role === "user"
                          ? "bg-[#f49d0c] text-textBlack"
                          : "bg-gold text-textBlack"
                      }`}
                      style={{
                        alignSelf:
                          item.role === "user" ? "flex-start" : "flex-end",
                      }}
                    >
                      {item.parts}
                    </div>
                  </div>
                ))}
                {/* Mostrar puntos animados si el bot está respondiendo */}
                {isBotResponding && (
                  <div className="text-[#742d13] flex justify-center bg-none text-3xl">
                    <div className="animate-bouncing animate-delay-100 animate-iteration-count-infinite">
                      .
                    </div>
                    <div className="animate-bouncing animate-delay-200 animate-iteration-count-infinite">
                      .
                    </div>
                    <div className="animate-bouncing animate-delay-300 animate-iteration-count-infinite">
                      .
                    </div>
                  </div>
                )}
              </SimpleBar>
            </div>
            <div className="flex justify-center w-full">
              <input
                type="text"
                className="w-full bg-[#f8d98f] rounded-sm outline-none text-[#742d13] placeholder:text-gold p-2 mt-2 font-bold "
                placeholder="Pregunta aquí!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="w-auto gap-x-1 flex justify-around">
              <button
                onClick={sendMessage}
                className="bg-[#fde58a] h-10 text-[#5e3c15] text-base font-bold mt-4 p-2 rounded-xl"
              >
                Preguntar
              </button>
              <button
                onClick={closeModal}
                className="bg-red-600 h-10 w-full text-white text-base font-bold mt-4 p-2 rounded-xl hover:bg-red-700 duration-300"
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
