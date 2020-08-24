import React, { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
//clean up and make profile body same
import LoadingDotIcon from './loadingDotIcon'

function ProfileFollowing() {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([])

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchPosts() {
            fetch(`http://localhost:8080/profile/${username}/following`, { signal })
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
            {post.map((follower, index) => {
                return (
                    <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
                        <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
                    </Link>
                )
            })}
        </div>
    )
}

export default ProfileFollowing