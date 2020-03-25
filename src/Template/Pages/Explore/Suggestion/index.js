import React from "react";
import { Link } from "react-router-dom";

import Suggested from "./Suggested";

const SuggestionFollow = () => {
  return (
    <div className="suggestion">
      <div className="suggestion__header">
        <div className="suggestion__header--description">
          Suggestions For You
        </div>
        <Link
          to="/explore/people/suggested/"
          className="suggestion__header--all"
        >
          See All
        </Link>
      </div>
      <div className="suggestion__list">
        <Suggested isHomepage />
      </div>
    </div>
  );
};

export default SuggestionFollow;
