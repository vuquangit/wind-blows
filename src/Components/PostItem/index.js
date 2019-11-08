import React, { useState } from "react";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import ModalItem from "../ModalItem";
import { Modal } from "antd";
import "./postItem.scss";

function PostItem({
  thumbnailSrc = "",
  numLikes = 0,
  numComments = 0,
  ...restProps
}) {
  const [isHover, setIsHouver] = React.useState(false);
  const handleMouseHover = () => setIsHouver(!isHover);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const handleCancelModal = e => setVisible(false);

  return (
    <div className="post-item">
      <div
        className="post-item__content"
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
        onClick={showModal}
      >
        <div>
          <img alt="alt image" src={thumbnailSrc} />
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

      <div className="modal-item">
        <Modal
          title={null}
          visible={visible}
          onCancel={handleCancelModal}
          footer={null}
        >
          <ModalItem {...restProps} />
        </Modal>
      </div>
    </div>
  );
}

export default PostItem;
