import React, { Component } from "react";
import "./Home.css";
import PublicProject from './PublicProjects';
import { Typography, Paper } from "@material-ui/core";
import Progress from "../components/Progress";

class Home extends Component {
  state = { reload_projects: this.props.isConnected && !this.props.allProjects_loaded ? this.props.getAllProjects() : false };

  render() {
      const { allProjects_loaded, isConnected } = this.props;
      return (
        <>
          <Typography variant="overline" gutterBottom className="hometitle">
            Community's Projects
          </Typography>
          <div className="home">
            <div className="publicproject">
              {!isConnected && (
                <Paper className="notlogged">
                  <Typography variant="h5" gutterBottom className="welcometitle">
                    Welcome !
                  </Typography>
                  <p>Want to check out our community's projects ? Feel free to create an account or to sign in ! :) </p>
                </Paper>
              )}
              {isConnected && (
                <>
                {allProjects_loaded && (
                  <PublicProject projects={this.props.allProjects}/>
                )}
                {!allProjects_loaded && (
                  <div className="progressbarhome">
                    <Progress />
                  </div>
                )}
                </>
              )}
            </div>
          </div>
        </>
      )
  }
};

export default Home;
