import React from "react";
//import withRoot from "../withRoot";
import Header from "./components/Header";
import "../src/App.css"
import CreateStore from "./components/Store/CreateStore";
import StoreList
 from "./components/Store/StoreList";
const App = () => {
  return (
    <div >
      <Header />
      <CreateStore />
      <StoreList />
    </div>);
};

export default App;
