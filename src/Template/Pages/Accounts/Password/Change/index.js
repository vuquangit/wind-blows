import React from "react";
import BasicTemplate from "Template/BasicTemplate";
import WrapperMenuAccounts from "Template/Pages/Accounts/WrapperMenuAccount";
import ChangePassword from "./ChangePassword";

const Change = () => {
  return (
    <BasicTemplate>
      <WrapperMenuAccounts>
        <ChangePassword />
      </WrapperMenuAccounts>
    </BasicTemplate>
  );
};

export default Change;
