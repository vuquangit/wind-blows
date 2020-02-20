import React, { useState } from "react";
import numeral from "numeral";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import { useMediaQuery } from "react-responsive";
import Modal from "Components/Modal";

import Following from "./Following";
import Follower from "./Followers";

const Follows = ({ match = {}, history = {} }) => {
  const { counts = {} } = useSelector((state = {}) =>
    get(state, "personalProfile.data.user", {})
  );
  const { followedBy = 0, follows = 0, media = 0 } = counts;
  const username = get(match, "params.username");
  const isSmallScreen = useMediaQuery({ query: "(max-width: 425px)" });

  // modal
  const [visibleModalFollowing, setVisibleModalFollowing] = useState(false);
  const handleShowModelFollowing = () => {
    if (isSmallScreen) history.push(`/${username}/following`);
    else setVisibleModalFollowing(true);
  };
  const handleCancelModalFollowing = e => setVisibleModalFollowing(false);

  const [visibleModalFollower, setVisibleModalFollower] = useState(false);
  const handleShowModelFollower = () => {
    if (isSmallScreen) history.push(`/${username}/followers`);
    else setVisibleModalFollower(true);
  };
  const handleCancelModalFollower = e => setVisibleModalFollower(false);

  return (
    <div className="personal__profile--follow">
      <div className="follow__item">
        <span>
          <span className="follow__item--number">
            {`${numeral(media).format("0.[00]a")} `}
          </span>
          posts
        </span>
      </div>
      <div className="follow__item">
        <div onClick={handleShowModelFollower} className="follow__item--btn">
          <span className="follow__item--number">
            {`${numeral(followedBy).format("0.[00]a")} `}
          </span>
          followers
        </div>
      </div>
      <div className="follow__item">
        <div onClick={handleShowModelFollowing} className="follow__item--btn">
          <span className="follow__item--number">
            {`${numeral(follows).format("0.[00]a")} `}
          </span>
          following
        </div>
      </div>
      <Modal
        title={null}
        visible={visibleModalFollower}
        onCancel={handleCancelModalFollower}
        footer={null}
        closable
        centered
        destroyOnClose
        className=""
      >
        <Follower isModal />
      </Modal>
      <Modal
        title={null}
        visible={visibleModalFollowing}
        onCancel={handleCancelModalFollowing}
        footer={null}
        closable
        centered
        destroyOnClose
        className=""
      >
        <Following isModal />
      </Modal>
    </div>
  );
};

export default withRouter(Follows);
