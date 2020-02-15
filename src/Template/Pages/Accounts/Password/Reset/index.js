import React from "react";
// import BasicTemplate from "Template/BasicTemplate";
import UpdatePassword from "../Update";
import "./reset.scss";

const Reset = () => {
  return (
    <div className="reset-password">
      <div className="reset-password__content">
        <UpdatePassword isResetPassword />
      </div>
    </div>
  );
};

export default Reset;
