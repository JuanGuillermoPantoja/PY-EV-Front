import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useEvents } from '../context/EventContext';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';
import Navbar from '../components/Navbar';
import FooterAdmin from '../components/FooterAdmin';
import EventsFormImages from './EventsFormImages';
import Swal from 'sweetalert2';
dayjs.extend(utc);

function EventsFormPage() {
	const { register, handleSubmit, setValue } = useForm();
	const { createEvent, getEvent, updateEvent } = useEvents();
	const navigate = useNavigate();
	const params = useParams();
	const fileInputRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);

	//imagen upload
	const [file, setFile] = useState();

	// const handleFile = (e) => {
	// 	setFile(e.target.files[0]);
	// };
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file ? file.name : null);
		// Aquí puedes realizar cualquier otra lógica que necesites con el archivo seleccionado
		setFile(event.target.files[0]);
	};

	const handleFileButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleUpload = () => {
		if (!params.id || isNaN(params.id)) {
			console.error('ID del evento no proporcionado o no válido');
			return;
		}

		const showAlert = (message, type) => {
			let iconType = 'info';

			if (type === 'error') {
				iconType = 'error';
			} else if (type === 'warning') {
				iconType = 'warning';
			} else if (type === 'success') {
				iconType = 'success';
			}

			Swal.fire({
				title: message,
				icon: iconType,
				color: '#ff9800',
				iconColor: '#ff9800',
				background: '#000000',
				timer: 3000,
				showConfirmButton: false,
			});
		};

		const formdata = new FormData();
		formdata.append('eventId', params.id);
		formdata.append('image', file);

		axios
			.post('https://events-cqtw.onrender.com/upload', formdata)
			.then((res) => {
				if (res.data.Status === 'Success') {
					showAlert('Se actualizo la imagen correctamente', 'success');
				} else {
					showAlert('La imagen no cumple con los requerimientos', 'error');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		async function loadEvent() {
			if (params.id) {
				const event = await getEvent(params.id);
				setValue('title', event.title);
				setValue('address', event.address);
				setValue('description', event.description);
				setValue('dates', dayjs(event.dates).utc().format('YYYY-MM-DD'));
				setValue('promotion', event.promotion);
			}
		}
		loadEvent();
	}, []);

	const onSubmit = handleSubmit((data) => {
		if (params.id) {
			updateEvent(params.id, {
				...data,
				dates: dayjs.utc(data.dates).format(),
			});
		} else {
			createEvent({
				...data,
				dates: dayjs.utc(data.dates).format(),
			});
		}
		navigate('/events');
	});

	return (
		<>
			<Navbar></Navbar>
			<div className='h-screen bg-gradient-orange bg-cover bg-center flex justify-around items-center'>
				<div className='flex justify-around items-center bg-[#00000082] w-2/5 h-3/4 rounded-2xl '>
					<form
						className='flex flex-col h-full w-3/4 justify-center items-center mx-5'
						onSubmit={onSubmit}
					>
						<h2 className='font-bold'>Formulario de evento</h2>
						<div className='w-[50%] bg-acent h-[1px] mb-4'></div>

						<label className='text-left w-full text-xl' htmlFor='name'>
							Nombre del local:
						</label>
						<input
							className='w-full h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
							type='text'
							name='title'
							placeholder='Nombre:'
							{...register('title')}
							autoFocus
						/>

						<label className='text-left w-full text-xl' htmlFor='name'>
							palabra clave:
						</label>
						<input
							className='w-full h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
							type='text'
							name='promotion'
							placeholder='ej: 2x1 en empanadas, evento musical...'
							{...register('promotion')}
							autoFocus
						/>

						<label className='text-left w-full text-xl text-' htmlFor='address'>
							Dirección:
						</label>
						<input
							className='w-full h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
							type='text'
							name='address'
							placeholder='Direccion:'
							{...register('address')}
						/>

						<label className='text-left w-full text-xl ' htmlFor='firstDate'>
							Fecha:
						</label>

						<input
							className='w-full h-12 text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
							type='date'
							name='dates'
							{...register('dates')}
						/>

						<label className='text-left w-full text-xl' htmlFor='description'>
							Descripción del evento:
						</label>
						<textarea
							className='w-full h-[200px] text-lg bg-white outline-none rounded-md text-textBlack pl-2 font-bold placeholder-primary placeholder:font-bold max-[768px]:w-3/4 max-[480px]:text-base'
							name='description'
							id=''
							cols=''
							rows='5'
							placeholder='Descripción del evento'
							{...register('description')}
						></textarea>
						<div className=''>
							<div className='w-full flex flex-col items-center'>
								<button
									onSubmit={onSubmit}
									className='bg-acent font-bold w-full mb-2 text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:bg-amber-600 max-[1024px]:w-1/3 max-[600px]:text-lg max-[600px]:h-10 max-[480px]:text-xl'
								>
									Añadir evento
								</button>
							</div>
						</div>
					</form>
				</div>
				{params.id && (
					<div className='flex flex-col justify-start items-center bg-[#0000007b] w-2/5 h-3/4 rounded-2xl'>
						<h2 className='font-bold'>imagenes</h2>
						<div className='w-[50%] bg-acent h-[1px] mb-4'></div>
						<div className='flex flex-col w-[400px]'>
							<div className='flex items-center'>
								<button
									onClick={handleFileButtonClick}
									className='m-1 text-xs bg-gray-500 w-1/3 h-10 rounded-lg hover:bg-gray-600'
								>
									<input
										ref={fileInputRef}
										onChange={handleFileChange}
										style={{ display: 'none' }}
										type='file'
									/>
									Seleccionar archivo
								</button>
								{selectedFile && (
									<p className='text-xs'>
										Archivo seleccionado: {selectedFile}
									</p>
								)}
							</div>
							<button
								onSubmit={onSubmit}
								onClick={handleUpload}
								className='mx-auto text-base bg-acent font-bold w-[60%] text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:bg-amber-600   max-[1024px]:w-1/3 max-[600px]:text-lg max-[600px]:h-10 max-[480px]:text-xl'
							>
								Actulizar imagen de portada
							</button>
						</div>
						<EventsFormImages />
					</div>
				)}
			</div>
			<FooterAdmin></FooterAdmin>
		</>
	);
}

export default EventsFormPage;
