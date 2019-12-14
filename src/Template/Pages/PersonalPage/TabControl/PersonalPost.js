import React, { useState } from "react";
import { Modal } from "antd";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import PostItem from "Components/PostItem";

const PersonalPost = data => {
  const { thumbnailSrc, numLikes, numComments } = data;

  const [isHover, setIsHouver] = React.useState(false);
  const handleMouseHover = () => setIsHouver(!isHover);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleCancelModal = e => setVisible(false);

  return (
    <div className="personal-post">
      <div
        className="personal-post__content"
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
        onClick={showModal}
      >
        <div>
          <img alt="" src={thumbnailSrc} />
        </div>
        <div>
          <span aria-label="Carousel" className="filled" />
        </div>
        {isHover && (
          <div className="LC">
            <div className="LC__content">
              <div className="LC__content--item">
                <FontAwesomeIcon icon={faHeart} />
                {` ${numeral(numLikes).format("0.[00]a")}`}
              </div>
              <div className="LC__content--item">
                <FontAwesomeIcon icon={faComment} />
                {` ${numeral(numComments).format("0.[00]a")}`}
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        title={" "}
        visible={visible}
        onCancel={handleCancelModal}
        footer={null}
        className="personal-post__modal"
      >
        <PostItem {...data} />
      </Modal>
    </div>
  );
};

export default PersonalPost;
