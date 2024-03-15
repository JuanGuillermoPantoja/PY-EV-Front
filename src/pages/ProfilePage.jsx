import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState();
  const [username, setUsername] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const params = useParams();
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Aquí podrías enviar los datos actualizados al servidor
    setIsEditing(false);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      console.log("userId", params.id);
      formData.append("userId", params.id);
      formData.append("profile", image);
      const res = await axios.post(
        `https://events-cqtw.onrender.com/uploadImgProfile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-black">
        <div>
          <div>
            <button onClick={handleButtonClick}>
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                type="file"
              />
              Seleccionar imagen
            </button>
            <button onClick={handleUpload} className="ml-4">
              Actualizar imagen
            </button>
          </div>
          {profileImage && (
            <div>
              <img
                className="h-[200px] w-[200px] rounded-full"
                src={profileImage}
                alt="Previsualización"
              />
            </div>
          )}
          <div>
            <button onClick={handleEditClick} disabled={isEditing}>
              Editar
            </button>
          </div>
          <div>
            <label htmlFor="">Nombre</label>
            <input
              className="text-black"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="">Correo electronico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <div>
              <button onClick={handleSaveClick}>Guardar</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
