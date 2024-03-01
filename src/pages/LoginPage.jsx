// import React, { useEffect, useState } from 'react';
// import logoeventBrew from '../img/eventsBrewDark.png';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useAuth } from '../context/AuthContext';

// function LoginPage() {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();
// 	const { signin, isAuthenticated, userErrors } = useAuth();

// 	console.log('value', userErrors);

// 	const navigate = useNavigate();

// 	// const onSubmit = handleSubmit((data) => {
// 	//   signin(data);
// 	//   console.log(data);
// 	// });

// 	const onSubmit = handleSubmit(async (data) => {
// 		signin(data);
// 	});

// 	useEffect(() => {
// 		// Si isAuthenticated es true, redirige a la página de eventos
// 		if (isAuthenticated) {
// 			navigate('/events');
// 		}
// 	}, [isAuthenticated, navigate]);

// 	return (
// 		<>
// 			<div className='flex flex-col items-center justify-center h-screen bg-gray-100 bg-cover'>
// 				<div
// 					className='flex justify-center items-center h-full w-[75%]
//         max-[768px]:w-[90%]
//         max-[480px]:flex-col'
// 				>
// 					<div
// 						className='flex flex-col justify-center items-center w-1/2
//           max-[1024px]:pb-12 h-3/4 bg-textBlack opacity-90 border-acent border-t-2 border-l-2 border-b-2 rounded-l-2xl shadow-complete shadow-primary'
// 					>
// 						<Link to='/' className='flex justify-center items-center'>
// 							<img
// 								className='w-3/4 max-[1024px]:w-4/5 max-[768px]:m-auto'
// 								src={logoeventBrew}
// 								alt=''
// 							/>
// 						</Link>
// 						<p
// 							className='bg-primary rounded-full my-2 py-2 px-4 text-[#FFEEB3]
//             max-[1024px]:text-xl
//             max-[600px]:text-lg max-[600px]:px-5
//             max-[480px]:text-sm max-[480px]:px-2'
// 						>
// 							¿Aún no tienes cuenta? Registrate aquí.{' '}
// 							<NavLink
// 								className='text-acent underline hover:text-gold'
// 								to='/register'
// 							>
// 								Registrarse
// 							</NavLink>{' '}
// 						</p>
// 					</div>

// 					<form
// 						className='flex flex-col items-center w-1/2 h-3/4 rounded-r-2xl shadow-complete shadow-primary
//             max-[480px]:w-3/5 '
// 						onSubmit={onSubmit}
// 					>
// 						<div
// 							className='bg-primary rounded-r-xl flex flex-col justify-center items-center w-full h-full border-acent border-t-2 border-b-2 border-r-2
//             max-[1024px]:h-[90%]
//             max-[480px]:h-full max-[480px]:w-full'
// 						>
// 							<h2 className='text-white mb-10 font-bold'>INICIA SESION</h2>
// 							{userErrors && (
// 								<div className='flex flex-col justify-center items-center w-2/3'>
// 									{userErrors.map((error, index) => (
// 										<p
// 											key={index}
// 											className='text-red-500 text-xl font-bold text-left  w-full'
// 										>
// 											{error}
// 										</p>
// 									))}
// 								</div>
// 							)}

// 							<input
// 								className='my-2 w-2/3 h-12 text-lg bg-white text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold
//                 max-[768px]:w-3/4
//                 max-[480px]:text-base'
// 								type='email'
// 								{...register('email', { required: true })}
// 								placeholder='Correo:'
// 							/>

// 							{errors.email && (
// 								<p className='text-red-500'>email is required</p>
// 							)}

// 							<input
// 								className='my-2 w-2/3 h-12 text-lg bg-white text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold
//                 max-[768px]:w-3/4
//                 max-[480px]:text-base'
// 								type='password'
// 								{...register('password', { required: true })}
// 								placeholder='Contraseña:'
// 							/>

// 							{errors.password && (
// 								<p className='text-red-500'>password is required</p>
// 							)}

// 							<button
// 								className='bg-acent font-bold w-1/3 text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100
//                 max-[1024px]:w-1/3
//                 max-[600px]:text-lg max-[600px]:h-10
//                 max-[480px]:text-xl'
// 								type='submit'
// 							>
// 								Iniciar
// 							</button>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

// export default LoginPage;

import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import logoeventBrew from "../img/eventsBrewDark.png";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, userErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/events");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-orange">
        <div className="flex justify-center items-center h-full w-[75%] max-[768px]:w-[90%] max-[480px]:flex-col">
          <div className="relative z-0 overflow-hidden flex flex-col justify-center items-center w-1/2 max-[1024px]:pb-12 h-3/4 bg-transparent border-acent border-t-2 border-l-2 border-b-2 rounded-l-2xl shadow-complete shadow-primary">
            <div className="absolute h-full w-full bg-black opacity-50"></div>
            <Link to="/" className="">
              <div className="flex justify-center items-center">
                <img
                  className="w-3/4 max-[1024px]:w-4/5 max-[768px]:m-auto drop-shadow-complete "
                  src={logoeventBrew}
                  alt=""
                />
              </div>
            </Link>
            <p className="relative rounded-full my-2 py-2 px-4 text-[#FFEEB3] max-[1024px]:text-xl max-[600px]:text-lg max-[600px]:px-5 max-[480px]:text-sm max-[480px]:px-2">
              ¿Aún no tienes cuenta? Registrate aquí.{" "}
              <NavLink
                className="text-acent underline hover:text-gold"
                to="/register"
              >
                Registrarse
              </NavLink>{" "}
            </p>
          </div>

          <form
            className="flex flex-col items-center w-1/2 h-3/4 rounded-r-2xl shadow-complete shadow-primary max-[480px]:w-3/5 "
            onSubmit={onSubmit}
          >
            <div className="bg-black bg-opacity-90 rounded-r-xl flex flex-col justify-center items-center w-full h-full border-acent border-t-2 border-b-2 border-r-2 max-[1024px]:h-[90%] max-[480px]:h-full max-[480px]:w-full">
              <h2 className="text-white  font-bold">INICIA SESIÓN</h2>
              <div className="w-[50%] bg-acent h-[1px] mb-10"></div>
              {userErrors && (
                <div className="flex flex-col justify-center items-center w-2/3">
                  {userErrors.map((error, index) => (
                    <p
                      key={index}
                      className="text-red-500 text-xl font-bold text-left  w-full"
                    >
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <input
                className="my-2 w-2/3 h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base"
                type="email"
                {...register("email", { required: true })}
                placeholder="Correo:"
              />

              {errors.email && (
                <p className="text-red-500">Se requiere correo electronico*</p>
              )}

              <input
                className="my-2 w-2/3 h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base"
                type="password"
                {...register("password", { required: true })}
                placeholder="Contraseña:"
              />

              {errors.password && (
                <p className="text-red-500">Se requiere contraseña*</p>
              )}

              <button
                className="bg-acent font-bold w-1/3 text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:animate-bouncing hover:animate-iteration-count-infinite duration-100 max-[1024px]:w-1/3 max-[600px]:text-lg max-[600px]:h-10 max-[480px]:text-xl"
                type="submit"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
