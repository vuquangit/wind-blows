import React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShareButtonWrapper = ({
  icon = null,
  children = "",
  onClick = () => {}
}) => {
  return (
    <Button className="modal-btn" onClick={onClick}>
      <div className="modal-btn__icon">
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
      <div className="modal-btn__text">{children}</div>
    </Button>
  );
};

export default ShareButtonWrapper;
