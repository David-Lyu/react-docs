import React, { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { StateContext, DispatchContext } from '../app/Context'

import Header from './header'
import Home from './Home'
import HomeGuest from './home-guest'
import Footer from './footer'
import About from './about'
import Terms from './terms'
import CreatePost from './createPost'
import ViewSinglePost from './viewSinglePost'
import FlashMessages from './flashMessages'

export default function App() {

    const initialState = {
        loggedIn: !!localStorage.getItem("complexAppToken"),
        flashMessages: [],
        user: {
            token: localStorage.getItem('complexAppToken'),
            userName: localStorage.getItem('complexAppUsername'),
            avatar: localStorage.getItem('complexAppAvatar')
        }
    };
    function ourReducer(draft, action) {
        switch (action.type) {
            case "login":
                draft.loggedIn = true;
                console.log(action.data)
                draft.user = action.data
                break;
            case "logout":
                draft.loggedIn = false;
                draft.user = action.data
                break;
            case "flashMessage":
                draft.flashMessages.push(action.value);
                break;
        }
    }
    const [state, dispatch] = useImmerReducer(ourReducer, initialState)
    useEffect(() => {
        if (state.loggedIn) {
            localStorage.setItem("complexAppToken", state.user.token);
            localStorage.setItem("complexAppUsername", state.user.username);
            localStorage.setItem("complexAppAvatar", state.user.avatar);
        } else {
            localStorage.removeItem("complexAppToken");
            localStorage.removeItem("complexAppUsername");
            localStorage.removeItem("complexAppAvatar");
        }
    }, [state.loggedIn])

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <BrowserRouter>
                    <FlashMessages messages={state.flashMessages} />
                    <Header />
                    <Switch>
                        <Route path="/" exact>
                            {
                                state.loggedIn ?
                                    <Home />
                                    :
                                    <HomeGuest />
                            }
                        </Route>
                        <Route path="/post/:postId">
                            <ViewSinglePost />
                        </Route>
                        <Route path='/create-post'>
                            <CreatePost />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/terms">
                            <Terms />
                        </Route>
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}