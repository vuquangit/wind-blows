import React, { useState } from "react";
import { Button } from "antd";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import emoijImage from "assets/images/emoij__4Z_KKMxKl4H.png";
import "./emoij.scss";

const Emoij = ({ onSelect = () => {} }) => {
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
          style={{ position: "absolute", top: "60px", right: "5px", zIndex: 2 }}
          onSelect={onSelect}
        />
      </>
    );
  }

  return (
    <>
      {emojiPicker}
      <Button className="emoij" onClick={triggerPicker} title="Insert emoij">
        <div
          className="emoij-icon"
          style={{ backgroundImage: `url(${emoijImage})` }}
        />
      </Button>
    </>
  );
};

export default Emoij;
