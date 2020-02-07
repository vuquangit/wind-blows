import React from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

const Follows = ({ match = {} }) => {
  const { counts = {} } = useSelector(
    (state = {}) => state.personalProfile.data.user
  );
  const { followedBy = 0, follows = 0, media = 0 } = counts;
  const username = get(match, "params.username");

  return (
    <div className="personal__profile--follow">
      <div className="follow__item">
        <span>
          <span className="follow__item--number">
            {`${numeral(media).format("0.[00]a")} `}
          </span>
          posts
        </span>
      </div>
      <div className="follow__item">
        <Link to={`/${username}/followers`}>
          <span className="follow__item--number">
            {`${numeral(followedBy).format("0.[00]a")} `}
          </span>
          followers
        </Link>
      </div>
      <div className="follow__item">
        <Link to={`/${username}/following`}>
          <span className="follow__item--number">
            {`${numeral(follows).format("0.[00]a")} `}
          </span>
          following
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Follows);
