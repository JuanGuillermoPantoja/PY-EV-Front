import { createContext, useContext, useState, useEffect } from "react";
import instance from "../api/axios";

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvent must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const res = await ruta_protegida().get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEvent = async (event) => {
    const res = await ruta_protegida().post("/events", event);
    console.log(res);
  };

  const deleteEvent = async (id) => {
    try {
      const res = await ruta_protegida().delete(`/events/${id}`);
      if (res.status === 204)
        setEvents(events.filter((events) => events.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getEvent = async (id) => {
    try {
      const res = await ruta_protegida().get(`/events/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEvent = async (id, event) => {
    try {
      await ruta_protegida().put(`/events/${id}`, event);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEventDone = async (id) => {
    try {
      const eventFound = events.find((event) => event.id === id);
      await ruta_protegida().put(`/events/${id}`, {
        done: eventFound.done === 0 ? true : false,
      });
      setEvents(
        events.map((event) =>
          event.id === id ? { ...event, done: !event.done } : event
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const ruta_protegida = () => {
    // Recuperar el token del localStorage
    const token = localStorage.getItem("token");
    if (token) {
      const clienteAxios = instance.create({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return clienteAxios;
    } else {
      const clienteAxios = instance.create({
        headers: {
          authorization: `Bearer null`,
        },
      });
      return clienteAxios;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        deleteEvent,
        getEvents,
        getEvent,
        updateEvent,
        toggleEventDone,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
