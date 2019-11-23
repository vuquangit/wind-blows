import React, { useState } from "react";
import CaptionItem from "./CaptionItem";
import CommentList from "./CommentList";
import Action from "./Action";
import Liked from "./Liked";
import CommentAdd from "./CommentAdd";

const InfoItem = ({ owner, caption = "" }) => {
  const [comments, setComments] = useState([]);

  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}
      <CaptionItem owner={owner} caption={caption} />
      <Action />
      <Liked />
      <CommentAdd comments={comments} setComments={setComments} />
    </div>
  );
};

export default InfoItem;
