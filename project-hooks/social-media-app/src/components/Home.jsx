import React, { useContext, useEffect } from "react";
import { useImmer } from 'use-immer';
import Post from "./post"

import Page from './page';
import { StateContext } from '../app/Context'
import LoadingDotsIcon from './loadingDotIcon'

function Home() {
    const appState = useContext(StateContext)
    const [state, setState] = useImmer({
        isLoading: true,
        feed: []
    })

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function fetchData() {
            await fetch('http://localhost:8080/getHomeFeed', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    token: appState.user.token
                }),
                signal
            })
                .then(response => response.json())
                .then(data => setState(draft => {
                    draft.isLoading = false;
                    draft.feed = data;
                }))
                .catch(e => console.error(e))
        }
        fetchData();
        return () => abortController.abort()
    }, [])

    if (state.isLoading) return <LoadingDotsIcon />
    return (
        < Page title="Your feed">
            {
                state.feed.length === 0 && (
                    <>
                        <h2 className="text-center">
                            Hello <strong>{appState.user.username}</strong>, your feed is empty.
                        </h2>
                        < p className="lead text-muted text-center" >
                            Your feed displays the latest posts from the people you follow.
                            If you don't have any friends to follow that&rsquo;s okay;
                            you can use the &ldquo;Search&rdquo; feature in the top menu bar
                            to find content written by people with similar interests and
                            then follow them.
                        </p>
                    </>) || (
                    <>
                        <h2 className="textcenter mb-4">The Latest From Those You Follow</h2>
                        <div className="list-group">
                            {
                                state.feed.map((post) => {
                                    return <Post post={post} key={post._id} />
                                })
                            }
                        </div>
                    </>
                )

            }
        </Page >
    )
}

export default Home