import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

// import Loading from "Template/Pages/Loading";
import SiteName from "Components/SiteName";
import Authorization from "Containers/Authorization";
import "./login.scss";

const Login = ({ history }) => {
  // Redirect when signed
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { data: profileData, isFetching, message } =
    useSelector((state = {}) => state.profile) || {};
  useEffect(() => {
    // console.log("useEffect login");
    if (!isEmpty(profileData)) {
      history.push("/");
    }
  }, [dispatch, history, profileData]);

  // console.log("login");

  return (
    <div className="login">
      <div className="login__sign">
        <div className="login__sign--content">
          <div className="form">
            <div className="form--header">
              <SiteName />
            </div>
            <div className="form--content">
              <LoginForm />
              <div className="divide">
                <div className="divide__line" />
                <div className="divide__text">or</div>
                <div className="divide__line" />
              </div>
              <Authorization />
              <div>
                <Link to="/accounts/password/reset" className="forgot-password">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <div className="switch-sign">
            <p className="switch-sign--text">
              Don't have an account?
              <Link to="/accounts/emailsignup">
                <button className="switch-btn">Sign up</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
