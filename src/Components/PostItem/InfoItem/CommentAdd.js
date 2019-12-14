import React, { useState } from "react";
import { Comment, Button, Input } from "antd";
import moment from "moment";

const CommentAdd = ({ comments = [], setComments }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          deleted: false,
          didReportAsSpam: false,
          id: moment().format("YYYYMMDDHHmmSSS"),
          isAuthorVerified: false,
          likeCount: 0,
          likedByViewer: false,
          postedAt: moment().format(),
          text: value,
          userId: "1545908582"
        }
      ]);
    }, 200);
  };

  const handleChange = e => setValue(e.target.value);

  return (
    <div className="comment-add">
      <Comment
        content={
          <div className="comment-add__content">
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
    </div>
  );
};

export default CommentAdd;
