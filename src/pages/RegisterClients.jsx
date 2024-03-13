import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useClientAuth } from '../context/ClientContex';
import logoeventBrew from '../img/eventsBrewDark.png';
import Swal from 'sweetalert2';

function RegisterClients() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const {
		clientSignup,
		isClientAuthenticated,
		errors: clientErrors,
	} = useClientAuth();

	const navigate = useNavigate();

	const onSubmit = handleSubmit(async (values) => {
		clientSignup(values);
		Swal.fire({
			title: 'Registro exitoso',
			icon: 'success',
			color: '#ff9800',
			iconColor: '#ff9800',
			background: '#000000',
			timer: 3000,
			showConfirmButton: false,
		});
	});

	useEffect(() => {
		if (isClientAuthenticated) navigate('/login-clients');
	}, [isClientAuthenticated]);

	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen bg-gradient-orange'>
				<div className='flex justify-center flex-col md:flex-row items-center h-full gap-10 md:gap-0 md:h-[80%] lg:h-[90%] md:w-[80%] lg:w-[65%] 2xl:w-[55%] 2xl:h-[80%] mb-4'>
					<div className='relative z-0 overflow-hidden flex flex-col justify-center items-center w-1/2  h-[25%] md:h-2/3 bg-transparent md:border-acent md:border-t-2 md:border-l-2 md:border-b-2 md:rounded-l-2xl md:shadow-complete '>
						<div className='absolute h-full w-full  md:bg-black opacity-50'></div>
						<Link to='/'>
							<div className='flex justify-center items-center md:animate-bouncing animate-iteration-count-infinite'>
								<img
									className='w-full sm:w-[90%] lg:w-[60%] md:w-2/3 drop-shadow-complete'
									src={logoeventBrew}
									alt=''
								/>
							</div>
						</Link>

						
					</div>

					<form
						className='flex flex-col items-center w-[90%] md:w-1/2 h-2/3 rounded-r-2xl shadow-complete'
						onSubmit={onSubmit}
					>
						<div className='bg-black bg-opacity-90 md:rounded-r-xl flex flex-col justify-center items-center w-full h-full border-acent border-t-2 border-b-2 border-r-2 border-l-2'>
							<h2 className='text-white text-center font-bold text-lg xl:text-xl 2xl:text-2xl pb-2'>REGISTRO CLIENTE</h2>
							<div className='w-[80%] bg-acent h-[1px] mb-10'></div>

							{clientErrors ??
								[].map((error, i) => (
									<div className='bg-red-500 text-white w-2/3 text-lg' key={i}>
										{error}
									</div>
								))}

							<input
								className='my-2 w-4/5 h-12 text-base 2xl:w-3/4 bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold'
								type='text'
								{...register('name', { required: true })}
								placeholder='Nombres:'
							/>

							{errors.name && (
								<p className='text-red-500'>Se requiere un nombre*</p>
							)}

							<input
								className='my-2 w-4/5 h-12 text-base 2xl:w-3/4 bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold'
								type='email'
								{...register('email', { required: true })}
								placeholder='Correo:'
							/>

							{errors.email && (
								<p className='text-red-500'>
									Se requiere un correo electrónico*
								</p>
							)}

							<input
								className='my-2 w-4/5 h-12 text-base 2xl:w-3/4 bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold'
								type='password'
								{...register('password', { required: true })}
								placeholder='Contraseña:'
							/>

							{errors.password && (
								<p className='text-red-500'>Se requiere contraseña*</p>
							)}

							<button
								className='bg-acent font-bold w-1/3 text-base text-textBlack mt-2 p-2 shadow-gold shadow-inner rounded-xl hover:bg-gold'
								type='submit'
							>
								Enviar
							</button>
							<p className='relative rounded-full text-base text-center my-2 py-2 text-[#FFEEB3]'>
							¿Ya tienes cuenta? Inicia sesión aquí.{' '}
							<NavLink
								className='text-acent underline hover:text-gold'
								to='/login-clients'
							>
								Iniciar sesión
							</NavLink>{' '}
						</p>
						</div>
						
					</form>
				</div>
			</div>
		</>
	);
}

export default RegisterClients;
