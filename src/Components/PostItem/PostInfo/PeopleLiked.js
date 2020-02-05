import React from "react";
import numeral from "numeral";

const InfoLiked = ({ numLikes = 0 }) => {
  return (
    <section className="PI__info--liked">
      {numLikes > 0 && (
        <div className="liked__number">
          {`${numeral(numLikes).format("0,0")}`} people liked
        </div>
      )}
    </section>
  );
};

export default InfoLiked;
