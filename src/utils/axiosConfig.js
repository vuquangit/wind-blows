import axios from "axios";
import { get, merge, isEqual } from "lodash";

const instance = axios.create();
instance.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "";

// You can intercept requests or responses before they are handled by then or catch.
// Add a request interceptor
instance.interceptors.request.use(
  // Do something before request is sent
  config => {
    const token = get(
      JSON.parse(localStorage.getItem("state") || {}),
      "profile.data.tokens.token",
      ""
    );

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

//Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
    console.log(error);

    if (
      error.response.status === 401 &&
      originalRequest.url === `${SERVER_BASE_URL}/auth/token`
    ) {
      // router.push("/login");
      console.log("Expired refresh token");

      //  useEffect to signOut
      localStorage.removeItem("state");
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      isEqual(error.response.data.message.message, "jwt expired")
    ) {
      originalRequest._retry = true;

      const refreshToken = get(
        JSON.parse(localStorage.getItem("state") || {}),
        "profile.data.tokens.refreshToken",
        ""
      );

      return instance
        .post("auth/token", {
          refreshToken: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            const token = get(res, "data.token", "");
            console.log("new token: ", token);

            const newToken = {
              profile: {
                data: {
                  tokens: {
                    token
                  }
                }
              }
            };

            const state = JSON.parse(localStorage.getItem("state")) || {};
            const serializedState = JSON.stringify(merge(state, newToken));
            localStorage.setItem("state", serializedState);

            if (token)
              originalRequest.headers["Authorization"] = "Bearer " + token;

            return axios(originalRequest);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
