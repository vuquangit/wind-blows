import React from "react";
import BasicTemplate from "Template/BasicTemplate";
import WrapperMenuAccounts from "Template/Pages/Accounts/WrapperMenuAccount";
import ResetPassword from "./ResetPassword";

const Change = () => {
  return (
    <BasicTemplate>
      <WrapperMenuAccounts>
        <ResetPassword />
      </WrapperMenuAccounts>
    </BasicTemplate>
  );
};

export default Change;
