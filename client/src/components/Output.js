import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Chart from './Chart';

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';

function to2dp(x) {
    return Number.parseFloat(x).toFixed(2);
}

function formatDate(dateString) {
    const d = new Date('2020-05-16');
    const dtf = new Intl.DateTimeFormat('en', { year: '2-digit', month: 'short', day: '2-digit' });
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);

    return `${da} ${mo} ${ye}`;
}

export default class Output extends Component {
    constructor(props) {
        super(props);
        this.chartComponent = React.createRef();
    }

    render() {
        const { results, resources, newly_infected, measureWeeks, dates } = this.props;
        const outputData = {
            summary: [{
                title: 'Total weeks of action',
                data: results.total_weeks_action
            }, {
                title: 'Did the pandemic end before September 22nd?',
                data: results.pandemic_end ? "Yes" : "No"
            }, {
                title: 'Average R0 from your actions',
                data: to2dp(results.average_R0)
            }, {
                title: 'Peak of pandemic was at',
                data: formatDate(results.pandemic_peak)
            }, {
                title: 'Daily infection rate at the peak',
                data: to2dp(results.daily_infection_rate_at_peak)
            }],
            population: [{
                title: 'Total infected over 6 months',
                data: results.total_infected
            }, {
                title: 'Total saved (not infected) over 6 months',
                data: results.total_saved
            }, {
                title: 'Percentage of population infected',
                data: to2dp(results.percentage_infected)
            }, {
                title: 'Total hospitalised over 6 months',
                data: results.total_hospitalised
            }, {
                title: 'Total in ICU over 6 months',
                data: results.total_received_icu
            }, {
                title: 'Total ventilated over 6 months',
                data: results.total_received_vent
            }, {
                title: 'Total deceased over 6 months',
                data: results.total_deaths
            }, {
                title: 'Total deaths from hospital overload',
                data: results.total_deaths_overload
            }, {
                title: 'Percentage of total deaths from hospital overload',
                data: to2dp(results.percentage_deaths_overload)
            }],
            hospital: [{
                title: 'Beds required at the peak',
                data: results.hbeds_req_peak
            }, {
                title: 'Shortfall of beds at the peak',
                data: results.shortfall_hbeds_peak
            }, {
                title: 'When beds would run out (normal capacity)',
                data: formatDate(results.hbeds_run_out_normal)
            }, {
                title: 'When beds would run out (surge capacity)',
                data: formatDate(results.hbeds_run_out_surge)
            }, {
                title: 'How many days beds ran out for (surge capacity)',
                data: results.days_hbed_out
            }],
            ICU: [{
                title: 'ICU beds required at the peak',
                data: results.icubeds_req_peak
            }, {
                title: 'Shortfall in ICU beds at peak',
                data: results.shortfall_icubeds_peak
            }, {
                title: 'Number of patients who missed out on an ICU bed',
                data: results.patients_missed_out_icubeds
            }, {
                title: 'When ICU beds would run out (normal capacity)',
                data: formatDate(results.icubeds_run_out_normal)
            }, {
                title: 'When ICU beds would run out (surge capacity)',
                data: formatDate(results.icubeds_run_out_surge)
            }, {
                title: 'How many days ICU beds ran out for (surge capacity)',
                data: results.days_icubed_out
            }],
            ventilators: [{
                title: 'Ventilators required at the peak',
                data: results.vents_req_peak
            }, {
                title: 'Shortfall in ventilators at peak',
                data: results.shortfall_vents_peak
            }, {
                title: 'Number of patients who missed out on a ventilator',
                data: results.patients_missed_out_ventilators
            }, {
                title: 'When ventilators would run out (normal capacity)',
                data: formatDate(results.vents_run_out_normal)
            }, {
                title: 'When ventilators would run out (surge capacity)',
                data: formatDate(results.vents_run_out_surge)
            }, {
                title: 'How many days ventilators ran out for (surge capacity)',
                data: results.days_vents_out
            }]
        }
        return(
            <div>
            { <Container fluid style={{ padding: 20, paddingTop: 80 }}>
                <Row>
                <Col lg={8}>
                    <div className="fixed">
                        <Row className="Measures"><h4>Model Data</h4></Row>
                        <Row style={{ justifyContent: "center", height: "100%" }} className="align-items-center">
                            <Chart 
                            resources={resources} 
                            measureWeeks={measureWeeks} 
                            newly_infected={newly_infected} 
                            dates={dates}
                            ref={this.chartComponent}/>
                        </Row>
                    </div>
                </Col>
                <Col style={{ textAlign: "left" }} lg={4}>
                    <h4>Key Statistics</h4>
                    <h5 className="Stats-Category">What happened?</h5>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {outputData.summary.map(row => (
                            <TableRow>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">Population Totals</h5>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {outputData.population.map(row => (
                            <TableRow>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">Hospital Beds</h5>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {outputData.hospital.map(row => (
                            <TableRow>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">ICU Beds</h5>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {outputData.ICU.map(row => (
                            <TableRow>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">Ventilators</h5>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {outputData.ventilators.map(row => (
                            <TableRow>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Col>
                </Row>
            </Container>}
            </div>
        )
    }
}