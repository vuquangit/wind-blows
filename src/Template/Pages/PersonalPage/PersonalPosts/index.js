import React, { useState, useEffect } from "react";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import WrapperPersonalPage from "../WrapperPersonalPage";
import FetchPosts from "../FetchPosts";

const WrappedPersonalPost = ({ match = {} }) => {
  const [newPosts, setNewPosts] = useState([]);
  // new post status
  const handleAddNewPost = item => {
    setNewPosts([item]);
  };

  // clear
  const username = get(match, "params.username", "");
  useEffect(() => {
    setNewPosts([]);
  }, [username]);

  return (
    <WrapperPersonalPage handleAddNewPost={handleAddNewPost}>
      <FetchPosts
        method={`get`}
        endpoint={`/posts`}
        iconEmpty={faCameraRetro}
        textEmpty={`No Post Yet`}
        newPosts={newPosts}
      />
    </WrapperPersonalPage>
  );
};

export default withRouter(WrappedPersonalPost);
