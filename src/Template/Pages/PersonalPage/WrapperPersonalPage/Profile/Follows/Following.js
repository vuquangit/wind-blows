import React from "react";
import BasicTemplate from "Template/BasicTemplate";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import RelationshipList from "Containers/RelationshipList";

const Following = ({ match = {}, isModal = false }) => {
  const { id: viewerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  const username = get(match, "params.username");

  const apiConfig = {
    method: "GET",
    endpoint: "/follows/following/username",
    params: {
      page: 1,
      limit: 20,
      username: username,
      viewerId: viewerId
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return (
    <>
      {isModal ? (
        <RelationshipList {...apiConfig} headerText="Following" />
      ) : (
        <BasicTemplate>
          <RelationshipList {...apiConfig} headerText="Following" />
        </BasicTemplate>
      )}
    </>
  );
};

export default withRouter(Following);
