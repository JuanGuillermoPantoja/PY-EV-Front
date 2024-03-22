import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useEvents } from "../context/EventContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventsFormImages from "./EventsFormImages";
import Swal from "sweetalert2";
import defaultImage from "../img/img-default.png";
dayjs.extend(utc);

function EventsFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createEvent, getEvent, updateEvent } = useEvents();
  const navigate = useNavigate();
  const params = useParams();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(defaultImage);
  const [isUploadImage, setIsUploadImage] = useState(false);

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

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverImagePreview(defaultImage);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (!params.id || isNaN(params.id)) {
      console.error("ID del evento no proporcionado o no válido");
      return;
    }

    const showAlert = (message, type) => {
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
        timer: 3000,
        showConfirmButton: false,
      });
    };

    console.log("filename", params.id);

    const formdata = new FormData();
    formdata.append("eventId", params.id);
    formdata.append("image", file);

    axios
      .post("https://events-cqtw.onrender.com/upload", formdata)
      .then((res) => {
        setIsUploadImage(false);
        if (res.data.Status === "Success") {
          showAlert("Se actualizo la imagen correctamente", "success");
        } else {
          showAlert("La imagen no cumple con los requerimientos", "error");
        }
      })
      .catch((err) => console.log(err))
      .finally(setIsUploadImage(true));
  };

  useEffect(() => {
    async function loadEvent() {
      if (params.id) {
        const event = await getEvent(params.id);
        setValue("title", event.title);
        setValue("address", event.address);
        setValue("description", event.description);
        setValue("dates", dayjs(event.dates).utc().format("YYYY-MM-DD"));
        setValue("promotion", event.promotion);
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
    navigate("/events");
  });

  return (
    <>
      <Navbar></Navbar>
      <div className="lg:h-screen bg-white bg-cover bg-center pt-4 flex flex-col lg:flex-row lg:gap-4 lg:px-2 xl:justify-center items-center ">
        <div className="flex justify-center items-center bg-amber-950 h-3/4 w-[90%] sm:w-3/4 lg:w-[80%] rounded-sm xl:w-[40%] xl:h-[80%]">
          <form
            className="flex flex-col h-full w-[85%] justify-center xl:w-3/4"
            onSubmit={onSubmit}
          >
            <h2 className="font-bold text-lg text-start">
              Formulario de evento
            </h2>
            <div className="2xl:w-[100%] bg-acent h-[1px] mb-4"></div>

            <label className="text-left w-full text-base" htmlFor="name">
              Nombre del local:
            </label>
            <input
              className="w-full h-12 text-base bg-white outline-none rounded-md text-textBlack  font-bold placeholder-primary placeholder:font-bold "
              type="text"
              name="title"
              placeholder="Nombre:"
              {...register("title")}
              autoFocus
            />

            <label className="text-left w-full text-base" htmlFor="name">
              palabra clave:
            </label>
            <input
              className="w-full h-12 text-base bg-white outline-none rounded-md text-textBlack font-bold placeholder-primary placeholder:font-bold"
              type="text"
              name="promotion"
              placeholder="ej: 2x1 en empanadas, evento musical..."
              {...register("promotion")}
            />

            <label
              className="text-left w-full ttext-base text-"
              htmlFor="address"
            >
              Dirección:
            </label>
            <input
              className="w-full h-12 text-base bg-white outline-none rounded-md text-textBlack font-bold placeholder-primary placeholder:font-bold "
              type="text"
              name="address"
              placeholder="Direccion:"
              {...register("address")}
            />

            <label className="text-left w-full text-base " htmlFor="firstDate">
              Fecha:
            </label>

            <input
              className="w-full h-12 text-base bg-white outline-none rounded-md text-textBlack font-bold placeholder-primary placeholder:font-bold "
              type="date"
              name="dates"
              {...register("dates")}
            />

            <label className="text-left w-full text-base" htmlFor="description">
              Descripción del evento:
            </label>
            <textarea
              className="w-full h-[200px] text-base bg-white outline-none rounded-md text-textBlack font-bold placeholder-primary placeholder:font-bold"
              name="description"
              id=""
              cols=""
              rows="5"
              placeholder="Descripción del evento"
              {...register("description")}
            ></textarea>
            <div className="">
              <div className="w-full flex flex-col items-center">
                <button
                  onSubmit={onSubmit}
                  className="bg-acent font-bold w-[60%] sm:w-2/5 md:w-4/12 xl:w-full text-base mb-2 text-textBlack mt-4 p-2 shadow-gold shadow-inner rounded-xl hover:bg-amber-600 "
                >
                  Añadir evento
                </button>
              </div>
            </div>
          </form>
        </div>
        {params.id && (
          <div className="flex flex-col mt-4 lg:mt-0 items-center w-[90%] sm:w-3/4 lg:h-3/4 lg:mb-0 mb-4 bg-amber-950 xl:w-[40%] xl:h-[80%] h-3/4 rounded-sm">
            <h2 className="font-bold text-start text-lg">Imagen de portada</h2>
            <div className="w-[85%] 2xl:w-[80%] bg-acent h-[1px] mb-4"></div>
            <div className="flex flex-col w-[100%] lg:justify-center lg:h-1/2 xl:h-[60%] 2xl:h-[42%] h-full mb-4 lg:mb-0">
              <div className="flex flex-col items-center">
                <div className="bg-white p-2 w-[70%] h-[145px] sm:w-[60%] sm:h-[200px] md:h-[240px] lg:h-[160px] lg:w-[60%] xl:w-[60%] xl:h-[140px] 2xl:h-[200px] min-[1920px]:h-[230px] rounded-md flex justify-center items-center">
                  <img
                    className="w-[90%] h-[120px] sm:h-[160px] md:h-[200px] lg:h-[90%] 2xl:h-[180px] min-[1920px]:h-[210px] min-[1920px]:w-[95%]"
                    src={coverImagePreview}
                  />
                </div>
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
                <div className="flex justify-center mt-1 items-center w-full">
                  <button
                    onClick={handleFileButtonClick}
                    className="text-xs bg-gray-500 w-auto p-2 h-10 rounded-lg hover:bg-gray-600"
                  >
                    <input
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      type="file"
                    />
                    Seleccionar archivo
                  </button>
                  <button
                    onSubmit={onSubmit}
                    onClick={handleUpload}
                    className="ml-1 text-base bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-xl hover:bg-amber-600"
                  >
                    Actualizar portada
                  </button>
                </div>
              </div>
            </div>
            <EventsFormImages />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default EventsFormPage;
