import React from "react";
import { Modal, Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";

import FollowStatus from "Containers/FollowStatus";

const ModalOption = ({
  visibleModal,
  handleCancelModal,
  postId,
  relationship,
  owner
}) => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );

  const idMyPost = isEqual(viewerId, get(owner, "id"));

  return (
    <Modal
      title={null}
      visible={visibleModal}
      onCancel={handleCancelModal}
      className="PI__PO--modal"
      footer={null}
      closable={false}
      centered
    >
      <div className="modal__content">
        {idMyPost ? (
          <>
            <Button className="modal__content--btn btn-red">Delete</Button>
            <Button className="modal__content--btn btn-red">Report</Button>
          </>
        ) : (
          <FollowStatus
            user={owner}
            viewerId={viewerId}
            relationship={relationship}
            textFollowing="Unfollow"
            classNamesBtn="modal__content--btn btn-red"
          />
        )}
        <Button className="modal__content--btn">
          <Link to={`/p/${postId}`}>Go to post</Link>
        </Button>
        <Button className="modal__content--btn">Share</Button>
        <Button className="modal__content--btn">Copy Link</Button>
        <Button className="modal__content--btn" onClick={handleCancelModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalOption;
