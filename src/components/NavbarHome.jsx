import React from "react";
import { Link } from "react-router-dom";
import { useClientAuth } from "../context/ClientContex";
import userIcon from "../img/userIcon.png";

function NavbarHome() {
  const { isClientAuthenticated, client, clientLogout } = useClientAuth();
  const clientName = client && client.client && client.client.name;

  return (
    <>
      {isClientAuthenticated ? (
        <>
          <nav className="bg-amber-950 w-full flex justify-between items-center px-4 h-[70px] border-b-[1px] border-amber-800 ">
            <h1 className="text-white font-lobster text-lg sm:text-xl md:text-3xl lg:text-4xl 2xl:text-5xl ">
              <Link to="/" className='text-white font-lobster"'>
                <span className="text-acent">E</span>v
                <span className="text-white">en</span>ts
                <span className="text-acent">B</span>r
                <span className="text-white">ew</span>
              </Link>
            </h1>
            {/* <img className='w-[20%]' src={logoEventBrew} alt='' /> */}
            <ul className="flex justify-center items-center gap-x-2 text-sm sm:text-base md:text-lg lg:text-xl text-black h-full">
              {clientName && (
                <li className="font-bold text-white rounded-xl p-2 h-2/3 flex items-center">
                  {clientName}
                </li>
              )}
              <div className="h-[60%] w-[1px] bg-gray-200"></div>
              <li className="bg-acent text-primary  p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100">
                <Link
                  to="/"
                  onClick={() => {
                    clientLogout();
                  }}
                >
                  salir
                </Link>
              </li>
              <li
                id="btn-events"
                className="bg-acent active:bg-amber-700 text-primary p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100"
              >
                <Link to="/">eventos</Link>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <nav className="bg-amber-950 w-full flex flex-col sm:flex-row justify-between items-center px-2 h-[70px] border-b-[1px] border-amber-800 ">
            {/* <img className='w-[5.5%]' src={logoEventBrew} /> */}
            <h1 className="text-white  text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
              <span className="text-acent">E</span>v
              <span className="text-white">en</span>ts
              <span className="text-acent">B</span>r
              <span className="text-white">ew</span>
            </h1>
            <ul className="flex justify-center items-center gap-x-1 text-xs sm:text-base md:text-lg lg:text-xl text-black h-full lg:gap-x-2">
              <li
                id="btn-events"
                className="bg-acent active:bg-amber-700 text-primary p-2 h-2/3 flex items-center rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100"
              >
                <Link to="/">eventos</Link>
              </li>
              <li className="bg-acent text-primary p-2 rounded-xl h-2/3 flex items-center hover:animate-bouncing hover:animate-iteration-count-infinite duration-100">
                <Link to="/login-clients">Inicia sesión</Link>
              </li>
              <div className="h-[60%] w-[1px] bg-gray-200"></div>
              <li className="bg-acent text-primary p-2 rounded-xl h-2/3 flex items-center hover:animate-bouncing hover:animate-iteration-count-infinite duration-100">
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
