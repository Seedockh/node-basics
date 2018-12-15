import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./App.css";

localStorage.setItem("TEST", "HELLO");

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  state = {
    user: null,
    isConnected: false,
  };

  handleUser = user => {
    this.setState({ user, isConnected: true });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
    return <Signin />
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { user, isConnected, nickname, password } = this.state;

    return (
      <Router>
        <>
          <div className="App-menu">
              <AppBar position="static">
                <Toolbar>
                  <IconButton className="menuButton" color="inherit" aria-label="Menu">
                    <Link to="/" className="App-menu"><MenuIcon /></Link>
                  </IconButton>
                  <div className="barbuttons">
                  {!isConnected && (
                    <>
                      <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>

                      <Link to="/sign-up" className="App-menu">
                        <Button color="inherit">Register</Button>
                      </Link>
                    </>
                  )}
                  {isConnected && (
                    <Link to="/dashboard" className="App-menu">
                      <Button color="inherit">Dashboard</Button>
                    </Link>
                  )}
                  </div>
                </Toolbar>
              </AppBar>
          </div>
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
          <SignIn />
        </>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
