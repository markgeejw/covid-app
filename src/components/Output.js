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

function toPercent(x) {
    return (Number(x) * 100).toFixed() + '%';
}

function toDays(x) {
    return Number(x) + ' days';
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
    }

    render() {
        const { results, resources, newly_infected, measureWeeks, dates, region, 
            currentTab, hbeds_required, icubeds_required, vents_required, barHeight } = this.props;
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
                title: 'Total deceased (from health system overload)',
                data: addComma(results.total_deaths_overload)
            }, {
                title: 'Total infected',
                data: addComma(results.total_infected)
            }, {
                title: 'Total hospitalised',
                data: addComma(results.total_hospitalised)
            }, {
                title: 'Total intensive cared',
                data: addComma(results.total_received_icu)
            }, {
                title: 'Total ventilated',
                data: addComma(results.total_received_vent)
            }, {
                title: 'Percentage of deaths attributed to hospital overload',
                data: toPercent(to2dp(results.percentage_deaths_overload))
            }, {
                title: 'Percentage of total population infected',
                data: toPercent(to2dp(results.percentage_infected))
            }],
            hospital: [{
                title: 'Beds required at peak',
                data: addComma(results.hbeds_req_peak)
            }, {
                title: 'Shortfall of beds at peak',
                data: addComma(results.shortfall_hbeds_peak)
            }, {
                title: 'When beds ran out (normal capacity)',
                data: results.days_hbed_out_normal ? formatDate(results.hbeds_run_out_normal) : "N/A"
            }, {
                title: 'When beds ran out (surge capacity)',
                data: results.days_hbed_out_surge ? formatDate(results.hbeds_run_out_surge) : "N/A"
            }, {
                title: 'How many days beds ran out for (surge capacity)',
                data: toDays(results.days_hbed_out_surge)
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
                data: results.days_icubed_out_normal ? formatDate(results.icubeds_run_out_normal) : "N/A"
            }, {
                title: 'When ICU beds ran out (surge capacity)',
                data: results.days_icubed_out_surge ? formatDate(results.icubeds_run_out_surge) : "N/A"
            }, {
                title: 'How many days ICU beds ran out for (surge capacity)',
                data: toDays(results.days_icubed_out_surge)
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
                data: results.days_vents_out_normal ? formatDate(results.vents_run_out_normal) : "N/A"
            }, {
                title: 'When ventilators ran out (surge capacity)',
                data: results.days_vents_out_surge ? formatDate(results.vents_run_out_surge) : "N/A"
            }, {
                title: 'How many days ventilators ran out for (surge capacity)',
                data: toDays(results.days_vents_out_surge)
            }]
        }
        return(
            <Container fluid style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                <Row>
                <Col lg={8}>
                    <div className="Chart" style={{ position: "sticky", top: barHeight ? 20 + barHeight : 0 }}>
                        <Row className="Measures"><h4>Model {region.country !== "" ? ("(" + (region.state === "" ? region.country : region.country + ", " + region.state) + ")") : ""}</h4></Row>
                        <Row style={{ justifyContent: "center", height: "100%" }} className="align-items-center">
                            <Chart 
                            currentTab={currentTab}
                            resources={resources} 
                            measureWeeks={measureWeeks} 
                            newly_infected={newly_infected} 
                            hbeds_required={hbeds_required}
                            icubeds_required={icubeds_required}
                            vents_required={vents_required}
                            dates={dates}/>
                        </Row>
                    </div>
                </Col>
                {results.total_weeks_action && <Col className="stats" style={{ textAlign: "left" }} lg={4}>
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
                    {currentTab === 1 && <div>
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
                    </div>}
                    {currentTab === 2 && <div>
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
                    </div>}
                    {currentTab === 3 && <div>
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
                    </div>}
                </Col>}
                </Row>
            </Container>
        )
    }
}