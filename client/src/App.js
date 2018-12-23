import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button,InputBase } from "@material-ui/core";
import { Home as HomeIcon, Search as SearchIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Snackbar from "./components/Snackbar";
import { fade } from '@material-ui/core/styles/colorManipulator';

import "./App.css";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class App extends Component {
  state = {
    user: null,
    projects: [],
    projects_loaded: false,
    allProjects: [],
    allAuthors: [],
    allProjects_loaded: false,
    isConnected: localStorage.token ? true : false,
    open_signin: false,
    open_signup: false,
    open_snack: false,
    variant: 'success',
    msg: ''
  };

  handleLogin = async user => {
    await this.setState({ user, isConnected: true, open_snack: true, variant:'success', msg:'Successfully logged in !' });
    await this.getProjects();
  };

  handleRegister = user => {
    this.setState({ user, open_snack: true, variant:'success', msg:'User successfully created.' });
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({ isConnected: false, open_snack: true, variant:'warning', msg:'Logged out', projects_loaded: false, allProjects_loaded: false, projects: [], allProjects: [] });
  }

  handleOpenSignIn = () => {
    this.setState({ open_signin: true });
  }
  handleOpenSignUp = () => {
    this.setState({ open_signup: true });
  }
  handleClose = () => {
    this.setState({ open_signin: false, open_signup: false });
  }
  handleCloseSnack = () => {
    this.setState({ open_snack: false });
  }

  getProjects = async () => {
    const { uuid, token } = localStorage;
    if (this.state.isConnected && localStorage.token) {
      const response = await fetch("http://localhost:4242/api/projects/", {
        headers: {
          "Authorization": 'Bearer '+token,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({uuid, token}),
      });

      const json = await response.json();

      if (json.error) {
        return this.setState({ open_snack: true, variant:"error", msg: json.error });
      } else {
        this.setState({ projects_loaded: true, projects: json.data });
        this.getAllProjects();
      }
    }
  }

  getAllProjects = async () => {
    if (this.state.isConnected && localStorage.token) {
      const { token } = localStorage;
      const response = await fetch("http://localhost:4242/api/projects/", {
        headers: {
          "Authorization": 'Bearer '+token,
          "Content-Type": "application/json"
        },
        method: "GET",
      });

      const json = await response.json();
      if (json.error) {
        return this.setState({ open_snack: true, variant:"error", msg: json.error });
      } else {
        const authors=[];
        json.data.map( project => authors.indexOf(project.User.nickname)===-1 ? authors.push(project.User.nickname) : false);
        this.setState({ allProjects_loaded: true, allProjects: json.data, allAuthors: authors });
      }
    }
  }

  searchChange = evt => {
    const { value } = evt.target;
    if (value==='') this.getAllProjects();
    else this.searchProject(value);
  };

  searchProject = async (str) => {
    const { token } = localStorage;
    const response = await fetch("http://localhost:4242/api/projects/search/", {
      headers: {
        "Authorization": 'Bearer '+token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ name: str }),
    });

    const json = await response.json();
    this.setState({ allProjects: json.data })
  }

  render() {

    const { isConnected, open_signin, open_signup, projects, projects_loaded, allProjects, allProjects_loaded, allAuthors, open_snack, variant, msg } = this.state;
    const { classes } = this.props;
    return (
      <Router>
        <>
          <div className="App-menu">
              <AppBar position="fixed">
                <Toolbar>
                <Link to="/" className="App-menu"><HomeIcon />
                  <IconButton className="menuButton" color="inherit" aria-label="Menu"></IconButton>
                </Link>
                  <div className="barbuttons">
                  {!isConnected && (
                  <>
                    <Button color="inherit" onClick={this.handleOpenSignIn}>Login</Button>
                    <Button color="inherit" onClick={this.handleOpenSignUp}>Register</Button>
                  </>
                  )}
                  {isConnected && (
                  <>
                    <div className={classes.search+" searchbar"}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search a project"
                        name="search"
                        id="search"
                        spellCheck="false"
                        onChange={this.searchChange}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                      />
                    </div>
                    <Link to="/dashboard" className="App-menu">
                      <Button color="inherit">Dashboard</Button>
                    </Link>
                    <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                  </>
                  )}
                  </div>
                </Toolbar>
              </AppBar>
          </div>
          <Switch>
            <Route exact path="/" component={() => <Home allProjects={allProjects} allProjects_loaded={allProjects_loaded} allAuthors={allAuthors} getAllProjects={this.getAllProjects} isConnected={isConnected}/>} />
            <Route path="/dashboard" component={() => <Dashboard isConnected={isConnected} getProjects={this.getProjects} changePassword={this.handleLogout} projects={projects} projects_loaded={projects_loaded}/>} />
          </Switch>
            {open_snack && (
              <Snackbar variant={variant}
                        message={msg}
                        open={open_snack}
                        onClose={this.handleCloseSnack}/>
            )}
            {open_signin && (
              <SignIn connect={this.handleLogin} open={open_signin} close={this.handleClose} getProjects/>
            )}
            {open_signup && (
              <SignUp register={this.handleRegister} open={open_signup} close={this.handleClose}/>
            )}
        </>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
