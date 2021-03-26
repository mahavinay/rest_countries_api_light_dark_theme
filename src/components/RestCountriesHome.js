import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
    FormControl,
    Card,
    Button,
    Row,
    Col,
    Container,
} from "react-bootstrap";

function RestCountriesHome() {
    const [restApiAllCountriesList, setrestApiAllCountriesList] = useState([]);
    const [filter, setfilter] = useState([]);
    const [searchList, setList] = useState(false);
    const [regionSearch, setRegion] = useState([]);
    const [state, setState] = useState(null);

    useEffect(() => {
        axios
            .get(`https://restcountries.eu/rest/v2/all`)
            .then((restApiAllCountries) => {
                setrestApiAllCountriesList(restApiAllCountries.data);
            })
            .catch((error) =>
                console.log("Errow while fetching the restApiCpuntries")
            );
    });

    const handleSearchInput = (event) => {
        let searchString = event.target.value;
        {
            handleFilterCountry(searchString);
        }
    };

    const handleFilterCountry = (searchString) => {
        const stateCopy = [...restApiAllCountriesList];
        const filteredCountryList = stateCopy.filter((eachCountry) =>
            eachCountry.name.toLowerCase().includes(searchString.toLowerCase())
        );
        setfilter(filteredCountryList);
        setList(true);
    };

    const handleSelect = (key) => {
        setState(key);
        const makeStateCopy = [...restApiAllCountriesList];
        const filteredCountriesByRegion = makeStateCopy.filter((country) =>
            country.region.toLowerCase().includes(key.toLowerCase())
        );
        setRegion(filteredCountriesByRegion);
    };

    const searchResults = () => {
        if (searchList === true && filter.length === 0) {
            return <p>Search results not found</p>;
        } else if (state !== null && regionSearch.length > 0) {
            return regionSearch.map((countries) => (
                <div key={countries.numericCode} className="country-card">
                    <NavLink to="/detailedpage" className="App-link">
                        <Card
                            style={{ width: "18rem" }}
                            className="visibleblack hidewhite"
                        >
                            <Card.Img
                                variant="top"
                                src={countries.flag}
                                alt="flag"
                            />
                            <Card.Body>
                                <Card.Title>{countries.name}</Card.Title>
                                <Card.Text>
                                    Population : {countries.population}
                                </Card.Text>
                                <Card.Text>
                                    Region : {countries.region}
                                </Card.Text>
                                <Card.Text>
                                    Capital : {countries.capital}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                        <br />
                    </NavLink>
                </div>
            ));
        } else if (filter.length > 0) {
            return filter.map((countriesByRegion) => (
                <div
                    key={countriesByRegion.numericCode}
                    className="country-card"
                >
                    <NavLink to="/detailedpage" className="App-link">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src={countriesByRegion.flag}
                                alt="flag"
                            />
                            <Card.Body>
                                <Card.Title>
                                    {countriesByRegion.name}
                                </Card.Title>
                                <Card.Text>
                                    Population : {countriesByRegion.population}
                                </Card.Text>
                                <Card.Text>
                                    Region : {countriesByRegion.region}
                                </Card.Text>
                                <Card.Text>
                                    Capital : {countriesByRegion.capital}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <br />
                        <br />
                    </NavLink>
                </div>
            ));
        } else {
            return restApiAllCountriesList.map((countries) => (
                <div key={countries.numericCode} className="country-card">
                    <NavLink to="/detailedpage" className="App-link">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src={countries.flag}
                                alt="flag"
                            />
                            <Card.Body>
                                <Card.Title>{countries.name}</Card.Title>
                                <Card.Text>
                                    Population : {countries.population}
                                </Card.Text>
                                <Card.Text>
                                    Region : {countries.region}
                                </Card.Text>
                                <Card.Text>
                                    Capital : {countries.capital}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                        <br />
                    </NavLink>
                </div>
            ));
        }
    };

    return (
        <div>
            <div>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        onChange={handleSearchInput}
                    />
                </Form>

                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" onSelect={handleSelect}>
                            <NavDropdown
                                title="Filter By Region"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    eventKey="Africa"
                                    href="#action/3.1"
                                >
                                    Africa
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    eventKey="America"
                                    href="#action/3.2"
                                >
                                    America
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    eventKey="Asia"
                                    href="#action/3.3"
                                >
                                    Asia
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    eventKey="Europe"
                                    href="#action/3.4"
                                >
                                    Europe
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    eventKey="Oceania"
                                    href="#action/3.5"
                                >
                                    Oceania
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div className="grid">{searchResults()}</div>
        </div>
    );
}

export default RestCountriesHome;
