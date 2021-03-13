import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import {FormControl, Card, Button, Row, Col, Container} from 'react-bootstrap'



function RestCountriesHome() {

    const [restApiAllCountriesList, setrestApiAllCountriesList] = useState([])
    const [filter, setfilter] = useState([])
    const [searchList, setList] = useState(false)
    const [regionSearch, setRegion]=useState([])
    const [state,setState] = useState(null)
  
   useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/all`)
        .then((restApiAllCountries) => {
            
        setrestApiAllCountriesList(restApiAllCountries.data) })
        .catch((error) => console.log("Errow while fetching the restApiCpuntries"))  
    })  

    const handleSearchInput = (event) => {
        let searchString =event.target.value;        
          {handleFilterCountry(searchString)}
      }  

      const handleFilterCountry = (searchString) => {
        const stateCopy= [...restApiAllCountriesList]
        const filteredCountryList = stateCopy.filter((eachCountry) =>
        eachCountry.name.toLowerCase().includes(searchString.toLowerCase())
      );
      setfilter(filteredCountryList)  
      setList(true)    
      }

      const handleSelect = (key) => {
        setState(key)
        const makeStateCopy = [...restApiAllCountriesList]
        const filteredCountriesByRegion = makeStateCopy.filter((country) => 
        country.region.toLowerCase().includes(key.toLowerCase())
        )
        setRegion(filteredCountriesByRegion)
      }


      const searchResults = () => {
        if (searchList === true && filter.length === 0){
          return (
            <p>Search results not found</p>
          )
        } else if (state !== null && regionSearch.length > 0) {
              return regionSearch.map((countries) => (
                <div key={countries.numericCode} className="products-card">
                  
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={countries.flag} alt="flag" />
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
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <br/>
              <br/>               
              </div>
            ))
         } else if (filter.length > 0) {
          
            return filter.map((countries) => (
              <div key={countries.numericCode} className="products-card">
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={countries.flag} alt="flag" />
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
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
                
                  <br/>
                  <br/>
                
              </div>
                )
            )
          
        } else {
          return restApiAllCountriesList.map((item) => (
            <Container key={item.numericCode} fluid="md">   
               <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.flag} alt="flag" />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    Population : {item.population}
                  </Card.Text>
                  <Card.Text>
                  Region : {item.region}
                  </Card.Text>
                  <Card.Text>
                  Capital : {item.capital}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              
             
              <br/>
                  <br/>
              </Container>
             
                  
           
              )
            )
        }
      }
  
  
  

    return (
        <div>
            <div>
                
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleSearchInput}/>
            </Form>

                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" onSelect={handleSelect}>
                            <NavDropdown title="Filter By Region" id="basic-nav-dropdown" >
                                <NavDropdown.Item eventKey="Africa" href="#action/3.1">Africa</NavDropdown.Item>
                                <NavDropdown.Item eventKey="America" href="#action/3.2">America</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Asia" href="#action/3.3">Asia</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Europe" href="#action/3.4">Europe</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Oceania" href="#action/3.5">Oceania</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>  
                    </Navbar.Collapse>                     
                </Navbar>                 
                
           </div>
            <div>                
                    {searchResults()}             
            </div>
            
        </div>
    )
}

export default RestCountriesHome
