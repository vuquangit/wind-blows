import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "Containers/PrivateRoute";
import pageConfigs from "./pageConfigs";
import { MainWrapper } from "./main.style";

const Main = () => {
  const _renderPage = () =>
    pageConfigs.map((route = {}, index) =>
      route.private ? (
        <PrivateRoute {...route} key={index} />
      ) : (
        <Route {...route} key={index} />
      )
    );

  return (
    <BrowserRouter>
      <MainWrapper>
        <Switch> {_renderPage()}</Switch>
      </MainWrapper>
    </BrowserRouter>
  );
};

export default Main;
