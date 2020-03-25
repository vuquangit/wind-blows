import React from "react";
import "./App.scss";
import Main from "./Template/main";

const App = ({ messaging = {} }) => (
  <div className="App">
    <Main messaging={messaging} />
  </div>
);

export default App;
