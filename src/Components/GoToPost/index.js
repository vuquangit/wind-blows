import React from "react";
import Post from "Components/Post";
import "./goToPost.scss";
import postData from "./mock.json";

const GoToPost = () => {
  return (
    <div className="GTP">
      <div className="GTP__WPI">
        <Post {...postData.post} isHomePage={false} />
      </div>
    </div>
  );
};

export default GoToPost;
