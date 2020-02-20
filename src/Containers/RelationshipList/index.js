import React, { useEffect, useState } from "react";
import RelationshipItems from "./RelationshipItems";
import axios from "utils/axiosConfig";

const RelationshipList = ({
  method = "get",
  endpoint = "",
  params = { page: 1, limit: 20 },
  data = {},
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  headerText = ""
}) => {
  const [state, setState] = useState({
    data: [],
    error: null,
    isLoading: true,
    page: params.page,
    limit: params.limit,
    totalItems: 0
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: method,
          url: endpoint,
          params,
          data,
          headers,
          cancelToken: source.token
        });

        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.data],
          totalItems: response.data.totalItems,
          isLoading: false
        }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch relationship");
        } else {
          setState(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }));
          console.log(error);
        }
      }
    })();

    // unmount
    return () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page]);

  // get more page
  const hasMoreItems = state.data.length < state.totalItems;
  const getMoreItems = async () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  return (
    <RelationshipItems
      headerText={headerText}
      items={state.data}
      isLoading={state.isLoading}
      hasMoreItems={hasMoreItems}
      getMoreItems={getMoreItems}
    />
  );
};

export default RelationshipList;
