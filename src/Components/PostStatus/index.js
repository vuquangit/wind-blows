import React, { useState } from "react";
import "./postStatus.scss";
import PostHeader from "./PostHeader";
import PostCation from "./PostCaption";
// import PostUploadImage from "./PostUploadImage";
import PostUploadImage from "./PostUploadImage";
import PostLocation from "./PostLocation";
import PostOption from "./PostOption";
import PostCommentsPrivate from "./PostCommentsPrivate";

const PostStatus = () => {
  const [isShowOption, setIsShowOption] = useState(false);
  const handleToggleOption = () => setIsShowOption(!isShowOption);

  return (
    <div className="post-status">
      <div className="post-status__content">
        <PostHeader />
        <PostCation />
        <PostUploadImage />
        {isShowOption && (
          <div className="post-status__content--wrapper-option">
            <PostLocation />
            <PostCommentsPrivate />
          </div>
        )}
        <PostOption
          isShowOption={isShowOption}
          handleToggleOption={handleToggleOption}
        />
      </div>
    </div>
  );
};

export default PostStatus;
