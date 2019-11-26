import React, { useState } from "react";
import CommentItem from "../CommentItem";
import CommentList from "./CommentList";
import Action from "./Action";
import Liked from "./Liked";
import CommentAdd from "./CommentAdd";

const InfoItem = ({ owner, caption = "" }) => {
  const [comments, setComments] = useState([
    {
      deleted: false,
      didReportAsSpam: false,
      id: "17846190187773179",
      isAuthorVerified: false,
      likeCount: 1,
      likedByViewer: false,
      postedAt: 1574427451,
      text: "Cái này là bình luận ảnh... kkk 😂😂",
      userId: "1545908582"
    }
  ]);

  return (
    <div className="content-info">
      <div style={{ overflow: "auto", flex: "1" }}>
        <CommentItem owner={owner} text={caption} isComment={false} />
        {comments.length > 0 && <CommentList comments={comments} />}
      </div>
      <Action />
      <Liked />
      <CommentAdd comments={comments} setComments={setComments} />
    </div>
  );
};

export default InfoItem;
