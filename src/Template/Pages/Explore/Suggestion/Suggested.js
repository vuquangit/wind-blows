import React from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";

import BasicTemplate from "Template/BasicTemplate";
import RelationshipList from "Containers/RelationshipList";

const Suggested = ({ isHomepage = false }) => {
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );

  const apiConfig = {
    method: "get",
    endpoint: "/explore/people/suggested",
    params: {
      userId: viewerId,
      limit: isHomepage ? 3 : 20,
      page: 1
    },
    headers: {
      "Content-Type": "application/json"
    }
  };

  return (
    <>
      {isHomepage ? (
        <RelationshipList {...apiConfig} />
      ) : (
        <BasicTemplate>
          <RelationshipList {...apiConfig} headerText="Suggested" />
        </BasicTemplate>
      )}
    </>
  );
};

export default Suggested;
