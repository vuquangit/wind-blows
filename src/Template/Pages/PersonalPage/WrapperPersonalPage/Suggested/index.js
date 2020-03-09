import React from "react";
import { Link } from "react-router-dom";

import Suggestion from "Template/Pages/Explore/Suggestion/Suggested";
import "./suggested.scss";

const Suggested = () => {
  return (
    <div className="personal-suggested">
      <div className="personal-suggested__header">
        <span className="personal-suggested__header--title">Suggested</span>
        <Link
          to="/explore/people/suggested/"
          className="personal-suggested__header--direct"
        >
          See All
        </Link>
      </div>
      <div className="personal-suggested__content">
        <Suggestion isSlider />
      </div>
    </div>
  );
};

export default Suggested;
