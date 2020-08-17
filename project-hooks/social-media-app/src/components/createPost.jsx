import React, { useEffect, useState } from "react"
import Page from './page'
import { withRouter } from 'react-router-dom'

function CreatePost(props) {

    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch('http://localhost:8080/create-post', {
            method: "POSt",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                token: localStorage.getItem("complexAppToken")
            })
        })
            .then(response => response.json())
            .then(data => {
                props.history.push(`/post/${data}`)
                props.addFlashMessage("New Post was created")
            })
            .catch(e => console.error(e))
    }

    return (
        <Page>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="post-title" className="text-muted mb-1">
                        <small>Title</small>
                    </label>
                    <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
                </div>

                <div className="form-group">
                    <label htmlFor="post-body" className="text-muted mb-1 d-block">
                        <small>Body Content</small>
                    </label>
                    <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
                </div>

                <button className="btn btn-primary">Save New Post</button>
            </form>
        </Page>
    )
}

export default withRouter(CreatePost)