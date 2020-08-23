import React, { useEffect, useContext } from "react"
import { useParams } from 'react-router-dom'
import { StateContext } from '../app/Context'
import { useImmer } from 'use-immer'
import Page from './page'
import ProfilePost from './profile-post'
import LoadingDotIcon from './loadingDotIcon'

function Profile() {
    const { username } = useParams();
    const [state, setState] = useImmer({
        followActionLoading: false,
        startFollowingRequestCount: 0,
        stopFollowingRequestCount: 0,
        profileData: []
    })
    const appState = useContext(StateContext)

    useEffect(() => { //gets the page info
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function getPostData() {
            await fetch(`http://localhost:8080/profile/${username}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: appState.user.token
                }),
                signal
            })
                .then(responce => responce.json())
                .then(data => {
                    setState(draft => { draft.profileData = data })
                })
                .catch(error => console.error(error))
        }
        getPostData()
        return () => {
            abortController.abort();
        }
    }, [username])

    useEffect(() => { //sends a following request
        if (state.startFollowingRequestCount) {
            setState(draft => {
                draft.followActionLoading = true
            })
            const abortController = new AbortController();
            const signal = abortController.signal;

            async function fetchData() {
                await fetch(`http://localhost:8080/addFollow/${state.profileData.profileUsername}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: appState.user.token
                    }),
                    signal
                })
                    .then(responce => responce.json())
                    .then(() => {
                        setState(draft => {
                            draft.profileData.isFollowing = true;
                            draft.profileData.counts.followerCount++;
                            draft.followActionLoading = false;
                        })
                    })
                    .catch(error => console.error(error))
            }
            fetchData()
            return () => {
                abortController.abort();
            }
        }
    }, [state.startFollowingRequestCount])

    useEffect(() => { //sends a stop following request
        if (state.stopFollowingRequestCount) {
            setState(draft => {
                draft.followActionLoading = true
            })
            const abortController = new AbortController();
            const signal = abortController.signal;

            async function fetchData() {
                await fetch(`http://localhost:8080/removeFollow/${state.profileData.profileUsername}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: appState.user.token
                    }),
                    signal
                })
                    .then(responce => responce.json())
                    .then(() => {
                        setState(draft => {
                            draft.profileData.isFollowing = false;
                            draft.profileData.counts.followerCount--;
                            draft.followActionLoading = false;
                        })
                    })
                    .catch(error => console.error(error))
            }
            fetchData()
            return () => {
                abortController.abort();
            }
        }
    }, [state.stopFollowingRequestCount])

    if (state.profileData.length === 0) return (
        <LoadingDotIcon />
    )

    function startFollowing() {
        setState(draft => {
            draft.startFollowingRequestCount++
        })
    }

    function stopFollowing() {
        setState(draft => {
            draft.stopFollowingRequestCount++
        })
    }

    return (
        <Page title="profile screen">
            <h2>
                <img className="avatar-small" src={state.profileData.profileAvatar} /> {state.profileData.profileUsername}
                {appState.loggedIn && !state.profileData.isFollowing && appState.user.username !== state.profileData.profileUsername && state.profileData.length !== 0 && (
                    <button onClick={startFollowing} disabled={state.followActionLoading} className="btn btn-primary btn-sm ml-2">
                        Follow
                        <i className="fas fa-user-plus"></i>
                    </button>
                )}
                {appState.loggedIn && state.profileData.isFollowing && appState.user.username !== state.profileData.profileUsername && state.profileData.length !== 0 && (
                    <button onClick={stopFollowing} disabled={state.followActionLoading} className="btn btn-danger btn-sm ml-2">
                        Stop Following {" "}
                        <i className="fas fa-user-times"></i>
                    </button>
                )}
            </h2>

            <div className="profile-nav nav nav-tabs pt-2 mb-4">
                <a href="#" className="active nav-item nav-link">
                    Posts: {state.profileData.counts.postCount}
                </a>
                <a href="#" className="nav-item nav-link">
                    Followers: {state.profileData.counts.followerCount}
                </a>
                <a href="#" className="nav-item nav-link">
                    Following: {state.profileData.counts.followingCount}
                </a>
            </div>

            <ProfilePost />
        </Page>
    )
}

export default Profile