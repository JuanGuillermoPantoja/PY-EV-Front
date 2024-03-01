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
					<nav className='bg-white w-full flex justify-between items-center px-4 h-[70px] border-b-[1px] border-gray-200'>
						<h1
							className='font-bold text-xl
            lg:text-4xl
            md:text-3xl
            sm:text-2xl'
						>
							<Link to='/' className='text-textBlack font-lobster"'>
								<span className='text-acent font-lobster'>E</span>v
								<span className='text-primary font-lobster'>en</span>ts
								<span className='text-acent font-lobster'>B</span>r
								<span className='text-primary font-lobster'>ew</span>
							</Link>
						</h1>
						<ul
							className='flex justify-center items-center gap-x-2 text-xl text-black h-full '
						>
							{userName && ( // Verificar si userName está definido
								<li className='font-bold text-textBlack rounded-xl p-2 h-2/3 flex items-center'>
									<img className="h-full mr-2" src={userIcon} alt="adminImg" />{userName}
								</li>
							)}
                            <div className="h-[60%] w-[1px] bg-gray-200"></div>
							<li className='bg-acent text-primary  p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/events'>Mis eventos</Link>
							</li>
							<li className='bg-acent text-primary  p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/add-event'>Añadir evento</Link>
							</li>
							<li className='bg-acent text-primary  p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
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
