import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import firebase from "firebase";

import { db } from "../../firebase";
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = ({ postId, post, loggedInUser }) => {
  console.log(loggedInUser);
  console.log(post);

  const { caption, imageUrl, username } = post;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (post) {
      const unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setComments(
            snapshot.docs.map((doc) => ({
              commentId: doc.id,
              comment: doc.data(),
            }))
          );
        });
      return () => {
        unsubscribe();
      };
    }
  }, [post, postId]);

  const submitCommentHandler = (event) => {
    console.log(comment);
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: loggedInUser,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

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
          <Typography
            className={clsx("post__caption")}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <strong>{username}</strong> {caption}
          </Typography>

          {comments.length
            ? comments.map(({ commentId, comment: { username, text } }) => (
                <Typography
                  key={commentId}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={clsx("post__comment")}
                >
                  <strong>{username}</strong> {text}
                </Typography>
              ))
            : null}

          {loggedInUser ? (
            <div className="post__newComment">
              <input
                type="text"
                value={comment}
                placeholder="Add a comment..."
                onChange={(event) => setComment(event.target.value)}
              />
              <button
                type="button"
                onClick={submitCommentHandler}
                disabled={!comment}
              >
                Post
              </button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
