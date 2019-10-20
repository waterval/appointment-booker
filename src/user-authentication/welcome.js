import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <HashRouter>
            <article>
                <h1 className="welcome-header">
                    Medical platform for booking appointments
                </h1>
                <img src="/doctor-logo.jpg" className="welcome-image" />
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </article>
        </HashRouter>
    );
}
