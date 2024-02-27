import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function EventsFormImages() {
  const [files, setFiles] = useState([null, null, null]);
  const params = useParams();

  const handleFileChange = (index, e) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

 const handleUpload = () => {
  if (!params.id || isNaN(params.id)) {
    console.error("ID del evento no proporcionado o no válido");
    return;
  }

  const formdata = new FormData();
  formdata.append("eventId", params.id);

  // Itera sobre los archivos y los adjunta individualmente al objeto FormData
  files.forEach((file, index) => {
    if (file) {
      formdata.append(`images`, file);
    }
  });

  axios
    .post("https://events-cqtw.onrender.com/uploadImages", formdata)
    .then((res) => {
      if (res.data.Status === "Success") {
        console.log("Succeeded");
      } else {
        console.log("Failed");
      }
    })
    .catch((err) => console.log(err));
};

  return (
    <div className="multi-image-upload-form">
      {[1, 2, 3].map((index) => (
        <div key={index}>
          <input
            type="file"
            onChange={(e) => handleFileChange(index - 1, e)}
            accept="image/*"
          />
        </div>
      ))}
      <button onClick={handleUpload}>Subir imágenes</button>
    </div>
  );
}

export default EventsFormImages;
