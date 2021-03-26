import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import RestCountriesHome from "./components/RestCountriesHome";
import Navigation from "./components/Navigation";
import DetailedPage from "./components/DetailedPage";

import React, { useState } from "react";

function App() {
    const [isActive, setActive] = useState("true");

    const handleToggle = () => {
        setActive(!isActive);
    };
    return (
        <div className={isActive ? "" : "dark-mode"}>
            <Route component={Navigation}></Route>
            <button onClick={handleToggle}>Dark Mode</button>
            <Switch>
                <Route
                    className={isActive ? "dark-mode" : "dark-mode"}
                    exact
                    path="/detailedpage"
                    component={DetailedPage}
                />
                <Route
                    className={isActive ? "dark-mode" : "dark-mode"}
                    path="/"
                    component={RestCountriesHome}
                />
            </Switch>
        </div>
    );
}

export default App;
