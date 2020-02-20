import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual, isEmpty } from "lodash";

import BasicTemplate from "Template/BasicTemplate";
import Profile from "./Profile";
// import Highlights from "./Highlights";
import Follows from "./Profile/Follows";
import IsLoading from "Components/IsLoading";
import Page404 from "Template/Pages/404";
import PostStatus from "Containers/PostStatus";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";
import "./scss/personalPage.scss";
import TabPages from "./TabPages";

const PersonalPage = ({ match = {}, children }) => {
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

  const isOwner = isEqual(viewerUsername, username);

  return (
    <>
      {!error ? (
        <BasicTemplate>
          {isFetching ? (
            <div className="personal__loading">
              <IsLoading isLoading size={128} />
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
              {isOwner && <PostStatus />}
              <TabPages>{children}</TabPages>
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
