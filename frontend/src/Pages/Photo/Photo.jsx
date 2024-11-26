import React, { useEffect, useState } from "react";
import "./Photo.css";

import { uploads } from "../../utils/config";

import { useDispatch, useSelector } from "react-redux";
import { getPhotoId, like, comment } from "../../slices/photoSlice";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hook/useResetComponentMessage";

import Message from "../../Components/Message";
import { Link } from "react-router-dom";
import PhotoItem from "../../Components/PhotoItem";

import { AiOutlineLoading } from "react-icons/ai";
import LikeContainer from "../../Components/LikeContainer";

export default function Photo() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const [commentText, setComment] = useState("");

  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const photoComment = {
      comment: commentText,
      id: photo._id,
    };
    dispatch(comment(photoComment));
    setComment("");
    resetMessage();
  };

  useEffect(() => {
    dispatch(getPhotoId(id));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container-loading">
        <AiOutlineLoading className="loading-profile" />
      </div>
    );
  }
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira o seu comentáio..."
                onChange={(e) => setComment(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                  <Link to={`/users/${comment.userId}`}>
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  </Link>
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
