import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import { Link } from 'react-router-dom'

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
};

export class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    ) 
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: { body, createdAt, userImage, userHandle, likeCount, commentCount },
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
        <MyButton tip='Like'>
            <Link to='/login'>
                <FavoriteBorder color='primary'/>
            </Link>
        </MyButton>
    ) : (
        this.likedScream() ? (
            <MyButton tip='Undo Like' onClick={this.unlikeScream}>
                <FavoriteIcon color='primary'/>
            </MyButton>
        ) : (
            <MyButton tip='Like' onClick={this.likeScream}>
                <FavoriteBorder color='primary'/>
            </MyButton>
        )
    )
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia image={userImage} className="card-media" />
          <CardContent className={classes.content}>
            <Typography variant="h5">{userHandle}</Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} Comments</span>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
