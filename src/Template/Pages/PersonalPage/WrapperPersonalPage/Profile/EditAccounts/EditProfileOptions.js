import React, { useState, useCallback } from "react";
import { auth as firebaseAuth } from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { signOut } from "Redux/Profile/profile.action";

const EditProfileOptions = ({ history = {} }) => {
  // Modal edit account
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const showModalEdit = () => setVisibleModalEdit(true);
  const handleCancelEdit = () => setVisibleModalEdit(false);

  // handles
  const dispatch = useDispatch();
  const handleLogoutClick = useCallback(() => {
    const signout = async () => {
      try {
        await firebaseAuth().signOut();
        // signed out
        dispatch(signOut());
      } catch (e) {
        console.error(e);
      }
    };
    signout();
  }, [dispatch]);
  const handleChangePassword = () => history.push("/accounts/password/change/");
  const handlePrivacyAndSecurity = () =>
    history.push("/accounts/privacy_and_security/");

  return (
    <div className="profile-edit-profile-options">
      <Button
        className="profile-edit-profile-options__btn"
        title="Edit Account"
        onClick={showModalEdit}
      >
        <FontAwesomeIcon icon={faUserCog} style={{ fontSize: "24px" }} />
      </Button>
      <Modal
        title={null}
        visible={visibleModalEdit}
        onCancel={handleCancelEdit}
        className="user-option-modal"
        footer={null}
        closable={false}
        centered
      >
        <div className="user-option-modal__content">
          <button className="edit-item" onClick={handleChangePassword}>
            Change Password
          </button>
          <button className="edit-item" onClick={handlePrivacyAndSecurity}>
            Privacy and Security
          </button>
          <button className="edit-item" onClick={handleLogoutClick}>
            Log Out
          </button>
          <button className="edit-item" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(EditProfileOptions);
