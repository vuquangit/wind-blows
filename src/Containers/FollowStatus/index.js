import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import classNames from "classnames";
import { withRouter } from "react-router";
import { get } from "lodash";

import AvatarUser from "Components/AvatarUser";
import "./followStatus.scss";

const FollowStatus = ({
  user = {},
  viewerId = "",
  relationship = { followedByViewer: { state: "" } },
  textFollowing = "",
  classNamesBtn = ""
}) => {
  const {
    id: userId = "",
    username = "",
    fullName = "",
    profilePictureUrl = "",
    profilePicturePublicId = "",
    isPrivate = false
  } = user;

  const [state, setState] = useState({
    status: null,
    data: "",
    error: null,
    message: null,
    isLoading: false,
    followStatus: ""
  });

  const followStatus =
    get(relationship, "followedByViewer.state") ||
    "FOLLOW_NOT_STATUS_FOLLOWING";

  useEffect(() => {
    const relationshipStatus =
      followStatus === "FOLLOW_STATUS_FOLLOWING" ? "Following" : "Follow";

    setState(prevState => ({ ...prevState, followStatus: relationshipStatus }));
  }, [followStatus, textFollowing]);

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  const fetchFollows = async (endpoint = "") => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));

      const response = await axios({
        method: "POST",
        url: `${SERVER_BASE_URL}/follows/${endpoint}`,
        data: {
          userId: userId,
          viewerId: viewerId
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });

      setState(prevState => ({
        ...prevState,
        status: response.status,
        data: response.data,
        error: null,
        message: null,
        followStatus: endpoint === "add" ? "Following" : "Follow"
      }));
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        status: error.response.status,
        error: error || null,
        message: error.response ? error.response.data.message || null : null
      }));
    } finally {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const keyMessage = "updatable";
  useEffect(() => {
    if (state.isLoading)
      message.loading({ content: "Please wait...", key: keyMessage });
    if (state.status === 200 || state.status === 201) {
      // Update viewer profile
      // ...

      message.success({ content: "You adready following", key: keyMessage });
      handleCancelModal();
    } else if (state.error)
      message.error({ content: state.message, key: keyMessage });
  }, [state]);

  // Modal unfollow
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = e => {
    // A cross browser compatible way to stop propagation of the event:
    // if (!e) var e = window.event;
    // e.cancelBubble = true; //IE
    // // if (e.stopPropagation) e.stopPropagation(); //FF
    // e.stopPropagation();
    var ev = !e ? window.event : e; //IE:Moz
    ev.stopPropagation ? ev.stopPropagation() : (ev.cancelBubble = true);

    state.followStatus === "Following"
      ? setVisibleModal(true)
      : handleFollows();
  };
  const handleCancelModal = () => setVisibleModal(false);

  const handleFollows = () =>
    state.followStatus === "Follow"
      ? fetchFollows("add")
      : fetchFollows("unfollow");

  const followBtnClass = classNames(
    "follow-status__btn",
    { "follow-status__btn-follow": state.followStatus === "Follow" },
    { "follow-status__btn-following": state.followStatus === "Following" },
    classNamesBtn
  );

  return (
    <div className="follow-status">
      <button className={followBtnClass} onClick={showModal}>
        {state.followStatus === "Following" && textFollowing
          ? textFollowing
          : state.followStatus}
      </button>
      <Modal
        title={null}
        visible={visibleModal}
        onCancel={handleCancelModal}
        className="follow-status__modal"
        footer={null}
        closable={false}
        centered
      >
        <div className="follow-status__modal--items">
          <div className="item__avatar">
            <div className="item__avatar--wrapper">
              <AvatarUser
                profilePicturePublicId={profilePicturePublicId}
                profilePictureUrl={profilePictureUrl}
                size={96}
              />
            </div>
          </div>
          <div className="item__description">
            <div className="item__description--wrapper">
              {isPrivate
                ? `If you change your mind, you'll have to request to follow ${
                    username ? "@" + username : fullName || userId
                  } again.`
                : `Unfollow ${username ? "@" + username : fullName || userId}`}
            </div>
          </div>
          <button className="item__btn item__unfollow" onClick={handleFollows}>
            Unfollow
          </button>
          <button className="item__btn" onClick={handleCancelModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(FollowStatus);
