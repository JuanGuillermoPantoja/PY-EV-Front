import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const userName = user && user.user && user.user.username;
  return (
    <>
      {isAuthenticated ? (
        <>
          <nav
            className="bg-[#4A2D0B] h-[70px] flex justify-between items-center px-4 
          sm:h-[90px]"
          >
            <h1
              className="font-bold text-xl
            lg:text-4xl
            md:text-3xl
            sm:text-2xl"
            >
              <Link to="/">EventsBrew</Link>
            </h1>
            <ul
              className="flex gap-x-2 text-base
            xl:text-3xl
            lg:text-3xl
            md:text-2xl
            sm:text-xl"
            >
              {userName && ( // Verificar si userName está definido
                <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-1 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300 sm:p-2">
                  {userName}
                </li>
              )}
              <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-1 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300 sm:p-2">
                <Link to="/events">Mis eventos</Link>
              </li>
              <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-1 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300 sm:p-2">
                <Link to="/add-event">Añadir evento</Link>
              </li>
              <li className="bg-[#FFEEB3] text-[#AC703E] rounded-xl p-1 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300 sm:p-2">
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Salir
                </Link>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navbar;
