import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import BasicTemplate from "Template/BasicTemplate";
import Profile from "./Profile";
// import Highlights from "./Highlights";
import TabControl from "./TabControl";
import Follows from "./Profile/Follows";
import IsLoading from "Components/IsLoading";
import Page404 from "Template/Pages/404";
import PostStatus from "Components/PostStatus";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";
import "./scss/personalPage.scss";

const PersonalPage = ({ history, match = {}, location = {}, ...restProps }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    get(state, "personalProfile.isFetching")
  );
  const error = useSelector(state => get(state, "personalProfile.error"));
  const { id: viewerId = "" } = useSelector(state =>
    get(state, "profile.data.user")
  );

  useEffect(() => {
    const username = get(match, "params.username");
    const _requestPersonalInfo = async () => {
      await dispatch(requestPersonalInfo({ username, viewerId }));
    };
    _requestPersonalInfo();
  }, [match, dispatch, viewerId]);

  return (
    <>
      {!error ? (
        <BasicTemplate>
          {isFetching ? (
            <IsLoading isLoading={isFetching} size={128} />
          ) : (
            <div className="personal">
              <Profile />
              {/* <Highlights /> */}
              <Row>
                <Col xs={24} sm={24} md={0}>
                  <Follows />
                </Col>
              </Row>
              <PostStatus />
              <TabControl />
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
