import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Post from './post'

import LoadingDotIcon from './loadingDotIcon'

function ProfilePost() {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([])

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchPosts() {
            fetch(`http://localhost:8080/profile/${username}/posts`, { signal })
                .then(response => response.json())
                .then(data => {
                    setPost(data)
                    setIsLoading(false)
                })
                .catch(error => console.error(error))
        }
        fetchPosts();
        return () => {
            abortController.abort();
        }
    }, [username])

    if (isLoading) return <LoadingDotIcon />
    return (
        <div className="list-group">
            {post.map((post) => {
                return <Post noAuthor={true} post={post} key={post._id}></Post>
            })}
        </div>
    )
}

export default ProfilePost