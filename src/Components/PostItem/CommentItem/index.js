import React from "react";
import Owner from "../Owner";
import Heart from "../../HeartIcon";

const CommentItem = ({
  owner = {
    counts: {},
    fullName: "Chàng Gió 🐾",
    id: "1503958910",
    isNew: false,
    isPrivate: true,
    isUnpublished: false,
    isVerified: false,
    profilePictureUrl:
      "https://instagram.fsgn10-1.fna.fbcdn.net/vp/39973f360706d4534351a62450699a00/5E8A89EA/t51.2885-19/s150x150/71923290_1268065506699728_3810998054530580480_n.jpg?_nc_ht=instagram.fsgn10-1.fna.fbcdn.net",
    username: "chang.gio"
  },
  text = "",
  isComment
}) => {
  return (
    <div className="comment">
      {text && (
        <div className="comment__content">
          <div className="item-center">
            <Owner {...owner} text={text} isComment={isComment} />
          </div>
          {isComment && (
            <div className="comment__content--action item-center">
              <div className="item-option">
                <button className="item-option__button item-center">
                  <span>...</span>
                </button>
              </div>
              <Heart />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
