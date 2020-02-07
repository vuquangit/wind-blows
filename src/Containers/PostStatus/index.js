import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

import PostHeader from "./PostHeader";
import PostCation from "./PostCaption";
import PostUploadImage from "./PostUploadImage";
import PostLocation from "./PostLocation";
import PostOption from "./PostOption";
import PostCommentsPrivate from "./PostCommentsPrivate";
import "./scss/postStatus.scss";

const PostStatus = () => {
  // advance
  const [isShowOption, setIsShowOption] = useState(false);
  const handleToggleOption = () => setIsShowOption(!isShowOption);

  // post data
  const { id: ownerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  const defaultStatus = {
    caption: "",
    captionIsEdited: "",
    commentsDisabled: false,
    location: { name: "" },
    ownerId: ownerId,
    sidecarChildren: []
  };

  const [status, setStatus] = useState(defaultStatus);

  // clear
  const isClearStatus = !isEqual(status, defaultStatus);
  const clearStatus = () => setStatus(defaultStatus);

  // upload image
  const handleAddImage = resImage => {
    setStatus(prevState => ({
      ...prevState,
      sidecarChildren: [...prevState.sidecarChildren, ...resImage]
    }));
  };
  const handleRemoveImage = publicIdRemove => {
    // console.log(publicIdRemove);
    const images = status.sidecarChildren || [];
    const removeItemImage = images.filter(
      item => item.public_id !== publicIdRemove
    );
    setStatus(prevState => ({
      ...prevState,
      sidecarChildren: removeItemImage
    }));
  };

  return (
    <div className="post-status">
      <div className="post-status__content">
        <PostHeader isClearStatus={isClearStatus} clearStatus={clearStatus} />
        <PostCation caption={status.caption} setStatus={setStatus} />
        <PostUploadImage
          sidecarChildren={status.sidecarChildren}
          handleAddImage={handleAddImage}
          handleRemoveImage={handleRemoveImage}
        />
        {isShowOption && (
          <div className="post-status__content--wrapper-option">
            <PostLocation
              location={status.location.name || ""}
              setStatus={setStatus}
            />
            <PostCommentsPrivate
              commentsDisabled={status.commentsDisabled}
              setStatus={setStatus}
            />
          </div>
        )}
        <PostOption
          isShowOption={isShowOption}
          handleToggleOption={handleToggleOption}
          status={status}
          clearStatus={clearStatus}
        />
      </div>
    </div>
  );
};

export default PostStatus;
