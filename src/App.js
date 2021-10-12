import React from "react";
//import withRoot from "../withRoot";
import Header from "./components/Header";
import "../src/App.css"
import CreateStore from "./components/Store/CreateStore";

const App = () => {
  return (
    <div >
      <Header />
      <CreateStore />
    </div>);
};

export default App;
