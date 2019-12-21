import React from "react";
import { Input, Button, Divider } from "antd";
import { Link } from "react-router-dom";
import MouseParallax from "./MouseParallax";
import { useSpring } from "react-spring";

const ResetPassword = () => {
  const [mouseParallax: props, setMouseParallax: set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  const calcMouseParallax = (x, y) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2
  ];

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
        <div className="RP__content--item">
          <h4 className="item__TLI">Trouble Logging In?</h4>
        </div>
        <div className="RP__content--item">
          <div className="item__description">
            Enter your username or email and we'll send you a link to get back
            into your account.
          </div>
        </div>
        <div className="RP__content--item">
          <Input placeholder="Email, Phone or Username" allowClear />
        </div>
        <div className="RP__content--item">
          <Button type="primary" block>
            Send Login Link
          </Button>
        </div>
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

export default ResetPassword;
