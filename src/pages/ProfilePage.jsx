import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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

  return (
    <>
      <Navbar />
      <div className="h-screen bg-black">
        <div>
          <div>
            {profileImage && (
              <div>
                <img
                  className="h-[200px] w-[200px] rounded-full"
                  src={profileImage}
                  alt="Previsualización"
                />
              </div>
            )}
          </div>
          <div>
            <button onClick={handleButtonClick}>
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                style={{ display: "none" }}
              />
              Seleccionar archivo
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="">Nombre</label>
          <input
            className="text-black"
            type="text"
            placeholder={user.user.username}
          />
        </div>
        <div>
          <label htmlFor="">Correo electronico</label>
          <input type="email" placeholder={user.user.email} />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
