import React from "react";
import { Link, withRouter } from "react-router-dom";
import BasicTemplate from "Template/BasicTemplate";
import "./page404.scss";

const Page404 = () => (
  <BasicTemplate>
    <div className="page-404">
      <div className="page-404__content">
        <h2>Sorry, this page isn't available. </h2>
        <p>
          The link you followed may be broken, or the page may have been
          removed. Go back to <Link to="/">The Wind Blows</Link>.
        </p>
      </div>
    </div>
  </BasicTemplate>
);

export default withRouter(Page404);
