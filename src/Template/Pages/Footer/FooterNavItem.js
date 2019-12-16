import React from "react";
import { Link } from "react-router-dom";

const FooterNavItem = ({ label = "", href = "" }) => {
  return (
    <div className="nav__content--item">
      <Link to={href}>{label}</Link>
    </div>
  );
};

export default FooterNavItem;
