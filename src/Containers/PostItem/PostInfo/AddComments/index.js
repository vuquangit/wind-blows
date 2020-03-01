import React, { useState, useRef } from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { Comment, Button, Input, message } from "antd";

import axios from "utils/axiosConfig";
import AvatarUser from "Components/AvatarUser";
import Emoij from "Containers/Emoij";

const AddComments = ({
  postId = "",
  handleAddComments = () => {},
  setIsViewerComments = () => {}
}) => {
  const {
    id: viewerId = "",
    profilePicturePublicId = "",
    profilePictureUrl = ""
  } = useSelector(state => get(state, "profile.data.user", {}));

  const textInput = useRef(null);
  const [text, setText] = useState("");
  const handleChangeText = e => setText(e.target.value);

  // fetch comments data
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    if (!text) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: "/post/comments/add",
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

      console.log(textInput);
      textInput.current.focus();
    } catch (err) {
      console.log(err);
      message.error("Comments this post error");
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectEmoij = emoji => setText(prevState => prevState + emoji.native);

  return (
    <section className="PI__info--post-comment">
      <div className="post-comment">
        <div className="post-comment__avatar">
          <AvatarUser
            profilePicturePublicId={profilePicturePublicId}
            profilePictureUrl={profilePictureUrl}
          />
        </div>
        <Comment
          content={
            <div className="post-comment__content">
              <div className="post-comment__content--text">
                <Input.TextArea
                  rows={1}
                  onChange={handleChangeText}
                  onPressEnter={() => handleSubmit()}
                  value={text}
                  placeholder="Add a comment..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  disabled={isLoading}
                  ref={textInput}
                />
                <div className="comment-emoij">
                  <Emoij onSelect={onSelectEmoij} />
                </div>
              </div>
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
      </div>
    </section>
  );
};

export default AddComments;
