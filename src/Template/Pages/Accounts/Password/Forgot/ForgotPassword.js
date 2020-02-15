import React, { useState, useEffect } from "react";
import { Input, Button, Divider, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import MouseParallax from "./MouseParallax";
import { useSpring } from "react-spring";
import axios from "axios";

const ResetPassword = ({ match = {}, location = {} }) => {
  // animition
  const [mouseParallax: props, setMouseParallax: set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));
  const calcMouseParallax = (x, y) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2
  ];

  //  email
  const [email, setEmail] = useState("");
  const handleChangeEmail = e => {
    setEmail(e.target.value);
    e.preventDefault();
  };

  // fetch
  const [state, setState] = useState({
    isLoading: false,
    data: {},
    isSendForgotPassword: false,
    error: null
  });

  const handleForgotPassord = async values => {
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
    const localhost = window.location.origin;
    console.log(match, location, window.location);

    try {
      setState(prevState => ({ ...prevState, isLoading: true }));

      const res = await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/users/forgot-password`,
        data: {
          email: email,
          localhost: localhost
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Edited profile :", res);
      setState(prevState => ({ ...prevState, isSendForgotPassword: true }));
    } catch (err) {
      console.log("Change password error ", err);

      setState(prevState => ({ ...prevState, error: err }));
    } finally {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  useEffect(() => {
    console.log(match);
  }, [match]);

  return (
    <div className="RP">
      <div
        className="RP__content"
        onMouseMove={({ clientX: x, clientY: y }) =>
          setMouseParallax({ xy: calcMouseParallax(x, y) })
        }
      >
        <div className="RP__content--item RP__content--icon">
          <MouseParallax mouseParallax={mouseParallax} />
        </div>
        {!state.isSendForgotPassword ? (
          <>
            <div className="RP__content--item">
              <h4 className="item__TLI">Trouble Logging In?</h4>
            </div>
            <div className="RP__content--item">
              <div className="item__description">
                Enter your username or email and we'll send you a link to get
                back into your account.
              </div>
            </div>
            <div className="RP__content--item">
              <Input
                placeholder="Email..."
                allowClear
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            {state.error && (
              <Typography.Text type="danger">
                Old password not correct
              </Typography.Text>
            )}
            <div className="RP__content--item">
              <Button
                type="primary"
                block
                onClick={handleForgotPassord}
                disabled={!email}
              >
                Send Login Link
              </Button>
            </div>
          </>
        ) : (
          <div>
            Success send link reset password to your email. Please open your
            mail enter to reset password.
          </div>
        )}

        <div className="RP__content--item">
          <Divider className="item__devider">OR</Divider>
        </div>
        <div className="RP__content--item">
          <Link to="/accounts/emailsignup/" className="item__CNA">
            Create New Account
          </Link>
        </div>
        <div className="RP__content--item">
          <div className="item__BTL">
            <Link to="/accounts/login/" className="item__BTL--content">
              Back To Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
