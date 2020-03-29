import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, get, isEqual } from "lodash";
import { message, notification, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";

import axios from "utils/axiosConfig";
import { messaging } from "Firebases/init-fcm";
import {
  newNotifications,
  increaseFollowRequest
} from "Redux/Notifications/notification.action";

export class Notifications {
  static notificationPermission = () => {
    const dispatch = useDispatch();
    const { data: profileData = {} } = useSelector(
      (state = {}) => get(state, "profile", {}),
      isEqual()
    );

    const feactNewNoti = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "/users/notifications",
          params: {
            userId: get(profileData, "user.id") || "",
            limit: 1,
            page: 1
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = get(response, "data.data", []);
        await dispatch(newNotifications(data));
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("cancelled fetch notifications new");
        } else console.log(error);
      }
    };

    const pushNotification = async (data = {}) => {
      const icon = get(data, "notification.icon", "");

      notification.info({
        message: get(data, "notification.title", ""),
        description: get(data, "notification.body", ""),
        placement: "bottomLeft",
        duration: 5,
        icon: icon ? (
          <Avatar src={icon} />
        ) : (
          <FontAwesomeIcon icon={faFan} style={{ color: "rgb(0, 123, 255)" }} />
        ),
        onClick() {
          const endpoint = get(data, "fcmOptions.link");
          window.open(`${window.location.origin}${endpoint}`, "_blank");
        }
      });

      // update badge, store notification
      if (get(data, "notification.title", "") !== "New follow request")
        feactNewNoti();
      else await dispatch(increaseFollowRequest());
    };

    const registerPushListener = pushNotification =>
      navigator.serviceWorker.addEventListener("message", ({ data }) => {
        // console.log(data);
        !isEmpty(data) &&
          pushNotification(get(data, "firebase-messaging-msg-data"));
      });

    // save to server
    const sendTokenToServer = async token => {
      try {
        await axios({
          method: "post",
          url: "/users/notifications/add",
          data: {
            userId: get(profileData, "user.id") || "",
            token: token
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        // console.log("response notification save", response);

        // message.success("Token is saved in server");
      } catch (error) {
        console.log(error);
        message.error("save token failed");
      }
    };

    return async () => {
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
          localStorage.setItem("GCM_TOKEN", token);
          permissionGranted = true;
        }

        await sendTokenToServer(localStorage.getItem("GCM_TOKEN"));
        registerPushListener(pushNotification);
        // console.log("register FCM success");
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
  };
}
