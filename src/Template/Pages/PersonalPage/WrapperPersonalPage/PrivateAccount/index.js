import React from "react";

const index = () => {
  return (
    <div className="personal__private">
      <article className="personal__private--content">
        <div className="account-private">
          <div className="account-private__content">
            <h2 className="account-private__content--title">
              This Account is Private
            </h2>
            <div className="account-private__content--subtitle">
              Follow to see their photos and videos.
            </div>
          </div>
        </div>
        {/* <div>
          <span>Suggesstions for you</span>
        </div> */}
      </article>
    </div>
  );
};

export default index;
