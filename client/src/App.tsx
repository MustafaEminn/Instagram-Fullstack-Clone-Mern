import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.scss";
import RouterApp from "./RouterApp";
import Login from "./views/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RouterApp />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
