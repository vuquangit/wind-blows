import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col, Modal } from "antd";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "Redux/Auth/auth.action";
// import { signOut } from "Redux/Profile/profile.action";
import { withRouter } from "react-router";

const Username = props => {
  const verified = true;
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const handleCancel = e => {
    setVisibleModal(false);
  };

  const dispatch = useDispatch();
  const onLogoutClick = () => dispatch(setAuthenticated(false));
  const onChangePassword = () =>
    props.history.push("/accounts/password/change/");

  return (
    <div className="personal__header--username">
      <Row type="flex" justify="start" className="account">
        <Col>
          <h1 className="username">chang.gio</h1>
        </Col>
        {verified && (
          <Col>
            <span className="verified" title="Verified">
              Verified
            </span>
          </Col>
        )}
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
                <button className="edit-item">Nametag</button>
                <button className="edit-item">Apps and Website</button>
                <button className="edit-item">Notifications</button>
                <button className="edit-item">Pricacy and Security</button>
                <button className="edit-item">Login Activity</button>
                <button className="edit-item">Emails from Instagram</button>
                <button className="edit-item">Report a Problem</button>
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
