import React from "react";
import BasicTemplate from "Template/BasicTemplate";
import WrapperMenuAccounts from "../WrapperMenuAccount";
import Temporary from "./Temporary";
// import "./editProfile.scss";

const Remove = () => {
  return (
    <BasicTemplate>
      <WrapperMenuAccounts>
        <Temporary />
      </WrapperMenuAccounts>
    </BasicTemplate>
  );
};

export default Remove;
