import React, { useEffect } from "react";
import "./LikeContainer.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function LikeContainer({ photo, user, handleLike }) {
  useEffect(()=>{
    // console.log(user)
  }, [user])
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} Like(s)</p>
        </>
      )}
    </div>
  );
}
