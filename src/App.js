import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav } from 'react-bootstrap';
import Model from './components/Model';
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
        this.navbar = React.createRef();
    }

    updateRegion = (select, country, state) => {
        this.setState({ selectMode: select, country: country, state: state });
    }

    componentDidMount() {
        this.setState({ navbarHeight: this.navbar.current.clientHeight });
    }

    render() {
        const { selectMode, country, state, navbarHeight } = this.state;
        return (
            <div className="App">
                <Router>
                <Navbar ref={this.navbar} fixed="top" bg="dark" variant="dark" expand="lg" style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Navbar.Brand 
                    as={Link}
                    to="/"
                    onClick={() => this.updateRegion(true, "", "")}>
                    COVID-19 Model
                </Navbar.Brand>
                    <Nav className="ml-auto">
                    <Nav.Link 
                        as={Link} 
                        to="/"
                        onClick={() => this.updateRegion(true, "", "")}>
                        Home
                    </Nav.Link>
                    </Nav>
                </Navbar>
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
                    navbarHeight={navbarHeight}
                    region={{
                        country: country,
                        state: state
                    }}
                    />}
                </Route>
                </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
