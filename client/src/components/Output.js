import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Chart from './Chart';

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';

function to2dp(x) {
    return Number.parseFloat(x).toFixed(2);
}

function addComma(x) {
    return Number(x).toLocaleString('en-US');
}

function formatDate(dateString) {
    if (dateString) {
        const d = new Date(dateString);
        const dtf = new Intl.DateTimeFormat('en', { year: '2-digit', month: 'short', day: '2-digit' });
        const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
    
        return `${da} ${mo} ${ye}`;
    } else {
        return undefined;
    }
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
                title: 'Did the pandemic end in 6 months?',
                data: results.pandemic_end ? "Yes" : "No"
            }, {
                title: 'Peak of pandemic',
                data: formatDate(results.pandemic_peak)
            }, {
                title: 'Daily infections at peak',
                data: addComma(Number(results.daily_infection_rate_at_peak).toFixed())
            }, {
                title: 'Average R0',
                data: to2dp(results.average_R0)
            }],
            population: [{
                title: 'Total deceased',
                data: addComma(results.total_deaths)
            }, {
                title: 'Total infected',
                data: addComma(results.total_infected)
            } , {
                title: 'Total hospitalised',
                data: addComma(results.total_hospitalised)
            }, {
                title: 'Total intensive cared',
                data: addComma(results.total_received_icu)
            }, {
                title: 'Total ventilated',
                data: addComma(results.total_received_vent)
            }, {
                title: 'Deaths from health system overload',
                data: addComma(results.total_deaths_overload)
            }, {
                title: 'Percentage of population infected',
                data: to2dp(results.percentage_infected)
            }, {
                title: 'Percentage of all deaths from hospital overload',
                data: to2dp(results.percentage_deaths_overload)
            }],
            hospital: [{
                title: 'Beds required at peak',
                data: addComma(results.hbeds_req_peak)
            }, {
                title: 'Shortfall of beds at peak',
                data: addComma(results.shortfall_hbeds_peak)
            }, {
                title: 'When beds ran out (normal capacity)',
                data: formatDate(results.hbeds_run_out_normal)
            }, {
                title: 'When beds ran out (surge capacity)',
                data: formatDate(results.hbeds_run_out_surge)
            }, {
                title: 'How many days beds ran out for (surge capacity)',
                data: results.days_hbed_out
            }],
            ICU: [{
                title: 'ICU beds required at peak',
                data: addComma(results.icubeds_req_peak)
            }, {
                title: 'Shortfall in ICU beds at peak',
                data: addComma(results.shortfall_icubeds_peak)
            }, {
                title: 'Number of patients who missed out on an ICU bed',
                data: addComma(results.patients_missed_out_icubeds)
            }, {
                title: 'When ICU beds ran out (normal capacity)',
                data: formatDate(results.icubeds_run_out_normal)
            }, {
                title: 'When ICU beds ran out (surge capacity)',
                data: formatDate(results.icubeds_run_out_surge)
            }, {
                title: 'How many days ICU beds ran out for (surge capacity)',
                data: results.days_icubed_out
            }],
            ventilators: [{
                title: 'Ventilators required at peak',
                data: addComma(results.vents_req_peak)
            }, {
                title: 'Shortfall in ventilators at peak',
                data: addComma(results.shortfall_vents_peak)
            }, {
                title: 'Number of patients who missed out on a ventilator',
                data: addComma(results.patients_missed_out_ventilators)
            }, {
                title: 'When ventilators ran out (normal capacity)',
                data: formatDate(results.vents_run_out_normal)
            }, {
                title: 'When ventilators ran out (surge capacity)',
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
                    <Table>
                        <TableBody>
                        {outputData.summary.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">Population Totals</h5>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                        {outputData.population.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">Hospital Beds</h5>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                        {outputData.hospital.map((row, index)  => (
                            <TableRow key={index}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">ICU Beds</h5>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                        {outputData.ICU.map((row, index)  => (
                            <TableRow key={index}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h5 className="Stats-Category">Ventilators</h5>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                        {outputData.ventilators.map((row, index)  => (
                            <TableRow key={index}>
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