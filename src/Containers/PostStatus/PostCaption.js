import React from "react";
import { Input, Avatar } from "antd";
import { useSelector } from "react-redux";

const PostCaption = ({ caption = "", setStatus }) => {
  const { profilePictureUrl = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  const handleInputChanged = e => {
    // console.log(e.target.value);
    e.persist();

    setStatus(prevState => ({ ...prevState, caption: e.target.value }));
  };

  return (
    <div className="post-status__content--caption">
      <Avatar src={profilePictureUrl} />
      <Input.TextArea
        placeholder="Caption..."
        autoSize={{ minRows: 2, maxRows: 4 }}
        allowClear
        onChange={handleInputChanged}
        value={caption}
      />
    </div>
  );
};

export default PostCaption;
