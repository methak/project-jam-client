import React, { useContext, useReducer }from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";
import Splash from "./pages/Splash";
import Context from "./context";
import reducer from "./reducer";
import VerifiedRoute from "./VerifiedRoute";

import StoreDetail from "./components/Store/StoreDetail";
import ShoppingDetail from "./components/Store/ShoppingDetail";

const Root = () => {
  const initialState = useContext(Context)
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log({ state });

  return (
    <Router>
      <Context.Provider value={{ state, dispatch}}>
      <Switch>
        <VerifiedRoute exact path="/" component={App} />
        
        <Route path="/login" component={Splash} />
        <VerifiedRoute exact path="/:storeId" component={StoreDetail}/>
        <VerifiedRoute exact path="/:storeId/shopping" component={ShoppingDetail}/>

      </Switch>
      </Context.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));


