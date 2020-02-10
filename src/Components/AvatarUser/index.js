import React from "react";
import { Avatar } from "antd";
// import { Image, Transformation } from "cloudinary-react";

const AvatarUser = ({
  profilePicturePublicId = "",
  profilePictureUrl = "",
  size = 24
}) => {
  return (
    <>
      {/* Cloudinay Limit Transformation */}
      {/* {profilePicturePublicId ? (
        <Image publicId={profilePicturePublicId}>
          <Transformation width={size} height={size} radius="max" crop="fill" />
        </Image>
      ) : profilePictureUrl ? (
        <Avatar src={profilePictureUrl} size={size} />
      ) : (
        <Avatar icon="user" size={size} />
      )} */}

      {profilePictureUrl ? (
        <Avatar src={profilePictureUrl} size={size} />
      ) : (
        <Avatar icon="user" size={size} />
      )}
    </>
  );
};

export default AvatarUser;
