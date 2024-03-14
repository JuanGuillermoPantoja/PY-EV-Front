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
import defaultImage from "../img/img-default.png";

function EventsFormImages() {
  const [images, setImages] = useState([
    { index: 0, name: "default", url: defaultImage },
  ]);
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

    console.log("files", newFiles);

    if (images.length === 1 && images[0]?.name === "default") {
      images.splice(0, 1);
      setFiles(newFiles);
      setSelectedFile(newSelectedFiles);
    }

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
    if (images.length === 1 && images[0].name === "default") {
      showAlert("Debe seleccionar al menos una imagen", "warning", 3000);
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
                  return `<div style="flex justify-center items-center w-full">
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

  return (
    <div className="mt-4 2xl:mt-0 lg:pb-1 flex flex-col justify-center  items-center w-full">
      <h2 className="font-bold text-lg">Mostrar más imagenes</h2>
            <div className="w-[85%] 2xl:w-[80%] bg-acent h-[1px] mb-4"></div>
      <SimpleBar className="bg-[#4b1e00] p-2 w-[70%] sm:w-[60%] md:h-[160px] rounded-md bg-cover bg-center h-[145px] lg:w-[50%] lg:h-[150px] xl:w-[70%] 2xl:w-[60%] 2xl:h-[200px]">
        <div className="flex gap-4 justify-center flex-wrap lg:w-full">
          {images.map((imagen, index) => (
            <div className="w-[95%]" key={`${imagen.name}_${index}`}>
              <div className="flex justify-center lg:w-full">
                {imagen.name !== "default" ? (
                  <button
                    className="absolute w-8 right-[23.5%] sm:right-[27.5%] md:right-[29.7%] lg:right-[23.5%] xl:right-[27.5%] 2xl:right-[27 %] bg-red-800"
                    onClick={() => deleteImg(imagen.index)}
                  >
                    x
                  </button>
                ) : null}
                <img
                  alt="algo"
                  src={imagen.url}
                  data-toggle="modal"
                  data-target="#ModalPreViewImg"
                  className="w-[60%] sm:w-[50%] md:w-[45%] lg:w-[60%] xl:w-[50%]"
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
      <div className="flex justify-center items-center w-full mt-2 mb-2">
        <label className="btn btn-warning">
          <button
            className="p-2 text-xs bg-gray-500 w-auto h-10 rounded-lg hover:bg-gray-600"
            onClick={handleFileButtonClick}
          >
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
          className="bg-acent font-bold text-base ml-1 w-[50%] sm:w-2/6 h-10 text-textBlack  shadow-gold shadow-inner rounded-xl hover:bg-amber-600"
        >
          Subir imágenes
        </button>
      </div>
    </div>
  );
}

export default EventsFormImages;
