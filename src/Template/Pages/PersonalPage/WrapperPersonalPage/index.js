import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual, isEmpty } from "lodash";

import BasicTemplate from "Template/BasicTemplate";
import Profile from "./Profile";
// import Highlights from "./Highlights";
import Follows from "./Profile/Follows";
import Pinwheel from "Components/Loaders/Pinwheel";
import Page404 from "Template/Pages/404";
import PostStatus from "Containers/PostStatus";
import TabPages from "./TabPages";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";
import PrivateAccount from "./PrivateAccount";
import "./scss/personalPage.scss";

const PersonalPage = ({
  match = {},
  children,
  handleAddNewPost = () => {}
}) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    get(state, "personalProfile.isFetching", false)
  );
  const error = useSelector(state =>
    get(state, "personalProfile.error", false)
  );
  const {
    id: viewerId = "",
    username: viewerUsername = ""
  } = useSelector(state => get(state, "profile.data.user", ""));
  const relationship = useSelector(state =>
    get(state, "profile.data.relationship", "")
  );

  // fetch data username view
  const username = get(match, "params.username", "");
  const usernameStore = useSelector(state =>
    get(state, "personalProfile.data.user.username", "")
  );
  const tokenUser = get(
    JSON.parse(localStorage.getItem("state") || {}),
    "profile.data.tokens.token",
    ""
  );
  const isOwner = isEqual(viewerUsername, username);

  // fetch personal data
  useEffect(() => {
    const _requestPersonalInfo = async () => {
      await dispatch(
        requestPersonalInfo({
          data: { username, viewerId },
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${tokenUser}`
          }
        })
      );
    };

    (isEmpty(usernameStore) || !isEqual(username, usernameStore)) &&
      _requestPersonalInfo();
  }, [match, dispatch, viewerId, username, usernameStore, tokenUser]);

  const isRequested = isEqual(
    get(relationship, "relationship.restrictedByViewer", ""),
    "RESTRICT_STATUS_UNRESTRICTED"
  );
  console.log("isRequested", isRequested);

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
              <Profile />
              {/* <Highlights /> */}
              <Row>
                <Col xs={24} sm={24} md={0}>
                  <Follows />
                </Col>
              </Row>
              {isOwner && <PostStatus handleAddNewPost={handleAddNewPost} />}
              {!isRequested ? (
                <TabPages>{children}</TabPages>
              ) : (
                <PrivateAccount />
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
