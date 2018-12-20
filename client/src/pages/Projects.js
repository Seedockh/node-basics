import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List,ListItem,ListItemSecondaryAction,ListItemText,
         Checkbox, IconButton, Tooltip, Fab } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import './Projects.css';
import Progress from '../components/Progress';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing.unit * 2,
  }
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
    load_project: false,
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

  render() {
    const { classes, projects_loaded, projects, getProjects } = this.props;

    return (
      <>
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
            {projects.map( value => (
              <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggle(value.id)}>
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`Project ${value.name}`} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <CommentIcon />
                  </IconButton>
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
            <Fab color="secondary" className="deletebutton">
              <DeleteIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Add Project" aria-label="Add">
            <Fab color="primary" className="addbutton">
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      )}
    </>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
