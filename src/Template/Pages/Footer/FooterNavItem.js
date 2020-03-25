import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const FooterNavItem = ({ label = "", href = "", isHomePage = false }) => {
  const itemClass = classNames("nav__content--item", { HPFCI: isHomePage });
  return (
    <div className={itemClass}>
      <Link to={href}>{label}</Link>
    </div>
  );
};

export default FooterNavItem;
