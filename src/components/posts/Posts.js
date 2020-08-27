import React, { useState, useEffect } from "react";
import "./Posts.scss";
import Post from "../post/Post";
import { db } from "../../firebase";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data()
        }))
      );
    });
  }, []);

  return (
    <div className="posts">
      {posts.map(({ id, post }) => (
        <Post key={id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
