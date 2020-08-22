import React, { useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import { StateContext, DispatchContext } from '../app/Context'
import ReactTooltip from "react-tooltip";

function HeaderLoggedIn(props) {
    const appDispatch = useContext(DispatchContext);
    const appState = useContext(StateContext);

    function handleLogOut() {
        appDispatch({ type: "logout" })
    }

    function handleSearchIcon(e) {
        e.preventDefault();
        appDispatch({ type: "openSearch" })
    }

    return (
        <div className="flex-row my-3 my-md-0">
            <a onClick={handleSearchIcon} data-for="search" data-tip="Search" href="#" className="text-white mr-2 header-search-icon">
                <i className="fas fa-search"></i>
            </a>
            <ReactTooltip place="bottom" id="search" class="custom-tooltip" />

            {" "}<span data-for="chat" data-tip="Chat" className="mr-2 header-chat-icon text-white">
                <i className="fas fa-comment"></i>
                <span className="chat-count-badge text-white"> </span>
            </span>
            <ReactTooltip place="bottom" id="chat" class="custom-tooltip" />

            {" "}<Link to={`/profile/${appState.user.username}`} data-for="profile" data-tip="My Profile" className="mr-2">
                <img className="small-header-avatar" src={appState.user.avatar} />
            </Link>
            <ReactTooltip place="bottom" id="profile" class="custom-tooltip" />

            {" "}<Link className="btn btn-sm btn-success mr-2" to="/create-post">
                Create Post
            </Link>
            {" "}<button onClick={handleLogOut} className="btn btn-sm btn-secondary">
                Sign Out
            </button>
        </div>
    )
}

export default HeaderLoggedIn
