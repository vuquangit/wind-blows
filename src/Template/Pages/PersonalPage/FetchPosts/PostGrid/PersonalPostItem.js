import React, { useState } from "react";
import { Modal } from "antd";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { get } from "lodash";
import { useSelector } from "react-redux";

import PostItem from "Components/Post";

const PersonalPostItem = data => {
  const { sidecarChildren, numLikes, numComments } = data;

  // show info image
  const [isHover, setIsHouver] = React.useState(false);
  const handleMouseHover = () => setIsHouver(!isHover);

  // modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleCancelModal = e => setVisible(false);

  //  relationship
  const relationship = useSelector((state = {}) =>
    get(state, "personalProfile.data.relationship")
  );

  return (
    <div className="personal-post">
      <div
        className="personal-post__content"
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
        onClick={showModal}
      >
        <CloudinaryContext cloudName="dnzsa2z7b">
          <Image
            publicId={sidecarChildren[0].public_id}
            className="thumbnail-post"
          >
            <Transformation height="320" width="320" crop="fill" />
          </Image>
        </CloudinaryContext>
        {sidecarChildren.length > 1 && (
          <div className="carousel">
            <span aria-label="Carousel" className="carousel__filled" />
          </div>
        )}
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
        <PostItem {...data} relationship={relationship} isModal={true} />
      </Modal>
    </div>
  );
};

export default PersonalPostItem;
