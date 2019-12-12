import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";
import "./activity.scss";
import stories from "./stories.json";
import ActivityItem from "./ActivityItem";

const Activity = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const _renderActivityItem = () =>
    stories.map((item, idx) => <ActivityItem {...item} key={item.id || idx} />);
  return (
    <div className="activity">
      <Badge
        count={999}
        overflowCount={99}
        onClick={() => setIsVisibleModal(true)}
      >
        <FontAwesomeIcon icon={faHeartbeat} title="Activity" />
      </Badge>
      {isVisibleModal && (
        <div>
          <div className="activity__modal">
            <div
              className="activity__modal--a"
              onClick={() => setIsVisibleModal(false)}
            ></div>
            <div className="activity__modal--b"></div>
            <div className="activity__modal--c"></div>
            <div className="activity__modal--d">
              <div className="activity__content">
                <div className="activity__content--L1">
                  <div className="activity__content--L2">
                    {_renderActivityItem()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
