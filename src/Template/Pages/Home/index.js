import React from "react";
import { withRouter } from "react-router-dom";
import BasicTemplate from "Template/BasicTemplate";
import "./home.scss";
import items from "./mock1.json";
import PostItem from "Components/Post";
import { Row, Col } from "antd";
import Profile from "./Profile";
import SuggestionFollow from "./SuggestionFollow";
import Footer from "Template/Pages/Footer";

const HomePage = () => {
  const _renderItem = () =>
    items.map((item, idx) => (
      <div key={item.id || idx} className="home-post__item">
        <PostItem {...item.post} isHomePage={true} />
      </div>
    ));

  // Select data profile login

  return (
    <BasicTemplate footer={false}>
      <div className="home">
        <div className="home__content">
          <Row>
            <Col xs={24} md={17}>
              <div className="home__content--post">{_renderItem()}</div>
            </Col>
            <Col xs={0} md={7}>
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
