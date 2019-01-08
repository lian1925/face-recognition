import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import About from "./views/tracking";
import Home from "./views/faceapi";

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Face api Demo</Link>
        </li>
        <li>
          <Link to="/about">Tracking.js</Link>
        </li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);
export default App;
