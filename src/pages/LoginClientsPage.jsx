import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useClientAuth } from '../context/ClientContex';
import logoeventBrew from '../img/eventsBrewDark.png';

function LoginClientsPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { clientSignin, isClientAuthenticated, clientErrors } = useClientAuth();

	const navigate = useNavigate();

	const onSubmit = handleSubmit((data) => {
		clientSignin(data);
	});

	console.log('errores', clientErrors);

	useEffect(() => {
		if (isClientAuthenticated) {
			// Si el usuario está autenticado, redirige a la página principal
			navigate('/');
		}
	}, [isClientAuthenticated, navigate]);


	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen bg-gradient-orange'>
				<div className='flex justify-center flex-col md:flex-row items-center h-full md:h-[80%] lg:h-[90%] md:w-[80%] lg:w-[65%] 2xl:w-[55%] 2xl:h-[80%] mb-4'>
					<div className='relative z-0 overflow-hidden flex flex-col justify-center items-center w-1/2  h-1/2 md:h-2/3 bg-transparent md:border-acent md:border-t-2 md:border-l-2 md:border-b-2 md:rounded-l-2xl shadow-complete shadow-primary'>
						<div className='absolute h-full w-full  md:bg-black opacity-50'></div>

						<Link to='/'>
							<div className='flex justify-center items-center md:animate-bouncing animate-iteration-count-infinite'>
								<img
									className='w-full sm:w-[90%] lg:w-[60%] md:w-2/3 drop-shadow-complete '
									src={logoeventBrew}
									alt=''
								/>
							</div>
						</Link>
						
					</div>

					<form
						className='flex flex-col items-center w-3/4 md:w-1/2 h-2/3 rounded-r-2xl shadow-complete shadow-primary'
						onSubmit={onSubmit}
					>
						<div className='bg-black bg-opacity-90 md:rounded-r-xl flex flex-col justify-center items-center w-full h-full border-acent border-t-2 border-b-2 border-r-2 border-l-2'>
							<h2 className='text-white text-center font-bold text-lg xl:text-xl 2xl:text-2xl pb-2'>
								INICIO DE SESION CLIENTE
							</h2>
							<div className='w-[80%] bg-acent h-[1px] mb-10'></div>

							{clientErrors && (
								<div className='flex flex-col justify-center items-center w-2/3'>
									{clientErrors.map((error, index) => (
										<p
											key={index}
											className='text-red-500 text-xl font-bold text-left  w-full'
										>
											{error}
										</p>
									))}
								</div>
							)}

							<input
								className='my-2 w-4/5 h-12 text-base 2xl:w-3/4 bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold'
								{...register('email', { required: true })}
								type='email'
								placeholder='Correo:'
							/>

							{errors.email && (
								<p className='text-red-500 text-base'>Se requiere Correo electrónico*</p>
							)}

							<input
								className='my-2 w-4/5 2xl:w-3/4 text-base	h-12 bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold'
								{...register('password', { required: true })}
								type='password'
								placeholder='Contraseña:'
							/>

							{errors.password && (
								<p className='text-red-500 text-base'>Se requiere contraseña*</p>
							)}

							<button
								className='bg-acent font-bold w-1/3 text-base text-textBlack mt-2 p-2 shadow-gold shadow-inner rounded-xl hover:bg-gold'
								type='submit'
							>
								Iniciar
							</button>
							<p className='relative rounded-full text-base text-center my-2 py-2 text-[#FFEEB3] '>
							¿Aún no tienes cuenta? Registrate aquí. {" "}
							<NavLink
								className='text-acent underline hover:text-gold'
								to='/register-clients'
							>
								Registrarse
							</NavLink>
						</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default LoginClientsPage;
