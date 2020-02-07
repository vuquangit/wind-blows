import React, { useState } from "react";
import { Comment, Button, Input, message } from "antd";
// import moment from "moment";
import axios from "axios";
import { get } from "lodash";
import { useSelector } from "react-redux";

const AddComments = ({
  postId = "",
  handleAddComments = () => {},
  setIsViewerComments = () => {}
}) => {
  const viewerId = useSelector(state => get(state, "profile.data.user.id"));

  const [text, setText] = useState("");
  const handleChangeText = e => setText(e.target.value);

  // fetch comments data
  const [isLoading, setIsLoading] = useState(false);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  const handleSubmit = async () => {
    if (!text) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/post/comments/add`,
        data: {
          userId: viewerId,
          postId: postId,
          text: text
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      // console.log("fetch comments data", response);
      handleAddComments(get(response, "data"));
      setText("");

      // scroll to bottom comments
      setIsViewerComments(true);
    } catch (err) {
      console.log(err);
      message.error("Comments this post error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="PI__info--post-comment">
      <Comment
        content={
          <div className="post-comment__content">
            <Input.TextArea
              rows={1}
              onChange={handleChangeText}
              onPressEnter={() => handleSubmit()}
              value={text}
              placeholder="Add a comment..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              disabled={isLoading}
            />
            <Button
              htmlType="submit"
              loading={isLoading}
              onClick={() => handleSubmit()}
              type="default"
              className="submit"
              disabled={!text}
            >
              Post
            </Button>
          </div>
        }
      />
    </section>
  );
};

export default AddComments;
