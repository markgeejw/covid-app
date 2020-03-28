import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav } from 'react-bootstrap';
import Model from './components/Model';
import About from './components/About';
import Home from './components/Home';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectMode: true,
            country: '',
            state: '',
        }
    }

    updateRegion = (select, country, state) => {
        this.setState({ selectMode: select, country: country, state: state });
    }

    render() {
        const { selectMode, country, state } = this.state;
        return (
            <div className="App">
                <Router>                    
                <div>
                <Navbar fixed="top" bg="dark" variant="dark" expand="lg" style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Navbar.Brand href="#home">COVID-19 App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link 
                        as={Link} 
                        to="/"
                        onClick={() => this.updateRegion(true, "", "")}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </div>
                <Switch>
                <Route exact path="/">
                    {selectMode && 
                    <Home
                    eventHandlers={{
                        updateRegion: this.updateRegion
                    }}
                    />
                    }
                    {!selectMode && <Model
                    region={{
                        country: country,
                        state: state
                    }}
                    />}
                </Route>
                <Route exact path="/about">
                    <About/>
                </Route>
                </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
