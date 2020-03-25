import React from "react";
import PostSubmit from "./PostSubmit";
import TogglePost from "./TogglePost";

const PostOption = ({
  status = {},
  clearStatus,
  isShowOption,
  handleToggleOption = () => {},
  handleCancelStatusFocus = () => {},
  handleAddNewPost = () => {}
}) => {
  return (
    <div className="post-status__content--option">
      <TogglePost
        isShowOption={isShowOption}
        handleToggleOption={handleToggleOption}
      />
      <PostSubmit
        status={status}
        clearStatus={clearStatus}
        handleCancelStatusFocus={handleCancelStatusFocus}
        handleAddNewPost={handleAddNewPost}
      />
    </div>
  );
};

export default PostOption;
