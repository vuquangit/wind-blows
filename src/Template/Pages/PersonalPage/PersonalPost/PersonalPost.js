import React, { useState, useEffect } from "react";
import Axios from "axios";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import IsLoading from "Components/IsLoading";
import PostGrid from "../FetchPosts/PostGrid";
import PostsEmpty from "../FetchPosts/PostsEmpty";

const PersonalPost = () => {
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
          url: `${SERVER_BASE_URL}/posts`,
          params: {
            id: ownerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data]
        }));
      } catch (err) {
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    feactData();
  }, [SERVER_BASE_URL, ownerId, state.limit, state.page]);

  return (
    <div className="personal-post">
      {state.isLoading ? (
        <IsLoading isLoading={state.isLoading} />
      ) : state.data.length > 0 ? (
        <PostGrid posts={state.data} />
      ) : (
        <PostsEmpty icon={faCameraRetro} text={`No Post Yet`} />
      )}
    </div>
  );
};

export default PersonalPost;
