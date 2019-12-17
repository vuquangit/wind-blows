import React from "react";
import "./post.scss";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostOption from "./PostOption";

const Post = (props = {}) => {
  // console.log(props);

  return (
    <article className="PI">
      <PostHeader {...props.owner} isHomePage={props.isHomePage} />
      <PostImage src={props.src || ""} />
      <PostInfo
        numPreviewLikes={props.numPreviewLikes}
        postedAt={props.postedAt}
      />
      <PostOption />
    </article>
  );
};

export default Post;
