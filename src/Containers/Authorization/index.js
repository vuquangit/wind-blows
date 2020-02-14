import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pick } from "lodash";

import { updateProfileInfo } from "Redux/Profile/profile.action";
import "./authorization.scss";

const Authorization = ({ history, location }) => {
  const dispatch = useDispatch();
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: async (info = {}) => {
        const {
          displayName: fullName,
          photoURL: profilePictureUrl,
          ...rest
        } = pick(info.user, [
          "displayName",
          "email",
          "phoneNumber",
          "photoURL",
          "emailVerified"
        ]);

        const data = { fullName, profilePictureUrl, ...rest };

        await dispatch(updateProfileInfo({ data, endpoint: "auth/me" }));
        if (location.pathname !== "/") {
          history.push("/");
        }
      }
    }
  };

  return (
    <div className="authorization">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default withRouter(Authorization);
