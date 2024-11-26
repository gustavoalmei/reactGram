import React from "react";
import "./Profile.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../Components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";

// hooks
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";
import {
  resetMessage,
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editImage, setEditImage] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // EditPhoto and newPhoto refs
  const newPhotoForm = useRef();
  const EditPhotoForm = useRef();

  // load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };
    // build form date
    const formData = new FormData();
    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    dispatch(publishPhoto(formData));
    resetComponentMessage();
  };

  const handleDeletePhoto = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessage();
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const hidenOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    EditPhotoForm.current.classList.toggle("hide");
  };

  const handleEdit = (photo) => {
    if (EditPhotoForm.current.classList.contains("hide")) {
      hidenOrShowForms();
    }

    setEditTitle(photo.title);
    setEditImage(photo.image);
    setEditId(photo._id);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    hidenOrShowForms();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };
    dispatch(updatePhoto(photoData));
  };

  if (loading) {
    return (
      <div className="container-loading">
        <AiOutlineLoading className="loading-profile" />
      </div>
    );
  }
  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" disabled value="Aguarde..." />
              )}
            </form>
          </div>
          <div className="edit-photo hide" ref={EditPhotoForm}>
            <p>Editando...</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />
              </label>
              {!loadingPhoto && <input type="submit" value="Atualizar" />}
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill
                      onClick={() => {
                        handleEdit(photo);
                      }}
                    />
                    <BsXLg
                      onClick={() => {
                        handleDeletePhoto(photo._id);
                      }}
                    />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
                {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
