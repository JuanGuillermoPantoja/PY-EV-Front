import React, { useEffect, useState } from "react";
import logoeventBrew from "../img/logoeventsBrew.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, userErrors } = useAuth();

  console.log("value", userErrors);

  const navigate = useNavigate();

  // const onSubmit = handleSubmit((data) => {
  //   signin(data);
  //   console.log(data);
  // });

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  useEffect(() => {
    // Si isAuthenticated es true, redirige a la página de eventos
    if (isAuthenticated) {
      navigate("/events");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[url('https://i.ibb.co/LQf91TG/fondo-EB.webp')] bg-cover">
        <h2
          className="text-7xl text-[#FFEEB3] 
        max-[1024px]:text-6xl 
        max-[480px]:text-4xl"
        >
          INICIA SESION
        </h2>
        <div
          className="flex justify-center items-center h-4/5 w-[80%]
        max-[768px]:w-[90%]
        max-[480px]:flex-col"
        >
          <div
            className="flex flex-col justify-center items-center w-1/2 
          max-[1024px]:pb-12"
          >
            <Link to="/">
              <img
                className="1/2 max-[1024px]:w-4/5 max-[768px]:m-auto"
                src={logoeventBrew}
                alt=""
              />
            </Link>
            <p
              className="bg-[#4A2D0B] rounded-full py-1 px-12 text-[#FFEEB3] text-2xl 
            max-[1024px]:text-xl 
            max-[600px]:text-lg max-[600px]:px-5
            max-[480px]:text-sm max-[480px]:px-2"
            >
              ¿Aún no tienes cuenta? Registrate aquí.{" "}
              <NavLink
                className="text-[#AC703E] underline hover:font-bold"
                to="/register"
              >
                Registrarse
              </NavLink>{" "}
            </p>
          </div>

          <form
            className="flex flex-col items-center w-1/2 h-[70%]
            max-[480px]:w-3/5 "
            onSubmit={onSubmit}
          >
            <div
              className="bg-[#0000004f] rounded-xl flex flex-col justify-center items-center w-4/5 h-full
            max-[1024px]:h-[90%]
            max-[480px]:h-full max-[480px]:w-full"
            >
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
                className="my-2 w-2/3 h-12 text-lg bg-[#FFEEB3] text-[#AC703E] pl-2 font-bold placeholder-[#AC703E] placeholder:font-bold
                max-[768px]:w-3/4
                max-[480px]:text-base"
                type="email"
                {...register("email", { required: true })}
                placeholder="Correo:"
              />

              {errors.email && (
                <p className="text-red-500">email is required</p>
              )}

              <input
                className="my-2 w-2/3 h-12 text-lg bg-[#FFEEB3] text-[#AC703E] pl-2 font-bold placeholder-[#AC703E] placeholder:font-bold
                max-[768px]:w-3/4
                max-[480px]:text-base"
                type="password"
                {...register("password", { required: true })}
                placeholder="Contraseña:"
              />

              {errors.password && (
                <p className="text-red-500">password is required</p>
              )}

              <button
                className="bg-[#FFEEB3] text-[#AC703E] text-2xl font-bold h-12 w-1/4 rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300
                max-[1024px]:w-1/3
                max-[600px]:text-lg max-[600px]:h-10
                max-[480px]:text-xl"
                type="submit"
              >
                Iniciar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
