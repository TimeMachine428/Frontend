import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Problems from "./pages/Problems.jsx";
import Help from "./pages/Help.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Settings from "./pages/Settings.jsx";
import Solutions from "./pages/Solutions.jsx";
import CreateProblem from "./pages/CreateProblem.jsx";
import MyProblems from "./pages/MyProblems.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import Resources from "./pages/Resources.jsx";

const app = document.getElementById("app");

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="problems" name="problems" component={Problems} />
      <Route path="settings" name="settings" component={Settings} />
      <Route path="help" name="help" component={Help} />
      <Route path="solutions(/:testvalue)" name="solutions" component={Solutions}/>
      <Route path="createProblem(/:testvalue)" name="createProblem" component={CreateProblem}/>
      <Route path="myProblems" name="myProblems" component={MyProblems}/>
      <Route path="createAccount(/:testvalue)" name="createAccount" component={CreateAccount}/>
      <Route path="resources" name="resources" component={Resources} />
    </Route>
  </Router>,
  app
);
