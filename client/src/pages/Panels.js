import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel,ExpansionPanelDetails,ExpansionPanelSummary,
         Typography,Button,Dialog, DialogTitle, DialogContent,
         DialogContentText, DialogActions, Slide } from '@material-ui/core';
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

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

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

  handleClose = () => {
   this.setState({ open: false });
  };

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
                <Button  onClick={this.handleClickOpen} variant="contained" color="secondary" className={classes.button}>
                  Delete my account
                  <Delete className={classes.rightIcon} />
                </Button>
                <Dialog
                  open={this.state.open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Delete my account"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      This is a single shot operation. All your projets will be deleted.<br/>
                      Do you still want to continue ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={this.props.deleteUser} color="primary">
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
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
