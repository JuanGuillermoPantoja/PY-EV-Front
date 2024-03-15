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
          <nav className="bg-white w-full flex justify-between items-center px-4 h-[70px] border-b-[1px] border-gray-200 ">
            <h1 className="text-textBlack font-lobster text-lg sm:text-xl md:text-3xl lg:text-4xl 2xl:text-5xl ">
              <Link to="/" className='text-textBlack font-lobster"'>
                <span className="text-acent font-lobster">E</span>v
                <span className="text-primary font-lobster">en</span>ts
                <span className="text-acent font-lobster">B</span>r
                <span className="text-primary font-lobster">ew</span>
              </Link>
            </h1>
            {/* <img className='w-[20%]' src={logoEventBrew} alt='' /> */}
            <ul className="flex justify-center items-center gap-x-2 text-sm sm:text-base md:text-lg lg:text-xl text-black h-full">
              {clientName && (
                <li className="font-bold text-textBlack rounded-xl p-2 h-2/3 flex items-center">
                  <img
                    className="h-3/4 sm:h-full mr-1  md:mr-2"
                    src={userIcon}
                    alt=""
                  />
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
          <nav className="bg-white w-full flex flex-col sm:flex-row justify-between items-center px-2 h-[70px] border-b-[1px] border-gray-200">
            {/* <img className='w-[5.5%]' src={logoEventBrew} /> */}
            <h1 className="text-textBlack  text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
              <span className="text-acent">E</span>v
              <span className="text-primary">en</span>ts
              <span className="text-acent">B</span>r
              <span className="text-primary">ew</span>
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
