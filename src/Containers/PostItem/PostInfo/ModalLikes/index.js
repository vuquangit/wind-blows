import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import { get } from "lodash";
import { useSelector } from "react-redux";

import FollowList from "Components/FollowList";

const ModalLikes = ({
  visibleModal = false,
  handleCancelModal = () => {},
  endpoint = "",
  params = {}
}) => {
  const tokenUser = useSelector((state = {}) =>
    get(state, "profile.data.tokens.token", "")
  );

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
    const source = axios.CancelToken.source();

    const fetchLikesList = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${SERVER_BASE_URL}${endpoint}`,
          params: {
            ...params,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenUser}`
          },
          cancelToken: source.token
        });

        console.log("modal like res", response);
        setState(prevState => ({
          ...prevState,
          data: { ...prevState.data, ...response.data },
          totalLikes: get(response, "data.totalLikes"),
          isLoading: false
        }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch likes");
        } else {
          setState(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }));
          console.log(error);
        }
      }
    };

    visibleModal && fetchLikesList();

    // unmount
    return () => {
      source.cancel();
    };
  }, [
    SERVER_BASE_URL,
    endpoint,
    params,
    state.limit,
    state.page,
    tokenUser,
    visibleModal
  ]);

  // scroll items
  const hasMoreItems =
    (get(state, "data.data") || []).length < state.totalLikes;

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
