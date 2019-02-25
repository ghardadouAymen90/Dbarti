import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';

import store from "./store";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Recipe from "./components/dashboard/recipeInput";
import Profile from "./components/dashboard/Profile's components/profile";
import Sidebar from "./components/SideBar/sidebar";
import OneRecipe from "./components/dashboard/oneRecipe";
import "./App.css";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path={"/dashboard"} component={Sidebar} />
            <Route exact path={"/recipe"} component={Sidebar} />
            <Route exact path={"/user/:id"} component={Sidebar} />
            <Route exact path={"/recipe/:recipeID"} component={Sidebar} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/recipe" component={Recipe} />
              <PrivateRoute path="/user/:id" component={Profile} />
              <PrivateRoute path={"/recipe/:recipeID"} component={OneRecipe} />
            </Switch>
          </div>
        </Router>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
