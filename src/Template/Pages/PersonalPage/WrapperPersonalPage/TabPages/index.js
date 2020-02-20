import React from "react";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";

import TabMenu from "./TabMenu";

const TabPages = ({ children }) => {
  const { id: viewerId = "" } = useSelector(state =>
    get(state, "profile.data.user", {})
  );
  const { id: ownerId = "" } = useSelector(state =>
    get(state, "personalProfile.data.user", {})
  );
  const isOwner = isEqual(viewerId, ownerId);

  return (
    <div className="personal__tab-pages">
      {isOwner && <TabMenu />}
      <div className="personal__tab-pages--children">{children}</div>
    </div>
  );
};

export default TabPages;
