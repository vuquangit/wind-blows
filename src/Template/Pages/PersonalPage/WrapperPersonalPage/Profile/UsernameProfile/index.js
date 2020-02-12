import React, { useState, useCallback } from "react";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col, Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { isEqual } from "lodash";

import { signOut } from "Redux/Profile/profile.action";
import FollowStatus from "Containers/FollowStatus";

const Username = ({ history }) => {
  const { user: userProfile = {}, relationship = {} } = useSelector(
    (state = {}) => state.personalProfile.data
  );
  const { username = "", isVerified = false, id = "" } = userProfile;

  // ID is id signed
  const { id: viewerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );
  const viewerIsOwner = isEqual(id, viewerId);

  // Modal edit account
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const showModalEdit = () => setVisibleModalEdit(true);
  const handleCancelEdit = e => setVisibleModalEdit(false);

  // Modal user option
  const [visibleModal_UserOption, setVisibleModal_UserOption] = useState(false);
  const showModal_UserOption = () => setVisibleModal_UserOption(true);
  const handleCancel_UserOption = e => setVisibleModal_UserOption(false);

  // Auth: logout
  const dispatch = useDispatch();
  const onLogoutClick = useCallback(() => {
    const signout = async () => {
      try {
        await firebase.auth().signOut();
        // signed out
        dispatch(signOut());
      } catch (e) {
        console.error(e);
      }
    };
    signout();
  }, [dispatch]);

  const onChangePassword = () => history.push("/accounts/password/change/");

  return (
    <div className="personal__profile--username">
      <Row type="flex" justify="start" className="account">
        <Col>
          <h1 className="username">{username}</h1>
        </Col>
        {isVerified && (
          <Col>
            <span className="verified" title="Verified">
              Verified
            </span>
          </Col>
        )}
        {viewerIsOwner ? (
          <>
            <Col>
              <Row>
                <Col xs={0} sm={0} md={24}>
                  <Link to="/accounts/edit/" className="edit-profile">
                    <button type="button">Edit Profile</button>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col>
              <div className="edit-account item-center">
                <div
                  className="edit-account__show-modal item-center"
                  title="Edit Account"
                  onClick={showModalEdit}
                >
                  <FontAwesomeIcon icon={faUserCog} />
                </div>
                <Modal
                  title={null}
                  visible={visibleModalEdit}
                  onCancel={handleCancelEdit}
                  className="edit-account__modal"
                  footer={null}
                  closable={false}
                  centered
                >
                  <div className="edit-account__modal--items">
                    <button className="edit-item" onClick={onChangePassword}>
                      Change Password
                    </button>
                    <button className="edit-item" onClick={onLogoutClick}>
                      Log Out
                    </button>
                    <button className="edit-item" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                </Modal>
              </div>
            </Col>
          </>
        ) : (
          <div className="user-options">
            <div className="user-options__follow">
              <FollowStatus
                user={userProfile}
                viewerId={viewerId}
                relationship={relationship}
              />
            </div>
            <div className="user-options__option">
              <Button onClick={showModal_UserOption}>
                <span className="sprite-icon__glyphs user-options__option--btn" />
              </Button>
              <Modal
                title={null}
                visible={visibleModal_UserOption}
                onCancel={handleCancel_UserOption}
                className="edit-account__modal"
                footer={null}
                closable={false}
                centered
              >
                <div className="edit-account__modal--items">
                  <button className="edit-item">Block this user</button>
                  <button
                    className="edit-item"
                    onClick={handleCancel_UserOption}
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        )}
      </Row>
      {viewerIsOwner && (
        <Row>
          <Col xs={24} sm={24} md={0}>
            <Link
              to="/accounts/edit/"
              className="edit-profile"
              title="Edit Profile"
            >
              <button type="button">Edit Profile</button>
            </Link>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default withRouter(Username);
