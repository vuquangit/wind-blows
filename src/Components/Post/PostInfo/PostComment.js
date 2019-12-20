import React, { useState, useCallback } from "react";
import { Comment, Button, Input } from "antd";
import moment from "moment";

const PostComment = ({ propsComment = [], setComment }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (!value) {
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComment({
        ...propsComment,
        comments: [
          ...propsComment.comments,
          {
            deleted: false,
            didReportAsSpam: false,
            id: moment().format("YYYYMMDDHHmmSSS"),
            isAuthorVerified: false,
            likeCount: 0,
            likedByViewer: false,
            postedAt: (new Date().getTime() / 1000).toFixed(0),
            text: value,
            userId: "1545908582"
          }
        ]
      });
    }, 200);
  }, [propsComment, setComment, value]);

  const handleChange = e => setValue(e.target.value);

  return (
    <section className="PI__info--post-comment">
      <Comment
        content={
          <div className="post-comment__content">
            <Input.TextArea
              rows={1}
              onChange={handleChange}
              onPressEnter={handleSubmit}
              value={value}
              placeholder="Add a comment..."
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
            <Button
              htmlType="submit"
              loading={submitting}
              onClick={handleSubmit}
              type="default"
              className="submit"
              disabled={!value}
            >
              Post
            </Button>
          </div>
        }
      />
    </section>
  );
};

export default PostComment;
