import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Contacts from "../components/Contacts";

export default (
  <Router>
    <Switch>
      <Route path="/" element={<Contacts />} />
      <Route path="/contacts" element={<Contacts />} />
    </Switch>
  </Router>
);
