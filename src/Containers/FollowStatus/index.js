import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { withRouter } from "react-router";
import { get, isEqual } from "lodash";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import axios from "utils/axiosConfig";
import AvatarUser from "Components/AvatarUser";
import { stopPropagation } from "utils/stopPropagation";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";
import "./followStatus.scss";

const FollowStatus = ({
  user = {},
  viewerId = "",
  relationship = { followedByViewer: { state: "" } },
  textFollowing = "",
  classNamesBtn = "",
  history = {},
  match = {}
}) => {
  const dispatch = useDispatch();

  const FOLLOW = "Follow";
  const FOLLOWING = "Following";
  const REQUESTED = "Requested";
  const FOLLOW_STATUS_FOLLOWING = "FOLLOW_STATUS_FOLLOWING";
  const FOLLOW_STATUS_PRIVATE_REQUESTED = "FOLLOW_STATUS_PRIVATE_REQUESTED";
  const keyMessage = "keyMessage";

  const {
    id: ownerId = "",
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

  const followedByViewer = get(relationship, "followedByViewer.state", "");
  const followStatus = isEqual(followedByViewer, FOLLOW_STATUS_FOLLOWING)
    ? FOLLOWING
    : isEqual(followedByViewer, FOLLOW_STATUS_PRIVATE_REQUESTED)
    ? REQUESTED
    : FOLLOW;
  useEffect(() => {
    setState(prevState => ({ ...prevState, followStatus }));
  }, [followStatus]);

  const fetchFollows = async (endpoint = "") => {
    try {
      message.loading({ content: "Please wait...", key: keyMessage });
      setState(prevState => ({ ...prevState, isLoading: true }));

      const response = await axios({
        method: "POST",
        url: endpoint,
        data: {
          ownerId: ownerId,
          viewerId: viewerId
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });

      // console.log("reponse follow:", endpoint, response);

      handleCancelModal();

      // if in personal page: descrease follower, check private
      if (
        isPrivate &&
        isEqual(username, get(match, "params.username")) &&
        endpoint === "/follows/unfollow"
      ) {
        const tokenUser = get(
          JSON.parse(localStorage.getItem("state") || {}),
          "profile.data.tokens.token",
          ""
        );

        await dispatch(
          requestPersonalInfo({
            data: { username, viewerId },
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: `Bearer ${tokenUser}`
            }
          })
        );
      } else {
        await setState(prevState => ({
          ...prevState,
          status: response.status,
          data: response.data,
          error: null,
          message: null,
          isLoading: false,
          followStatus:
            endpoint === "/follows/add"
              ? FOLLOWING
              : endpoint === "/follow-requests/add"
              ? REQUESTED
              : FOLLOW
        }));
      }
    } catch (error) {
      if (error.response)
        setState(prevState => ({
          ...prevState,
          status: error.response.status,
          error: error || null,
          isLoading: false,
          message: error.response ? error.response.data.message || null : null
        }));

      message.error({ content: state.message, key: keyMessage });
    }
  };

  // Modal unfollow
  const [visibleModal, setVisibleModal] = useState(false);
  const handleFollows = e => {
    stopPropagation(e);
    state.followStatus === FOLLOWING || state.followStatus === REQUESTED
      ? setVisibleModal(true)
      : toggleFetchFollows();
  };
  const handleCancelModal = e => {
    stopPropagation(e);
    setVisibleModal(false);
  };

  const toggleFetchFollows = e => {
    stopPropagation(e);
    state.followStatus === FOLLOW
      ? isPrivate
        ? fetchFollows("/follow-requests/add")
        : fetchFollows("/follows/add")
      : isPrivate && state.followStatus === REQUESTED
      ? fetchFollows("/follow-requests/unfollow")
      : fetchFollows("/follows/unfollow");
  };

  const followBtnClass = classNames(
    "follow-status__btn",
    { "follow-status__btn-follow": state.followStatus === FOLLOW },
    { "follow-status__btn-following": state.followStatus === FOLLOWING },
    classNamesBtn
  );

  const requestLogin = () => {
    Modal.confirm({
      title: "The Wind Blows",
      content: "Please log in to continue...",
      okText: "Login",
      cancelText: "Cancel",
      onOk() {
        history.push("/accounts/login");
      }
    });
  };

  return (
    <div className="follow-status">
      <button
        className={followBtnClass}
        onClick={viewerId ? handleFollows : requestLogin}
      >
        {state.followStatus === FOLLOWING && textFollowing
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
                    username ? "@" + username : fullName
                  } again.`
                : `Unfollow ${username ? "@" + username : fullName}`}
            </div>
          </div>
          <button
            className="item__btn item__unfollow"
            onClick={toggleFetchFollows}
          >
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
