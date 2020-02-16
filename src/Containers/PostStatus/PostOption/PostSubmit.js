import React, { useState } from "react";
import { Button, message } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
import { get } from "lodash";

const PostSubmit = ({ status = {}, clearStatus }) => {
  const tokenUser = useSelector((state = {}) =>
    get(state, "profile.data.token", "")
  );

  const enablePost = !status.sidecarChildren.length > 0;

  // post
  const [state, setState] = useState({
    isPosting: false,
    data: {},
    error: null
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  const fetchPostStatus = async () => {
    try {
      setState(prevState => ({ ...prevState, isPosting: true }));

      const res = await Axios({
        method: "post",
        url: `${SERVER_BASE_URL}/post/add`,
        data: { ...status },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`
        }
      });

      // console.log(res);
      setState(prevState => ({ ...prevState, data: res.data }));

      // clear post
      clearStatus();

      // fetch personal post data
      // ....
    } catch (err) {
      console.log(err);
      message.error("Post status error: ", err);
    } finally {
      setState(prevState => ({ ...prevState, isPosting: false }));
    }
  };

  return (
    <div className="post-status__content--submit">
      <Button
        type="primary"
        loading={state.isPosting}
        onClick={fetchPostStatus}
        disabled={enablePost}
      >
        Post
      </Button>
    </div>
  );
};

export default PostSubmit;
