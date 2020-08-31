import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Post.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: "100%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = ({ postId, post }) => {
  console.log(postId);
  console.log(post)
  const { caption, imageUrl, username } = post;
  const [comment, setComment] = useState("");

  // useEffect(() => {
  //   if(props.post) {
  //     const unsubscribe
  //   }
  //   return () => {
  //     cleanup
  //   }
  // }, [props.post])

  const classes = useStyles();

  return (
    <div className="post">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={username}
          subheader="Islamabad, Pakistan"
        />
        <CardMedia
          alt="Contemplative Reptile"
          className={classes.media}
          image={imageUrl}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>{username}</strong> {caption}
          </Typography>

          <input
            type="text"
            value={comment}
            placeholder="Add a comment"
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="button">Post</button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
