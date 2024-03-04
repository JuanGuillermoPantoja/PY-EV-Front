// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function EventsFormImages() {
//   const [files, setFiles] = useState([null, null, null]);
//   const params = useParams();

//   const handleFileChange = (index, e) => {
//     const newFiles = [...files];
//     newFiles[index] = e.target.files[0];
//     setFiles(newFiles);
//   };

//   const handleUpload = () => {
//     if (!params.id || isNaN(params.id)) {
//       console.error("ID del evento no proporcionado o no válido");
//       return;
//     }

//     const formdata = new FormData();
//     formdata.append("eventId", params.id);

//     // Itera sobre los archivos y los adjunta individualmente al objeto FormData
//     files.forEach((file) => {
//       if (file) {
//         formdata.append(`images`, file);
//       }
//     });

//     axios
//       .post("https://events-cqtw.onrender.com/uploadImages", formdata)
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           console.log("Succeeded");
//         } else {
//           console.log("Failed");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="multi-image-upload-form flex flex-col justify-around  items-center h-1/2">
//       {[1, 2, 3].map((index) => (
//         <div key={index}>
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(index - 1, e)}
//             accept="image/*"
//             multiple
//           />
//         </div>
//       ))}
//       <button
//         onClick={handleUpload}
//         className="bg-[#FFEEB3] text-[#AC703E] text-lg m-2 font-bold h-10 w-1/2 rounded-full mt-2 hover:bg-[#AC703E] hover:text-[#FFEEB3] duration-300"
//       >
//         Subir imágenes
//       </button>
//     </div>
//   );
// }

// export default EventsFormImages;
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import Swal from 'sweetalert2';

function EventsFormImages() {
	const [files, setFiles] = useState([null]);
	const [selectedFile, setSelectedFile] = useState(
		Array(files.length).fill(null),
	);
	const params = useParams();
	const fileInputRef = useRef([]);

	const handleFileChange = (index, e) => {
		const newFiles = [...files];
		const newSelectedFiles = [...selectedFile];
		const file = e.target.files[0];

		newSelectedFiles[index] = file ? file.name : null;
		setSelectedFile(newSelectedFiles);
		newFiles[index] = e.target.files[0];
		setFiles(newFiles);
		if (index === files.length - 1 && files.length < 10) {
			setFiles([...newFiles, null]);
			setSelectedFile([...newSelectedFiles, null]);
		}
	};

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

	const handleFileButtonClick = (index) => {
		fileInputRef.current[index].click();
	};

	const handleUpload = () => {
		if (!params.id || isNaN(params.id)) {
			console.error('ID del evento no proporcionado o no válido');
			return;
		}

		const formdata = new FormData();
		formdata.append('eventId', params.id);

		// Itera sobre los archivos y los adjunta individualmente al objeto FormData
		files.forEach((file) => {
			if (file) {
				formdata.append(`images`, file);
			}
		});

		axios
			.post('https://events-cqtw.onrender.com/uploadImages', formdata)
			.then((res) => {
				console.log("respuesta",res);
				if (res.data.Status === 'Success') {
					showAlert('las imagenes se agregaron correctamente', 'success');
				} else {
					showAlert('Fallo al agregar las imagenes', 'error');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='h-[400px] multi-image-upload-form flex flex-col justify-around  items-center'>
			<SimpleBar className='bg-transparent w-[400px] bg-fixed bg-cover bg-center h-[200px]'>
				{files.map((file, index) => (
					<div key={index} className='flex items-center justify-center w-full'>
						<button
							onClick={() => handleFileButtonClick(index)}
							className='bg-gray-500 hover:bg-gray-600 w-1/2 p-2 h-10 rounded-lg text-xs my-1'
						>
							<input
								ref={(el) => (fileInputRef.current[index] = el)} // Asegúrate de asignar el elemento solo si el ref no es nulo
								type='file'
								onChange={(e) => handleFileChange(index, e)}
								accept='image/*'
								multiple
								style={{ display: 'none' }}
							/>
							Seleccionar archivo
						</button>

						{selectedFile[index] && (
							<p className='ml-2 w-full text-xs'>{`Archivo seleccionado: ${selectedFile[index]}`}</p>
						)}
					</div>
				))}
			</SimpleBar>
			<button
				onClick={handleUpload}
				className='bg-acent font-bold mx-auto w-[60%] text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:bg-amber-600   max-[1024px]:w-1/3 max-[600px]:text-lg max-[600px]:h-10 max-[480px]:text-xl'
			>
				Subir imágenes
			</button>
		</div>
	);
}

export default EventsFormImages;
