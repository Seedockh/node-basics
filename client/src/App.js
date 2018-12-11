import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Pane, Heading, Button } from "evergreen-ui";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import logo from "./logo.svg";
import "./App.css";

localStorage.setItem("TEST", "HELLO");

class App extends Component {
  state = {
    user: null,
    isConnected: false
  };

  handleUser = user => {
    this.setState({ user, isConnected: true });
  };

  render() {
    const { user, isConnected } = this.state;

    return (
      <Router>
        <>
          <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
            <Pane flex={1} alignItems="center" display="flex">
              <Link to="/" className="App-menu">
                <Heading size={600}>Sanji server+react bootstrap</Heading>
              </Link>
            </Pane>
            {!isConnected && (
              <>
                <Link to="/sign-in" className="App-menu">
                  <Button marginRight={16}>Login</Button>
                </Link>
                <Link to="/sign-up" className="App-menu">
                  <Button marginRight={16} appearance="primary">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            {isConnected && (
              <Link to="/dashboard" className="App-menu">
                <Button>Dashboard</Button>
              </Link>
            )}
          </Pane>
          <Route exact path="/" component={Home} />
          <Route
            path="/sign-in"
            component={() => {
              return !isConnected ? (
                <SignIn connect={this.handleUser} />
              ) : (
                <Redirect to="/dashboard" />
              );
            }}
          />
          <Route
            path="/sign-up"
            component={() => {
              return !isConnected ? (
                <SignUp connect={this.handleUser} />
              ) : (
                <Redirect to="/dashboard" />
              );
            }}
          />
          {isConnected && (
            <Route
              path="/dashboard"
              component={() => <Dashboard nickname={user.nickname} />}
            />
          )}
        </>
      </Router>
    );
  }
}

export default App;
