import React, { useState, useEffect } from "react";
import Axios from "axios";
import { get } from "lodash";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

import IsLoading from "Components/IsLoading";
import PostGrid from "../PostGrid";
import PostsEmpty from "../PostsEmpty";

const PersonalSaved = () => {
  const { id: ownerId = "" } = useSelector((state = {}) =>
    get(state, "personalProfile.data.user")
  );

  const [state, setState] = useState({
    isLoading: true,
    data: [],
    error: null,
    limit: 20,
    page: 1
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  useEffect(() => {
    const feactData = async () => {
      try {
        const response = await Axios({
          method: "get",
          url: `${SERVER_BASE_URL}/save-post/posts`,
          params: {
            id: ownerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log(response);
        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...get(response, "data.savedId")]
        }));
      } catch (err) {
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    feactData();
  }, [SERVER_BASE_URL, ownerId, state.limit, state.page]);

  return (
    <div>
      {state.isLoading ? (
        <IsLoading isLoading={state.isLoading} />
      ) : state.data.length > 0 ? (
        <PostGrid posts={state.data} />
      ) : (
        <PostsEmpty icon={faSave} text={`No Post Saved Yet`} />
      )}
    </div>
  );
};

export default PersonalSaved;
