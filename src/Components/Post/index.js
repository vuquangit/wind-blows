import React from "react";
import "./post.scss";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostOption from "./PostOption";
import classNames from "classnames";

const Post = ({ isModal = false, ...props } = {}) => {
  console.log(props);
  const classPostItem = classNames("PI", { PI__modal: isModal });

  return (
    <article className={classPostItem}>
      <PostHeader {...props.owner} isHomePage={props.isHomePage} />
      <PostImage src={props.src || ""} isModal={isModal} />
      <PostInfo
        numPreviewLikes={props.numPreviewLikes}
        postedAt={props.postedAt}
      />
      <PostOption />
    </article>
  );
};

export default Post;
