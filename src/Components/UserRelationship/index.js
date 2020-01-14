import React, { useState } from "react";
import { Avatar, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import "./userRelationship.scss";
import { withRouter } from "react-router";
import classNames from "classnames";

const UserRelationship = ({ user = {}, relationship = {}, match }) => {
  const {
    id = "",
    profilePictureUrl = "",
    username = "",
    suggestionDescription = "",
    fullName = ""
  } = user;
  const subDescription = match.path === "/" ? suggestionDescription : fullName;
  const followStatus =
    relationship.followedByViewer.state === "FOLLOW_STATUS_FOLLOWING"
      ? "Following"
      : "Follow";

  // classnames
  const followStatusClass = classNames(
    "SGI__follow--btn-normal",
    {
      "SGI__follow--btn-homepage": match.path === "/"
    },
    {
      "SGI__follow--btn-follow":
        match.path !== "/" &&
        relationship.followedByViewer.state !== "FOLLOW_STATUS_FOLLOWING"
    }
  );

  // Modal unfollow
  // Modal
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => setVisibleModal(true);
  const handleCancel = e => setVisibleModal(false);
  const handleUnfollow = () => {};

  return (
    <div className="SGI">
      <div className="SGI__avatar">
        <Link to={`/${username || id}/`} title={username || id}>
          <Avatar src={profilePictureUrl} />
        </Link>
      </div>
      <div className="SGI__info">
        <div className="SGI__info--username">
          <Link to={`/${username || id}/`} title={username || id}>
            {username || id}
          </Link>
        </div>
        <div className="SGI__info--description">
          <div className="DCR">{subDescription}</div>
        </div>
      </div>
      <div className="SGI__follow">
        <Button className={followStatusClass} onClick={showModal}>
          {followStatus}
        </Button>

        <Modal
          title={`Unfollow ${username || fullName || id}`}
          visible={visibleModal}
          onCancel={handleCancel}
          className="edit-account__modal"
          footer={null}
          closable={false}
        >
          <div className="edit-account__modal--items">
            <button className="edit-item" onClick={handleUnfollow}>
              Unfollow
            </button>
            <button className="edit-item" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default withRouter(UserRelationship);
