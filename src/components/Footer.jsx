import React from 'react'
import logoeventBrew from "../img/logoeventsBrew.png";


function Footer() {
    return (
        <>
            <footer>
                <div className='bg-[#4c3b22] w-full h-[350px] flex justify-center items-center'>
                    <div className='p-4 w-[30%]'>
                        <form className=' bg-[#534320] rounded-md p-2 shadow-md shadow-black'>
                            <div>
                                <h2 className='text-xl text-[#FFEEB3] text-center font-sans'>¿Deseas agregar los eventos de tu establecimiento?</h2>
                                <h3 className='text-lg text-[#FFEEB3] font-bold font-sans text-center'>Contactanos</h3>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-lg text-[#FFEEB3] font-sans'>Nombre:</label>
                                <input type="text" className='bg-[#d5a6685e] font-sans' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-lg text-[#FFEEB3] font-sans'>Correo:</label>
                                <input type="text" className='bg-[#d5a6685e] font-sans' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-lg text-[#FFEEB3] font-sans'>Motivo:</label>
                                <textarea cols="10" rows="3" className='bg-[#d5a6685e] font-sans'></textarea>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button className="w-[35%] bg-[#FFEEB3] text-[#AC703E] text-xl m-2 text-center font-bold rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300">Enviar</button>
                            </div>
                        </form>
                    </div>
                    <div className='p-4 w-[70%] flex flex-col'>
                        <div className='bg-[#534320] rounded-md p-2 shadow-md shadow-black'>
                            <h2 className='h-[10%] text-3xl text-[#aa9857] text-start font-bold font-sans'>EventsBrews</h2><br />
                            <p className='h-[10%] text-xl text-[#FFEEB3] font-sans'>
                                Con un enfoque en la comodidad y la accesibilidad, nuestra aplicación proporciona
                                a los clientes una ventana abierta a un mundo de experiencias en tiempo real. EventsBrew
                                es una aplicación innovadora diseñada para transformar la experiencia de los clientes en cafés y bares,
                                proporcionando un método efectivo para mantener a las personas informadas sobre los eventos y actividades
                                que se llevan a cabo en estos lugares. Con la creciente importancia de los eventos y la vida social en estos
                                establecimientos, EventsBrew busca brindar una plataforma que promueva la participación activa y la exploración
                                de nuevas experiencias.
                            </p>
                        </div>
                        <div className='flex justify-start items-center'>
                            <img src={logoeventBrew} className='w-[8%] h-[8%]' alt="" />
                            <p className='text-2xl text-[#FFEEB3] text-end font-sans'>©EventsBrews</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer