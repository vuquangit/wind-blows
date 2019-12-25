import React from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";

const Follows = ({ follwedBy = 59562432, follows = 3435, media = 94268 }) => {
  return (
    <div className="personal__header--follow">
      <div className="follow__item">
        <span>
          <span className="follow__item--number">
            {`${numeral(follows).format("0.[00]a")} `}
          </span>
          posts
        </span>
      </div>
      <div className="follow__item">
        <Link to="/chang.gio/followers">
          <span className="follow__item--number">
            {`${numeral(follwedBy).format("0.[00]a")} `}
          </span>
          followers
        </Link>
      </div>
      <div className="follow__item">
        <Link to="/chang.gio/following">
          <span className="follow__item--number">
            {`${numeral(media).format("0.[00]a")} `}
          </span>
          following
        </Link>
      </div>
    </div>
  );
};

export default Follows;
