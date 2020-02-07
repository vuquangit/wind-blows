import React, { useState } from "react";
import numeral from "numeral";
import { Button } from "antd";
import { get } from "lodash";

import ModalLikes from "../ModalLikes";
import { useSelector } from "react-redux";

const PostLikes = ({ numLikes = 0, postId = "" }) => {
  // modal LIKEs
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const handleCancelModal = e => {
    setVisibleModal(false);
  };

  // params modal post likes
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );
  const endpoint = "/post/likes";
  const params = { postId: postId, viewerId: viewerId };

  return (
    <section className="PI__info--liked">
      {numLikes > 0 && (
        <>
          <Button onClick={showModal} className="btn-likes">
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

export default PostLikes;
