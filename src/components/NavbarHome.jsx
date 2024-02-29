import React from 'react';
import { Link } from 'react-router-dom';
import logoEventBrew from '../img/logoeventsBrew.png';
import { useClientAuth } from '../context/ClientContex';

function NavbarHome() {
	const { isClientAuthenticated, client, clientLogout } = useClientAuth();
	const clientName = client && client.client && client.client.name;


	
	return (
		<>
			{isClientAuthenticated ? (
				<>
					<nav
						className='bg-white w-full flex justify-between items-center px-4 h-[70px] border-b-[1px] border-gray-200'
					>
						<h1 className='text-textBlack font-lobster'>
							<span className='text-acent font-lobster'>E</span>v<span className='text-primary font-lobster'>en</span>ts
							<span className='text-acent font-lobster'>B</span>r<span className='text-primary font-lobster'>ew</span>
						</h1>
						{/* <img className='w-[20%]' src={logoEventBrew} alt='' /> */}
						<ul
							className='flex justify-center items-center gap-x-2 text-xl text-black h-full font-semibold'
						>
							{clientName && (
								<li className='text-textBlack rounded-xl p-2 '>
									{clientName}
								</li>
							)}
							<div className='h-[60%] w-[1px] bg-gray-200'></div>
							<li className='bg-acent text-primary  p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link
									to='/'
									onClick={() => {
										clientLogout();
									}}
								>
									salir
								</Link>
							</li>
							<li id='btn-events' className='bg-acent active:bg-amber-700 text-primary p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/'>eventos</Link>
							</li>
						</ul>
					</nav>
				</>
			) : (
				<>
					<nav className='bg-white w-full flex justify-between items-center px-4 h-[70px] border-b-[1px] border-gray-200'>
						{/* <img className='w-[5.5%]' src={logoEventBrew} /> */}
						<h1 className='text-textBlack'>
							<span className='text-acent'>E</span>v<span className='text-primary'>en</span>ts
							<span className='text-acent'>B</span>r<span className='text-primary'>ew</span>
						</h1>
						<ul className='flex justify-center items-center gap-x-2 text-lg text-black h-full font-medium'>
						<li id='btn-events' className='bg-acent active:bg-amber-700 text-primary p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/'>eventos</Link>
							</li>
							<li className='bg-acent text-primary p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/login-clients'>Inicia sesión</Link>
							</li>
							<div className='h-[60%] w-[1px] bg-gray-200'></div>
							<li className='bg-acent text-primary p-2 rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100'>
								<Link to='/register-clients'>Registrarse</Link>
							</li>
						</ul>
					</nav>
				</>
			)}
		</>
	);
}

export default NavbarHome;
