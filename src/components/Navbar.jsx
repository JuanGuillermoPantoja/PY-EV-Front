import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userIcon from "../img/userIcon.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const userName = user && user.user && user.user.username;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user.user.id}`);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <nav className="bg-amber-950 w-full flex justify-between items-center px-4 h-[70px] border-b-[1px] border-amber-800  ">
            <h1 className="text-textBlack font-lobster text-lg sm:text-xl md:text-3xl lg:text-4xl 2xl:text-5xl ">
              <Link to="/" className='text-white font-lobster"'>
                <span className="text-acent">E</span>v
                <span className="text-white">en</span>ts
                <span className="text-acent">B</span>r
                <span className="text-white">ew</span>
              </Link>
            </h1>
            <ul className="flex justify-center items-center gap-x-1 sm:gap-x-2 text-xs sm:text-base md:text-lg lg:text-xl text-black h-full">
              {userName && ( // Verificar si userName está definido
                <li className="font-bold text-white rounded-xl p-[6px] sm:p-[2px] h-2/3 flex items-center line-clamp-1">
                  <button
                    className="h-3/4 hidden md:block md:h-full"
                    onClick={handleClick}
                  >
                    <img
                      className="h-3/4 hidden md:block md:h-full mr-1 md:mr-2 rounded-full"
                      src={`https://events-cqtw.onrender.com/uploads/${user.user.img_profile}`}
                      alt="adminImg"
                    />
                  </button>
                  {userName}
                </li>
              )}
              <div className="h-[60%] w-[1px] bg-gray-200"></div>
              <li className="bg-acent text-primary p-[6px] md:p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100">
                <Link to="/events">Mis eventos</Link>
              </li>
              <li className="bg-acent text-primary  p-[6px] md:p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100">
                <Link to="/add-event">Añadir evento</Link>
              </li>
              <li className="bg-acent text-primary  p-[6px] md:p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100">
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  <li></li>
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
