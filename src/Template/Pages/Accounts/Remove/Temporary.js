import React, { useState } from "react";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import { Button, Row, Col, Popconfirm, message, Typography } from "antd";
import { Link } from "react-router-dom";

import axios from "utils/axiosConfig";
import { PasswordAdvance } from "Components/Input";
import "./temporary.scss";

const Temporary = () => {
  const { id = "", username = "" } = useSelector(
    (state = {}) => get(state, "profile.data.user", {}),
    isEqual()
  );

  const [password, setPassword] = useState("");
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const [state, setState] = useState({
    isLoading: false,
    data: {},
    error: null
  });

  const confirmDisableAccount = async () => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));

      const res = await axios({
        method: "post",
        url: "/users/deactivation",
        data: { userId: id, password },
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Disabled account: ", res);

      setState(prevState => ({ ...prevState, isLoading: false }));
    } catch (err) {
      setState(prevState => ({ ...prevState, isLoading: false, error: true }));

      console.log("Disable account error ", err);
      message.error("Disable account error");
    }
  };

  return (
    <article className="temporary">
      <div className="temporary__content">
        <h1>Temporarily Disable Your Account</h1>
        <p>
          Hi <span className="temporary__content--username">{username}</span> ,
        </p>
        <p>
          You can disable your account instead of deleting it. This means your
          account will be hidden until you reactivate it by logging back in.
        </p>
        {/* <p>You can only disable your account once a week.</p> */}
        <p className="temporary__content--title">Keeping Your Data Safe</p>
        <p>
          Nothing is more important to us than the safety and security of the
          The Wind Blows community. People put their trust in us by sharing
          moments of their lives on The Wind Blows. So we will never make any
          compromises when it comes to safeguarding your data.
        </p>
        <hr />
        <Row className="temporary__content--form-password">
          <Col xs={24} sm={12} md={12}>
            <label
              for="password"
              className="temporary__content--label-password"
            >
              To continue, please re-enter your password
            </label>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <div className=" temporary__content--password">
              <PasswordAdvance
                id="password"
                aria-required="true"
                placeholder="Password"
                className="input-password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Link className="forgot-password" to="/accounts/password/reset/">
                Forgot password?
              </Link>
            </div>
          </Col>
        </Row>
        <hr />
        <p>
          When you press the button below, your photos, comments and likes will
          be hidden until you reactivate your account by logging back in.
        </p>
        <div className="temporary__content--submit">
          <Typography.Text type="danger">
            {state.error ? `Something wrong, please check your password.` : ""}
          </Typography.Text>
          <Popconfirm
            title="You're about to temporarily disable your account. Go ahead?"
            onConfirm={confirmDisableAccount}
            okText="Yes"
            cancelText="No"
            overlayClassName="temporary-pop-confirm"
          >
            <Button type="danger" disabled={!password}>
              Temporarily Disable Account
            </Button>
          </Popconfirm>
        </div>
      </div>
    </article>
  );
};

export default Temporary;
