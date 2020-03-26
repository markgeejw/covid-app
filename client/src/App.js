import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import Input from './components/Input';
import Output from './components/Output';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // Model inputs
            // Intervention lengths
            measureWeeks:               [0, 0, 0, 0, 0],
            
            // Model Parameters
            modelParams:                [0.06666, 0.02, 0.5, 0.01, 0.0097, 0.0166, 1.00, 1.00],

            // Intervention Parameters
            r0_params:                  [2.67, 1.68, 1.40, 1.05, 0.32],

            // Resource Availability
            // Hospital Beds
            hospBeds:                   [23187, 0.4, 0.8],
            // ICU Beds
            ICUBeds:                    [476, 0.4, 0.8],
            // Ventilators
            ventilators:                [5.4, 358, 0.4, 0.8, 3.00],

            // Model outputs
            model_results: {},
            newly_infected: [],
            dates: []
        };
        this.output = React.createRef();
    }

    updateMeasureWeeks = (measureWeeks) => {
        this.setState({ measureWeeks: measureWeeks });
        this.updateData();
    }

    updateModelParams = (modelParams) => {
        this.setState({ modelParams: modelParams });
        this.updateData();
    }

    updateR0Params = (r0_params) => {
        this.setState({ r0_params: r0_params });
        this.updateData();
    }
    
    updateHospBeds = (hospBeds) => {
        this.setState({ hospBeds: hospBeds });
        this.updateData();
    }

    updateICUBeds = (ICUBeds) => {
        this.setState({ ICUBeds: ICUBeds });
        this.updateData();
    }

    updateVentilators = (ventilators) => {
        this.setState({ ventilators: ventilators });
        this.updateData();
    }

    updateData = () => {
        const { measureWeeks, modelParams, r0_params, hospBeds, ICUBeds, ventilators } = this.state;
        var url = "http://localhost:9000";
        url += "?int_len=" + measureWeeks;
        url += "&model_vals=" + modelParams;
        url += "&r0=" + r0_params;
        url += "&resource_vals=" + hospBeds + "," + ICUBeds + "," + ventilators;
        url += "&state=vic";
        fetch(url)
            .then(res => res.json())
            .then(json => {
                json = JSON.parse(json);
                this.setState({ 
                    model_results: json.results, 
                    newly_infected: json.data.newly_infected,
                    dates: json.data.dates
                });
            })
            .catch(err => err);
    }

    componentDidMount() {
        this.updateData();
    }

    render() {
        const { measureWeeks, modelParams, r0_params, hospBeds, ICUBeds, ventilators, model_results, newly_infected, dates } = this.state;
        return (
            <div className="App">
                <Router>
                    
                <div>
                <Navbar fixed="top" bg="dark" variant="dark" expand="lg" style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Navbar.Brand href="#home">COVID-19 App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="#"><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link href="#"><Link to="/">About</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </div>
                <Switch>
                <Route path="/">
                <div>
                    <Row style={{ width: "100%", margin: 0 }}>
                        <Col xs={3}>
                            <div className="Input border-right border-gray">
                                <Input
                                    params = {{
                                        measureWeeks: measureWeeks, 
                                        modelParams: modelParams, 
                                        r0_params: r0_params, 
                                        hospBeds: hospBeds, 
                                        ICUBeds: ICUBeds, 
                                        ventilators: ventilators
                                    }}
                                    eventHandlers={{
                                        updateMeasureWeeks: this.updateMeasureWeeks,
                                        updateModelParams: this.updateModelParams,
                                        updateR0Params: this.updateR0Params,
                                        updateHospBeds: this.updateHospBeds,
                                        updateICUBeds: this.updateICUBeds,
                                        updateVentilators: this.updateVentilators
                                    }}/>
                            </div>
                        </Col>
                        <Col xs={9} style={{ backgroundColor: '#fefefa' }}>
                            <Output 
                                results={model_results}
                                measureWeeks={measureWeeks}
                                resources={{
                                    numHospBeds: hospBeds[0],
                                    numICUBeds:  ICUBeds[0],
                                    numVents:    ventilators[1]
                                }}
                                dates={dates}
                                newly_infected={newly_infected}
                                ref={this.output}/>
                        </Col>
                    </Row>
                </div>
                </Route>
                </Switch>
                {/* <p className="App-intro">{this.state.apiResponse}</p> */}
                </Router>
            </div>
        );
    }
}

export default App;
