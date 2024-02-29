import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InfoEvents() {
    const { id } = useParams(); // Obtener el parámetro id de la URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        // Función para obtener la información del evento por su ID
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`https://events-cqtw.onrender.com/events/${id}`); // Reemplaza URL_DEL_API con la URL de tu API
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent(); // Llamar a la función para obtener la información del evento
    }, [id]); // Hacer que useEffect se ejecute cada vez que el ID cambie en la URL

    return (
        <div>
            {event ? (
                <div>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    {/* Otros detalles del evento */}
                </div>
            ) : (
                <p>Cargando información del evento...</p>
            )}
        </div>
    );
}

export default InfoEvents;
