import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRouteDefault from "./components/AuthRoute";
import Error404 from "./views/404";
import Hey from "./views/Hey";
import Home from "./views/Home";
import Login from "./views/Login";
import Posts from "./views/Posts";
import Profiles from "./views/Profiles";
import SignUp from "./views/SignUp";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route exact path="/hey">
          <Hey />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/posts/:id">
          <Posts />
        </Route>
        <Route path="/404">
          <Error404 />
        </Route>
        <Route path="/profiles/:username">
          <Profiles />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default RouterApp;
