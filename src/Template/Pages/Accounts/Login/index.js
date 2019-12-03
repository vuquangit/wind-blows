import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { setAuthenticated } from "Redux/Action";
import { withRouter } from "react-router";
import SiteName from "Components/SiteName";
import { Link } from "react-router-dom";
import "./login.scss";

const Login = props => {
  useEffect(() => {
    const isAuthenticated = props.state.isAuthenticated;
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [props.history, props.state.isAuthenticated]);

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
              <div className="loginFB">
                <button
                  type="button"
                  className="loginFB__submit"
                  onClick={props.onLoginClick}
                >
                  <FontAwesomeIcon icon={faFacebookSquare} />
                  <span> Log in with Facebook</span>
                </button>
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

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispactToProps = dispatch => {
  return {
    onLoginClick: e => {
      dispatch(setAuthenticated(true));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispactToProps
)(withRouter(Login));
