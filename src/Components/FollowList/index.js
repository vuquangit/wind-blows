import React, { useCallback } from "react";
import FollowItem from "Components/UserRelationship";
import "./followList.scss";

const FollowList = ({ headerFollow = "", items = [] }) => {
  const _renderFollowItem = useCallback(
    () =>
      items.map((item, idx) => (
        <FollowItem
          key={item.user.id || idx}
          user={item.user}
          relationship={item.relationship}
        />
      )),
    [items]
  );

  return (
    <div className="follow-list">
      <div className="follow-list__header">
        <h1>{headerFollow}</h1>
      </div>
      <div>{_renderFollowItem()}</div>
    </div>
  );
};

export default FollowList;
