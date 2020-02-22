import React from "react";
import PostSubmit from "./PostSubmit";
import TogglePost from "./TogglePost";

const PostOption = ({
  status = {},
  clearStatus,
  isShowOption,
  handleToggleOption,
  handleCancelStatusFocus
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
      />
    </div>
  );
};

export default PostOption;
