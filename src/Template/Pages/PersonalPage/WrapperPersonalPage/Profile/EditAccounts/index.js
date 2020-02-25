import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { isEqual, get } from "lodash";

import Username from "./Username";
import EditProfileModal from "./EditProfileModal";
import UserOptions from "./UserOptions";
import EditProfile from "./EditProfile";

const EditProfiles = () => {
  const { username = "", isVerified = false, id: ownerId = "" } = useSelector(
    (state = {}) => get(state, "personalProfile.data.user", {}),
    isEqual()
  );

  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const viewerIsOwner = isEqual(ownerId, viewerId);

  return (
    <div className="personal__profile--username">
      <Row type="flex" justify="start" className="account">
        <Username username={username} isVerified={isVerified} />
        {viewerIsOwner ? (
          <>
            <Col>
              <Row>
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
          <UserOptions />
        )}
      </Row>
      {viewerIsOwner && (
        <Row>
          <Col xs={24} sm={24} md={0}>
            <EditProfile />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default withRouter(EditProfiles);
