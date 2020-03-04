import React, { useState } from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./undoDeleted.scss";

const UndoDeleted = ({ handleUndoDelete = () => {} }) => {
  const [isClosed, setIsClosed] = useState(false);
  const handleCloseUndo = () => setIsClosed(true);

  return (
    !isClosed && (
      <div className="undo-deleted">
        <div className="undo-deleted__content">
          <div>This item has been deleted.</div>
          <Button
            onClick={handleUndoDelete}
            className="undo-deleted__content--btn-undo"
          >
            Undo
          </Button>
        </div>
        <div className="undo-deleted__close">
          <Button onClick={handleCloseUndo}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>
    )
  );
};

export default UndoDeleted;
