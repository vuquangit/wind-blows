import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { isEqual, get } from "lodash";

import Username from "./Username";
import EditProfileModal from "./EditProfileOptions";
import EditProfile from "./EditProfile";
import EditFollows from "./EditFollows";
import ToggleSuggested from "./ToggleSuggested";
import ViewerOptions from "./ViewerOptions";

const EditProfiles = ({ handleToggleSuggested = () => {} }) => {
  const { username = "", isVerified = false, id: ownerId = "" } = useSelector(
    (state = {}) => get(state, "personalProfile.data.user", {}),
    isEqual()
  );

  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const viewerIsOwner = isEqual(ownerId, viewerId);

  return (
    <div className="profile-edit-accounts">
      <Row
        type="flex"
        justify="start"
        className="profile-edit-accounts__content"
      >
        {viewerIsOwner ? (
          <>
            <Username username={username} isVerified={isVerified} />
            <Col>
              <Row type="flex">
                <Col xs={0} sm={0} md={24}>
                  <EditProfile />
                </Col>
              </Row>
            </Col>
            <Col>
              <EditProfileModal />
            </Col>
          </>
        ) : (
          <Col>
            <Row type="flex">
              <Col xs={0} sm={0} md={24}>
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                  <Username username={username} isVerified={isVerified} />
                  <EditFollows />
                  <ToggleSuggested
                    handleToggleSuggested={handleToggleSuggested}
                  />
                  <ViewerOptions />
                </div>
              </Col>
              <Col xs={24} sm={24} md={0}>
                <div className="d-flex flex-column justify-content-start align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <Username username={username} isVerified={isVerified} />
                    <ViewerOptions />
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <EditFollows />
                    <ToggleSuggested
                      handleToggleSuggested={handleToggleSuggested}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      {viewerIsOwner && (
        <Row type="flex">
          <Col xs={24} sm={24} md={0}>
            <EditProfile />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default withRouter(EditProfiles);
