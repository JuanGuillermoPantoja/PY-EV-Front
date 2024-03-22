import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userIcon from "../img/userIconWhite.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import editarPerfil from "../img/editarPerfil.png";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const userName = user && user.user && user.user.username;
  const [imageProfile, setImageProfile] = useState(userIcon);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user.user.img_profile) {
      const image = `https://events-cqtw.onrender.com/uploads/${user.user.img_profile}`;
      setImageProfile(image);
    }
  }, [isAuthenticated, user.user.img_profile]);

  const handleClick = () => {
    navigate(`/profile/${user.user.id}`);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <nav className="bg-amber-950 w-full h-[90px] flex flex-col justify-between items-center px-4  border-b-[1px] border-amber-800 md:flex-row 2xl:justify-around">
            <h1 className="text-textBlack font-lobster text-lg">
              <Link to="/" className='text-white font-lobster text-2xl md:text-3xl'>
                <span className="text-acent">E</span>v
                <span className="text-white">en</span>ts
                <span className="text-acent">B</span>r
                <span className="text-white">ew</span>
              </Link>
            </h1>
            <ul className="flex w-full h-full justify-around items-center text-xs text-black md:w-[58%] lg:w-[43%] xl:w-[30%] 2xl:w-[20%]">
              <div className="flex justify-center items-center h-full">
                {user.user.username && (
                  <li className="h-full flex items-center justify-center line-clamp-1 font-bold text-white rounded-xl">
                    <img
                      className="w-[40px] h-[40px]  mr-1 rounded-full md:mr-2 md:block md:w-[50px] md:h-[50px]"
                      src={imageProfile}
                      alt="adminImg"
                    />
                    <span className="hidden md:flex md:mr-2 md:text-base">{user.user.username}</span>
                  </li>
                )}
                <li>
                  <button
                    className="h-[50px] md:block md:h-full relative"
                    onClick={handleClick}
                  >
                    <img className="w-[20px] md:w-[20px]" src={editarPerfil} alt="" />
                  </button>
                </li>
              </div>
              <div className="h-[60%] w-[1px] bg-amber-900"></div>
              <li className="bg-acent w-[85px] py-2 text-center  text-primary rounded-lg hover:animate-bouncing hover:animate-iteration-count-infinite duration-100 md:w-[100px] md:font-semibold md:text-base">
                <Link to="/events">Mis eventos</Link>
              </li>
              <li className="bg-acent w-[85px] py-2 text-center text-primary rounded-lg hover:animate-bouncing hover:animate-iteration-count-infinite duration-100 md:w-[120px] md:font-semibold md:text-base">
                <Link to="/add-event">Añadir evento</Link>
              </li>
              <li className="bg-acent w-[85px] py-2 text-center text-primary  rounded-lg hover:animate-bouncing hover:animate-iteration-count-infinite duration-100 md:w-[50px] md:font-semibold md:text-base">
                <Link
                  to="/"
                  onClick={() => {md:
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
