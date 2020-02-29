import React, { useState } from "react";
import { Input, Button, Divider, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import MouseParallax from "./MouseParallax";
import { useSpring } from "react-spring";
import axios from "utils/axiosConfig";

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
    const localhost = window.location.origin;

    try {
      setState(prevState => ({ ...prevState, isLoading: true }));

      const res = await axios({
        method: "post",
        url: "/users/forgot-password",
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

  const handleResendEmail = () => {
    setState(prevState => ({ ...prevState, isSendForgotPassword: false }));
  };

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
                onPressEnter={handleForgotPassord}
              />
            </div>
            {state.error && (
              <Typography.Text type="danger" className="RP__content--item">
                This email does not exist or has not been registered
              </Typography.Text>
            )}
            <div className="RP__content--item">
              <Button
                type="primary"
                block
                onClick={handleForgotPassord}
                loading={state.isLoading}
                disabled={!email}
              >
                Send Login Link
              </Button>
            </div>
          </>
        ) : (
          <div className="RP__content--sended">
            <h1>Check your email</h1>
            <p>
              We've sent an email to{" "}
              <span style={{ fontWeight: 600 }}>{email}</span>.
            </p>
            <p>
              Click the link in the email to reset your password. If you don't
              see the email, check other places it might be, like your junk,
              spam, social, or other folders
            </p>
            <Button onClick={handleResendEmail} className="btn-resend-mail">
              I didn't receive the email
            </Button>
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
