import React, { useEffect, useContext } from "react"
import { DispatchContext } from "../app/Context"
import { useImmer } from 'use-immer' //similar to useState
import Post from './post'

function Search() {
    const appDispatch = useContext(DispatchContext);
    const [state, setState] = useImmer({
        searchTerm: '',
        results: [],
        show: 'neither',
        requestCount: 0
    })

    useEffect(() => {
        document.addEventListener("keyup", searchKeyPressHandler)
        return () => document.removeEventListener("keyup", searchKeyPressHandler)
    }, [])


    function searchKeyPressHandler(e) {
        if (e.keyCode === 27) {
            appDispatch({ type: "closeSearch" })
        }
    }

    useEffect(() => {
        if (state.searchTerm.trim()) {
            setState(draft => { draft.show = 'loading' })
            const delay = setTimeout(() => {
                setState(draft => {
                    draft.requestCount++ // so we can call useEffect for the send request
                })
            }, 1500)
            return () => clearTimeout(delay)

        } else {
            setState(draft => { draft.show = 'neither' })
        }
    }, [state.searchTerm])

    useEffect(() => { // send backend request here for search because we can clean up the request if necessary
        if (state.requestCount) {
            const aboutController = new AbortController();
            const signal = aboutController.signal
            async function fetchResults() {
                fetch('http://localhost:8080/search', {
                    method: "post",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        searchTerm: state.searchTerm
                    }),
                    signal
                })
                    .then(response => response.json())
                    .then(data => {
                        setState(draft => {
                            draft.results = data;
                            draft.show = "results"
                        })
                    })
                    .catch(error => console.error(error))
            }
            fetchResults();
            return () => aboutController.abort()
        }
    }, [state.requestCount])

    function handleInput(e) {
        const value = e.currentTarget.value;
        setState(draft => {
            draft.searchTerm = value;
        })
    }

    return (
        <div className="search-overlay">
            <div className="search-overlay-top shadow-sm">
                <div className="container container--narrow">
                    <label htmlFor="live-search-field" className="search-overlay-icon">
                        <i className="fas fa-search"></i>
                    </label>
                    <input onChange={handleInput} autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
                    <span onClick={() => appDispatch({ type: "closeSearch" })} className="close-live-search">
                        <i className="fas fa-times-circle lg" ></i>
                    </span>
                </div>
            </div>

            <div className="search-overlay-bottom">
                <div className="container container--narrow py-3">
                    <div className={"circle-loader " + (state.show === "loading" ? "circle-loader--visible" : "")}></div>
                    <div className={"live-search-results " + (state.show == "results" ? "live-search-results--visible" : "")}>
                        {Boolean(state.results.length) &&
                            <div className="list-group shadow-sm">
                                <div className="list-group-item active"><strong>Search Results</strong> ({state.results.length} {state.results.length > 1 ? "items" : "item"} found)</div>
                                {state.results.map((post) => {
                                    return (
                                        <Post onClick={() => { appDispatch({ type: "closeSearch" }) }} post={post} key={post._id} />
                                    )
                                })}
                            </div>
                            || <p className="alert alert-danger text-center shadow-sm">Sorry, we could not find any results for that search</p>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Search