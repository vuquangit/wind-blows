import React, { useState } from "react";
import { Button, message } from "antd";
import { omit } from "lodash";

import axios from "utils/axiosConfig";

const PostSubmit = ({
  status = {},
  clearStatus = () => {},
  handleCancelStatusFocus = () => {},
  handleAddNewPost = () => {}
}) => {
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

      const sidecarChildren =
        status && status.sidecarChildren.length > 0
          ? status.sidecarChildren.map(item => {
              return omit(item, [
                "uuidFile",
                "isUploaded",
                "isUploadError",
                "isConverted",
                "base64"
              ]);
            })
          : [];

      const res = await axios({
        method: "post",
        url: "/post/add",
        data: { ...status, sidecarChildren },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(res.data);
      setState(prevState => ({ ...prevState, data: res.data }));

      // clear post
      clearStatus({ posted: true });
      handleCancelStatusFocus();

      // show post
      handleAddNewPost(res.data);

      message.success("Post status success ");
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
