import React from "react";

function Footer() {
  return (
    <>
      <footer className="">
        <div className="w-full bg-amber-950 flex flex-col items-center justify-center lg:flex lg:items-start lg:flex-row">
          <div
            className="m-2 w-full flex flex-col items-center justify-center
          sm:w-full"
          >
            <div className="w-full bg-amber-900 rounded-md p-2 shadow-md shadow-black ">
              <h2 className="text-xl text-start font-bold">EventsBrews</h2>
              <br />
              <p className="h-[10%] text-base ">
                Con un enfoque en la comodidad y la accesibilidad, nuestra
                aplicación proporciona a los clientes una ventana abierta a un
                mundo de experiencias en tiempo real. EventsBrew es una
                aplicación innovadora diseñada para transformar la experiencia
                de los clientes en cafés y bares, proporcionando un método
                efectivo para mantener a las personas informadas sobre los
                eventos y actividades que se llevan a cabo en estos lugares. Con
                la creciente importancia de los eventos y la vida social en
                estos establecimientos, EventsBrew busca brindar una plataforma
                que promueva la participación activa y la exploración de nuevas
                experiencias.
              </p>
              <div className="flex flex-col justify-start items-center">
                <p className="text-xl text-end pt-2">©EventsBrews</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
