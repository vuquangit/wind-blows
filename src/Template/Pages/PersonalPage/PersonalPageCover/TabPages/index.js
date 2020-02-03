import React from "react";

import TabMenu from "./TabMenu";

const TabPages = ({ children }) => {
  return (
    <div className="personal__tab-pages">
      <TabMenu />
      <div className="personal__tab-pages--children">{children}</div>
    </div>
  );
};

export default TabPages;
