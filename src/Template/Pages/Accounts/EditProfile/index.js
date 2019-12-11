import React from "react";
import BasicTemplate from "Template/BasicTemplate";
import WrapperMenuAccounts from "../WrapperMenuAccount";
import EditProfile from "./EditProfile";
import "./editProfile.scss";

const Edit = () => {
  return (
    <BasicTemplate>
      <WrapperMenuAccounts>
        <EditProfile />
      </WrapperMenuAccounts>
    </BasicTemplate>
  );
};

export default Edit;
