import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEqual, get } from "lodash";
import classNames from "classnames";
import { message } from "antd";

import axios from "utils/axiosConfig";
import PostHeader from "./Header";
import PostCation from "./Caption";
import PostUploadImage from "./UploadImage";
import PostLocation from "./Location";
import PostOption from "./Option";
import PostCommentsPrivate from "./CommentsPrivate";
import "./scss/postStatus.scss";

const PostStatus = ({ handleAddNewPost = () => {} }) => {
  const [isStatusFocus, setIsStatusFocus] = useState(false);
  const handleIsStatusFocused = () => {
    setIsStatusFocus(true);
  };
  const handleCancelStatusFocus = () => {
    setIsStatusFocus(false);
  };

  // advance
  const [isShowOption, setIsShowOption] = useState(false);
  const handleToggleOption = () => setIsShowOption(!isShowOption);

  // post data
  const ownerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
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
  const clearStatus = async ({ posted = false }) => {
    if (!posted && status && status.sidecarChildren.length > 0) {
      const publicIds = status.sidecarChildren.map(item => item.public_id);

      try {
        const res = await axios({
          method: "POST",
          url: "/images/deletes",
          data: {
            publicIds
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        });

        console.log("clear all images:", res);
      } catch (err) {
        message.error("Error: " + err, 3);
        console.log(err);
      }
    }

    setStatus(defaultStatus);
  };
  // upload image
  const handleAddDataImages = data => {
    if (data) {
      setStatus(prevState => ({
        ...prevState,
        sidecarChildren: [...prevState.sidecarChildren, data]
      }));
    }
  };
  const handleUpdateImages = data => {
    setStatus(prevState => ({
      ...prevState,
      sidecarChildren:
        prevState.sidecarChildren && prevState.sidecarChildren.length > 0
          ? prevState.sidecarChildren.map(item => {
              if (item.uuidFile === data.uuidFile) return { ...item, ...data };
              else return item;
            })
          : []
    }));
  };
  const handleRemoveImage = uuidFile => {
    setStatus(prevState => ({
      ...prevState,
      sidecarChildren:
        prevState.sidecarChildren && prevState.sidecarChildren.length > 0
          ? prevState.sidecarChildren.filter(item => item.uuidFile !== uuidFile)
          : []
    }));
  };

  // style
  const classFocus = classNames("post-status__external", {
    "status-focused": isStatusFocus
  });

  return (
    <div className="post-status">
      {isStatusFocus && (
        <div
          className={classFocus}
          role="presentation"
          onClick={handleCancelStatusFocus}
        />
      )}
      <div className="post-status__content" onClick={handleIsStatusFocused}>
        <PostHeader isClearStatus={isClearStatus} clearStatus={clearStatus} />
        <PostCation caption={status.caption} setStatus={setStatus} />
        <PostUploadImage
          sidecarChildren={status.sidecarChildren}
          handleAddDataImages={handleAddDataImages}
          handleUpdateImages={handleUpdateImages}
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
          handleCancelStatusFocus={handleCancelStatusFocus}
          handleAddNewPost={handleAddNewPost}
        />
      </div>
    </div>
  );
};

export default PostStatus;
