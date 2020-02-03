import React, { useState, useEffect } from "react";
import axios from "axios";
import { get } from "lodash";
import { useSelector } from "react-redux";

import PostGrid from "./PostGrid";
import PostsEmpty from "./PostsEmpty";

const FetchPosts = ({
  method = "get",
  endpoint = "",
  iconEmpty = "",
  textEmpty = ""
}) => {
  const { id: ownerId = "" } = useSelector((state = {}) =>
    get(state, "personalProfile.data.user")
  );

  const [state, setState] = useState({
    isLoading: true,
    data: [],
    error: null,
    limit: 12,
    page: 1,
    totalItem: 0
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  // fetch data items
  useEffect(() => {
    // const source = axios.CancelToken.source();

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: method,
          url: `${SERVER_BASE_URL}${endpoint}`,
          params: {
            id: ownerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          }
          //, cancelToken: source.token
        });

        console.log(response);
        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.data],
          totalItem: get(response, "data.totalItem")
        }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
        console.log(error);
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    console.log("fetch data");
    feactData();

    // // unmounth
    // return () => {
    //   source.cancel();
    // };
  }, [SERVER_BASE_URL, endpoint, method, ownerId, state.limit, state.page]);

  // load more item
  const hasMoreItems = state.data.length < state.totalItem;
  const getMoreItems = () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  return (
    <div className="personal-post">
      {state.data.length > 0 ? (
        <PostGrid
          items={state.data}
          isLoading={state.isLoading}
          hasMoreItems={hasMoreItems}
          getMoreItems={() => getMoreItems()}
        />
      ) : (
        <PostsEmpty icon={iconEmpty} text={textEmpty} />
      )}
    </div>
  );
};

export default FetchPosts;
