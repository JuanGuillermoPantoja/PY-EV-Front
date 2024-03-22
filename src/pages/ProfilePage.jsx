import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";
import userIcon from "../img/userIconWhite.png";
import Footer from "../components/Footer";

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
        `https://events-cqtw.onrender.com/uploadInfoProfile/${params.id}`,
        { username, email }
      );
      if (res.status === 200) {
        showAlert("la información se actualizó correctamente", "success", 2000 )
      }
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
      if ((res.status === 200)) {
        showAlert("La imagen se actualizo correctamente", "success", 2000);
      }
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

  const handleCancelInfo = () => {
    setUsername(user.user.username);
    setEmail(user.user.email);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-full xl:h-[80vh] flex flex-col items-center justify-center bg-white ">
        <div className="h-[90%] p-4 bg-gray-50 shadow-complete shadow-gray-200 text-black flex justify-between flex-col xl:flex-row items-center w-[90%] rounded-xl">
          <div className="flex justify-center items-center flex-col xl:w-[30%]">
            <div className="mb-4">
              {profileImage ? (
                <img
                  className="h-[180px] w-[180px] sm:h-[200px] sm:w-[200px] md:h-[210px] md:w-[210px] lg:h-[240px] lg:w-[240px] xl:h-[250px] xl:w-[250px] border-2 border-amber-950 rounded-full"
                  src={profileImage}
                  alt="Imagen de perfil"
                />
              ) : user.user.img_profile ? (
                <img
                  className="h-[180px] xl:h-[250px] sm:h-[200px] sm:w-[200px] md:h-[210px] md:w-[210px] lg:h-[240px] lg:w-[240px] w-[180px] xl:w-[250px] rounded-full border-2 border-amber-950"
                  src={`https://events-cqtw.onrender.com/uploads/${user.user.img_profile}`}
                  alt="Imagen de perfil"
                />
              ) : (
                <img
                  className="bg-amber-950 p-2 h-[180px] w-[180px] sm:h-[200px] sm:w-[200px] md:h-[210px] md:w-[210px] lg:h-[240px] lg:w-[240px] xl:-[250px] xl:w-[250px] rounded-full"
                  src={userIcon}
                  alt="Previsualización"
                />
              )}
            </div>

            <div className="flex flex-col gap-1 xl:flex-row xl:gap-0">
              <button
                onClick={handleButtonClick}
                className="ml-1 text-base bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-xl hover:bg-amber-600"
              >
                <input
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  type="file"
                />
                Seleccionar imagen
              </button>
              <button
                onClick={handleUpload}
                className="ml-1 text-base bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-xl hover:bg-amber-600"
              >
                Actualizar imagen
              </button>
            </div>
          </div>
          <div className="w-full mt-4 md:w-[85%] xl:w-[65%]">
            <div className="mb-4">
              <div>
                <button
                  onClick={handleEditClick}
                  disabled={isEditing}
                  className="w-full text-base bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-md rounded-b-none hover:bg-amber-600"
                >
                  Editar información
                </button>
              </div>
              <div className="w-full">
                {/* <label htmlFor="nameProfile" className="mr-2">
                Nombre:
              </label> */}
                <input
                  id="nameProfile"
                  className={
                    isEditing
                      ? "bg-amber-100 pl-1 border-amber-950  border-[1px]  rounded-b-none  w-full p-2 h-10 outline-none"
                      : "bg-amber-100 text-gray-400 pl-1 border-amber-950  border-[1px]  rounded-b-none  w-full p-2 h-10 outline-none"
                  }
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="">
                {/* <label htmlFor="emailProfile" className="mr-2">
                Correo electronico
              </label> */}
                <input
                  id="emailProfile"
                  className={
                    isEditing
                      ? "bg-amber-100 pl-1 border-amber-950  border-[1px] border-y-0 rounded-b-none  w-full p-2 h-10 outline-none"
                      : "bg-amber-100 text-gray-400 pl-1 border-amber-950  border-[1px] border-y-0 rounded-b-none  w-full p-2 h-10 outline-none"
                  }
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex">
                <button
                  onClick={handleSaveClick}
                  className="w-[50%] text-base mb-4 bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-t-none rounded-md  hover:bg-amber-600"
                >
                  Guardar
                </button>
                <button
                  className="w-[50%] text-base mb-4 bg-amber-600 font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-t-none rounded-md  hover:bg-red-700"
                  onClick={handleCancelInfo}
                >
                  Cancelar
                </button>
              </div>
            </div>
            <div className="mb-2 w-full">
              {/* <h3 className="font-semibold">Cambio de Contraseña:</h3> */}
              <div>
                <button
                  onClick={handleEditPasswordClick}
                  className={
                    isEditingPassword
                      ? "w-full text-base bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-md rounded-b-none hover:bg-amber-600"
                      : "w-full text-base bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-md  hover:bg-amber-600"
                  }
                >
                  Cambiar contraseña
                </button>
              </div>

              <div>
                {/* <label htmlFor="currentPassword" className="mr-2">
                  Contraseña Actual:
                </label> */}
                {isEditingPassword && (
                  <input
                    className="bg-amber-100 pl-1 border-amber-950  border-[1px]  rounded-b-none  w-full p-2 h-10 outline-none animate-slide-in-top animate-duration-300"
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={!isEditingPassword}
                    placeholder="Contraseña actual"
                  />
                )}
              </div>
              <div>
                {/* <label htmlFor="newPassword" className="mr-2">
                  Nueva Contraseña:
                </label> */}
                {isEditingPassword && (
                  <input
                    className="bg-amber-100 pl-1 border-amber-950  border-[1px] border-t-0  rounded-b-none  w-full p-2 h-10 outline-none animate-slide-in-top animate-duration-300"
                    type="password"
                    id="newPassword"
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={!isEditingPassword}
                    placeholder="Nueva contraseña"
                  />
                )}
              </div>
              <div>
                {/* <label htmlFor="confirmNewPassword" className="mr-2">
                  Confirmar Nueva Contraseña:
                </label> */}
                {isEditingPassword && (
                  <input
                    className="bg-amber-100 pl-1 border-amber-950  border-x-[1px]  rounded-b-none  w-full p-2 h-10 outline-none animate-slide-in-top animate-duration-300"
                    type="password"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    disabled={!isEditingPassword}
                    placeholder="Confirmar contraseña"
                  />
                )}
              </div>

              {isEditingPassword && (
                <div className="flex">
                  <button
                    onClick={handleChangePassword}
                    className="w-[70%] md:w-[50%] text-base bg-acent font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-t-none rounded-md  hover:bg-amber-600 animate-slide-in-top animate-duration-300"
                  >
                    Cambiar Contraseña
                  </button>
                  <button
                    className="w-[50%] text-base bg-amber-600 font-bold p-2 h-10 text-textBlack shadow-gold shadow-inner rounded-t-none rounded-md  hover:bg-red-700 animate-slide-in-top animate-duration-300"
                    onClick={() => setIsEditingPassword(false)}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
