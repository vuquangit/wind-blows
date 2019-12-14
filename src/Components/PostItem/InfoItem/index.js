import React, { useState } from "react";
import { Row, Col } from "antd";
import CommentItem from "../CommentItem";
import CommentList from "./CommentList";
import Action from "./Action";
import Liked from "./Liked";
import CommentAdd from "./CommentAdd";

const InfoItem = ({ owner, caption = "", numLikes = 0 }) => {
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
    <div className="info-item">
      <Row>
        <Col xs={24} sm={24} md={0}>
          <Action />
          <Liked numLikes={numLikes} />
        </Col>
      </Row>
      <div className="info-item__comments">
        <div className="comments-wrapper">
          <CommentItem owner={owner} text={caption} isComment={false} />
          {comments.length > 0 && <CommentList comments={comments} />}
        </div>
      </div>
      <Row>
        <Col xs={0} sm={0} md={24}>
          <Action />
          <Liked numLikes={numLikes} />
        </Col>
      </Row>
      <CommentAdd comments={comments} setComments={setComments} />
    </div>
  );
};

export default InfoItem;
