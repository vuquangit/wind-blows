import React from "react";
import Post from "Components/Post";
import "./goToPost.scss";
import postData from "./mock.json";
import BasicTemplate from "Template/BasicTemplate";

const GoToPost = () => {
  return (
    <BasicTemplate>
      <div className="GTP">
        <div className="GTP__WPI">
          <Post {...postData.post} isHomePage={false} />
        </div>
      </div>
    </BasicTemplate>
  );
};

export default GoToPost;
