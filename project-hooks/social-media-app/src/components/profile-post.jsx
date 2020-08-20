import React, { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'

function ProfilePost() {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            fetch(`http://localhost:8080/profile/${username}/posts`)
                .then(response => response.json())
                .then(data => {
                    setPost(data)
                    setIsLoading(false)
                })
                .catch(error => console.error(error))
        }
        fetchPosts();
    }, [])

    if (isLoading) return <div>Loading...</div>
    return (
        <div className="list-group">
            {post.map((post) => {
                const date = new Date(post.createdDate)
                const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                return (
                    <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
                        <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>
                        {/* {" "} */}
                        <span className="text-muted small">{dateFormatted}</span>
                    </Link>
                )
            })}
        </div>
    )
}

export default ProfilePost