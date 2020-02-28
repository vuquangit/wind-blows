import React, { useState } from "react";
import { Input } from "antd";
import { useSelector } from "react-redux";

import AvatarUser from "Components/AvatarUser";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const PostCaption = ({ caption = "", setStatus }) => {
  const { profilePictureUrl = "", profilePicturePublicId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  const handleInputChanged = e => {
    // console.log(e.target.value);
    e.persist();
    setStatus(prevState => ({ ...prevState, caption: e.target.value }));
  };

  // emoij
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const triggerPicker = event => {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };
  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <>
        <div className="close-picker-emoij" onClick={triggerPicker} />
        <Picker
          title="Pick your emoji…"
          emoji="point_up"
          style={{ position: "absolute", top: "83px", right: "0px", zIndex: 2 }}
          className="input-emoij"
          onSelect={emoji =>
            setStatus(prevState => ({
              ...prevState,
              caption: prevState.caption + emoji.native
            }))
          }
        />
      </>
    );
  }

  return (
    <div className="post-status__content--caption">
      <AvatarUser
        profilePicturePublicId={profilePicturePublicId}
        profilePictureUrl={profilePictureUrl}
      />
      <Input.TextArea
        placeholder="Caption..."
        autoSize={{ minRows: 2, maxRows: 4 }}
        allowClear
        onChange={handleInputChanged}
        value={caption}
      />
      {emojiPicker}
      <button className="picker-emoij" onClick={triggerPicker}>
        <span role="img" aria-label="">
          🙂
        </span>
      </button>
    </div>
  );
};

export default PostCaption;
