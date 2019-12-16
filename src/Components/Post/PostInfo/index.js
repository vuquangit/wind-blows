import React, { useState } from "react";
import PostAction from "./PostAction";
import PeopleLiked from "./PeopleLiked";
import CommentList from "./CommentList";
import PostTimeAgo from "./PostTimeAgo";
import PostComment from "./PostComment";

const PostInfo = ({ numPreviewLikes, postedAt }) => {
  const [comments, setComments] = useState([
    {
      deleted: false,
      didReportAsSpam: false,
      id: "17846190187773179",
      isAuthorVerified: false,
      likeCount: 1,
      likedByViewer: false,
      postedAt: 1574427451,
      text: "Cái này là bình luận ảnh 1... kkk 😂😂",
      userId: "1545908582"
    }
  ]);

  return (
    <div className="PI__info">
      <PostAction />
      <PeopleLiked numPreviewLikes={numPreviewLikes} />
      <CommentList comments={comments} />
      <PostTimeAgo postedAt={postedAt} />
      <PostComment />
    </div>
  );
};

export default PostInfo;
