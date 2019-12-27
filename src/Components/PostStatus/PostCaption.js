import React from "react";
import { Input } from "antd";

const PostCaption = () => {
  const { TextArea } = Input;

  return (
    <div className="post-status__content--caption">
      <TextArea
        placeholder="Caption..."
        autoSize={{ minRows: 2, maxRows: 4 }}
        allowClear
      />
    </div>
  );
};

export default PostCaption;
