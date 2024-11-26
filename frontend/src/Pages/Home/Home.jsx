import "./Home.css";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPhotos, like } from "../../slices/photoSlice";
import { useResetComponentMessage } from "../../hook/useResetComponentMessage";

import LikeContainer from "../../Components/LikeContainer";
import PhotoItem from "../../Components/PhotoItem";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { photos, loading, message, error } = useSelector(
    (state) => state.photo
  );
  const { user } = useSelector((state) => state.auth);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo}></PhotoItem>
            <LikeContainer photo={photo} user={user} handleLike={()=> handleLike(photo)} />
            <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
          </div>
        ))}
      {photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user._id}`}>Clique aqui</Link>
        </h2>
      )}
    </div>
  );
};
