import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pick, isEmpty, get } from "lodash";
import firebase from "firebase";
import axios from "axios";
import { message, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";

import PrivateRoute from "Containers/PrivateRoute";
import pageConfigs from "./pageConfigs";
import { MainWrapper } from "./main.style";
import { updateProfileInfo, signOut } from "Redux/Profile/profile.action";
import Loading from "./Pages/Loading";
import { newNotifications } from "Redux/Notifications/notification.action";
import { messaging } from "Firebases/init-fcm";

const Main = () => {
  const dispatch = useDispatch();
  const { data: profileData = {}, isFetching = false } = useSelector(
    (state = {}) => state.profile
  );
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

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
              console.log("firebase login");

              !isEmpty(profileData) && notificationPermission();
            } else {
              dispatch(signOut());
            }
          });
      } else {
        !isEmpty(profileData) && notificationPermission();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // notifications
  const sourceNoti = axios.CancelToken.source();
  const feactNewNoti = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${SERVER_BASE_URL}/users/notifications`,
        params: {
          userId: get(profileData, "user.id") || "",
          limit: 1,
          page: 1
        },
        headers: {
          "Content-Type": "application/json"
        },
        cancelToken: sourceNoti.token
      });

      console.log("respone notifications", response);
      const data = get(response, "data.data") || [];
      await dispatch(newNotifications(data));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("cancelled fetch notifications new");
      } else console.log(error);
    }
  };

  const notificationPermission = async () => {
    let permissionGranted = false;
    try {
      /* request permission if not granted */
      if (Notification.permission !== "granted") {
        await messaging.requestPermission();
      }

      /* get instance token if not available */
      if (localStorage.getItem("GCM_TOKEN") !== null) {
        permissionGranted = true;
      } else {
        const token = await messaging.getToken(); // returns the same token on every invocation until refreshed by browser
        // await sendTokenToServer(token);
        localStorage.setItem("GCM_TOKEN", token);
        permissionGranted = true;
      }

      await sendTokenToServer(localStorage.getItem("GCM_TOKEN"));
      registerPushListener(pushNotification);
      console.log("register FCM success:", localStorage.getItem("GCM_TOKEN"));
    } catch (err) {
      console.log(err);
      if (
        err.hasOwnProperty("code") &&
        err.code === "messaging/permission-default"
      )
        console.log("You need to allow the site to send notifications");
      else if (
        err.hasOwnProperty("code") &&
        err.code === "messaging/permission-blocked"
      )
        console.log(
          "Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings"
        );
      else console.log("Unable to subscribe you to notifications");
    } finally {
      return permissionGranted;
    }
  };

  const pushNotification = (data = {}) => {
    notification.info({
      message: get(data, "notification.title") || "",
      description: get(data, "notification.body") || "",
      placement: "bottomLeft",
      duration: 5,
      icon: (
        <FontAwesomeIcon icon={faFan} style={{ color: "rgb(0, 123, 255)" }} />
      ),
      onClick() {
        const endpoint = get(data, "fcmOptions.link");
        window.open(`${window.location.origin}${endpoint}`, "_blank");
      }
    });

    // update badge, store notification
    feactNewNoti();
  };

  const registerPushListener = pushNotification =>
    navigator.serviceWorker.addEventListener("message", ({ data }) => {
      console.log(data);
      !isEmpty(data) &&
        pushNotification(get(data, "firebase-messaging-msg-data"));
    });

  // save to server
  const sendTokenToServer = async token => {
    try {
      const response = await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/users/notifications/add`,
        data: {
          userId: get(profileData, "user.id") || "",
          token: token
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("response fetch", response);

      message.success("Token is saved in server");
    } catch (error) {
      console.log(error);
      message.error("save token failed");
    }
  };

  return isFetching ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <MainWrapper>
        <Switch>{_renderPage()}</Switch>
      </MainWrapper>
    </BrowserRouter>
  );
};
export default Main;
