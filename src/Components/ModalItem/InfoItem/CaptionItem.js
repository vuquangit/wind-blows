import React from "react";
import Owner from "../HeaderItem/Owner";

const CaptionItem = ({ owner, caption = "" }) => {
  return (
    <div>
      {caption && (
        <div>
          <Owner {...owner} />
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
};

export default CaptionItem;
