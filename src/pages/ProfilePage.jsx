import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";
import userIcon from "../img/userIconWhite.png";

function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState();
  const [username, setUsername] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const params = useParams();
  const fileInputRef = useRef();

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

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };

  const handleSaveClick = async () => {
    // Aquí podrías enviar los datos actualizados al servidor
    try {
      const res = await axios.put(
        `https://events-cqtw.onrender.com/uploadInfoProfile/${params.id}`
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
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

  const handleChangePassword = async () => {
    const isMatch = bcrypt.compareSync(currentPassword, user.user.password);

    if (!isMatch) {
      return showAlert("la contraseña actual es incorrecta.");
    }
    if (password !== confirmNewPassword) {
      return showAlert("Las contraseñas no coinciden", "error");
    }

    try {
      await axios.put(
        `https://events-cqtw.onrender.com/uploadInfoProfile/${params.id}`,
        { password }
      );

      // Una vez que se ha realizado el cambio de contraseña con éxito,
      // puedes limpiar los campos de contraseña
      showAlert("La contraseña se actualizo correctamente", "success", 3000);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error(error);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }

    setIsEditingPassword(false);
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

          <div>
            {profileImage ? (
              <img
                className="h-[500px] w-[500px]"
                src={profileImage}
                alt="Imagen de perfil"
              />
            ) : user.user.img_profile ? (
              <img
                className="h-[500px] w-[500px]"
                src={`https://events-cqtw.onrender.com/uploads/${user.user.img_profile}`}
                alt="Imagen de perfil"
              />
            ) : (
              <img
                className="h-[200px] w-[200px] rounded-full"
                src={userIcon}
                alt="Previsualización"
              />
            )}
          </div>

          <div>
            <button onClick={handleEditClick} disabled={isEditing}>
              Editar
            </button>
          </div>
          <div className="mb-2">
            <label htmlFor="nameProfile" className="mr-2">
              Nombre:
            </label>
            <input
              id="nameProfile"
              className="text-black pl-1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="emailProfile" className="mr-2">
              Correo electronico
            </label>
            <input
              id="emailProfile"
              className="text-black pl-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-2">
            <h3>Cambio de Contraseña:</h3>
            {isEditing && (
              <div>
                <button onClick={handleEditPasswordClick}>
                  Editar contraseña
                </button>
              </div>
            )}
            <div>
              <label htmlFor="currentPassword" className="mr-2">
                Contraseña Actual:
              </label>
              <input
                className="text-black pl-1"
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={!isEditingPassword}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="mr-2">
                Nueva Contraseña:
              </label>
              <input
                className="text-black pl-1"
                type="password"
                id="newPassword"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!isEditingPassword}
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="mr-2">
                Confirmar Nueva Contraseña:
              </label>
              <input
                className="text-black pl-1"
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={!isEditingPassword}
              />
            </div>
            {isEditingPassword && (
              <div>
                <button onClick={handleChangePassword}>
                  Cambiar Contraseña
                </button>
              </div>
            )}
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
