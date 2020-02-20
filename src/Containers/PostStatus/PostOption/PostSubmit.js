import React, { useState } from "react";
import { Button, message } from "antd";
import axios from "utils/axiosConfig";

const PostSubmit = ({ status = {}, clearStatus }) => {
  const enablePost = !status.sidecarChildren.length > 0;

  // post
  const [state, setState] = useState({
    isPosting: false,
    data: {},
    error: null
  });

  const fetchPostStatus = async () => {
    try {
      setState(prevState => ({ ...prevState, isPosting: true }));

      const res = await axios({
        method: "post",
        url: "/post/add",
        data: { ...status },
        headers: {
          "Content-Type": "application/json"
        }
      });

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
