import React from "react";
import PostSubmit from "./PostSubmit";
import TogglePost from "./TogglePost";

const PostOption = ({ isShowOption, handleToggleOption }) => {
  return (
    <div className="post-status__content--option">
      <TogglePost
        isShowOption={isShowOption}
        handleToggleOption={handleToggleOption}
      />
      <PostSubmit />
    </div>
  );
};

export default PostOption;
