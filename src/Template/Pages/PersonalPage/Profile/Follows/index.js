import React from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Follows = () => {
  const { counts = {} } = useSelector(
    (state = {}) => state.personalProfile.data
  );

  const { follwedBy = 0, follows = 0, media = 0 } = counts;

  return (
    <div className="personal__header--follow">
      <div className="follow__item">
        <span>
          <span className="follow__item--number">
            {`${numeral(media).format("0.[00]a")} `}
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
            {`${numeral(follows).format("0.[00]a")} `}
          </span>
          following
        </Link>
      </div>
    </div>
  );
};

export default Follows;
