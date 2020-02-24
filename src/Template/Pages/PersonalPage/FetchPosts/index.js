import React, { useState, useEffect } from "react";
import axios from "utils/axiosConfig";
import { get, filter, find } from "lodash";
import { useSelector, useDispatch } from "react-redux";

import PostGrid from "./PostGrid";
import PostsEmpty from "./PostsEmpty";
import PostsLoading from "./PostsLoading";
import {
  increaseCountPosts,
  decreaseCountPosts
} from "Redux/PersonalProfile/personalProfile.action";

const FetchPosts = ({
  method = "get",
  endpoint = "",
  iconEmpty = "",
  textEmpty = "",
  newPosts = []
}) => {
  const dispatch = useDispatch();
  const { id: ownerId = "" } = useSelector((state = {}) =>
    get(state, "personalProfile.data.user", {})
  );
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );

  const [state, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
    limit: 18,
    page: 1,
    totalItem: 0
  });

  // fetch data items
  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: method,
          url: endpoint,
          params: {
            ownerId: ownerId,
            viewerId: viewerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        console.log("response fetch", response);
        setState(prevState => ({
          ...prevState,
          data: [
            ...prevState.data,
            ...filter(
              response.data.data,
              o => find(prevState.data, p => p.id === o.id) === undefined
            )
          ],
          totalItem: get(response, "data.totalItem"),
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

    console.log("fetch data personal");
    feactData();

    // unmount
    return () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page]);

  useEffect(() => {
    if (newPosts && newPosts.length > 0) {
      setState(prevState => ({
        ...prevState,
        data: [...newPosts, ...prevState.data],
        totalItem: prevState.totalItem + 1
      }));

      dispatch(increaseCountPosts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPosts]);

  const [countItemRemoved, setCountItemRemoved] = useState(0);
  const handleRemovePersonalPost = postId => {
    setState(prevState => ({
      ...prevState,
      data:
        prevState.data && prevState.data.length > 0
          ? filter(prevState.data, o => o.id !== postId)
          : prevState.data,
      totalItem:
        prevState.totalItem - 1 >= 0
          ? prevState.totalItem - 1
          : prevState.totalItem
    }));

    dispatch(decreaseCountPosts());
    setCountItemRemoved(prevState => prevState + 1);
  };

  // load more item
  const hasMoreItems = state.data.length < state.totalItem;
  const getMoreItems = () => {
    state.data.length + countItemRemoved === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));

    console.log(
      "getmorepost:",
      state.data.length,
      countItemRemoved,
      state.page * state.limit,
      state.data.length + countItemRemoved === state.page * state.limit
    );
  };

  return (
    <div className="personal-post">
      {state.isLoading && state.data.length === 0 ? (
        <PostsLoading />
      ) : state.data.length > 0 ? (
        <PostGrid
          items={state.data}
          isLoading={state.isLoading}
          hasMoreItems={hasMoreItems}
          getMoreItems={() => getMoreItems()}
          handleRemovePersonalPost={handleRemovePersonalPost}
        />
      ) : (
        <PostsEmpty icon={iconEmpty} text={textEmpty} />
      )}
    </div>
  );
};

export default FetchPosts;
