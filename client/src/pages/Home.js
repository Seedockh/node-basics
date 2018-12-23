import React, { Component } from "react";
import "./Home.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PublicProject from './PublicProjects';
import { Typography, Paper, Chip, Avatar } from "@material-ui/core";
import Progress from "../components/Progress";

const styles = theme => ({
  root: {

  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class Home extends Component {
  state = { reload_projects: this.props.isConnected && !this.props.allProjects_loaded ? this.props.getAllProjects() : false };

  render() {
      const { allProjects_loaded, allAuthors, isConnected, classes } = this.props;
      return (
        <div className="container">
          <div className="sideMenu">
            <Typography variant="overline" gutterBottom className="hometitle">
              Authors
            </Typography>
              <div className="chiplist">
                {allAuthors.map( (value,index)=>(
                  <Chip
                   key={index}
                   avatar={<Avatar><img src={`https://picsum.photos/32${index}/24${index}`} alt={"author"+index}/></Avatar>}
                   label={value}
                   className={classes.chip}
                   color="primary"
                 />
                ))}
              </div>
          </div>
          <div className="content">
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
          </div>
        </div>
      )
  }
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
