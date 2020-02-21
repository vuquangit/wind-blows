import React from "react";
import { Input } from "antd";
import { useSelector } from "react-redux";

import AvatarUser from "Components/AvatarUser";

const PostCaption = ({ caption = "", setStatus }) => {
  const { profilePictureUrl = "", profilePicturePublicId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  const handleInputChanged = e => {
    // console.log(e.target.value);
    e.persist();

    setStatus(prevState => ({ ...prevState, caption: e.target.value }));
  };

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
    </div>
  );
};

export default PostCaption;
