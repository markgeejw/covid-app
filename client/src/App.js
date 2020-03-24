import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import Input from './components/Input';
import Output from './components/Output';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // Intervention lengths
            measureWeeks:               [0, 0, 0, 0, 0],
            
            // Model Parameters
            modelParams:                [0.06666, 0.02, 0.5, 0.01, 0.0097, 0.0166, 1, 1],

            // Intervention Parameters
            r0_params:                  [2.67, 1.68, 1.40, 1.05, 0.32],

            // Resource Availability
            // Hospital Beds
            hospBeds:                   [23187, 0.4, 0.8],
            // ICU Beds
            ICUBeds:                    [476, 0.4, 0.8],
            // Ventilators
            ventilators:                [5.4, 358, 0.4, 0.8, 3]
        };
        this.output = React.createRef();
    }

    updateMeasureWeeks = (measureWeeks) => {
        this.setState({ measureWeeks: measureWeeks });
    }

    updateModelParams = (modelParams) => {
        this.setState({ modelParams: modelParams });
    }

    updateR0Params = (r0_params) => {
        this.setState({ r0_params: r0_params });
    }
    
    updateHospBeds = (hospBeds) => {
        this.setState({ hospBeds: hospBeds });
    }

    updateICUBeds = (ICUBeds) => {
        this.setState({ ICUBeds: ICUBeds });
    }

    updateVentilators = (ventilators) => {
        this.setState({ ventilators: ventilators });
    }


    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => {
                console.log(res);
                this.setState({ apiResponse: res });
            })
            .catch(err => err);
    }

    componentDidMount() {
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
                this.setState({ model_results: json.results, model_data: json.data });
            })
            .catch(err => err);
    }

    render() {
        const { measureWeeks, modelParams, r0_params, hospBeds, ICUBeds, ventilators, model_results, model_data } = this.state;
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
                        <Col>
                            <Output 
                                results={model_results}
                                data={model_data}
                                ref={this.output}/>
                        </Col>
                    </Row>
                </div>
                {/* <p className="App-intro">{this.state.apiResponse}</p> */}
            </div>
        );
    }
}

export default App;
