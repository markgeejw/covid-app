import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Chart from './Chart';

export default class Output extends Component {
    
    render() {
        return(
            <Container fluid className="Chart" style={{ paddingTop: 20 }}>
                <Row>
                <Col xs={9}>
                    <Row fluid className="Measures"><h4>Model Data</h4></Row>
                    <Row fluid className="">
                        <Chart/>
                    </Row>
                </Col>
                <Col style={{ textAlign: "left" }}>
                    <h4>Key Statistics</h4>
                    <h5>What happened?</h5>
                    <ul>
                        <li>Total weeks of action:</li>
                        <li>Did the pandemic end before September 22nd?</li>
                        <li>Average R0 from your actions:</li>
                        <li>Peak of pandemic was at:</li>
                        <li>Daily infection rate at the peak:</li>
                    </ul>
                    <h5>Population Totals</h5>
                    <ul>
                        <li>Total infected over 6 months:</li>
                        <li>Total saved (not infected) over 6 months:</li>
                        <li>Percentage of population infected:</li>
                        <li>Total hospitalised over 6 months:</li>
                        <li>Total in ICU over 6 months:</li>
                        <li>Total ventilated over 6 months:</li>
                        <li>Total deceased over 6 months:</li>
                        <li>Total deaths from hospital overload:</li>
                        <li>Percentage of total deaths from hospital overload:</li>
                    </ul>
                    <h5>Hospital Beds</h5>
                    <ul>
                        <li>Beds required at the peak:</li>
                        <li>When beds would run out (normal capacity):</li>
                        <li>When beds would run out (surge capacity):</li>
                        <li>How many days beds ran out for (surge capacity):</li>
                        <li>Number of beds in Victoria (normal capacity):</li>
                        <li>Number of beds in Victoria (surge capacity):</li>
                        <li>Number of hospitalisations per week (normal):</li>
                    </ul>
                    <h5>ICU Beds</h5>
                    <ul>
                        <li>ICU beds required at the peak:</li>
                        <li>When ICU beds would run out (normal capacity):</li>
                        <li>When ICU beds would run out (surge capacity):</li>
                        <li>How many days ICU beds ran out for (surge capacity):</li>
                        <li>Number of ICU beds in Victoria (normal capacity):</li>
                        <li>Number of ICU beds in Victoria (surge capacity):</li>
                        <li>Number of patients who missed out on an ICU bed:</li>
                        <li>Shortfall in ICU beds at peak:</li>
                    </ul>
                    <h5>Ventilators</h5>
                    <ul>
                        <li>Ventilators required at the peak:</li>
                        <li>When ventilators would run out (normal capacity):</li>
                        <li>When ventilators would run out (surge capacity):</li>
                        <li>How many days ventilators ran out for (surge capacity):</li>
                        <li>Number of ventilators in Victoria (normal capacity):</li>
                        <li>Number of ventilators in Victoria (surge capacity):</li>
                        <li>Number of patients who missed out on a ventilator:</li>
                        <li>Shortfall in ventilators at peak:</li>
                    </ul>
                </Col>
                </Row>
            </Container>
        )
    }
}