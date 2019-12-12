import React, { useState } from "react";
import { Row, Col, Avatar } from "antd";
import ModalChangePhoto from "./ModalChangePhoto";
import "./profilePhoto.scss";

const ProfilePhoto = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const handleCancelModal = e => {
    setVisibleModal(false);
  };

  const {
    labelCol = { sm: { span: 6 } },
    wrapperCol = { sm: { span: 18 } },
    changePhoto = false
  } = props;

  return (
    <div className="profile-photo">
      <Row type="flex" align="middle">
        <Col {...labelCol.sm}>
          <div className="profile-photo__avatar">
            <Avatar
              src="https://live.staticflickr.com/65535/49150573271_52eb21ac75_z.jpg"
              size={40}
            />
          </div>
        </Col>
        <Col {...wrapperCol.sm}>
          <div className="profile-photo__change">
            <div>
              <h1>chang.gio</h1>
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
