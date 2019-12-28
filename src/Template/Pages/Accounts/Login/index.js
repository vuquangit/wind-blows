import React, { useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { setAuthenticated } from "Redux/Auth/auth.action";
import { withRouter } from "react-router";
import SiteName from "Components/SiteName";
import { Link } from "react-router-dom";
import Authorization from "Containers/Authorization";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import "./login.scss";

const Login = props => {
  // useEffect(() => {
  //   const isAuthenticated = props.auth.isAuthenticated;
  //   if (isAuthenticated) {
  //     props.history.push("/");
  //   }
  // }, [props.history, props.auth.isAuthenticated]);

  const { history } = props;
  const dispatch = useDispatch();
  const profile = useSelector((state = {}) => state.profile) || {};
  useEffect(() => {
    const isValidProfile = !isEmpty(profile.data);
    if (isValidProfile) {
      history.replace("/");
    }
  }, [dispatch, history, profile, profile.data]);

  return (
    <div className="login">
      <div className="login__sign">
        <div className="login__sign--content">
          <div className="form">
            <div className="form--header">
              <SiteName />
            </div>
            <div className="form--content">
              <LoginForm onLoginClick={props.onLoginClick} />
              <div className="divide">
                <div className="divide__line" />
                <div className="divide__text">or</div>
                <div className="divide__line" />
              </div>
              {/* <div className="loginFB"> */}
              <Authorization />
              {/* <button
                  type="button"
                  className="loginFB__submit"
                  onClick={props.onLoginClick}
                >
                  <FontAwesomeIcon icon={faFacebookSquare} />
                  <span> Log in with Facebook</span>
                </button> */}
              {/* </div> */}
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

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const mapDispactToProps = dispatch => {
  return {
    onLoginClick: e => {
      dispatch(setAuthenticated(true));
    }
  };
};

export default connect(mapStateToProps, mapDispactToProps)(withRouter(Login));
