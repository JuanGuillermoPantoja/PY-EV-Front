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
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SimpleBar from "simplebar-react";
import Swal from "sweetalert2";
import React from "react";

function EventsFormImages() {
  const [images, setImages] = useState([]);
  const [fileInputRefs, setFileInputRefs] = useState([]);
  const [files, setFiles] = useState([null]);
  const [selectedFile, setSelectedFile] = useState(
    Array(files.length).fill(null)
  );
  const [isUploadImage, setIsUploadImage] = useState(false);

  const changeInput = (e) => {
    const selectedFiles = e.target.files;
    const newFiles = [...files];
    const newSelectedFiles = [...selectedFile];
    const newImages = [];

    // Itera sobre los archivos seleccionados y actualiza los arrays de archivos y nombres de archivos seleccionados
    for (let i = 0; i < selectedFiles.length; i++) {
      const index = files.length + i; // Calcula el índice en base a la longitud actual de los archivos
      newFiles[index] = selectedFiles[i];
      newSelectedFiles[index] = selectedFiles[i] ? selectedFiles[i].name : null;

      const url = URL.createObjectURL(selectedFiles[i]);
      newImages.push({
        index: index,
        name: selectedFiles[i].name,
        url: url,
        file: selectedFiles[i],
      });
    }

    setFiles(newFiles);
    setSelectedFile(newSelectedFiles);
    setImages([...images, ...newImages]);

    // Asegúrate de que el número de inputs refleje la cantidad de archivos seleccionados
    const numInputs = selectedFiles.length;
    if (numInputs > 1) {
      const newInputRefs = Array.from({ length: numInputs - 1 }, () =>
        React.createRef()
      );
      setFileInputRefs([...fileInputRefs, ...newInputRefs]);
    }
  };

  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files;

    //el array con las imagenes nuevas
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];

      let url = URL.createObjectURL(file);

      //console.log(file);
      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file,
      });

      indexInicial++;
    });

    //despues de haber concluido el ciclo retornamos las nuevas imagenes
    return arrayImages;
  }

  function deleteImg(index) {
    const newImgs = images.filter(function (imagen) {
      return imagen.index !== index;
    });

    const newFiles = files.filter(function (file, i) {
      return i !== index;
    });

    setImages(newImgs);
    setFiles(newFiles);
  }

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

  const showAlert = (message, type, time, confirmation) => {
    let iconType = "info";

    if (type === "error") {
      iconType = "error";
    } else if (type === "warning") {
      iconType = "warning";
    } else if (type === "success") {
      iconType = "success";
    }

    Swal.fire({
      title: message,
      icon: iconType,
      color: "#ff9800",
      iconColor: "#ff9800",
      background: "#000000",
      timer: time,
      showConfirmButton: confirmation,
    });
  };

  const handleFileButtonClick = (index) => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (!params.id || isNaN(params.id)) {
      console.error("ID del evento no proporcionado o no válido");
      return;
    }

    const formdata = new FormData();
    formdata.append("eventId", params.id);

    // Itera sobre los archivos y los adjunta individualmente al objeto FormData
    files.forEach((file) => {
      if (file) {
        formdata.append(`images`, file);
      }
    });

    axios
      .post("https://events-cqtw.onrender.com/uploadImgIA", formdata)
      .then((res) => {
        setIsUploadImage(false);
        if (res.data.Status === "Success") {
          showAlert("las imagenes se agregaron correctamente", "success", 1200);
        } else {
          console.log(res);
          const failedImages = res.data.failedImages;
          if (failedImages.length > 0) {
            const errorMessage = failedImages
              .map((error) => {
                const failedImage = images.find(
                  (image) => image.index === error.index + 1
                );
                if (failedImage) {
                  return `<div>
                    <p>Error al subir las siguientes imagenes:</p>
                    <img src="${failedImage.url}" style="max-width: 100px; max-height: 100px;" />
                  </div>`;
                }
              })
              .join("\n");
            showAlert(errorMessage, "error");
          } else {
            showAlert("Fallo al agregar las imagenes", "error", false, true);
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(setIsUploadImage(true));
  };

  {
    console.log(images);
  }

  return (
    <div className="mt-4">
      <SimpleBar className="bg-transparent w-[600px] bg-fixed bg-cover bg-center h-[400px]">
        <div className="flex flex-wrap">
          {images.map((imagen, index) => (
            <div
              className=""
              key={`${imagen.name}_${index}`}
            >
              <div className="">
                <button
                  className="absolute w-8 bg-red-800"
                  onClick={() => deleteImg(imagen.index)}
                >
                  x
                </button>
                <img
                  alt="algo"
                  src={imagen.url}
                  data-toggle="modal"
                  data-target="#ModalPreViewImg"
                  className="w-[200px] h-[200px]"
                ></img>
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
      {isUploadImage && (
        <div className="text-acent flex justify-center bg-none text-3xl">
          <div className="animate-bouncing animate-delay-100 animate-iteration-count-infinite">
            .
          </div>
          <div className="animate-bouncing animate-delay-200 animate-iteration-count-infinite">
            .
          </div>
          <div className="animate-bouncing animate-delay-300 animate-iteration-count-infinite">
            .
          </div>
        </div>
      )}
      <label className="btn btn-warning">
        <button
          className="m-1 text-xs bg-gray-500 w-1/3 h-10 rounded-lg hover:bg-gray-600"
          onClick={handleFileButtonClick}>
          <span>Seleccionar archivos </span>
          <input
            hidden
            type="file"
            multiple
            ref={fileInputRef}
            onChange={(e) => changeInput(e)}
          ></input>
        </button>
      </label>
      <button
        onClick={handleUpload}
        className="bg-acent font-bold mx-auto w-[60%] text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:bg-amber-600   max-[1024px]:w-1/3 max-[600px]:text-lg max-[600px]:h-10 max-[480px]:text-xl"
      >
        Subir imágenes
      </button>
    </div>
  );
}

export default EventsFormImages;
