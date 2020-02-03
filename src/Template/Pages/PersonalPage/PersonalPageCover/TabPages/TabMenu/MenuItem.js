import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get, isEqual } from "lodash";
import classNames from "classnames";

const MenuItem = ({ href, icon, label, match }) => {
  const usernameURL = get(match, "params.username");
  const toLink = `/${usernameURL}${href}`;

  // styles
  const urlCurrent = get(match, "url");
  const classTabItem = classNames("tab-item", {
    "tab-item-active": isEqual(urlCurrent, toLink)
  });

  return (
    <Link to={toLink} className={classTabItem}>
      <span>
        <FontAwesomeIcon icon={icon} />
        <span className="tab-item__text">{label}</span>
      </span>
    </Link>
  );
};

export default withRouter(MenuItem);
