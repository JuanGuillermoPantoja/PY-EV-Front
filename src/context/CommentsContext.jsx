import { createContext, useContext, useState } from 'react';
import instance from '../api/axios';
import Swal from 'sweetalert2';

const CommentsContext = createContext();

const showAlert = (message, type) => {
	Swal.fire({
		title: message,
		icon: type,
		color: '#ff9800',
		iconColor: '#ff9800',
		background: '#000000',
		timer: 3000,
		showConfirmButton: false,
	});
};

export const useComments = () => {
	const context = useContext(CommentsContext);
	if (!context) {
		throw new Error('useComments must be used within a CommentsProvider');
	}
	return context;
};

export function CommentProvider({ children }) {
	const [comments, setComments] = useState([]);

	const getComments = async (event_id) => {
		try {
			const res = await ruta_protegida().get(`/comments?event_id=${event_id}`);
			setComments(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const createComment = async (event_id, comment_text, client_id) => {
		try {
			const res = await ruta_protegida().post(`/comments`, {
				comment_text,
				event_id,
				client_id,
			});
			if (res.data.Status === 'Inapropiated') {
				showAlert('Comentario eliminado por contenido inapropiado', 'warning');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getLikesAndDisLikes = async (event_id) => {
		try {
			const res = await ruta_protegida().get(`/${event_id}/likes-dislikes`, {
				event_id,
			});
			console.log(res.data);
			return res.data; // Devuelve los datos de la respuesta
		} catch (error) {
			console.error(error);
			throw error; // Lanza el error para que puedas manejarlo en tu componente
		}
	};

	const addLike = async (event_id, client_id) => {
		try {
			const res = await ruta_protegida().post(`/events/${event_id}/like`, {
				event_id,
				client_id,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const addDisLike = async (event_id, client_id) => {
		try {
			const res = await ruta_protegida().post(`/events/${event_id}/dislike`, {
				event_id,
				client_id,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const deleteComment = async (comment_id, client_id) => {
		try {
			const res = await ruta_protegida().delete(
				`/comments/${comment_id}?client_id=${client_id}`,
			);
			if (res.status === 204) {
				// Si fue exitosa, actualizar el estado eliminando el comentario
				setComments(comments.filter((comment) => comment.id !== comment_id));
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateComment = async (comment_id, client_id, comment_text) => {
		try {
			const data = {
				client_id: client_id,
				comment_text: comment_text,
			};
			const res = await ruta_protegida().put(`/comments/${comment_id}`, data);
			if (res.data.Status === 'Inapropiated') {
				showAlert('Comentario eliminado por contenido inapropiado', 'warning');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const ruta_protegida = () => {
		// Recuperar el token del localStorage
		const token = localStorage.getItem('clienToken');
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
		<CommentsContext.Provider
			value={{
				comments,
				getComments,
				createComment,
				deleteComment,
				updateComment,
				addLike,
				addDisLike,
				getLikesAndDisLikes,
			}}
		>
			{children}
		</CommentsContext.Provider>
	);
}
