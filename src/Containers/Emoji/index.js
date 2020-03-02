import React, { useState } from "react";
import { Button } from "antd";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import emojiImage from "assets/images/emoji__4Z_KKMxKl4H.png";
import "./emoji.scss";

const Emoji = ({ onSelect = () => {}, style = {} }) => {
  // emoji
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const triggerPicker = event => {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };
  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <>
        <div className="close-picker-emoji" onClick={triggerPicker} />
        <Picker
          title="Pick your emoji…"
          emoji="point_up"
          style={{
            position: "absolute",
            top: "60px",
            right: "5px",
            zIndex: 2,
            ...style
          }}
          onSelect={onSelect}
          showPreview={false}
          showSkinTones={false}
        />
      </>
    );
  }

  return (
    <>
      {emojiPicker}
      <Button className="emoji" onClick={triggerPicker} title="Insert emoji">
        <div
          className="emoji-icon"
          style={{ backgroundImage: `url(${emojiImage})` }}
        />
      </Button>
    </>
  );
};

export default Emoji;
