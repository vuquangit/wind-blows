import axios from "axios";
import { get, merge, endsWith } from "lodash";
// import { useDispatch  } from "react-redux";

// const dispatch = useDispatch();

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "";

const instance = axios.create();

// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

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
    console.log(originalRequest);

    if (
      error.response.status === 401 &&
      originalRequest.url === `${SERVER_BASE_URL}/auth/token`
    ) {
      // router.push("/login");
      console.log(
        "Go to page login",
        window.location.origin + endsWith(window.location.origin, "/")
          ? "/"
          : "" + "accounts/login"
      );

      // window.location.replace(
      //   window.location.origin + endsWith(window.location.origin, "/") &&
      //     "/" + "accounts/login"
      // );

      // dispatch(signOut());

      localStorage.removeItem("state");

      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = get(
        JSON.parse(localStorage.getItem("state") || {}),
        "profile.data.tokens.refreshToken",
        ""
      );

      return instance
        .post(`auth/token`, {
          refreshToken: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            const token = get(res, "data.token", "");
            const newToken = {
              profile: {
                data: {
                  tokens: {
                    token
                  }
                }
              }
            };

            console.log("new token", newToken);
            // console.log(originalRequest);

            const state = JSON.parse(localStorage.getItem("state")) || {};
            const serializedState = JSON.stringify(merge(state, newToken));
            localStorage.setItem("state", serializedState);

            if (token)
              originalRequest.headers["Authorization"] = "Bearer " + token;

            // console.log("set new token: ", originalRequest);

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
