import React from "react";
// import { auth as firebaseAuth } from "firebase/app";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfileInfo } from "Redux/Profile/profile.action";
import { pick } from "lodash";
import { setAuthenticated } from "Redux/Auth/auth.action";

const Authorization = ({ history, location }) => {
  const dispatch = useDispatch();
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      // firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
      // firebaseAuth.FacebookAuthProvider.PROVIDER_ID
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      // signInSuccessWithAuthResult: () => false
      signInSuccessWithAuthResult: async (info = {}) => {
        const data = pick(info.user, [
          "displayName",
          "email",
          "phoneNumber",
          "photoURL",
          "uid"
        ]);
        // console.log(info);
        await dispatch(
          // updateProfileInfo({ data, endpoint: `oauth/${data.uid}` })
          setAuthenticated(true)
        );
        // if (location.pathname === 'login') {
        //   history.back()
        // }
        if (location.pathname !== "/") {
          history.push("/");
        }
      }
    }
  };

  console.log("render author");

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-4">
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth()} /> */}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default withRouter(Authorization);
