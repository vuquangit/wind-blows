import React from "react";
import { Checkbox, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { updateProfileInfo } from "Redux/Profile/profile.action";

const PrivacyAndSecurity = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const isPrivate = useSelector((state = {}) =>
    get(state, "profile.data.user.isPrivate", false)
  );
  const isFetching = useSelector((state = {}) =>
    get(state, "profile.isFetching", false)
  );
  const error = useSelector((state = {}) => get(state, "profile.error", false));

  const handlePrivate = async e => {
    e.preventDefault();

    const data = { userId, isPrivate: e.target.checked };
    console.log("private:", data);

    await dispatch(
      updateProfileInfo({
        data,
        endpoint: "users/change-private-account",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    if (!error) message.success("Your private account changed", 5);
    else message.error("Change private error: " + error, 5);
  };

  return (
    <article className="PS">
      <main className="PS__main">
        <section className="PS__main--item">
          <h2 className="item__header">Account Privacy</h2>
          <div>
            <Checkbox
              checked={isPrivate}
              disabled={isFetching}
              onChange={handlePrivate}
              className="item__checkbox"
            >
              Private Account
            </Checkbox>
            <p className="item__description">
              When your account is private, only people you approve can see your
              photos and videos on The Wind Blows. Your existing followers won't
              be affected.
            </p>
          </div>
        </section>
        {/* <section className="PS__main--item">
          <h2 className="item__header">Activity Status</h2>
          <div>
            <Checkbox className="item__checkbox">Show Activity Status</Checkbox>
            <p className="item__description">
              Allow accounts you follow and anyone you message to see when you
              were last active on Instagram apps. When this is turned off, you
              won't be able to see the activity status of other accounts.
            </p>
          </div>
        </section> */}
      </main>
    </article>
  );
};

export default PrivacyAndSecurity;
