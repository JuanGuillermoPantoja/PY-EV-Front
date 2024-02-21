import React from "react";
import { Link } from "react-router-dom";
import logoEventBrew from "../img/logoeventsBrew.png";
import { useClientAuth } from "../context/ClientContex";

function NavbarHome() {
  const { isClientAuthenticated, client, clientLogout } = useClientAuth();
  return (
    <>
      {isClientAuthenticated ? (
        <>
          <nav className="bg-[#4A2D0B] h-[70px] w-full flex justify-between items-center px-4">
            <img className="w-[7%]" src={logoEventBrew} alt="" />
            <ul className="flex gap-x-2 text-xl">
              <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300">
                {client.client.name}
              </li>
              <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300">
                <Link
                  to="/"
                  onClick={() => {
                    clientLogout();
                  }}
                >
                  salir
                </Link>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <nav className="bg-[#4A2D0B] h-[70px] w-full flex justify-between items-center px-4
          sm:h-[90px]">
            <img className="w-[18%]
            md:w-[13%]
            lg:w-[10%]
            xl:w-[7%]" src={logoEventBrew} alt="" />
            <ul className="flex gap-x-2 text-xl
            lg:text-4xl
            md:text-3xl
            sm:text-2xl">
              <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300">
                <Link to="/login-clients">Iniciar sesión</Link>
              </li>
              <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300">
                <Link to="/register-clients">Registrarse</Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

export default NavbarHome;
