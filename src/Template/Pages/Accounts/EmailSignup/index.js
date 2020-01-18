import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

import SiteName from "Components/SiteName";
import Registration from "./Registration";
import Authorization from "Containers/Authorization";
import Loading from "Template/Pages/Loading";
import "./signup.scss";

const EmailSignup = ({ history }) => {
  //Is signed
  const dispatch = useDispatch();
  const { data: profileData, isFetching, message } =
    useSelector((state = {}) => state.profile) || {};
  useEffect(() => {
    if (!isEmpty(profileData)) {
      history.push("/");
    }
  }, [dispatch, history, profileData, isFetching]);

  // console.log("signup");

  return (
    <>
      {isFetching && !isEmpty(profileData) ? (
        <Loading />
      ) : (
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
                    <Authorization />
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
      )}
    </>
  );
};

export default withRouter(EmailSignup);
