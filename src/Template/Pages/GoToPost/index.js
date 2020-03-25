import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "utils/axiosConfig";
import { useSelector } from "react-redux";
import { get } from "lodash";

import PostItem from "Containers/PostItem";
import BasicTemplate from "Template/BasicTemplate";
import Pinwheel from "Components/Loaders/Pinwheel";
import Page404 from "Template/Pages/404";
import "./goToPost.scss";

const GoToPost = ({ match = {} }) => {
  const postId = match.params.id;
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );

  const [state, setState] = useState({
    isLoading: true,
    data: {},
    error: null
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactPostData = async () => {
      try {
        const response = await axios({
          method: "post",
          url: "/post",
          data: {
            postId: postId,
            viewerId: viewerId
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        setState(prevState => ({
          ...prevState,
          error: false,
          data: response.data
        }));
      } catch (err) {
        console.log(err);
        setState(prevState => ({ ...prevState, error: err }));
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    feactPostData();

    return () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!state.error ? (
        <BasicTemplate>
          <div className="GTP">
            <div className="GTP__WPI">
              {state.isLoading ? (
                <div className="GTP__WPI--is-loading">
                  <Pinwheel isLoading size={100} />
                </div>
              ) : (
                <PostItem {...state.data} isHomePage={false} />
              )}
            </div>
          </div>
        </BasicTemplate>
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default withRouter(GoToPost);
