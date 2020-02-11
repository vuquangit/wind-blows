import React, { useEffect, useState } from "react";
import axios from "axios";
// import { get } from "lodash";
// import { useSelector } from "react-redux";

const NotificationItem = ({
  createdAt = "",
  senderId = "",
  receiverId = "",
  read = false,
  postId = "",
  text = "",
  typeNotification = 0
}) => {
  //   const { id: viewerId = "" } = useSelector((state = {}) =>
  //     get(state, "profile.data.user")
  //   );
  const [state, setState] = useState({
    isLoading: false,
    data: [],
    error: null
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  // fetch data items
  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "get",
          url: `${SERVER_BASE_URL}/notifications/user-post`,
          params: {
            ownerId: senderId,
            viewerId: receiverId,
            postId: postId
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        console.log("response fetch", response);
        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.data],

          isLoading: false
        }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch personal");
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

    // console.log("fetch data personal");
    // feactData();

    // unmount
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const description = () => {
    if (typeNotification === 1) return `@username started following you`;
    else if (typeNotification === 2) return `@username liked your post`;
    else if (typeNotification === 3) return `@username liked your comment`;
    else if (typeNotification === 4) return `@username commented: ${text}`;
    else return ``;
  };

  return <div>{description()}</div>;
};

export default NotificationItem;
