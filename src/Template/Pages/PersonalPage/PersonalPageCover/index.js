import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual, isEmpty } from "lodash";

import BasicTemplate from "Template/BasicTemplate";
import Profile from "./Profile";
import Highlights from "./Highlights";
import Follows from "./Profile/Follows";
import IsLoading from "Components/IsLoading";
import Page404 from "Template/Pages/404";
import PostStatus from "Components/PostStatus";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";
import "./scss/personalPage.scss";
import TabPages from "./TabPages";

const PersonalPage = ({ match = {}, children }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    get(state, "personalProfile.isFetching")
  );
  const error = useSelector(state => get(state, "personalProfile.error"));
  const {
    id: viewerId = "",
    username: viewerUsername = ""
  } = useSelector(state => get(state, "profile.data.user"));

  // fetch data username view
  const username = get(match, "params.username");
  const usernameStore = useSelector(state =>
    get(state, "personalProfile.data.user.username")
  );
  useEffect(() => {
    const _requestPersonalInfo = async () => {
      await dispatch(requestPersonalInfo({ username, viewerId }));
    };

    (isEmpty(usernameStore) || !isEqual(username, usernameStore)) &&
      _requestPersonalInfo();
  }, [match, dispatch, viewerId, username, usernameStore]);

  const isOwner = isEqual(viewerUsername, username);

  console.log(username, usernameStore);
  console.log("error", error);

  return (
    <>
      {!error ? (
        <BasicTemplate>
          {isFetching ? (
            <IsLoading isLoading={isFetching} size={128} />
          ) : (
            <div className="personal">
              <Profile />
              <Highlights />
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
