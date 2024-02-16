import React from "react";
import logoeventBrew from "../img/logoeventsBrew.png";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="flex justify-center items-center h-screen
      max-[480px]:flex-col">
        <div className="w-1/2 bg-[#FFEEB3] h-full flex items-center justify-center first-letter
         max-[480px]:h-1/6">
          <img className="max-[600px]:w-4/5 max-[480px]:w-1/3" src={logoeventBrew} alt="" />
        </div>
        <div className="w-1/2 bg-[#AC703E] h-full flex flex-col justify-around items-center
        max-[480px]:justify-evenly">
          <h2 className="text-7xl  max-[768px]:text-6xl max-[600px]:text-5xl max-[480px]:text-4xl">Bienvenidos</h2>
          <div className="w-2/3 flex justify-between h-14 max-[600px]:w-3/4">
            <NavLink
              className="bg-[#FFEEB3] text-black h-full w-1/3 text-2xl border rounded-2xl flex justify-center items-center font-bold text-center hover:shadow-2xl hover:text-3xl
              max-[1024px]:text-lg max-[1024px]:hover:text-xl max-[1024px]:h-5/6
              max-[768px]:w-2/5
              max-[600px]:w-[48%]
              max-[480px]:text-sm"
              to="/login"
            >
              Iniciar sesión
            </NavLink>
            <NavLink
              className="bg-[#FFEEB3] text-black h-full w-1/3 text-2xl border rounded-2xl flex justify-center items-center font-bold hover:shadow-2xl hover:text-3xl
              max-[1024px]:text-lg max-[1024px]:hover:text-xl max-[1024px]:h-5/6
              max-[768px]:w-2/5
              max-[600px]:w-[48%]
              max-[480px]:text-sm"
            >
              Registrate
            </NavLink>
          </div>
          <p className="w-4/5 h-1/3 text-center text-2xl
          max-[1024px]:text-xl
          max-[768px]:text-lg
          max-[600px]:text-lg
          max-[480px]:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            libero atque, reprehenderit fugiat voluptate consectetur velit
            debitis ex modi quisquam, incidunt doloribus aut vitae excepturi
            illum consequatur ea! Cum, quia.
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
