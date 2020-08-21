import React, { useState, useEffect, useContext } from "react"
import { useParams, Link, withRouter } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import ReactTooltip from 'react-tooltip'

import NotFound from './notFound'
import Page from './page'
import LoadingDotIcon from './loadingDotIcon'
import { StateContext, DispatchContext } from '../app/Context'

function ViewSinglePost(props) {
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)
    let { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState();


    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchPost() {
            fetch(`http://localhost:8080/post/${postId}/`, { signal })
                .then(response => response.json())
                .then(data => {
                    setPost(data)
                    setIsLoading(false)
                })
                .catch(error => {
                    if (!abortController.signal.aborted) console.error(error)
                })
        }
        fetchPost();
        return () => {
            abortController.abort();
        }
    }, [])

    if (!isLoading && !post) {
        return <NotFound />
    }
    if (isLoading) return (
        <Page>
            <LoadingDotIcon />
        </Page>
    )

    function isOwner() {
        if (appState.loggedIn) {
            return appState.user.username === post.author.username
        }
        return false;
    }

    async function deleteHandler() {
        const verifyDelete = window.confirm("Do you really want to delete this post")
        if (verifyDelete) {
            const responce = await fetch(`http://localhost:8080/post/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: appState.user.token })
            })
                .then(response => response.json())
                .then(() => {
                    appDispatch({ type: "delete", value: "Successfully deleted" })
                    props.history.push(`/post/{}:postId}`)
                })

                .catch(e => console.error(e))
        }
    }

    const date = new Date(post.createdDate)
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    return (
        <Page title={post.title}>
            <div className="d-flex justify-content-between">
                <h2>{post.title}</h2>
                {isOwner() && <span className="pt-2">
                    <Link to={`/post/${postId}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2" >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <ReactTooltip id="edit" className="custom-tooltip" />
                    {" "}
                    <Link onClick={deleteHandler} to="" data-tip="Delete" data-for="delete" className="delete-post-button text-danger" >
                        <i className="fas fa-trash"></i>
                    </Link>
                    <ReactTooltip id="delete" className="custom-tooltip" />
                </span>}
            </div>
            <p className="text-muted small mb-4">
                <Link to={`/profile/${post.author.username}`}>
                    <img className="avatar-tiny" src={post.author.avatar} />
                </Link>
                Posted by {" "}
                <Link to={`/profile/${post.author.username}`}>{post.author.username}
                </Link> on {dateFormatted}
            </p>

            <div className="body-content">
                <ReactMarkdown source={post.body} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
            </div>
        </Page>
    )
}

export default withRouter(ViewSinglePost)