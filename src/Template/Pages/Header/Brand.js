import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";

function Brand() {
  return (
    <a href="/" className="header__brand d-flex align-items-center">
      <FontAwesomeIcon icon={faFan} className="header__brand--icon" />
      <div className="header__brand--divide" />
      <h3 className="header__brand--text">The Wind Blows</h3>
    </a>
  );
}

export default Brand;
