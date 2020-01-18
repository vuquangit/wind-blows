import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pick, isEmpty } from "lodash";
import firebase from "firebase";

import PrivateRoute from "Containers/PrivateRoute";
import pageConfigs from "./pageConfigs";
import { MainWrapper } from "./main.style";
import { updateProfileInfo, signOut } from "Redux/Profile/profile.action";
// import Loading from "./Pages/Loading";

const Main = () => {
  const dispatch = useDispatch();
  const { data: profileData } = useSelector((state = {}) => state.profile);

  const _renderPage = () =>
    pageConfigs.map((route = {}, index) =>
      route.private ? (
        <PrivateRoute {...route} key={index} />
      ) : (
        <Route {...route} key={index} />
      )
    );

  // console.log("main homepage", profileData);

  useEffect(
    () => {
      if (isEmpty(profileData)) {
        // Local Storage
        firebase &&
          firebase.auth().onAuthStateChanged(async user => {
            console.log("use Effect Homapage");
            if (user) {
              // User is signed in.
              const {
                displayName: fullName,
                photoURL: profilePictureUrl,
                ...rest
              } = pick(user, [
                "displayName",
                "email",
                "phoneNumber",
                "photoURL",
                "emailVerified"
              ]);

              const data = { fullName, profilePictureUrl, ...rest };
              await dispatch(updateProfileInfo({ data, endpoint: "auth/me" }));
            } else {
              dispatch(signOut());
            }
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <BrowserRouter>
      <MainWrapper>
        <Switch>{_renderPage()}</Switch>
      </MainWrapper>
    </BrowserRouter>
  );
};
export default Main;
