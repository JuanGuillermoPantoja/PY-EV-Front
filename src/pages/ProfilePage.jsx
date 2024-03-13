import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
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
