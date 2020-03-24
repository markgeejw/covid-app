import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import Sidebar from "react-sidebar";
import Input from './components/Input';
import Output from './components/Output';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: ""
        };
        this.output = React.createRef();
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        // this.callAPI();
        // this.output.current.chartComponent.current.chartComponent.current.chart.reflow();
        // this.output.current.lol();
        // this.output.current.chartComponent.current.chartComponent.current.chart.reflow();
    }

    refreshChart() {
        setTimeout(()=>{
            this.output.current.chartComponent.current.chartComponent.current.chart.reflow();
        }, 2000)
    }

    render() {
        return (
            <div className="App">
                <div>
                <Navbar fixed="top" bg="dark" variant="dark" expand="lg" style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Navbar.Brand href="#home">COVID-19 App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </div>
                <div>
                    <Row style={{ width: "100%", margin: 0 }}>
                        <Col xs={3}>
                            <div className="Input">
                                <Input/>
                            </div>
                        {/* <Sidebar
                        sidebar={<Input/>}
                        open={true}
                        docked={true}
                        onSetOpen={() => {this.refreshChart()}}
                        // styles={{ sidebar: { width: 400 } }}>
                        >
                        </Sidebar> */}
                        </Col>
                        <Col>
                            <Output ref={this.output}/>
                        </Col>
                    </Row>
                </div>
                {/* <p className="App-intro">{this.state.apiResponse}</p> */}
            </div>
        );
    }
}

export default App;
