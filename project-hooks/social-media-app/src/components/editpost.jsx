import React, { useContext, useEffect } from "react"
import { useImmerReducer } from 'use-immer'
import { useParams, Link, withRouter } from 'react-router-dom'

import Page from './page'
import NotFound from './notFound'
import LoadingDotIcon from './loadingDotIcon'
import { StateContext, DispatchContext } from '../app/Context'

function EditPost(props) {
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const originalState = {
        title: {
            value: "",
            hasErrors: false,
            message: ""
        },
        body: {
            value: "",
            hasErrors: false,
            message: ""
        },
        isFetching: true,
        isSaving: false,
        id: useParams().postId,
        sendCount: 0,
        notFound: false
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "fetchComplete":
                draft.title.value = action.value.title;
                draft.body.value = action.value.body;
                draft.isFetching = false;
                break;
            case "titleChange":
                draft.title.hasErrors = false;
                draft.title.value = action.value;
                break;
            case "bodyChange":
                draft.body.hasErrors = false;
                draft.body.value = action.value;
                break;
            case "submitRequest":
                if (!draft.title.hasErrors && !draft.body.hasErrors) {
                    draft.sendCount++
                }
                break;
            case "saveRequestStarted":
                draft.isSaving = true;
                break;
            case "saveRequestFinished":
                draft.isSaving = false;
                break;
            case "titleRules":
                if (!action.value.trim()) {
                    draft.title.hasErrors = true
                    draft.title.message = "you must provide a title."
                }
                break;
            case "bodyRules":
                if (!action.value.trim()) {
                    draft.body.hasErrors = true
                    draft.body.message = "you must provide a body content."
                }
                break;
            case "notFound":
                draft.notFound = true;
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, originalState)

    function submitHandler(e) {
        e.preventDefault();
        dispatch({ type: "titleRules", value: state.title.value })
        dispatch({ type: "bodyRules", value: state.body.value })
        dispatch({ type: "submitRequest" })
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchPost() {
            fetch(`http://localhost:8080/post/${state.id}`, { signal })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        dispatch({ type: "fetchComplete", value: data })
                        if (appState.user.username !== response.data.author.username) {
                            appDispatch({ type: "flashMessage", value: "You do not have permissioon to edit this page" })
                            props.history.push("/")
                        }
                    } else {
                        dispatch({ type: "notFound" })
                    }
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

    useEffect(() => {
        if (state.sendCount) {
            dispatch({ type: "saveRequestStarted" })
            const abortController = new AbortController();
            const signal = abortController.signal;

            async function fetchPost() {
                fetch(`http://localhost:8080/post/${state.id}/edit`, {
                    method: "post",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        title: state.title.value,
                        body: state.body.value,
                        token: appState.user.token
                    }),
                    signal
                })
                    .then(response => response.json())
                    .then(() => {
                        dispatch({ type: "saveRequestFinished" })
                        appDispatch({ type: "flashMessage", value: "Post was updated" })
                    })
                    .catch(error => {
                        if (!abortController.signal.aborted) console.error(error)
                    })
            }
            fetchPost();
            return () => {
                abortController.abort();
            }
        }
    }, [state.sendCount])

    if (state.notFound) {
        return (
            <NotFound />
        )
    }

    if (state.isFetching) return (
        <Page>
            <LoadingDotIcon />
        </Page>
    )

    return (
        <Page title="Edit Post">
            <Link className="small font-weight-bold" to={`/post/${state.id}`}> &laquo; Back to view post</Link>
            <form className="mt-3" onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="post-title" className="text-muted mb-1">
                        <small>Title</small>
                    </label>
                    <input onBlur={e => dispatch({ type: "titleRules", value: e.target.value })} onChange={e => dispatch({ type: "titleChange", value: e.target.value })} value={state.title.value} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
                    {state.title.hasErrors &&
                        <div className="alert alert-danger small liveValidateMessage">
                            {state.title.message}
                        </div>}
                </div>

                <div className="form-group">
                    <label htmlFor="post-body" className="text-muted mb-1 d-block">
                        <small>Body Content</small>
                    </label>
                    <textarea onBlur={e => dispatch({ type: "bodyRules", value: e.target.value })} onChange={e => dispatch({ type: "bodyChange", value: e.target.value })} value={state.body.value} name="body" id="post-body" className="body-content tall-textarea form-control" type="text" />
                    {state.body.hasErrors &&
                        <div className="alert alert-danger small liveValidateMessage">
                            {state.body.message}
                        </div>}
                </div>

                <button disabled={state.isSaving} className="btn btn-primary">
                    {state.isSaving ? "Saving Updates" : "Save Updates"}
                </button>
            </form>
        </Page>
    )

}

export default withRouter(EditPost)