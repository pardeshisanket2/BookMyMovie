import React from "react";
import Home from './home/Home';
import Details from "./details/Details";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BookShow from "./bookshow/BookShow";
import Confirmation from "./confirmation/Confirmation";

const Controller = () => {
    const baseUrl = "/api/v1/";

    return(
        <Router>
            <div className="main-container">
                <Route
                    exact
                    path="/"
                    render={(props) => <Home {...props} baseUrl={baseUrl} />}
                >
                </Route>

                <Route
                    exact
                    path="/movie/:id"
                    render={(props) => <Details {...props} baseUrl={baseUrl} />}
                >
                </Route>

                <Route
                    exact
                    path="/bookshow/:id"
                    render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
                >
                </Route>

                <Route
                    exact
                    path="/confirm/:id"
                    render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
                >
                </Route>
            </div>
        </Router>
    )
}

export default Controller;