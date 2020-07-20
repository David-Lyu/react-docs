import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './header'
import HomeGuest from './home-guest'
import Footer from './footer'
import About from './about'
import Terms from './terms'

export default function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <Route path="/dist/index.html" exact>
                    <HomeGuest />
                </Route>
                <Route path="/dist/index.html/about">
                    <About />
                </Route>
                <Route path="/dist/index.html/terms">
                    <Terms />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}