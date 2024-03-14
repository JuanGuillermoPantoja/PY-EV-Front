import React from "react";
import notFound from "../img/404-people.jpg";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-amber-50">
      <img className="absolute z-0" src={notFound} alt="" />
      <p className="relative top-40 text-amber-900 text-2xl">
        La página que buscas no existe.
      </p>
      <NavLink
        className="relative top-40 text-acent underline hover:text-gold text-xl"
        to="/"
      >
        Volver al inicio.
      </NavLink>{" "}
    </div>
  );
};

export default NotFoundPage;
