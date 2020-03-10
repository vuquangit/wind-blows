import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { get, isEqual } from "lodash";
import { withRouter } from "react-router-dom";

import axios from "utils/axiosConfig";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";

const ViewerOptions = ({ match = {} }) => {
  const dispatch = useDispatch();
  const { user: userProfile = {}, relationship = {} } = useSelector(
    (state = {}) => get(state, "personalProfile.data", {}),
    isEqual()
  );
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const { id: ownerId = "", username: onwerUsername = "" } = userProfile;

  // Modal user option
  const [visibleModal_UserOption, setVisibleModal_UserOption] = useState(false);
  const handleShowModal = () => setVisibleModal_UserOption(true);
  const handleCancelModal = () => {
    setVisibleModal_UserOption(false);
    setIsBlock(false);
    isBlock && isBlocked && handleDissmis();
  };

  // block
  const [isBlock, setIsBlock] = useState(false);
  const handleBlockClick = () => {
    setIsBlock(true);
  };
  const [isBlocking, setIsBlocking] = useState(false);
  const [isBlocked, setIsBlocked] = useState(
    isEqual(
      get(relationship, "blockedByViewer.state", ""),
      "BLOCK_STATUS_BLOCKED"
    )
  );

  const fetchBlockUser = async (endpoint = "") => {
    try {
      setIsBlocking(true);

      await axios({
        method: "post",
        url: endpoint,
        data: {
          ownerId,
          viewerId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (endpoint === "/user/blocks/block") {
        setIsBlocking(false);
        setIsBlocked(true);
        message.success("Blocked this user", 3);
      } else if (endpoint === "/user/blocks/unblock") {
        message.success("Unblock this user", 3);
      }
    } catch (error) {
      setIsBlocking(false);
      console.log(error);
    }
  };

  const handleBlock = () => {
    fetchBlockUser("/user/blocks/block");
  };

  const handleUnblock = async () => {
    await fetchBlockUser("/user/blocks/unblock");
    handleDissmis();
  };

  const handleDissmis = async () => {
    const username = get(match, "params.username", "");

    if (isEqual(username, onwerUsername))
      await dispatch(
        requestPersonalInfo({
          data: { username, viewerId },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
      );
  };

  return (
    <div className="profile-viewer-options">
      <Button onClick={handleShowModal} className="profile-viewer-options__btn">
        <span className="sprite-icon__glyphs profile-viewer-options__btn--icon" />
      </Button>
      <Modal
        title={null}
        visible={visibleModal_UserOption}
        onCancel={handleCancelModal}
        className="user-option-modal"
        footer={null}
        closable={false}
        centered
        destroyOnClose
      >
        <div className="user-option-modal__content">
          {isBlock && (
            <div className="user-option-modal__content--header">
              <h3 className="title">
                {isBlocked
                  ? `Blocked ${onwerUsername}`
                  : `Block ${onwerUsername}?`}
              </h3>
              <div className="description">
                {isBlocked
                  ? "You can unblock them anytime from their profile."
                  : "They won't be able to find your profile, posts on The Wind Blows. The Wind Blows won't let them know you blocked them."}
              </div>
            </div>
          )}
          <div className="user-option-modal__content--options">
            {!isBlocked ? (
              <>
                {isBlock ? (
                  <Button
                    className="edit-item primary"
                    onClick={handleBlock}
                    loading={isBlocking}
                  >
                    Block
                  </Button>
                ) : (
                  <Button
                    className="edit-item danger"
                    onClick={handleBlockClick}
                  >
                    Block this user
                  </Button>
                )}
                <Button
                  className="edit-item"
                  onClick={handleCancelModal}
                  disabled={isBlocking}
                >
                  Cancel
                </Button>
              </>
            ) : isBlock ? (
              <Button className="edit-item" onClick={handleDissmis}>
                Dissmis
              </Button>
            ) : (
              <>
                <Button
                  className="edit-item primary"
                  onClick={handleUnblock}
                  loading={isBlocking}
                >
                  Unblock this user
                </Button>
                <Button
                  className="edit-item"
                  onClick={handleCancelModal}
                  disabled={isBlocking}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(ViewerOptions);
