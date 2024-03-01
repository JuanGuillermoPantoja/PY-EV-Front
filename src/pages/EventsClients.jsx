import React, { useEffect, useState } from "react";
import dayjs, { utc } from "dayjs";
import { getEventsClientsRequest } from "../api/event";
import { useClientAuth } from "../context/ClientContex";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useNavigate } from "react-router-dom";
import bgCard from "../img/bg-card.png";
import threeGrainCoffe from "../img/3grain-coffe.png";
import coffeGrain from "../img/Coffe-grano.png";
import coffe from "../img/coffe.png";

dayjs.extend(utc);

function EventsClients() {
  const navigate = useNavigate();

  const { isClientAuthenticated } = useClientAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEventsClientsRequest();
        setEvents(
          res.data.filter((event) => event.done !== false && event.done !== 0)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isClientAuthenticated) navigate("/");
  }, [isClientAuthenticated]);

  const handleMoreInfoClick = (eventId) => {
    // Navega a la ruta de InfoEvents con el ID del evento como parámetro
    navigate(`/info-events/${eventId}`);
  };

  return (
    <>
      <NavbarHome />
      <SimpleBar className="bg-white w-full bg-fixed bg-cover bg-center h-screen">
        <div className="h-full w-full text-center text-textBlack flex flex-col justify-center items-center">
          <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-orange">
            <div className="bg-white h-full w-full rounded-tr-full rounded-bl-full flex flex-col justify-center items-center animate-fade-in animate-duration-700">
              <h1 className="text-textBlack text-8xl">
                Bienvenidos a <span className="text-acent">EventsBrew</span>
              </h1>
              <h2 className="text-2xl animate-slide-in-left">
                Descubre, saborea, disfruta: ¡Tu próximo evento comienza aquí!
              </h2>
            </div>
          </div>
          <h1 className="text-left w-[80%]">Eventos disponibles</h1>
          <div className="w-[80%]  h-[550px] flex justify-between items-center flex-wrap">
            {events.length === 0 && (
              <h1 className="h-screen bg-cover w-full bg-center text-center">
                No se han agregado eventos
              </h1>
            )}
            {events.map((event) => (
              <div
                key={event.id}
                className="w-[24%] h-[80%] rounded-2xl text-primary my-2 shadow-complete shadow-gray-400"
              >
                {/* <div className=' w-full h-full bg-primary rounded-t-lg'>
									<img
										src={
											event.img_event
												? `https://events-cqtw.onrender.com/uploads/${event.img_event}`
												: 'https://cdn-icons-png.flaticon.com/512/5225/5225572.png'
										}
										alt=''
									/>
								</div> */}
                <div className="flex flex-col justify-between items-center h-full w-full relative">
                  <div className="flex-col w-full h-full">
                    <div
                      className="flex flex-col justify-center w-full h-full mb-2 relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${bgCard})`,
                      }}
                    >
                      <div
                        className="w-full h-[50%] bg-amber-900 bg-cover bg-center flex flex-col justify-end items-center relative"
                        style={{
                          backgroundImage: `url(${`https://events-cqtw.onrender.com/uploads/${event.img_event}`})`,
                        }}
                      >
                        <div className="bg-black h-full w-full absolute opacity-40"></div>
                        <h2 className="h-[20%] w-[75%] text-white flex justify-center items-center relative bottom-10 z-10">
                          {event.title}
                        </h2>
                        <p className="h-[20%] bg-acent text-textBlack  w-[75%] flex justify-center items-center relative z-10">
                          empanadas 2x1
                        </p>
                        <p className="h-10% bg-textBlack text-acent w-[75%] relative z-10">
                          {dayjs(event.dates)
                            .utc()
                            .format("DD [de] MMMM [del] YYYY")}
                        </p>
                      </div>
                      <div className="w-full h-[50%] bg-cover bg-center flex flex-col justify-start items-center relative z-10">
                        <p className="bg-primary w-[75%] h-[40%] text-white">
                          {event.address}
                        </p>
                        <button className="bg-acent rounded-md my-2 p-2 text-black hover:bg-gold"
                          onClick={() => {
                            handleMoreInfoClick(event.id);
                          }}
                        >
                          Más información
                        </button>
                      </div>
                      <img
                        className="z-0 absolute left-24 bottom-28"
                        src={threeGrainCoffe}
                        alt=""
                      />
                      <img
                        className="z-0 absolute right-40 top-32"
                        src={coffeGrain}
                        alt=""
                      />
                      <img
                        className="absolute top-2/3 left-0 right-0 mx-auto "
                        src={coffe}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <hr className="h-7 bg-none w-full border-none" />
          </div>
        </div>
      </SimpleBar>

      <Chat />
      <Footer />
    </>
  );
}

export default EventsClients;
