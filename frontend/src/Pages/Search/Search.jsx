import React from "react";
import "./Search.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hook/useResetComponentMessage";

import LikeContainer from "../../Components/LikeContainer";
import PhotoItem from "../../Components/PhotoItem";
import { Link } from "react-router-dom";
import { useQuery } from "../../hook/useQuery";
import { searchPhoto, like } from "../../slices/photoSlice";

function Search() {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhoto(search));
  }, [dispatch, search]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo}></PhotoItem>
            <LikeContainer
              photo={photo}
              user={user}
              handleLike={() => handleLike(photo)}
            />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
				{photos && photos.length === 0 && (
					<h2 className="no-photos">
						Não foram encontradas resultados para sua busca...
					</h2>
				)}
    </div>
  );
}

export default Search;
