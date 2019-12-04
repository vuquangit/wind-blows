import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated } from "Redux/Action";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import SiteName from "Components/SiteName";
import Registration from "./Registration";
import "./signup.scss";

const EmailSignup = props => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated]);
  const dispatch = useDispatch();
  const onLoginClick = () => dispatch(setAuthenticated(true));

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__sign">
          <div className="signup__sign--content">
            <div className="form">
              <div className="form--header">
                <SiteName />
              </div>
              <div className="form--content">
                <h2 className="description">
                  Sign up to see photos and videos from your friends.
                </h2>
                <div className="loginFB">
                  <button
                    type="button"
                    className="loginFB__submit"
                    onClick={onLoginClick}
                  >
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span> Log in with Facebook</span>
                  </button>
                </div>
                <div className="divide">
                  <div className="divide__line" />
                  <div className="divide__text">or</div>
                  <div className="divide__line" />
                </div>
                <Registration />
              </div>
            </div>
            <div className="switch-sign">
              <p className="switch-sign--text">
                Have a account?
                <Link to="/accounts/login">
                  <button className="switch-btn">Log in</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EmailSignup);
