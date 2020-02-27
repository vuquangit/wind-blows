import React, { useState, useEffect } from "react";
import axios from "utils/axiosConfig";
import { get, startsWith, isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import BasicTemplate from "Template/BasicTemplate";
import Notification from "./Notification";
import NotiLoading from "./NotificationItems/NotificationLoading";
import NotiEmpty from "./NotificationItems/NotificationEmpty";
import {
  clearNewNotifications,
  updateNotifications
} from "Redux/Notifications/notification.action";
import "./notification.scss";

const Notifications = () => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );

  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
    limit: 18,
    page: 1,
    totalItem: 0,
    totalFollowRequests: 0
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "get",
          url: "/users/notifications",
          params: {
            userId: viewerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        console.log("respone notifications", response);

        if (!isEmpty(response.data))
          setState(prevState => ({
            ...prevState,
            data: [...prevState.data, ...get(response, "data.data", [])],
            totalItem: get(response, "data.totalItem", 0),
            totalFollowRequests: get(response, "data.totalFollowRequests", 0),
            isLoading: false
          }));

        if (state.page === 1) await dispatch(clearNewNotifications());

        const totalUnread = get(response, "data.totalUnread", 0);
        if (totalUnread) await dispatch(updateNotifications(totalUnread));
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

  const setAllItemsReaded = () => {
    if (state && state.data && state.data.length > 0) {
      const items = state.data.map(item => {
        return { ...item, read: true };
      });

      setState(prevState => ({
        ...prevState,
        data: items
      }));
    }
  };

  // load more item
  const hasMoreItems = state.data.length < state.totalItem;
  const getMoreItems = () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  return (
    <>
      {state.isLoading && state.data.length === 0 ? (
        <NotiLoading />
      ) : state.data.length > 0 ? (
        <Notification
          items={state.data}
          isLoading={state.isLoading}
          setAllItemsReaded={setAllItemsReaded}
          totalFollowRequests={state.totalFollowRequests}
          hasMoreItems={hasMoreItems}
          getMoreItems={() => getMoreItems()}
        />
      ) : (
        <NotiEmpty />
      )}
    </>
  );
};

const WrappedNotification = ({ match = {} }) => {
  const isDropdown = startsWith(match.path, "/notifications");

  return (
    <>
      {isDropdown ? (
        <BasicTemplate>
          <Notifications />
        </BasicTemplate>
      ) : (
        <Notifications />
      )}
    </>
  );
};

export default withRouter(WrappedNotification);
