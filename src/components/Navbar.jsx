import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userIcon from '../img/userIcon.png'

function Navbar() {
	const { isAuthenticated, logout, user } = useAuth();
	const userName = user && user.user && user.user.username;
	return (
		<>
			{isAuthenticated ? (
				<>
					<nav className='bg-white w-full flex flex-col justify-between items-center self-center md:flex-row lg:px-4 h-[70px]  border-gray-200'>
						<h1
							className='text-textBlack font-lobster text-lg sm:text-xl md:text-3xl lg:text-4xl 2xl:text-5xl '
						>
							<Link to='/' className='text-textBlack font-lobster"'>
								<span className='text-acent font-lobster'>E</span>v
								<span className='text-primary font-lobster'>en</span>ts
								<span className='text-acent font-lobster'>B</span>r
								<span className='text-primary font-lobster'>ew</span>
							</Link>
						</h1>
						<ul
							className='flex justify-center items-center gap-x-1 sm:gap-x-2 text-xs sm:text-base md:text-lg lg:text-xl text-black h-full'
						>
							{userName && ( // Verificar si userName está definido
								<li className='font-bold text-textBlack rounded-xl p-[6px] sm:p-[2px] h-2/3 flex items-center line-clamp-1'>
									<img className="h-3/4 hidden md:block md:h-full mr-1 md:mr-2" src={userIcon} alt="adminImg" />{userName}
								</li>
							)}
                            <div className=" bg-gray-200"></div>
							<li className='bg-acent text-primary p-[6px] md:p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/events'>Mis eventos</Link>
							</li>
							<li className='bg-acent text-primary  p-[6px] md:p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/add-event'>Añadir evento</Link>
							</li>
							<li className='bg-acent text-primary  p-[6px] md:p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link
									to='/'
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
