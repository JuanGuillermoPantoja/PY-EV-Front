import { useEffect, useState } from "react";
import { useEvents } from "../context/EventContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Navbar from "../components/Navbar";
import FooterAdmin from "../components/FooterAdmin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
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

  return (
    <>
      <Navbar />
      <SimpleBar className="bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-fixed bg-cover bg-center flex flex-col h-screen">
        <div className="h-[500px] pb-4 bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover bg-center flex flex-col justify-center items-center">
          <h1
            className='bg-cover w-full bg-center bg-[url("https://i.ibb.co/LQf91TG/fondo-EB.webp")] text-4xl text-center 
            xl:text-7xl 
            md:text-6xl 
            sm:text-5xl'
          >
            Eventos
          </h1>
          <div className="w-full flex h-full justify-center items-center gap-3 flex-wrap">
            {Array.isArray(events) ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#000000a4] w-[60%] h-2/3 flex flex-col justify-between rounded-2xl text-[#FFEEB3] my-2 shadow-xl shadow-black 
                  xl:w-[20%] 
                  lg:w-[27%] lg:h-[90%] 
                  sm:w-2/5 sm:h-4/5"
                >
                  <img
                    className="w-full h-2/5 border-[#AC703E] rounded-t-lg"
                    src={`https://events-cqtw.onrender.com/uploads/${event.img_event}`}
                    alt=""
                  />
                  <div className="flex flex-col justify-between items-center h-[60%] w-full">
                    <div
                      className="flex-col bg-black w-full h-2/5
                sm:h-auto"
                    >
                      <div className="flex justify-between w-full h-[50%] mb-2">
                        <div className="w-[65%]">
                          <p
                            className="text-left font-bold text-xs
                      lg:text-base
                      sm:text-sm"
                          >
                            Nombre del local:
                          </p>
                          <p
                            className="text-left text-xs
                      xl:text-xl
                      lg:text-base
                      sm:text-sm"
                          >
                            {event.title}
                          </p>
                        </div>
                        <div className="w-[35%]">
                          <p
                            className="text-right font-bold text-xs
                      lg:text-base
                      sm:text-sm"
                          >
                            Fecha del evento:
                          </p>
                          <p
                            className="text-right text-xs
                      xl:text-xl
                      lg:text-base
                      sm:text-sm"
                          >
                            {dayjs(event.dates).utc().format("YYYY/MM/DD")}
                          </p>
                        </div>
                      </div>
                      <p
                        className="text-left font-bold text-xs
                  lg:text-base
                  sm:text-sm"
                      >
                        Direccion:
                      </p>
                      <p
                        className="text-left text-xs
                  xl:text-xl
                  lg:text-base
                  sm:text-sm"
                      >
                        {event.address}
                      </p>
                    </div>
                    <p
                      className="text-left font-bold text-xs
                lg:text-base
                sm:text-sm"
                    >
                      Descripción:
                    </p>
                    <p
                      className="text-left h-[30%] text-xs
                xl:text-xl
                lg:text-base
                sm:text-sm"
                    >
                      {event.description}
                    </p>
                    <div className="w-full flex justify-between items-center">
                      <Link
                        className="flex items-center justify-center bg-[#FFEEB3] text-center text-[#AC703E] text-xs m-2 font-bold h-8 w-1/2 rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300
                    xl:text-xl
                    lg:text-base 
                    sm:text-sm sm:px-2 sm:h-12"
                        to={`/events/${event.id}`}
                      >
                        Editar evento
                      </Link>
                      <button
                        className="bg-[#FFEEB3] text-[#AC703E] text-xs m-2 font-bold h-8 w-1/3 rounded-full mt-2 hover:bg-red-700 hover:text-[#FFEEB3] duration-300
                    xl:text-xl
                    lg:text-base lg:w-[28%]
                    sm:text-sm sm:px-2 sm:h-12"
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
                            ? "bg-green-700 text-white text-xs m-2 font-bold h-8 w-1/3 rounded-full mt-2 duration-300 sm:text-sm sm:px-2 sm:h-12 lg:text-base xl:text-xl"
                            : "bg-[#FFEEB3] text-[#AC703E] text-xs m-2 font-bold h-8 w-1/3 rounded-full mt-2 duration-300 sm:text-sm sm:px-2 sm:h-12 lg:text-base xl:text-xl"
                        }
                        onClick={() => changeColor(event.id)}
                      >
                        {event.done === 1 ? "Ocultar" : "Mostrar"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron eventos falló al iniciar sesion</p>
            )}
            <hr className="h-7 bg-none w-full border-none" />
          </div>
        </div>
      </SimpleBar>
      <FooterAdmin />
    </>
  );
}

export default EventsPage;
