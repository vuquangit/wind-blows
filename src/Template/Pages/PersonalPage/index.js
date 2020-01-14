import React, { useEffect } from "react";
import { Row, Col } from "antd";
import BasicTemplate from "Template/BasicTemplate";
import Profile from "./Profile";
import Highlights from "./Highlights";
import TabControl from "./TabControl";
import Follows from "./Profile/Follows";
import IsLoading from "Components/IsLoading";

import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { requestPersonalInfo } from "Redux/PersonalProfile/personalProfile.action";

import "./personalPage.scss";

const PersonalPage = ({ history, match = {}, location = {}, ...restProps }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    get(state, "personalProfile.isFetching")
  );
  const error = useSelector(state => get(state, "personalProfile.error"));

  useEffect(() => {
    const username = get(match, "params.username");
    const _requestPersonalInfo = async () => {
      await dispatch(requestPersonalInfo({ username }));
    };
    _requestPersonalInfo();
    console.log("request personal info");
  }, [match, dispatch]);

  // useEffect(() => {
  //   error && history.replace("/404");
  // }, [error, history]);

  return (
    <BasicTemplate>
      {isFetching ? (
        <IsLoading isLoading={isFetching} />
      ) : !error ? (
        <div className="personal">
          <Profile />
          <Highlights />
          <Row>
            <Col xs={24} sm={24} md={0}>
              <Follows />
            </Col>
          </Row>
          <TabControl />
        </div>
      ) : (
        <div>
          <h5>Sorry, this page isn't available. </h5>
          <h6>
            The link you followed may be broken, or the page may have been
            removed. Go back to The Wind Blows.
          </h6>
        </div>
      )}
    </BasicTemplate>
  );
};

export default withRouter(PersonalPage);
