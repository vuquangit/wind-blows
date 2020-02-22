import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import "./isLoading.scss";

const Pinwheel = ({ isLoading = false, size = 24 }) => {
  return (
    <div className="is-loading">
      {isLoading && (
        <div className="is-loading__wrap">
          <FontAwesomeIcon
            icon={faFan}
            style={{ fontSize: size }}
            className="is-loading__wrap--icon"
          />
        </div>
      )}
    </div>
  );
};

export default Pinwheel;
