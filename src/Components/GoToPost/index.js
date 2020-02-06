import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

import PostItem from "Components/PostItem";
import BasicTemplate from "Template/BasicTemplate";
import IsLoading from "Components/IsLoading";
import "./goToPost.scss";

const GoToPost = ({ match = {} }) => {
  const [state, setState] = useState({
    isLoading: true,
    data: {},
    error: null
  });

  const postId = match.params.id;
  const { id: viewerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  useEffect(() => {
    const feactPostData = async () => {
      try {
        const response = await Axios({
          method: "post",
          url: `${SERVER_BASE_URL}/post`,
          data: {
            postId: postId,
            viewerId: viewerId
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        setState(prevState => ({
          ...prevState,
          data: { ...prevState.data, ...response.data }
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    feactPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BasicTemplate>
      <div className="GTP">
        <div className="GTP__WPI">
          {state.isLoading ? (
            <IsLoading isLoading={state.isLoading} />
          ) : (
            <PostItem {...state.data} isHomePage={false} />
          )}
        </div>
      </div>
    </BasicTemplate>
  );
};

export default withRouter(GoToPost);
