import React from "react";
import { Avatar } from "antd";
import mockItem from "./mockSuggestionItem";
import { Link } from "react-router-dom";

const SuggestionItem = () => {
  const { user = {} } = mockItem;
  const { profilePictureUrl, username, suggestionDescription } = user;

  return (
    <div className="SGI">
      <div className="SGI__avatar">
        <Avatar src={profilePictureUrl} />
      </div>
      <div className="SGI__info">
        <div className="SGI__info--username">
          <Link to={`/${username}/`} title={username}>
            {username}
          </Link>
        </div>
        <div className="SGI__info--description">
          <div className="DCR">
            {/* description */}
            {suggestionDescription}
          </div>
        </div>
      </div>
      <div className="SGI__follow">
        <button className="SGI__follow--btn">Follow</button>
      </div>
    </div>
  );
};

export default SuggestionItem;
