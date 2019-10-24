import React from "react";
import ConvertNumberFormat from '../../../../Components/ConvertNumberFormat'

const Follows = () => {
  return (
    <div className="personal__header--follow">
      <div className="follow__item">
        <span>
          <span className="follow__item--number"><ConvertNumberFormat value= {999} /></span> posts
        </span>
      </div>
      <div className="follow__item">
        <a href="/chang.gio/followers">
          <span className="follow__item--number">456</span> followers
        </a>
      </div>
      <div className="follow__item">
        <a href="/chang.gio/following">
          <span className="follow__item--number">987</span> following
        </a>
      </div>
    </div>
  );
};

export default Follows;
