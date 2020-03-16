import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual } from "lodash";

import BasicTemplate from "Template/BasicTemplate";
import Profile from "./Profile";
import Follows from "./Profile/ProfileCounts";
import Pinwheel from "Components/Loaders/Pinwheel";
import Page404 from "Template/Pages/404";
import PostStatus from "Containers/PostStatus";
import TabPages from "./TabPages";
import PrivateAccount from "./PrivateAccount";
import Suggested from "./Suggested";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";
import "./scss/personalPage.scss";

const PersonalPage = ({
  match = {},
  children,
  handleAddNewPost = () => {}
}) => {
  const dispatch = useDispatch();
  const { isFetching = false, error = false } = useSelector(
    state => get(state, "personalProfile", {}),
    isEqual()
  );

  const { id: viewerId = "", username: viewerUsername = "" } = useSelector(
    state => get(state, "profile.data.user", {}),
    isEqual()
  );
  const relationship = useSelector(
    state => get(state, "personalProfile.data.relationship", ""),
    isEqual()
  );

  // fetch data username view
  const username = get(match, "params.username", "");
  const usernameBefore = useSelector(
    state => get(state, "personalProfile.data.user.username", ""),
    isEqual()
  );
  const isOwner = isEqual(viewerUsername, username);

  // fetch personal data
  useEffect(() => {
    const _requestPersonalInfo = async () => {
      await dispatch(
        requestPersonalInfo({
          data: { username, viewerId },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
      );
    };

    if (!isEqual(username, usernameBefore)) _requestPersonalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerId, username, usernameBefore]);

  const isPrivate = useSelector(state =>
    get(state, "personalProfile.data.user.isPrivate", false)
  );
  const isPrivated =
    !isOwner &&
    isPrivate &&
    !isEqual(
      get(relationship, "followedByViewer.state", ""),
      "FOLLOW_STATUS_FOLLOWING"
    );

  const isBlocked = isEqual(
    get(relationship, "blockedByViewer.state", ""),
    "BLOCK_STATUS_BLOCKED"
  );

  // toggle suggested
  const [toggleSuggested, setToggleSuggested] = useState(false);
  const handleToggleSuggested = () => {
    setToggleSuggested(!toggleSuggested);
  };

  return (
    <>
      {!error ? (
        <BasicTemplate>
          {isFetching ? (
            <div className="personal__loading">
              <Pinwheel isLoading size={128} />
            </div>
          ) : (
            <div className="personal">
              <Profile handleToggleSuggested={handleToggleSuggested} />
              <Row>
                <Col xs={24} sm={24} md={0}>
                  <Follows />
                </Col>
              </Row>
              {!isOwner && <Suggested toggleSuggested={toggleSuggested} />}
              {isOwner && <PostStatus handleAddNewPost={handleAddNewPost} />}
              {isPrivated || isBlocked ? (
                <PrivateAccount />
              ) : (
                <TabPages>{children}</TabPages>
              )}
            </div>
          )}
        </BasicTemplate>
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default withRouter(PersonalPage);
