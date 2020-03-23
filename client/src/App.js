import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import Input from './components/Input';
import Output from './components/Output';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: ""
        };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand style={{ paddingLeft: 20 }} href="#home">COVID-19 App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" style={{ paddingRight: 20 }} >
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </Container>
                <Container fluid>
                    <Row>
                        <Col style={{ paddingRight: 0 }} xs={2}>
                            <Input/>
                        </Col>
                        <Col>
                            <Output/>
                        </Col>
                    </Row>
                </Container>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;
