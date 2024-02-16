// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { getEventsClientsRequest } from "../api/event";
// import axios from "axios";

// function EventsClients() {
//   useEffect(() => {
//     getEvents();
//   }, []);

//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/eventsClients")
//       .then((res) => setData(res.data[0]))
//       .catch((err) => console.log(err));
//   }, []);

//   const [events, setEvents] = useState([]);
//   const getEvents = async () => {
//     try {
//       const res = await getEventsClientsRequest();
//       setEvents(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const filteredEvents = events.filter(
//     (event) => event.done !== false && event.done !== 0,
//   );
//   if (events.length === 0)
//     return (
//       <h1 className='h-screen bg-cover bg-center bg-[url("https://i.ibb.co/LQf91TG/fondo-EB.webp")] text-7xl text-center'>
//         No se han agregado eventos
//       </h1>
//     );

//   return (
//     <>
//       <div className="h-screen overflow-auto bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover bg-center flex flex-col justify-center items-center">
//         <h1 className="h-[10%] text-7xl text-[#FFEEB3]">Eventos</h1>
//         <div className="w-full flex h-full justify-center items-center gap-3 flex-wrap">
//           {filteredEvents.map((event) => (
//             <div
//               key={event.id}
//               className="bg-[#000000a4] w-[30%] h-[90%] flex flex-col justify-between rounded-2xl text-[#FFEEB3]"
//             >
//               <img
//                 className="w-full h-2/4 rounded-t-lg mb-2"
//                 src={`http://localhost:5000/uploads/${event.img_event}`}
//                 alt=""
//               />
//               <div className="m-auto h-[50%] w-full">
//                 <p className="text-center mt-3">Nombre del local:</p>
//                 <h2 className="text-center text-2xl">{event.title}</h2>
//                 <p className="text-center mt-3">Direccion:</p>
//                 <p className="text-center text-xl">{event.address}</p>
//                 <p className="text-center mt-3">Informacion del evento:</p>
//                 <p className="text-center text-xl">{event.description}</p>
//                 <p className="text-center mt-3">Fecha del evento:</p>
//                 <p className="text-center text-xl">
//                   {dayjs(event.dates).utc().format("YYYY/MM/DD")}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default EventsClients;

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getEventsClientsRequest } from "../api/event";
import { useClientAuth } from "../context/ClientContex";
import { useComments } from "../context/CommentsContext";

function EventsClients() {
  const { createComment, comments, getComments } = useComments();
  const { isClientAuthenticated } = useClientAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [comment, setComment] = useState("");

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

  const handleCommentSubmit = async (data) => {
    if (!isClientAuthenticated) {
      alert("Debes iniciar sesión para comentar");
      return;
    }

    if (!selectedEvent) {
      alert("Selecciona un evento antes de comentar");
      return;
    }

    createComment(selectedEvent.id, comment);
    //limpia el comentario despues de enviarlo
    setComment("");
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    getComments(event.id);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="h-screen overflow-auto bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover bg-center flex flex-col justify-center items-center">
        <h1 className="h-[10%] text-7xl text-[#FFEEB3]">Eventos</h1>
        <div className="w-full flex h-full justify-center items-center gap-3 flex-wrap">
          {events.length === 0 && (
            <h1 className='h-screen bg-cover w-full bg-center bg-[url("https://i.ibb.co/LQf91TG/fondo-EB.webp")] text-7xl text-center'>
              No se han agregado eventos
            </h1>
          )}
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#000000a4] w-[24%] h-[90%] flex flex-col justify-between rounded-2xl text-[#FFEEB3] my-2 shadow-xl shadow-black"
            >
              <img
                className="w-full h-2/5 rounded-t-lg"
                src={`https://events-cqtw.onrender.com/uploads/${event.img_event}`}
                alt=""
              />
              <div className="flex flex-col justify-between items-center h-[60%] w-full">
                <div className="flex-col  bg-black w-full">
                  <div className="flex justify-between w-full h-[50%] mb-2">
                    <div className="w-[65%]">
                      <p className="text-left font-bold ">Nombre del local:</p>
                      <p className="text-left text-xl mb-2 text-[#e6d48e]">
                        {event.title}
                      </p>
                    </div>
                    <div className="w-[35%]">
                      <p className="text-right font-bold">Fecha del evento:</p>
                      <p className="text-right text-xl">
                        {dayjs(event.dates).utc().format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                  <p className="text-left font-bold">Direccion:</p>
                  <p className="text-left text-xl">{event.address}</p>
                </div>

                <p className="text-center text-lg font-bold">
                  Informacion del evento:
                </p>
                <p className="text-center text-xl h-[30%]">
                  {event.description}
                </p>
                <button
                  onClick={() => handleOpenModal(event)}
                  className="w-[35%] h-[15%] bg-[#FFEEB3] text-[#AC703E] text-xl m-2 font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300"
                >
                  Comentarios
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal de comentarios */}
      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-gray-950 p-8 rounded-lg w-1/2">
            <h2 className="text-2xl mb-4">{selectedEvent.title}</h2>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full bg-[#FFEEB3] text-[#AC703E] placeholder:text-[#AC703E] pl-2 font-bold"
              placeholder="Escribe tu comentario aquí..."
            ></textarea>

            {/* Mostrar comentarios */}

            <div className="mt-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-black-300 p-2 rounded-lg mb-2">
                  <p className="text-white-300 flex justify-between">
                    {comment.comment_text} <span>{comment.created_at}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar
              </button>
              <button
                onClick={handleCommentSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Enviar comentario
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EventsClients;
