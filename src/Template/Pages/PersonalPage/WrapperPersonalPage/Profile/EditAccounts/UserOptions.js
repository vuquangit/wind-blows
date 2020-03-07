import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { get, isEqual } from "lodash";
import { withRouter } from "react-router-dom";

import axios from "utils/axiosConfig";
import FollowStatus from "Containers/FollowStatus";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";

const UserOptions = ({ match = {} }) => {
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
    isBlocked && handleDissmis();
  };

  //
  const [isBlock, setIsBlock] = useState(false);
  const handleBlockClick = () => {
    setIsBlock(true);
  };
  const [isBlocking, setIsBlocking] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlock = async () => {
    try {
      setIsBlocking(true);

      const response = await axios({
        method: "post",
        url: "/user/blocks/block",
        data: {
          ownerId,
          viewerId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      setIsBlocking(false);
      setIsBlocked(true);
      message.success("Blocked user", 3);
    } catch (error) {
      setIsBlocking(false);
      console.log(error);
    }
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
    <div className="user-options">
      <div className="user-options__follow">
        <FollowStatus
          user={userProfile}
          viewerId={viewerId}
          relationship={relationship}
        />
      </div>
      <div className="user-options__option">
        <Button onClick={handleShowModal} style={{ border: "0" }}>
          <span className="sprite-icon__glyphs user-options__option--btn" />
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
                    ? `You can unblock them anytime from their profile.`
                    : `They won't be able to find your profile, posts on The Wind Blows. The Wind Blows won't let them know you blocked them.`}
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
              ) : (
                <Button className="edit-item" onClick={handleDissmis}>
                  Dissmis
                </Button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default withRouter(UserOptions);
