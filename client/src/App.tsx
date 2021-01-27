import React from "react";
import { RecoilRoot } from "recoil";
import "./App.scss";
import RouterApp from "./RouterApp";

function App() {
  return (
    <RecoilRoot>
      <RouterApp />
    </RecoilRoot>
  );
}

export default App;
