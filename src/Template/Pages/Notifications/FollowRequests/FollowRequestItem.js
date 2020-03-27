import React, { useState } from "react";
import AvatarUser from "Components/AvatarUser";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { get } from "lodash";
import { useSelector, useDispatch } from "react-redux";

import axios from "utils/axiosConfig";
import FollowStatus from "Containers/FollowStatus";
import { decreaseFollowRequest } from "Redux/Notifications/notification.action";

const FollowRequestItem = ({
  id: viewerId = "",
  username = "",
  fullName = "",
  isVerified = false,
  profilePictureUrl = "",
  profilePicturePublicId = ""
}) => {
  const dispatch = useDispatch();
  const ownerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );

  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isResponded, setIsResponded] = useState(false);
  const [userData, setUserData] = useState({});
  const source = axios.CancelToken.source();

  const fetchFollowRequest = async endpoint => {
    try {
      endpoint === "approve"
        ? setIsLoadingConfirm(true)
        : setIsLoadingDelete(true);

      const res = await axios({
        method: "post",
        url: `/follow-requests/${endpoint}`,
        data: {
          viewerId: viewerId,
          ownerId: ownerId
        },
        headers: {
          "Content-Type": "application/json"
        },
        cancelToken: source.token
      }).catch(err => {
        console.log("error request", err);
      });

      // console.log("request reposne: ", res);

      endpoint === "approve"
        ? setIsLoadingConfirm(false)
        : setIsLoadingDelete(false);

      setIsResponded(true);
      if (res && res.data)
        setUserData(prevState => ({ ...prevState, ...res.data }));

      await dispatch(decreaseFollowRequest());
    } catch (error) {
      endpoint === "approve"
        ? setIsLoadingConfirm(false)
        : setIsLoadingDelete(false);
    }
  };

  const handleConfirmFollow = () => {
    fetchFollowRequest("approve");
  };

  const handleDeleteFollow = () => {
    fetchFollowRequest("deny");
  };

  return (
    <div className="follow-request__content">
      <Link
        to={`/${username}/`}
        title={username}
        className="follow-request__content--avatar"
      >
        <AvatarUser
          profilePicturePublicId={profilePicturePublicId}
          profilePictureUrl={profilePictureUrl}
          size={32}
        />
      </Link>
      <div className="follow-request__content--description">
        <Link to={`/${username}/`} title={username} className="username">
          {username}
        </Link>
        <span className="full-name">{fullName}</span>
      </div>
      <div className="follow-request__content--action">
        {!isResponded ? (
          <>
            <Button
              onClick={handleConfirmFollow}
              loading={isLoadingConfirm}
              disabled={!isLoadingConfirm && isLoadingDelete}
              type="primary"
              className="btn-action"
            >
              Confirm
            </Button>
            <Button
              onClick={handleDeleteFollow}
              loading={isLoadingDelete}
              disabled={!isLoadingDelete && isLoadingConfirm}
              type="danger"
              className="btn-action"
            >
              Delete
            </Button>
          </>
        ) : (
          <FollowStatus
            user={userData.user || {}}
            viewerId={ownerId}
            relationship={userData.relationship || {}}
          />
        )}
      </div>
    </div>
  );
};

export default FollowRequestItem;
