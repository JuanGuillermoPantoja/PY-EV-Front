import { useForm } from 'react-hook-form';
import logoeventBrew from '../img/eventsBrewDark.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signup, isAuthenticated, errors: registerErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate('/login');
	}, [isAuthenticated]);

	const onSubmit = handleSubmit(async (values) => {
		signup(values);
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

	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen bg-gradient-orange'>
				<div className='flex justify-center items-center h-full w-[75%] max-[768px]:w-[90%] max-[480px]:flex-col'>
					<div className='relative z-0 overflow-hidden flex flex-col justify-center items-center w-1/2 max-[1024px]:pb-12 h-3/4 bg-transparent border-acent border-t-2 border-l-2 border-b-2 rounded-l-2xl shadow-complete shadow-primary'>
						<div className='absolute h-full w-full bg-black opacity-50'></div>
						<Link to='/'>
							<div className='flex justify-center items-center animate-bouncing animate-iteration-count-infinite'>
								<img
									className='w-3/4 max-[1024px]:w-4/5 max-[768px]:m-auto drop-shadow-complete '
									src={logoeventBrew}
									alt=''
								/>
							</div>
						</Link>
						<p className='relative rounded-full my-2 py-2 px-4 text-[#FFEEB3] max-[1024px]:text-xl max-[600px]:text-lg max-[600px]:px-5 max-[480px]:text-sm max-[480px]:px-2'>
							¿Ya tienes cuenta? Inicia sesión aquí.{' '}
							<NavLink
								className='text-acent underline hover:text-gold'
								to='/login'
							>
								Iniciar sesión
							</NavLink>{' '}
						</p>
					</div>

					<form
						className='flex flex-col items-center w-1/2 h-3/4 rounded-r-2xl shadow-complete shadow-primary max-[480px]:w-3/5'
						onSubmit={onSubmit}
					>
						<div className='bg-black bg-opacity-90 rounded-r-xl flex flex-col justify-center items-center w-full h-full border-acent border-t-2 border-b-2 border-r-2 max-[1024px]:h-[90%] max-[480px]:h-full max-[480px]:w-full'>
							<h2 className='text-white  font-bold:'>REGISTRATE</h2>
							<div className='w-[50%] bg-acent h-[1px] mb-10'></div>
							{registerErrors ??
								[].map((error, i) => (
									<div className='bg-red-500 text-white w-2/3 text-lg' key={i}>
										{error}
									</div>
								))}

							<input
								className='w-2/3 h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
								type='text'
								{...register('username', { required: true })}
								placeholder='Nombres:'
							/>

							{errors.username && (
								<p className='text-red-500'>Se requiere un nombre*</p>
							)}

							<input
								className='my-2 w-2/3 h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
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
								className='mmy-2 w-2/3 h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
								type='password'
								{...register('password', { required: true })}
								placeholder='Contraseña:'
							/>

							{errors.password && (
								<p className='text-red-500'>Se requiere contraseña*</p>
							)}

							<button
								className='bg-acent font-bold w-1/3 text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:bg-gold max-[1024px]:w-1/3 max-[600px]:text-lg max-[600px]:h-10 max-[480px]:text-xl'
								type='submit'
							>
								Enviar
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default RegisterPage;
