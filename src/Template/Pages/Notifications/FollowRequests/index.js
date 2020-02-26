import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "utils/axiosConfig";
import { get, isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";

import FollowRequestItem from "./FollowRequestItem";
import NotiLoading from "../NotificationItems/NotificationLoading";

const FollowRequests = () => {
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  // const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
    limit: 18,
    page: 1,
    totalItems: 0
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "get",
          url: "/follow-requests/follower-requests",
          params: {
            id: viewerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        console.log("respone follow request", response);

        if (!isEmpty(response.data))
          setState(prevState => ({
            ...prevState,
            data: [...prevState.data, ...get(response, "data.data", [])],
            totalItems: get(response, "data.totalItems", 0),
            isLoading: false
          }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch notifications");
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

    feactData();

    // unmount
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page]);

  // load more item
  const hasMoreItems = state.data.length < state.totalItems;
  const getMoreItems = () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  const _renderItem = () =>
    state &&
    state.data.length > 0 &&
    state.data.map((item, idx) => (
      <FollowRequestItem key={item.id || idx} {...item} />
    ));

  return (
    <div className="follow-request">
      <h1 className="follow-request__header">Follow Requests</h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
      >
        {_renderItem()}
      </InfiniteScroll>
      {state.isLoading && <NotiLoading />}
    </div>
  );
};

export default FollowRequests;
