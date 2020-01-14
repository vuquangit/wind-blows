import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import firebase from "firebase";
import { signOut } from "Redux/Profile/profile.action";
import { isEqual } from "lodash";

const Username = ({ history }) => {
  const { username = "", isVerified = false, id = "" } = useSelector(
    (state = {}) => state.personalProfile.data
  );

  // ID is id signed
  const { id: viewerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );
  const viewerIsOwner = isEqual(id, viewerId);

  // Modal
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => setVisibleModal(true);
  const handleCancel = e => setVisibleModal(false);

  // Auth
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
    <div className="personal__header--username">
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
        {viewerIsOwner && (
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
                  onClick={showModal}
                >
                  <FontAwesomeIcon icon={faUserCog} />
                </div>
                <Modal
                  title={null}
                  visible={visibleModal}
                  onCancel={handleCancel}
                  className="edit-account__modal"
                  footer={null}
                  closable={false}
                >
                  <div className="edit-account__modal--items">
                    <button className="edit-item" onClick={onChangePassword}>
                      Change Password
                    </button>
                    <button className="edit-item" onClick={onLogoutClick}>
                      Log Out
                    </button>
                    <button className="edit-item" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </Modal>
              </div>
            </Col>
          </>
        )}
      </Row>
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
    </div>
  );
};

export default withRouter(Username);
