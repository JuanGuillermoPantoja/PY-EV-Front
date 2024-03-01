import React from 'react'
import logoeventBrewDark from "../img/eventsBrewDark.png";


function FooterAdmin() {
    return (
        <>
            <footer>
                <div className='bg-textBlack w-full h-500px flex justify-center items-center'>
                    <div className='p-4 w-[100%] flex flex-col'>
                        <div className='bg-primary rounded-md p-2 shadow-md shadow-black'>
                            <h2 className='h-[10%] text-2xl text-white text-start font-bold font-sans
                            lg:text-3xl
                            sm:text-xl'>EventsBrews</h2><br />
                            <p className='h-[10%] text-base text-[#FFEEB3] font-sans
                            lg:text-lg
                            sm:text-base'>
                                Con un enfoque en la comodidad y la accesibilidad, nuestra aplicación proporciona
                                a los clientes una ventana abierta a un mundo de experiencias en tiempo real. EventsBrew
                                es una aplicación innovadora diseñada para transformar la experiencia de los clientes en cafés y bares,
                                proporcionando un método efectivo para mantener a las personas informadas sobre los eventos y actividades
                                que se llevan a cabo en estos lugares. Con la creciente importancia de los eventos y la vida social en estos
                                establecimientos, EventsBrew busca brindar una plataforma que promueva la participación activa y la exploración
                                de nuevas experiencias.
                            </p>    
                        </div>
                        <div className='flex justify-start items-center mt-2'>
                            <img src={logoeventBrewDark} className='w-[10%]
                            ' alt="" />
                            <p className='text-2xl text-acent text-end font-sans
                            lg:text-3xl
                            sm:text-xl'>©EventsBrews</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterAdmin