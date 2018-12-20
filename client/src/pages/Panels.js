import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel,ExpansionPanelDetails,ExpansionPanelSummary,Typography,Button } from '@material-ui/core';
import { ExpandMore, Delete } from '@material-ui/icons';
import './Panels.css';
import EditUser from './EditUser';
import Projects from './Projects';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
    open: false,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleClickOpen = () => {
   this.setState({ open: true });
  };

  deleteUser = async () => {
    console.log("DELETE CALLED");
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:4242/api/users/delete/"+localStorage.getItem('uuid'), {
      headers: {
        "Authorization": 'Bearer '+token,
      },
      method: "DELETE",
      body: JSON.stringify({token}),
    });

    const json = await response.json();
    console.log(json); return;
    if(json.error) {
      return this.setState({ open_snack: true, variant:"error", msg: json.error});
    } else {
      localStorage.clear();
      this.setState({ open_snack: true, variant:"success", msg: "Password updated successfully."});
      //this.props.changePassword();
    }
  }

  render() {
    const { classes, type } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        {type==="projects" && (
          <>
            <Projects />
          </>
        )}
        {type==="user" && (
          <>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>Edit my profile</Typography>
              <Typography className={classes.secondaryHeading}>View and edit your user details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <EditUser updatepassword={false} userupdate={this.props.userupdate}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>Edit my password</Typography>
              <Typography className={classes.secondaryHeading}>Change your password</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <EditUser updatepassword={true} changePassword={this.props.changePassword}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>Delete my profile</Typography>
              <Typography className={classes.secondaryHeading}>
                Proceed carefully, this is an irreversible operation !
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="alignright">
                <Button variant="contained" color="secondary" className={classes.button}>
                  Delete my account
                  <Delete onClick={this.deleteUser} className={classes.rightIcon} />
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </>
        )}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
