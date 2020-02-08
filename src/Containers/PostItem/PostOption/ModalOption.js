import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { get, isEqual, startsWith } from "lodash";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

import FollowStatus from "Containers/FollowStatus";
import ModalShare from "../PostInfo/PostAction/ModalShare";

const ModalOption = ({
  visibleModal,
  handleCancelModal,
  postId,
  relationship,
  owner,
  match,
  history,
  handleCancelModalPost = () => {}
}) => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );

  const idMyPost = isEqual(viewerId, get(owner, "id"));

  // delete comments
  const [isDeleleting, setIsDeleting] = useState(false);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  const handleDeteleComments = async () => {
    const sourceLikePost = axios.CancelToken.source();
    setIsDeleting(true);

    try {
      const res = await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/post/delete`,
        data: {
          postId: postId
        },
        headers: {
          "Content-Type": "application/json"
        },
        cancelToken: sourceLikePost.token
      });

      setIsDeleting(false);
      message.success("Deleted post");
      console.log("delete", res);

      //...
      if (startsWith(match.path, "/p/:id")) {
        history.goBack();
      } else if (startsWith(match.path, "/:username")) {
        // delete post

        handleCancelModal();
        handleCancelModalPost();

        console.log("delete post in data ");
      }
    } catch (err) {
      setIsDeleting(false);
      message.error("Delete post error");

      if (axios.isCancel(err)) {
        console.log("cancelled like post");
      } else {
        console.log(err);
      }
    }
  };

  // copy post link
  const postLink = get(window, "location.href") || "";
  const handleCopyLink = () => {
    message.success("Post link is copied");
  };

  // share option
  // Modal share button
  const [visibleModalShare, setVisibleModalShare] = useState(false);
  const showModalShare = () => {
    setVisibleModalShare(true);
  };
  const cancelModalShare = e => {
    setVisibleModalShare(false);
  };

  return (
    <Modal
      title={null}
      visible={visibleModal}
      onCancel={handleCancelModal}
      className="PI__PO--modal"
      footer={null}
      closable={false}
      centered
    >
      <div className="modal__content">
        {idMyPost ? (
          <Button
            className="modal__content--btn btn-red"
            onClick={() => handleDeteleComments()}
            disabled={isDeleleting}
          >
            Delete
          </Button>
        ) : (
          <>
            <Button
              className="modal__content--btn btn-red"
              disabled={isDeleleting}
            >
              Report
            </Button>
            <FollowStatus
              user={owner}
              viewerId={viewerId}
              relationship={relationship}
              textFollowing="Unfollow"
              classNamesBtn="modal__content--btn btn-red"
            />
          </>
        )}
        <Button className="modal__content--btn" disabled={isDeleleting}>
          <Link to={`/p/${postId}`}>Go to post</Link>
        </Button>
        <Button
          className="modal__content--btn"
          onClick={showModalShare}
          disabled={isDeleleting}
        >
          Share
        </Button>
        <ModalShare
          visibleModal={visibleModalShare}
          handleCancelModal={cancelModalShare}
        />
        <CopyToClipboard text={postLink} onCopy={() => handleCopyLink()}>
          <Button className="modal__content--btn" disabled={isDeleleting}>
            Copy Link
          </Button>
        </CopyToClipboard>
        <Button
          className="modal__content--btn"
          onClick={handleCancelModal}
          disabled={isDeleleting}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default withRouter(ModalOption);
