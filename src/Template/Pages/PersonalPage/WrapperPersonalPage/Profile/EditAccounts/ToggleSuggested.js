import React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";

const ToggleSuggested = ({ handleToggleSuggested = () => {} }) => {
  return (
    <Button
      onClick={handleToggleSuggested}
      className="profile-toggle-suggested-btn"
    >
      <FontAwesomeIcon icon={faCaretSquareDown} />
    </Button>
  );
};

export default ToggleSuggested;
