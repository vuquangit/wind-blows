import React, { useEffect, useState } from "react";
import BasicTemplate from "Template/BasicTemplate";
import FollowList from "Components/FollowList";
import axios from "utils/axiosConfig";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

const Following = ({ match = {} }) => {
  const { id: viewerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  const username = get(match, "params.username");

  const [state, setState] = useState({
    data: [],
    error: null,
    isLoading: true,
    page: 1,
    totalItems: 0
  });

  useEffect(() => {
    (async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "GET",
          url: "/follows/following/username",
          params: {
            page: state.page,
            limit: 20,
            username: username,
            viewerId: viewerId
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });

        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.following],
          totalItems: response.data.counts.follows // total following
        }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error }));
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    })();
  }, [username, viewerId, state.page]);

  const hasMoreItems = state.data.length < state.totalItems;

  const getMoreItems = async () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  return (
    <BasicTemplate>
      <FollowList
        headerFollow="Following"
        items={state.data}
        isLoading={state.isLoading}
        hasMoreItems={hasMoreItems}
        getMoreItems={getMoreItems}
      />
    </BasicTemplate>
  );
};

export default withRouter(Following);
