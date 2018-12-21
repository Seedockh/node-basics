import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Card,CardHeader,CardMedia,CardContent,CardActions,
         Collapse,IconButton,Typography, Chip, Paper } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './PublicProjects.css';
import moment from 'moment';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, projects } = this.props;
    return (
      <div className="publiclist">
      {projects.length===0 && (
        <Paper className="noproject">No projects yet.</Paper>
      )}
      {projects.map( (value,index) => (
        <Card className={classes.card+" singlecard"} key={index}>
          <CardHeader
            avatar={
              <Chip label={value.User.nickname} className={classes.chip} />
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={value.name}
            subheader={moment(value.updatedAt).format("MMMM D, YYYY")}
          />
          <CardMedia
            className={classes.media}
            image={`https://picsum.photos/32${index}/24${index}`}
            title="Random Picture"
          />
          <CardContent>
            <Typography component="p">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Contact the author : <a href="/">{value.User.email}</a>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
