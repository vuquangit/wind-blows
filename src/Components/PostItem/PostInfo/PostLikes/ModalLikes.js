import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import { get } from "lodash";
import { useSelector } from "react-redux";

import FollowList from "Components/FollowList";

const ModalLikes = ({
  visibleModal = false,
  handleCancelModal = () => {},
  postId = ""
}) => {
  const viewerId =
    useSelector((state = {}) => get(state, "profile.data.user.id")) || "";

  // fetch list likes
  const [state, setState] = useState({
    isLoading: true,
    data: {},
    error: null,
    limit: 12,
    page: 1,
    totalLikes: 0
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  useEffect(() => {
    const fetchLikesList = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${SERVER_BASE_URL}/post/likes`,
          params: {
            postId: postId,
            viewerId: viewerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log("modal like res", response);
        setState(prevState => ({
          ...prevState,
          data: { ...prevState.data, ...response.data },
          totalLikes: get(response, "data.totalLikes")
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    visibleModal && fetchLikesList();
  }, [
    SERVER_BASE_URL,
    postId,
    state.limit,
    state.page,
    viewerId,
    visibleModal
  ]);

  const hasMoreItems =
    (get(state, "data.data") || []).length < state.totalLikes;
  //   const hasMoreItems = false;

  const getMoreItems = async () => {
    state.data.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  return (
    <div>
      <Modal
        title={null}
        visible={visibleModal}
        onCancel={handleCancelModal}
        className="PI-modal-likes"
        footer={null}
        closable
        centered
        destroyOnClose
      >
        <div className=" ">
          <FollowList
            headerFollow="Likes"
            items={state.data.data}
            isLoading={state.isLoading}
            hasMoreItems={hasMoreItems}
            getMoreItems={getMoreItems}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalLikes;
