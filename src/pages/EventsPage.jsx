import { useEffect, useState } from "react";
import { useEvents } from "../context/EventContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Navbar from "../components/Navbar";
dayjs.extend(utc);

function EventsPage() {
  const { getEvents, events, deleteEvent, toggleEventDone } = useEvents();

  const changeColor = async (eventId) => {
    await toggleEventDone(eventId);
    getEvents();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen overflow-auto bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover bg-center flex flex-col justify-center items-center">
        <h1 className="h-[10%] text-7xl text-[#FFEEB3]">Eventos</h1>
        <div className="w-full flex h-full justify-center items-center gap-3 flex-wrap">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="bg-[#000000a4] w-[24%] h-[90%] flex flex-col justify-between rounded-2xl text-[#FFEEB3] shadow-2xl shadow-black "
            >
              <img
                className="w-full h-2/5 border-[#AC703E] rounded-t-lg"
                src={`https://events-cqtw.onrender.com/uploads/${event.img_event}`}
                alt=""
              />
              <div className="flex flex-col justify-between items-center h-[60%] w-full">
                <div className="flex-col bg-black w-full">
                  <div className="flex justify-between w-full h-[50%] mb-2">
                    <div className="w-[65%]">
                      <p className="text-left font-bold">Nombre del local:</p>
                      <p className="text-left text-xl">{event.title}</p>
                    </div>
                    <div className="w-[35%]">
                      <p className="text-right font-bold">Fecha del evento:</p>
                      <p className="text-right text-xl">
                        {dayjs(event.dates).utc().format("YYYY/MM/DD")}
                      </p>
                    </div>
                  </div>
                  <p className="text-left font-bold">Direccion:</p>
                  <p className="text-left text-xl">{event.address}</p>
                </div>
                <p className="text-left font-bold">Descripción:</p>
                <p className="text-left text-xl h-[30%]">{event.description}</p>
                <div className="w-full flex justify-between items-center">
                  <Link
                    className="flex items-center justify-center bg-[#FFEEB3] text-[#AC703E] text-xl m-2 font-bold h-12 w-2/5 rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300"
                    to={`/events/${event.id}`}
                  >
                    Editar evento
                  </Link>
                  <button
                    className="bg-[#FFEEB3] text-[#AC703E] text-xl m-2 font-bold h-12 w-1/3 rounded-full mt-2 hover:bg-red-700 hover:text-[#FFEEB3] duration-300"
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
                        ? "bg-green-700 text-white text-xl m-2 font-bold h-12 w-1/3 rounded-full mt-2 duration-300"
                        : "bg-[#FFEEB3] text-[#AC703E] text-xl m-2 font-bold h-12 w-1/3 rounded-full mt-2 duration-300 "
                    }
                    onClick={() => changeColor(event.id)}
                  >
                    Mostrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EventsPage;
