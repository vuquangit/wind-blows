import React, { useState } from "react";
import numeral from "numeral";
import { Modal, Button } from "antd";

import ModalLikes from "./ModalLikes";

const PostLikes = ({ numLikes = 0, postId = "" }) => {
  // modal LIKE
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const handleCancelModal = e => {
    setVisibleModal(false);
  };

  return (
    <section className="PI__info--liked">
      {numLikes > 0 && (
        <>
          <Button onClick={showModal} className="btn-likes">
            {`${numeral(numLikes).format("0,0")}`} people liked
          </Button>
          <ModalLikes
            postId={postId}
            visibleModal={visibleModal}
            handleCancelModal={handleCancelModal}
          />
        </>
      )}
    </section>
  );
};

export default PostLikes;
