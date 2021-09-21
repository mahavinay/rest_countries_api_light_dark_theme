import React from "react";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Where in the world?</Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default Navigation;
