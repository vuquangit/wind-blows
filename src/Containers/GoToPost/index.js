import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { get } from "lodash";

import PostItem from "Containers/PostItem";
import BasicTemplate from "Template/BasicTemplate";
import IsLoading from "Components/IsLoading";
import Page404 from "Template/Pages/404";
import "./goToPost.scss";

const GoToPost = ({ match = {} }) => {
  const postId = match.params.id;
  const { id: viewerId = "" } = useSelector(
    (state = {}) => get(state, "profile.data.user") || {}
  );
  const tokenUser = useSelector((state = {}) =>
    get(state, "profile.data.token", "")
  );

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  const [state, setState] = useState({
    isLoading: true,
    data: {},
    error: null
  });

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
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenUser}`
          }
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
                  <IsLoading isLoading size={100} />
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
