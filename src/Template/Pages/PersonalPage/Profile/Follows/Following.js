import React from "react";
import BasicTemplate from "Template/BasicTemplate";
import FollowList from "Components/FollowList";
import FollowingList from "./mockFollowing.json";

const Following = () => {
  return (
    <BasicTemplate>
      <FollowList headerFollow="Following" {...FollowingList} />
    </BasicTemplate>
  );
};

export default Following;
