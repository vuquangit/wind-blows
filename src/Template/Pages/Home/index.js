import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "antd";
import { get, isEmpty, filter, find } from "lodash";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { StickyContainer, Sticky } from "react-sticky";

import axios from "utils/axiosConfig";
import BasicTemplate from "Template/BasicTemplate";
import PostItem from "Containers/PostItem";
import PostStatus from "Containers/PostStatus";
import Profile from "./HomeProfile";
import SuggestionForUser from "../Explore/Suggestion";
import Footer from "Template/Pages/Footer";
import Pinwheel from "Components/Loaders/Pinwheel";
import "./home.scss";

const HomePage = () => {
  // get posts
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const tokenUser = get(
    JSON.parse(localStorage.getItem("state") || {}),
    "profile.data.tokens.token",
    ""
  );

  const [state, setState] = useState({
    isLoading: true,
    data: [],
    error: null,
    limit: 12,
    page: 1,
    totalItem: 0
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "get",
          url: "/posts-following",
          params: {
            userId: viewerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        console.log("response fetch home", response);
        setState(prevState => ({
          ...prevState,
          data: [
            ...prevState.data,
            ...filter(
              response.data.data,
              o => find(prevState.data, p => p.id === o.id) === undefined
            )
          ],
          totalItem: get(response, "data.totalItem"),
          isLoading: false
        }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch homepage");
        } else {
          setState(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }));
          console.log("Error fetch homepage", error);
        }
      }
    };

    !isEmpty(tokenUser) && feactData();

    // unmount
    return () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page, tokenUser]);

  // load more item
  const hasMoreItems = state.data.length < state.totalItem;
  const getMoreItems = useCallback(() => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  }, [state.data.length, state.limit, state.page]);

  // new post status
  const handleAddNewPost = useCallback(item => {
    setState(prevState => ({
      ...prevState,
      data: [item, ...prevState.data],
      totalItem: prevState.totalItem + 1
    }));
  }, []);

  // render items
  const _renderPostItem = useCallback(
    items =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => (
        <div key={item.id || idx} className="home-post__item">
          <PostItem {...item} isHomePage />
        </div>
      )),
    []
  );

  // scroll
  const [isScrolled, setIsScrolled] = useState(false);
  var prevScrollpos = window.pageYOffset;
  window.onscroll = () => {
    if (document.getElementById("navbar")) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.transform = "none";
        setIsScrolled(false);
      } else if (currentScrollPos > 50) {
        document.getElementById("navbar").style.transform = "translateY(-100%)";
        setIsScrolled(true);
      }
      prevScrollpos = currentScrollPos;
    }
  };
  const stylesAdvanceScroll = {
    marginTop: isScrolled ? `30px` : `90px`
  };

  return (
    <StickyContainer>
      <div className="home">
        <div className="home__content">
          <Row>
            <Col xs={24} lg={17}>
              <div className="home__content--post">
                <div className="post-list">
                  <div className="post-list__post-status">
                    <PostStatus handleAddNewPost={handleAddNewPost} />
                  </div>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={getMoreItems}
                    hasMore={hasMoreItems}
                    threshold={300}
                  >
                    {_renderPostItem(state.data)}
                  </InfiniteScroll>
                  {state.isLoading && (
                    <div className="post-list__is-loading">
                      <Pinwheel isLoading size={100} />
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={0} lg={7}>
              <Sticky topOffset={0}>
                {({ style }) => (
                  <div className="home__content--advance" style={style}>
                    <div style={stylesAdvanceScroll} />
                    <Profile />
                    <SuggestionForUser />
                    <Footer isHomePage />
                  </div>
                )}
              </Sticky>
            </Col>
          </Row>
        </div>
      </div>
    </StickyContainer>
  );
};

// export default HomePage;

const WrappedHomePage = () => (
  <BasicTemplate footer={false}>
    <HomePage />
  </BasicTemplate>
);

export default WrappedHomePage;
