import React, { useState, useRef } from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { Comment, Button, Input, message } from "antd";

import axios from "utils/axiosConfig";
import AvatarUser from "Components/AvatarUser";
import Emoji from "Containers/Emoji";
import Search from "Template/Pages/Search";

const AddComments = ({
  postId = "",
  parentCommentId = "",
  isRepply = false,
  replyTo = "",
  handleAddComment = () => {},
  setIsViewerComments = () => {}
}) => {
  const {
    id: viewerId = "",
    profilePicturePublicId = "",
    profilePictureUrl = ""
  } = useSelector(state => get(state, "profile.data.user", {}));

  const textInput = useRef(null);
  const [text, setText] = useState(replyTo ? `@${replyTo} ` : "");
  const [valueSearch, setValSearch] = useState("");

  const handleChangeText = e => {
    const val = e.target.value;

    const valSearch = val.match(/@([a-z\d_]+$)/gi);
    if (valSearch) {
      // console.log("searching: ", String(valSearch).substring(1));
      setValSearch(String(valSearch).substring(1));
    } else {
      setValSearch("");
      // console.log("searching close ");
    }

    setText(val);
  };

  const handleSelectSearchItem = val => {
    const _text = text.endsWith("@" + valueSearch)
      ? text.substring(0, text.length - valueSearch.length) + val + " "
      : text;
    setText(_text);
  };

  // fetch comments data
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    if (!text) {
      // console.log("comment empty");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: "/post/comments/add",
        data: {
          userId: viewerId,
          postId,
          text: text,
          parentCommentId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      // console.log("fetch comments data", response);
      handleAddComment(get(response, "data", {}));
      setText("");

      // scroll to bottom comments
      setIsViewerComments(true);

      // console.log(textInput);
      textInput.current.focus();
    } catch (err) {
      console.log(err);
      message.error("Comments this post error");
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectEmoji = emoji => setText(prevState => prevState + emoji.native);

  const Submit = () => (
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
  );

  return (
    <section className="post-comment">
      <Comment
        avatar={
          <div className="post-comment__avatar">
            <AvatarUser
              profilePicturePublicId={profilePicturePublicId}
              profilePictureUrl={profilePictureUrl}
              size={32}
            />
          </div>
        }
        content={
          <>
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
                  allowClear
                />
                <div className="comment-emoji">
                  <Emoji onSelect={onSelectEmoji} style={{ top: "20px" }} />
                </div>
              </div>
              {!isRepply && <Submit />}
            </div>
            {isRepply && <Submit />}
          </>
        }
      />

      {valueSearch && (
        <Search
          isTagPeople
          valueSearch={valueSearch}
          handleSelectSearchItem={handleSelectSearchItem}
        />
      )}
    </section>
  );
};

export default AddComments;
