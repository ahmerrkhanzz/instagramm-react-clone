import React from 'react'
import './Posts.scss'
import Post from '../post/Post'

const Posts = () => {
    return (
        <div className="posts">
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Posts
