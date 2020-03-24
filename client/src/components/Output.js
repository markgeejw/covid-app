import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Chart from './Chart';

export default class Output extends Component {
    constructor(props) {
        super(props);
        this.chartComponent = React.createRef();
    }

    render() {
        const { results, data } = this.props;
        return(
            <div>
            { results && <Container fluid style={{ padding: 20, paddingTop: 80 }}>
                <Row>
                <Col lg={8}>
                    <div className="fixed">
                        <Row className="Measures"><h4>Model Data</h4></Row>
                        <Row style={{ justifyContent: "center" }} style={{ height: "100%" }} className="align-items-center">
                            <Chart data={data} ref={this.chartComponent}/>
                        </Row>
                    </div>
                </Col>
                <Col style={{ textAlign: "left" }} lg={4}>
                    <h4>Key Statistics</h4>
                    <h5>What happened?</h5>
                    <ul>
                        <li>Total weeks of action: {results["total_weeks_action"]}</li>
                        <li>Did the pandemic end before September 22nd? {results["pandemic_end"] ? "Yes" : "No"}</li>
                        <li>Average R0 from your actions: {results["average_R0"]}</li>
                        <li>Peak of pandemic was at: {results["pandemic_peak"]}</li>
                        <li>Daily infection rate at the peak: {results["daily_infection_rate_at_peak"]}</li>
                    </ul>
                    <h5>Population Totals</h5>
                    <ul>
                        <li>Total infected over 6 months: {results["total_infected"]}</li>
                        <li>Total saved (not infected) over 6 months: {results["total_saved"]}</li>
                        <li>Percentage of population infected: {results["percent_infected"]}</li>
                        <li>Total hospitalised over 6 months: {results["total_hospitalised"]}</li>
                        <li>Total in ICU over 6 months: {results["total_received_icu"]}</li>
                        <li>Total ventilated over 6 months: {results["total_received_vent"]}</li>
                        <li>Total deceased over 6 months: {results["total_deaths"]}</li>
                        <li>Total deaths from hospital overload: {results["total_deaths_overload"]}</li>
                        <li>Percentage of total deaths from hospital overload: {results["percentage_deaths_overload"]}</li>
                    </ul>
                    <h5>Hospital Beds</h5>
                    <ul>
                        <li>Beds required at the peak: {results["hbed_req_peak"]}</li>
                        <li>Shortfall of beds at the peak: {results["shortfall_hbeds_peak"]}</li>
                        <li>When beds would run out (normal capacity): {results["hbeds_run_out_normal"]}</li>
                        <li>When beds would run out (surge capacity): {results["hbeds_run_out_surge"]}</li>
                        <li>How many days beds ran out for (surge capacity): {results["days_hbed_out"]}</li>
                    </ul>
                    <h5>ICU Beds</h5>
                    <ul>
                        <li>ICU beds required at the peak: {results["icubeds_req_peak"]}</li>
                        <li>Shortfall in ICU beds at peak: {results["shortfall_icubeds_peak"]}</li>
                        <li>Number of patients who missed out on an ICU bed: {results["patients_missed_out_icubeds"]}</li>
                        <li>When ICU beds would run out (normal capacity): {results["icubeds_run_out_normal"]}</li>
                        <li>When ICU beds would run out (surge capacity): {results["icubeds_run_out_surge"]}</li>
                        <li>How many days ICU beds ran out for (surge capacity): {results["days_icubed_out"]}</li>
                    </ul>
                    <h5>Ventilators</h5>
                    <ul>
                        <li>Ventilators required at the peak: {results["vents_req_peak"]}</li>
                        <li>Shortfall in ventilators at peak: {results["shortfall_vents_peak"]}</li>
                        <li>Number of patients who missed out on a ventilator: {results["patients_missed_out_ventilators"]}</li>
                        <li>When ventilators would run out (normal capacity): {results["vents_run_out_normal"]}</li>
                        <li>When ventilators would run out (surge capacity): {results["vents_run_out_surge"]}</li>
                        <li>How many days ventilators ran out for (surge capacity): {results["days_vents_out"]}</li>
                    </ul>
                </Col>
                </Row>
            </Container>}
            </div>
        )
    }
}