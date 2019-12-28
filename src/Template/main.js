import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "Containers/PrivateRoute";
import pageConfigs from "./pageConfigs";
import { MainWrapper } from "./main.style";
import { updateProfileInfo, signOut } from "Redux/Profile/profile.action";
import { setAuthenticated } from "Redux/Auth/auth.action";
import { pick, isEmpty } from "lodash";
import firebase from "firebase";
import Loading from "./Pages/Loading";

const Main = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state = {}) => state.profile.data);
  // const isFetching = useSelector((state = {}) => state.profile.isFetching);
  const isAuthenticated = useSelector(
    (state = {}) => state.auth.isAuthenticated
  );

  const _renderPage = () =>
    pageConfigs.map((route = {}, index) =>
      route.private ? (
        <PrivateRoute {...route} key={index} />
      ) : (
        <Route {...route} key={index} />
      )
    );

  useEffect(
    () => {
      if (isEmpty(profile)) {
        (isAuthenticated || firebase) &&
          firebase.auth().onAuthStateChanged(async user => {
            if (user) {
              // User is signed in.
              const data = pick(user, [
                "displayName",
                "email",
                "phoneNumber",
                "photoURL",
                "uid"
              ]);

              await dispatch(
                // updateProfileInfo({ data, endpoint: `oauth/${data.uid}` })
                setAuthenticated(true)
              );
            } else {
              dispatch(
                // signOut()
                setAuthenticated(false)
              );
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
        <Switch> {_renderPage()}</Switch>
      </MainWrapper>
    </BrowserRouter>
  );
};
export default Main;
