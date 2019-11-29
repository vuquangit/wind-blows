import React from "react";
import Owner from "../Owner";

function HeaderItem({ owner }) {
  //  Compare id login and id owner
  const isFollowing = true;

  return (
    <div className="modal-item__header">
      <div className="modal-item__header--content">
        <Owner {...owner} isComment={false} />
        {isFollowing && (
          <div className="follow">
            <span>•</span>
            <button>Following</button>
          </div>
        )}
      </div>
      <div className="modal-item__header--option">
        <span>...</span>
      </div>
    </div>
  );
}

export default HeaderItem;
