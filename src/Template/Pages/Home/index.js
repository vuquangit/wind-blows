import React from "react";
import { withRouter } from "react-router-dom";
import BasicTemplate from "Template/BasicTemplate";
import "./home.scss";
import items from "./mock1.json";
import PostItem from "Components/Post";
// import GoToPost from "Components/GoToPost";

const HomePage = () => {
  const _renderItem = () =>
    items.map((item, idx) => (
      <div key={item.id || idx} className="home__content--item">
        <PostItem {...item.post} />
      </div>
    ));

  return (
    <BasicTemplate>
      <div className="home">
        <div className="home__content">{_renderItem()}</div>
      </div>
      {/* <GoToPost /> */}
    </BasicTemplate>
  );
};

export default withRouter(HomePage);
