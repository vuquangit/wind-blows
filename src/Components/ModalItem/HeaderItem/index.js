import React from "react";
import Owner from "./Owner";

function HeaderItem({ owner }) {
  //  Compare id login and id owner
  const isFollowing = true;

  return (
    <div className="modal-item__header">
      <Owner {...owner} />
      {isFollowing && (
        <div className="follow">
          <span>•</span>
          <button>Following</button>
        </div>
      )}
    </div>
  );
}

export default HeaderItem;
