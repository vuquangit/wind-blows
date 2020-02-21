import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="header__registration">
      <Link to="/accounts/emailsignup/">
        <Button className="header__registration--btn">Singup</Button>
      </Link>
      <Link to="/accounts/login/">
        <Button type="primary" className="header__registration--btn">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default Registration;
