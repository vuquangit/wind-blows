import React from "react";
import { Link } from "react-router-dom";
import SuggestionItem from "./SuggestionItem";

const SuggestionFollow = () => {
  const userIds = ["1332334441", "23676821149", "5338274728"];

  return (
    <div className="suggestion">
      <div className="suggestion__header">
        <div className="suggestion__header--description">
          Suggestions For You
        </div>
        <Link to="explore/people" className="suggestion__header--all">
          See All
        </Link>
      </div>
      <div className="suggestion__list">
        <div>
          {userIds.map((item, idx) => (
            <SuggestionItem id={item} key={item || idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionFollow;
