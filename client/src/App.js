import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import Model from './components/Model'
import About from './components/About'
import Map from './components/Map'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";
class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>                    
                <div>
                <Navbar fixed="top" bg="dark" variant="dark" expand="lg" style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Navbar.Brand href="#home">COVID-19 App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/map">Map</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </div>
                <Switch>
                <Route exact path="/">
                    <Model/>
                </Route>
                <Route exact path="/about">
                    <About/>
                </Route>
                <Route exact path="/map">
                    <Map/>
                </Route>
                </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
