import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";

import FollowStatus from "Containers/FollowStatus";

const UserOptions = () => {
  const { user: userProfile = {}, relationship = {} } = useSelector(
    (state = {}) => state.personalProfile.data
  );

  // ID is id signed
  const { id: viewerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  // Modal user option
  const [visibleModal_UserOption, setVisibleModal_UserOption] = useState(false);
  const showModal_UserOption = () => setVisibleModal_UserOption(true);
  const handleCancel_UserOption = () => setVisibleModal_UserOption(false);

  return (
    <div className="user-options">
      <div className="user-options__follow">
        <FollowStatus
          user={userProfile}
          viewerId={viewerId}
          relationship={relationship}
        />
      </div>
      <div className="user-options__option">
        <Button onClick={showModal_UserOption}>
          <span className="sprite-icon__glyphs user-options__option--btn" />
        </Button>
        <Modal
          title={null}
          visible={visibleModal_UserOption}
          onCancel={handleCancel_UserOption}
          className="edit-account__modal"
          footer={null}
          closable={false}
          centered
        >
          <div className="edit-account__modal--items">
            <button className="edit-item">Block this user</button>
            <button className="edit-item" onClick={handleCancel_UserOption}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserOptions;
