import React from "react";
import { withRouter } from "react-router-dom";
import BasicTemplate from "Template/BasicTemplate";
import "./home.scss";
import items from "./mock1.json";
import PostItem from "Components/PostItem";

const HomePage = () => {
  const _renderItem = () =>
    items.map((item, idx) => (
      <div
        key={item.id || idx}
        style={{
          height: "500px",
          border: "1px solid rgb(208, 208, 208)",
          margin: "16px 0"
        }}
      >
        <PostItem {...item.post} className="home-post" />
      </div>
    ));

  return (
    <BasicTemplate>
      <div className="home">{_renderItem()}</div>
    </BasicTemplate>
  );
};

export default withRouter(HomePage);
