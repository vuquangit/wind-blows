import React, { useState } from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import { get } from "lodash";

import AvatarUser from "Components/AvatarUser";
import ModalChangePhoto from "./ModalChangePhoto";
import "./profilePhoto.scss";

const ProfilePhoto = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const handleCancelModal = () => {
    setVisibleModal(false);
  };

  const {
    labelCol = { sm: { span: 6 } },
    wrapperCol = { sm: { span: 18 } },
    changePhoto = false
  } = props;

  const {
    profilePictureUrl = "",
    username = "",
    profilePicturePublicId = ""
  } = useSelector(state => get(state, "profile.data.user"));

  return (
    <div className="profile-photo">
      <Row type="flex" align="middle">
        <Col {...labelCol.sm}>
          <div className="profile-photo__avatar">
            <AvatarUser
              profilePicturePublicId={profilePicturePublicId}
              profilePictureUrl={profilePictureUrl}
              size={40}
            />
          </div>
        </Col>
        <Col {...wrapperCol.sm}>
          <div className="profile-photo__change">
            <div>
              <h1>{username}</h1>
              {changePhoto && (
                <button onClick={showModal}>Change Profile Photo</button>
              )}
            </div>
          </div>
        </Col>
      </Row>
      {changePhoto && (
        <ModalChangePhoto
          visibleModal={visibleModal}
          handleCancelModal={handleCancelModal}
        />
      )}
    </div>
  );
};

export default ProfilePhoto;
