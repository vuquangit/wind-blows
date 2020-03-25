import React, { useState } from "react";
import { Modal } from "antd";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { Image, Transformation } from "cloudinary-react";
import { get } from "lodash";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router-dom";

import PostItem from "Containers/PostItem";

const PersonalPostItem = ({
  id: postId = "",
  sidecarChildren = [],
  numLikes = 0,
  numComments = 0,
  caption = "",
  captionIsEdited = false,
  owner = {},
  commentsDisabled = false,
  likedByViewer = false,
  postAt = "",
  relationship = {},
  savedByViewer = false,
  history = {},
  handleRemovePost = () => {}
}) => {
  // show info image
  const [isHover, setIsHouver] = React.useState(false);
  const handleMouseHover = () => setIsHouver(!isHover);

  // show image
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [visible, setVisible] = useState(false);
  const handleShowImage = () => {
    if (isSmallScreen) history.push(`/p/${postId}`);
    else setVisible(true);
  };
  const handleCancelModal = e => setVisible(false);

  const publicIdImage = get(sidecarChildren, "[0].public_id", "");

  return (
    <div className="personal-post">
      <div
        className="personal-post__content"
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
        onClick={handleShowImage}
      >
        <Image publicId={publicIdImage} className="thumbnail-post">
          <Transformation height="320" width="320" crop="fill" />
        </Image>
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
        title={null}
        visible={visible}
        onCancel={handleCancelModal}
        footer={null}
        className="personal-post__modal"
      >
        <div className="personal-post__modal--content">
          <div className="content--close" onClick={handleCancelModal} />
          <div className="content--post">
            <PostItem
              id={postId}
              caption={caption}
              captionIsEdited={captionIsEdited}
              numLikes={numLikes}
              numComments={numComments}
              commentsDisabled={commentsDisabled}
              likedByViewer={likedByViewer}
              postAt={postAt}
              savedByViewer={savedByViewer}
              relationship={relationship}
              owner={owner}
              sidecarChildren={sidecarChildren}
              isModal
              handleCancelModalPost={handleCancelModal}
              handleRemovePost={handleRemovePost}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(PersonalPostItem);
