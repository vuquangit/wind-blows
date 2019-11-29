import React from "react";
import numeral from "numeral";

function Liked({ numLikes }) {
  return (
    <div className="liked">
      {numLikes && (
        <div className="liked__number">
          {`${numeral(numLikes).format("0,0")}`} people liked
        </div>
      )}
    </div>
  );
}

export default Liked;
