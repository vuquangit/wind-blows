import React, { useEffect, useState } from "react";
import BasicTemplate from "Template/BasicTemplate";
import FollowList from "Components/FollowList";
import axios from "axios";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

const Followers = ({ match = {} }) => {
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

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  useEffect(() => {
    (async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "GET",
          url: `${SERVER_BASE_URL}/follows/followers/username/`,
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

        // console.log(username, response);

        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.follower],
          totalItems: response.data.counts.followedBy // total follower
        }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error }));
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    })();
  }, [SERVER_BASE_URL, username, viewerId, state.page]);

  const hasMoreItems = state.data.length < state.totalItems;

  const getMoreItems = async () => {
    setState(prevState => ({ ...prevState, page: prevState.state + 1 }));
  };

  return (
    <BasicTemplate>
      <FollowList
        headerFollow="Followers"
        items={state.data}
        isLoading={state.isLoading}
        hasMoreItems={hasMoreItems}
        getMoreItems={getMoreItems}
      />
    </BasicTemplate>
  );
};

export default withRouter(Followers);
