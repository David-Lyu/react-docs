import React, { useState, useEffect, useContext } from "react"
import { useParams } from 'react-router-dom'
import { StateContext } from '../app/Context'
import Page from './page'
import ProfilePost from './profile-post'
import LoadingDotIcon from './loadingDotIcon'

function Profile() {
    const { username } = useParams();
    const [profileData, setProfileData] = useState([]);
    const appState = useContext(StateContext)

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function getPostData() {

            await fetch(`http://localhost:8080/profile/${username}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: appState.user.tolken
                }),
                signal
            })
                .then(responce => responce.json())
                .then(data => { setProfileData(data) })
                .catch(error => console.error(error))
        }

        getPostData()
        return () => {
            abortController.abort();
        }
    }, [])

    if (profileData.length === 0) return (
        <LoadingDotIcon />
    )

    return (
        <Page title="profile screen">
            <h2>
                <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
                <button className="btn btn-primary btn-sm ml-2">Follow <i className="fas fa-user-plus"></i></button>
            </h2>

            <div className="profile-nav nav nav-tabs pt-2 mb-4">
                <a href="#" className="active nav-item nav-link">
                    Posts: {profileData.counts.postCount}
                </a>
                <a href="#" className="nav-item nav-link">
                    Followers: {profileData.counts.followerCount}
                </a>
                <a href="#" className="nav-item nav-link">
                    Following: {profileData.counts.followingCount}
                </a>
            </div>

            <ProfilePost />
        </Page>
    )
}

export default Profile