import React, { useState } from "react";
import numeral from "numeral";
import { Button, Modal } from "antd";
import { get } from "lodash";
import { useSelector } from "react-redux";

import ModalLikes from "../ModalLikes";
import { withRouter } from "react-router-dom";

const PostLikes = ({ numLikes = 0, postId = "", history = {} }) => {
  // params modal post likes
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const endpoint = "/post/likes";
  const params = { postId: postId, viewerId: viewerId };

  // modal LIKEs
  const [visibleModal, setVisibleModal] = useState(false);

  const requestLogin = () => {
    Modal.confirm({
      title: "The Wind Blows",
      content: "Please log in to continue......",
      okText: "Login",
      cancelText: "Cancel",
      onOk() {
        history.push("/accounts/login");
      }
    });
  };

  const showModal = () => {
    if (viewerId) setVisibleModal(true);
  };
  const handleCancelModal = e => {
    setVisibleModal(false);
  };

  return (
    <section className="PI__info--liked">
      {numLikes > 0 && (
        <>
          <Button
            onClick={viewerId ? showModal : requestLogin}
            className="btn-likes"
          >
            {`${numeral(numLikes).format("0,0")}`} people liked
          </Button>
          <ModalLikes
            endpoint={endpoint}
            params={params}
            visibleModal={visibleModal}
            handleCancelModal={handleCancelModal}
          />
        </>
      )}
    </section>
  );
};

export default withRouter(PostLikes);
