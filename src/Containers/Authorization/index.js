import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfileInfo } from "Redux/Profile/profile.action";
import { pick } from "lodash";

const Authorization = ({ history, location }) => {
  const dispatch = useDispatch();
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
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
        // console.log(data);

        await dispatch(updateProfileInfo({ data, endpoint: "auth/me" }));
        if (location.pathname !== "/") {
          history.push("/");
        }
      }
    }
  };

  // console.log("render author");

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default withRouter(Authorization);
