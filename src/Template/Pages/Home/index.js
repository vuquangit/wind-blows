import React from "react";
import { withRouter } from "react-router-dom";
import BasicTemplate from "Template/BasicTemplate";
// import HomeSignup from "./HomeSignup";
import { connect } from "react-redux";

const HomePage = props => {
  return (
    <>
      {/* {props.state.isAuthenticated ? (
        <BasicTemplate>HOME PAGE</BasicTemplate>
      ) : (
        // <HomeSignup />
        <div>Home signup</div>
      )} */}
      <BasicTemplate>HOME PAGE</BasicTemplate>
    </>
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(withRouter(HomePage));
