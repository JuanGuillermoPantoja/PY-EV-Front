import React from "react";
import logoeventBrew from "../img/logoeventsBrew.png";
import { useForm } from "react-hook-form";
import { useClientAuth } from "../context/ClientContex";

function Footer() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { formContact } = useClientAuth();

  const onSubmit = handleSubmit((data) => {
    formContact(data);
    console.log("formulario", data);
  });
  return (
    <>
      <footer className="">
        <div className="bg-[#4c3b22] flex flex-col items-center
        lg:w-full  lg:flex lg:justify-center lg:items-center">
          <div className="p-4 w-full ">
            <form
              className=" bg-[#534320] rounded-md p-2 shadow-md shadow-black"
              onSubmit={onSubmit}
            >
              <div>
                <h2 className="text-base text-[#FFEEB3] text-center font-sans">
                  ¿Deseas agregar los eventos de tu establecimiento?
                </h2>
                <h3 className="text-base text-[#FFEEB3] font-bold font-sans text-center">
                  Contactanos
                </h3>
              </div>
              <div className="flex flex-col">
                <label className="text-base text-[#FFEEB3] font-sans">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="bg-[#d5a6685e] font-sans"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-lg">
                    Este campo es requerido
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-base text-[#FFEEB3] font-sans">
                  Correo:
                </label>
                <input
                  type="text"
                  className="bg-[#d5a6685e] font-sans"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Expresión regular para validar el formato del correo electrónico
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-lg">
                    Correo electrónico inválido
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-base text-[#FFEEB3] font-sans">
                  Motivo:
                </label>
                <textarea
                  cols="10"
                  rows="3"
                  className="bg-[#d5a6685e] font-sans"
                  {...register("content", { required: true })}
                ></textarea>
                {errors.content && (
                  <p className="text-red-500 text-lg">
                    Este campo es requerido
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <button className="w-[30%] bg-[#FFEEB3] text-[#AC703E] text-xl m-2 text-center font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300">
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div className="p-4 w-full flex flex-col">
            <div className="bg-[#534320] rounded-md p-2 shadow-md shadow-black">
              <h2 className="text-xl text-[#aa9857] text-start font-bold font-sans">
                EventsBrews
              </h2>
              <br />
              <p className="h-[10%] text-base text-[#FFEEB3] font-sans">
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
            </div>
            <div className="flex justify-start items-center">
              <img src={logoeventBrew} className="w-[15%] h-[8%]" alt="" />
              <p className="text-xl text-[#FFEEB3] text-end font-sans">
                ©EventsBrews
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
