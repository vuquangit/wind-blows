import React, { useState, useEffect, useCallback } from "react";
import { get, filter, find, isEmpty, isEqual } from "lodash";
import { useSelector, useDispatch } from "react-redux";

import axios from "utils/axiosConfig";
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
  const ownerId = useSelector((state = {}) =>
    get(state, "personalProfile.data.user.id", "")
  );
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const relationship = useSelector(
    state => get(state, "personalProfile.data.relationship", ""),
    isEqual()
  );
  const isBlocked = isEqual(
    get(relationship, "blockedByViewer.state", ""),
    "BLOCK_STATUS_BLOCKED"
  );

  const [state, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
    limit: 24,
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

        // console.log("response fetch", response);

        if (response && !isEmpty(response.data.data)) {
          setState(prevState => ({
            ...prevState,
            data: [
              ...prevState.data,
              ...filter(
                get(response, "data.data", []),
                o => find(prevState.data, p => p.id === o.id) === undefined
              )
            ],
            totalItem: get(response, "data.totalItem"),
            isLoading: false
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            isLoading: false
          }));
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("cancelled fetch personal");
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
    !isBlocked && feactData();

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
  const handleRemovePost = useCallback(
    postId => {
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
    },
    [dispatch]
  );

  // load more item
  const hasMoreItems = state.data.length < state.totalItem;
  const getMoreItems = useCallback(() => {
    state.data.length + countItemRemoved === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  }, [countItemRemoved, state.data.length, state.limit, state.page]);

  return (
    <div className="personal-post">
      {!isBlocked ? (
        state.isLoading ? (
          <PostsLoading />
        ) : state.data.length > 0 ? (
          <PostGrid
            items={state.data}
            isLoading={state.isLoading}
            hasMoreItems={hasMoreItems}
            getMoreItems={() => getMoreItems()}
            handleRemovePost={handleRemovePost}
          />
        ) : (
          <PostsEmpty icon={iconEmpty} text={textEmpty} />
        )
      ) : (
        <PostsEmpty icon={iconEmpty} text={textEmpty} />
      )}
    </div>
  );
};

export default FetchPosts;
