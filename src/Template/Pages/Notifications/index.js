import React, { useState, useEffect } from "react";
import { messaging } from "Firebases/init-fcm";
import "./notification.scss";

const Notifications = () => {
  const [token, setToken] = useState("");
  const [notifications, setNotifications] = useState([]);

  const registerPushListener = pushNotification =>
    navigator.serviceWorker.addEventListener("message", ({ data }) =>
      pushNotification(
        data.data
          ? data.data.message
          : data["firebase-messaging-msg-data"].data.message
      )
    );

  const sendTokenToServer = token => {
    //send to server...
    setToken(token);
  };

  const pushNotification = newNotification =>
    setNotifications(prevState => [...prevState, newNotification]);

  useEffect(() => {
    // // componentDidMount
    // const getToken = async () => {
    //   messaging
    //     .requestPermission() // ask
    //     .then(async function() {
    //       const currentToken = await messaging.getToken();
    //       //   setToken(token);
    //       sendTokenToServer(currentToken);

    //       console.log("get token successfully");
    //       // send token to server
    //     })
    //     .catch(function(err) {
    //       console.log("Unable to get permission to notify.", err);
    //     });

    //   registerPushListener(pushNotification);
    // };

    // https://rharshad.com/web-push-notifications-react-firebase/
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
          await sendTokenToServer(token);
          localStorage.setItem("GCM_TOKEN", token);
          permissionGranted = true;
        }

        setToken(localStorage.getItem("GCM_TOKEN"));
        registerPushListener(pushNotification);
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

    // getToken();
    notificationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(notifications);

  const renderNotification = (notification, i) => (
    <li key={i}>{notification}</li>
  );

  return (
    <div className="notification">
      <h1>React + Firebase Cloud Messaging (Push Notifications)</h1>
      <div>
        Current token is: <p>{token}</p>
      </div>
      <ul>
        Notifications List:
        {notifications.map(renderNotification)}
      </ul>
    </div>
  );
};

export default Notifications;
