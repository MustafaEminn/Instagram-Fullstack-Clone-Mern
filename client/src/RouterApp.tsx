import React from "react";
import { Route } from "react-router-dom";
import Hey from "./views/Hey";
import Login from "./views/Login";

const RouterApp = () => {
  return (
    <>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/hey">
        <Hey />
      </Route>
    </>
  );
};

export default RouterApp;
