import React, { useState, useMemo } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pick, get } from "lodash";

import Pinwheel from "Components/Loaders/Pinwheel";
import { updateProfileInfo } from "Redux/Profile/profile.action";
import "./authorization.scss";

const Authorization = ({ history = {}, location = {} }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state = {}) =>
    get(state, "profile.isFetching", false)
  );

  const [isAuthorization, setIsAuthorization] = useState(false);
  const handleAuthorization = () => setIsAuthorization(true);
  const handleNotAuthorization = () => setIsAuthorization(false);

  const uiConfig = useMemo(
    () => ({
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

          handleAuthorization(); // use for loading
          const data = { fullName, profilePictureUrl, ...rest };
          await dispatch(updateProfileInfo({ data, endpoint: "auth/me" }));
          if (location.pathname !== "/") {
            history.push("/");
          } else handleNotAuthorization();
        }
      }
    }),
    [dispatch, history, location.pathname]
  );

  return (
    <div className="authorization">
      {isAuthorization && isFetching ? (
        <div className="authorization__loading">
          <Pinwheel />
          <p className="authorization__loading--description">Authorizing...</p>
        </div>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
};

export default withRouter(Authorization);
