import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.scss";
import RouterApp from "./RouterApp";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <RouterApp />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
