import React, { useState, useReducer } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ExampleContext from '../app/exampleContext'

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

    const initialState = {};
    function ourReducer() {

    }
    const [state, dispatch] = useReducer(ourReducer, initialState)

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("complexAppToken"))
    const [flashMessages, setFlashMessages] = useState([])

    function addFlashMessage(msg) {
        setFlashMessages(prev => prev.concat(msg))
    }

    return (
        <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn, loggedIn }}>
            <BrowserRouter>
                <FlashMessages messages={flashMessages} />
                <Header></Header>
                <Switch>
                    <Route path="/" exact>
                        {
                            loggedIn ?
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
        </ExampleContext.Provider>
    )
}