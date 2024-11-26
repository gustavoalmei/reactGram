import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import Message from "../../Components/Message";

import { uploads } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

export default function EditProfile() {
  const dispatch = useDispatch();

  const { user, message, loading, error } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill user info
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form date
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    // image preview
    setPreviewImage(image);

    // update image state
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={`${user.name}`}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name || ""}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          disabled
          value={email || ""}
        />
        <label htmlFor="img">
          <span>Imagem do Perfil:</span>
          <input type="file" name="img" id="img" onChange={handleFile} />
        </label>
        <label htmlFor="bio">
          <span>Bio:</span>
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder="Descrição do perfil"
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio || ""}
          />
        </label>
        <label htmlFor="password">
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
}
