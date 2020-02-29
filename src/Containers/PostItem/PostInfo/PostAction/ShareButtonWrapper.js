import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShareButtonWrapper = ({ icon = null, children = "" }) => {
  return (
    <div className="modal-btn">
      <div className="modal-btn__icon">
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
      <div className="modal-btn__text">{children}</div>
    </div>
  );
};

export default ShareButtonWrapper;
