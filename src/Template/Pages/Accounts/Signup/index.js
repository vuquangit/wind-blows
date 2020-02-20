import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { isEmpty } from "lodash";
import { Row, Col } from "antd";

import PanelImage from "./PanelImage";
import Signup from "./Signup";
import Loading from "Template/Pages/Loading";
import "./signup.scss";

const EmailSignup = ({ history }) => {
  //Is signed

  const { data: profileData, isFetching } =
    useSelector((state = {}) => state.profile) || {};

  useEffect(() => {
    if (!isEmpty(profileData)) {
      history.push("/");
    }
  }, [profileData, isFetching, history]);

  return (
    <div className="email-signup">
      {isFetching && !isEmpty(profileData) ? (
        <Loading />
      ) : (
        <Row>
          <Col xs={0} sm={0} md={12}>
            <PanelImage />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Signup />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default withRouter(EmailSignup);
