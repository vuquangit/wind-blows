import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import { get } from "lodash";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import BasicTemplate from "Template/BasicTemplate";
import PostItem from "Containers/PostItem";
import PostStatus from "Containers/PostStatus";
import Profile from "./HomeProfile";
import SuggestionFollow from "./SuggestionFollow";
import Footer from "Template/Pages/Footer";
import IsLoading from "Components/IsLoading";
import "./home.scss";

const HomePage = () => {
  // get posts
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );
  const tokenUser = useSelector((state = {}) =>
    get(state, "profile.data.token", "")
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

  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "get",
          url: `${SERVER_BASE_URL}/posts-following`,
          params: {
            userId: viewerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenUser}`
          },
          cancelToken: source.token
        });

        console.log("response fetch home", response);
        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.data],
          totalItem: get(response, "data.totalItem"),
          isLoading: false
        }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch home");
        } else {
          setState(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }));
          console.log(error);
        }
      } finally {
        // !isEmpty(state) &&
        //   setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    console.log("fetch home posts");
    feactData();

    // unmount
    return () => {
      source.cancel();
    };
  }, [SERVER_BASE_URL, state.limit, state.page, tokenUser, viewerId]);

  // load more item
  const hasMoreItems = state.data.length < state.totalItem;
  const getMoreItems = () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  // render items
  const _renderPostItem = () =>
    state &&
    state.data.length > 0 &&
    state.data.map((item, idx) => (
      <div key={item.id || idx} className="home-post__item">
        <PostItem {...item} isHomePage />
      </div>
    ));

  return (
    <BasicTemplate footer={false}>
      <div className="home">
        <div className="home__content">
          <Row>
            <Col xs={24} lg={17}>
              <div className="home__content--post">
                <div className="post-list">
                  <div className="post-list__post-status">
                    <PostStatus />
                  </div>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={getMoreItems}
                    hasMore={hasMoreItems}
                    threshold={300}
                  >
                    {_renderPostItem()}
                  </InfiniteScroll>
                  {state.isLoading && (
                    <div className="post-list__is-loading">
                      <IsLoading isLoading size={100} />
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={0} lg={7}>
              <div className="home__content--advance">
                <Profile />
                <SuggestionFollow />
                <Footer isHomePage />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </BasicTemplate>
  );
};

export default withRouter(HomePage);
