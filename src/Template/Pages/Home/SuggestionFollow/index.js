import React from "react";
import { Link } from "react-router-dom";
import SuggestionItem from "Components/UserRelationship";
import suggestionList from "./mockSuggestion.json";

const SuggestionFollow = () => {
  // const userIds = ["1332334441", "23676821149", "5338274728"];

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
          {suggestionList.items.map((item, idx) => (
            <SuggestionItem
              key={item.user.item || idx}
              user={item.user}
              relationship={item.relationship}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionFollow;
