import React from "react";
import { Route } from "react-router-dom";
import Hey from "./views/Hey";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

const RouterApp = () => {
  return (
    <>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/hey">
        <Hey />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </>
  );
};

export default RouterApp;
