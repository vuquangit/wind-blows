import React from "react";
import BasicTemplate from "Template/BasicTemplate";
import FollowList from "Components/FollowList";
import FollowersList from "./mockFollowers.json";

const Followers = () => {
  return (
    <BasicTemplate>
      <FollowList headerFollow="Followers" {...FollowersList} />
    </BasicTemplate>
  );
};

export default Followers;
