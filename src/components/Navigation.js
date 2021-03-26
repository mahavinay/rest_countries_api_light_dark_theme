import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
    function myFunction() {
        var element = document.body;
        element.classList.toggle("dark-mode");
    }

    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Where in the world?</Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default Navigation;
