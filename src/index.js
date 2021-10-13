import React, { useContext, useReducer }from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";
import Splash from "./pages/Splash";
import Context from "./context";
import reducer from "./reducer";
import VerifiedRoute from "./VerifiedRoute";

import StoreDetail from "./components/Store/StoreDetail";
//import "mapbox-gl/dist/mapbox-gl.css";
import * as serviceWorker from "./serviceWorker";

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
      </Switch>
      </Context.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
