import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { get, isEqual } from "lodash";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

import Modal from "Components/Modal";
import Followers from "Template/Pages/Follower";
import Following from "Template/Pages/Following";

const Follows = ({ match = {}, history = {} }) => {
  const relationship = useSelector(
    state => get(state, "personalProfile.data.relationship", ""),
    isEqual()
  );
  const isBlocked = isEqual(
    get(relationship, "blockedByViewer.state", ""),
    "BLOCK_STATUS_BLOCKED"
  );
  const { followedBy = 0, follows = 0, media = 0 } = useSelector(
    (state = {}) => get(state, "personalProfile.data.user.counts", {}),
    isEqual()
  );
  const username = get(match, "params.username", "");
  const isSmallScreen = useMediaQuery({ query: "(max-width: 575px)" });

  // state media
  const [state, setState] = useState({
    followedBy,
    follows,
    media
  });
  useEffect(() => {
    if (isBlocked) setState({ followedBy: 0, follows: 0, media: 0 });
  }, [isBlocked]);

  // modal
  const [visibleModalFollowing, setVisibleModalFollowing] = useState(false);
  const handleShowModelFollowing = () => {
    if (isSmallScreen) history.push(`/${username}/following`);
    else setVisibleModalFollowing(true);
  };
  const handleCancelModalFollowing = e => setVisibleModalFollowing(false);

  const [visibleModalFollower, setVisibleModalFollower] = useState(false);
  const handleShowModalFollower = () => {
    if (isSmallScreen) history.push(`/${username}/followers`);
    else setVisibleModalFollower(true);
  };
  const handleCancelModalFollower = e => setVisibleModalFollower(false);

  // styles
  const classBtnFollowing = classNames({
    "follow__item--btn": state.follows
  });
  const classBtnFollower = classNames({
    "follow__item--btn": state.followedBy
  });

  return (
    <div className="personal__profile--follow">
      <div className="follow__item">
        <span>
          <span className="follow__item--number">
            {`${numeral(state.media).format("0.[00]a")} `}
          </span>
          posts
        </span>
      </div>
      <div className="follow__item">
        <div
          onClick={() => {
            state.followedBy && handleShowModalFollower();
          }}
          className={classBtnFollowing}
        >
          <span className="follow__item--number">
            {`${numeral(state.followedBy).format("0.[00]a")} `}
          </span>
          followers
        </div>
      </div>
      <div className="follow__item">
        <div
          onClick={() => {
            state.follows && handleShowModelFollowing();
          }}
          className={classBtnFollower}
        >
          <span className="follow__item--number">
            {`${numeral(state.follows).format("0.[00]a")} `}
          </span>
          following
        </div>
      </div>

      {!isBlocked && (
        <>
          <Modal
            title={null}
            visible={visibleModalFollower}
            onCancel={handleCancelModalFollower}
            footer={null}
            closable
            centered
            destroyOnClose
          >
            <Followers isModal />
          </Modal>
          <Modal
            title={null}
            visible={visibleModalFollowing}
            onCancel={handleCancelModalFollowing}
            footer={null}
            closable
            centered
            destroyOnClose
          >
            <Following isModal />
          </Modal>
        </>
      )}
    </div>
  );
};

export default withRouter(Follows);
