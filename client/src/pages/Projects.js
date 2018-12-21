import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List,ListItem,ListItemSecondaryAction,ListItemText,
         Checkbox, IconButton, Tooltip, Fab, Dialog } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import './Projects.css';
import CreateProject from './CreateProject';
import EditProject from './EditProject';
import Progress from '../components/Progress';
import Snackbar from '../components/Snackbar';
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing.unit * 2,
  }
});

class Projects extends React.Component {
  state = {
    open_add: false,
    open_edit: false,
    project: null,
    checked: [],
    msg: "",
    variant: "error",
    open_snack: true,
    reload_project: this.props.projects_loaded ? false : setTimeout(()=>{this.props.getProjects()},2000),  //visible loading
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleOpenAdd = () => {
   this.setState({ open_add: true });
  };

  handleOpenEdit = (project) => {
   this.setState({ open_edit: true, project: project });
  };

  handleClose = () => {
   this.setState({ open_add: false, open_edit: false });
  };

  handleCloseSnack = () => {
    this.setState({ open_snack: false });
  }

  deleteProjects = async () => {
    const { projects } = this.props;
    const { checked } = this.state;
    const token = await localStorage.token;

    if (checked.length===0) {
      return this.setState({ open_snack: true, variant:"warning", msg: 'No project selected.'});
    }

    checked.map( async index => {
      let response = await fetch("http://localhost:4242/api/projects/delete/"+projects[index].id, {
        headers: {
          "Authorization": 'Bearer '+token,
          "Content-Type": 'application/json'
        },
        method: "DELETE"
      });

      const json = await response.json();
      if(json.error) {
        return this.setState({ open_snack: true, variant:"error", msg: json.error});
      } else {
        this.setState({ open_snack: true, variant:"success", msg: "Project deleted successfully." });
        setTimeout( () => this.props.getProjects(),500)
      }
    });
  }

  render() {
    const { classes, projects_loaded, projects, getProjects } = this.props;
    const { msg, variant, open_snack, open_add, open_edit, project } = this.state;
    return (
      <>
      {(msg.length>0) && (
        <Snackbar variant={variant} message={msg} open={open_snack} onClose={this.handleCloseSnack}/>
      )}
      <List className={classes.root+" projectslist"}>
        {!projects_loaded && (
          <div className="progressbar">
            <Progress />
          </div>
        )}
        {projects_loaded && (
          <>
          {projects.length===0 && (
            <p className="noproject">No projects found.</p>
          )}
          {projects.length>0 && (
            <>
            {projects.map( (value,index) => (
              <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(index)}>
                <Checkbox
                  checked={this.state.checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`${value.name}`} />
                <ListItemText secondary={`Last update : ${moment(value.updatedAt).format("MMM D")} at ${moment(value.updatedAt).format("H:mm")}`} />
                <ListItemSecondaryAction>
                  <Tooltip title="Edit Project" aria-label="Edit">
                    <IconButton aria-label="Comments" onClick={()=>{this.handleOpenEdit(value)}}>
                      <CommentIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            </>
          )}
          </>
        )}
      </List>
      {projects_loaded && (
        <div className="projectbuttons">
          <Tooltip title="Delete Selected" aria-label="Delete">
            <Fab color="secondary" className="deletebutton" onClick={this.deleteProjects}>
              <DeleteIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Add Project" aria-label="Add">
            <Fab color="primary" className="addbutton" onClick={this.handleOpenAdd}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Dialog
            open={open_add}
            onClose={this.handleClose}
          >
            <CreateProject open={open_add} close={this.handleClose} getProjects={getProjects}/>
          </Dialog>
          <Dialog
            open={open_edit}
            onClose={this.handleClose}
          >
            <EditProject open={open_edit} close={this.handleClose} getProjects={getProjects} project={project}/>
          </Dialog>
        </div>
      )}
    </>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Projects);
