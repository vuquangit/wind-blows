import React, { useEffect, useState } from "react";
import BasicTemplate from "Template/BasicTemplate";
import FollowList from "Components/FollowList";
import FollowingList from "./mockFollowing.json";
import axios from "axios";
import { useSelector } from "react-redux";

const Following = () => {
  const { id: ownerId = "" } = useSelector(
    (state = {}) => state.personalProfile.data
  );

  const [state, setState] = useState({
    data: [],
    error: null,
    isLoading: true,
    page: 1
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  useEffect(() => {
    (async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "GET",
          url: `${SERVER_BASE_URL}/following?page=${state.page}&limit=20&id=${ownerId}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });

        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.following]
        }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error }));
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    })();
  }, [SERVER_BASE_URL, ownerId, state.page]);

  console.log("Following: ", state);

  return (
    <BasicTemplate>
      <FollowList
        headerFollow="Following"
        items={state.data}
        isLoading={state.isLoading}
      />
    </BasicTemplate>
  );
};

export default Following;
