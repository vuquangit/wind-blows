import React from "react";
import numeral from "numeral";

const InfoLiked = ({ numPreviewLikes = 0 }) => {
  return (
    <section className="PI__info--liked">
      {numPreviewLikes && (
        <div className="liked__number">
          {`${numeral(numPreviewLikes).format("0,0")}`} people liked
        </div>
      )}
    </section>
  );
};

export default InfoLiked;
