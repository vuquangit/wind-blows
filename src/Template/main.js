import React, { useEffect } from "react";
import { auth as firebaseAuth } from "firebase/app";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pick, isEmpty, get, isEqual } from "lodash";

import PrivateRoute from "Containers/PrivateRoute";
import pageConfigs from "./pageConfigs";
import { MainWrapper } from "./main.style";
import { updateProfileInfo } from "Redux/Profile/profile.action";
import Loading from "./Pages/Loading";
import ScrollIntoView from "Components/ScrollIntoView";
import { Auth } from "Components/Auth";
import { Notifications } from "Containers/Notifications";

const Main = () => {
  const signOut = Auth.useSignOut();
  const notificationPermission = Notifications.notificationPermission();

  const dispatch = useDispatch();
  const { data: profileData = {}, isFetching = false } = useSelector(
    (state = {}) => get(state, "profile", {}),
    // (left, right) => isEqual(left, right)
  );

  // login auto
  useEffect(
    () => {
      if (isEmpty(profileData)) {
        // Local Storage
        firebaseAuth &&
          firebaseAuth().onAuthStateChanged(async user => {
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
              signOut();
            }
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // when refersh ???
  const tokenUser = useSelector((state = {}) =>
    get(state, "profile.data.tokens.token", "")
  );
  useEffect(() => {
    !isEmpty(tokenUser) && notificationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenUser]);

  // refresh token expired => login
  useEffect(
    () => {
      const isExpiredRefreshToken = isEmpty(localStorage.getItem("state"));

      // before data store is not empty
      if (isExpiredRefreshToken && !isEmpty(profileData)) {
        signOut();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localStorage]
  );

  const isHomePage = window.location.pathname === "/";

  const _renderPage = () =>
    pageConfigs.map((route = {}, index) =>
      route.private ? (
        <PrivateRoute {...route} key={index} />
      ) : (
        <Route {...route} key={index} />
      )
    );

  return false ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <MainWrapper>
        <ScrollIntoView>
          <Switch>{_renderPage()}</Switch>
        </ScrollIntoView>
      </MainWrapper>
    </BrowserRouter>
  );
};
export default Main;
