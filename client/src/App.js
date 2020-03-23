import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
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
        const placeHolderSusceptible = [66.29779, 66.29779, 66.29779];
        const placeHolderInfected = [121, 296, 352];
        const placeHolderRecovered = [0, 16, 47];
        const placeHolderHospitalised = [7, 19, 22];
        const placeHolderICU = [0, 4, 8];
        const placeHolderVentilators = [0, 0, 2];
        const placeHolderDeaths = [0, 2, 2];
        const options = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Some data here'
            },
            data: {
                googleSpreadsheetKey: '1lXuVxV-MmC2M0l5-FrgphI559GQ-_VZMuvijVe1eZBU'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2020, 2, 22),
                    pointInterval: 24 * 3600 * 1000 * 4 // one day
                }
            },
            series: [{
                name: "Susceptible",
                data: placeHolderSusceptible
            }, {
                name: "Infected",
                data: placeHolderInfected
            }, {
                name: "Recovered",
                data: placeHolderRecovered
            }, {
                name: "Hospitalised",
                data: placeHolderHospitalised
            }, {
                name: "ICU",
                data: placeHolderICU
            }, {
                name: "Ventilators",
                data: placeHolderVentilators
            }, {
                name: "Deaths",
                data: placeHolderDeaths
            }]
        };
        return (
            <div className="App">
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">COVID-19 App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;
