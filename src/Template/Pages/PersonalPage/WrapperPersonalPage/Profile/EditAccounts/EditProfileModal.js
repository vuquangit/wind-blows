import React, { useState, useCallback } from "react";
import { auth as firebaseAuth } from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { signOut } from "Redux/Profile/profile.action";

const EditProfileModal = ({ history = {} }) => {
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

export default withRouter(EditProfileModal);
