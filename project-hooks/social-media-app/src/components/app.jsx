import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './header'
import Home from './Home'
import HomeGuest from './home-guest'
import Footer from './footer'
import About from './about'
import Terms from './terms'
import CreatePost from './createPost'
import ViewSinglePost from './viewSinglePost'

export default function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("complexAppToken"))

    return (
        <BrowserRouter>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Header>
            <Switch>
                <Route path="/" exact>
                    {
                        loggedIn ?
                            <Home />
                            :
                            <HomeGuest />
                    }
                </Route>
                <Route path='/create-post'>
                    <CreatePost />
                </Route>
                <Route path="/post">
                    <ViewSinglePost />
                    {/* { 4:13 time stamp} */}
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
    )
}