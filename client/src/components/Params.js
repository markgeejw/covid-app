import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Input, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';

function to2dp(x) {
    return Number.parseFloat(x).toFixed(2);
}
export default class Params extends Component {
    formatAsPercent = (num) => {
        return num + '%';
    }

    render() {
        const { modelParams, r0_params, hospBeds, ICUBeds, ventilators } = this.props.params;
        const modelParamTitles = [ 
            'Hospital Admission Rates', 
            'ICU Admission Rates', 
            '% ICU Admissions needing Ventilator',
            'Ventilator Rates', 
            'Case Fatality Rate (Normal)', 
            'Case Fatality Rate (Overload)',
            'Mortality Rate of ICU Blocked Patients', 
            'Mortality Rate of Ventilator Blocked Patients]' 
        ];
        const r0ParamTitles = [ 
            'Do Nothing', 
            'Social Distancing', 
            'Relaxed Lockdown', 
            'Significant Lockdown', 
            'Critical Lockdown' 
        ];
        const hospTitles = [ 
            'Number of Hospital Beds', 
            'Bed Utilisation', 
            'Surge Bed Utilisation' 
        ];
        const ICUTitles = [
            'Number of ICU Beds', 
            'ICU Bed Utilisation', 
            'Surge ICU Bed Utilisation' 
        ];
        const ventTitles = [ 
            'Ventilator Numbers (per 100,000)', 
            'Number of Ventilators', 
            'Ventilator Utilisation', 
            'Surge Ventilator Utilisation', 
            'Surge Ventilator Capacity'
        ]
        const { updateModelParams, updateR0Params, updateHospBeds, updateICUBeds, updateVentilators } = this.props.eventHandlers;
        return(
            <div>
                <Container fluid style={{ padding: 20, paddingTop: 80 }}>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h4>Parameters</h4></Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h5>Model Parameters</h5></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {modelParams.map((entry, index) => (
                            <TableRow>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{modelParamTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Input
                                value={to2dp(entry * 100)} 
                                margin="dense"
                                onChange={event => {
                                    modelParams[index] = event.target.value / 100;
                                    updateModelParams(modelParams);
                                }}
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                inputProps={{
                                step: 0.01,
                                min: 0,
                                max: 1e3,
                                type: 'number'
                                }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h5>Intervention Parameters</h5></Col>
                    </Row>
                    <Row>
                        <Col xs={7} style={{ textAlign: "left" }}>
                            <h6>Measures</h6>
                        </Col>
                        <Col>
                            <h6>R0</h6>
                        </Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {r0_params.map((entry, index) => (
                            <TableRow>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{r0ParamTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Input
                                value={to2dp(entry)} 
                                margin="dense"
                                onChange={event => {
                                    r0_params[index] = event.target.value;
                                    updateR0Params(modelParams);
                                }}
                                inputProps={{
                                step: 0.01,
                                min: 0,
                                max: 1e3,
                                type: 'number'
                                }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>                    
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h5>Resource Availability</h5></Col>
                    </Row>
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h6>Hospital Beds</h6></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {hospBeds.map((entry, index) => (
                            <TableRow>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{hospTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Input
                                value={index === 0 ? entry : to2dp(entry * 100)} 
                                margin="dense"
                                onChange={event => {
                                    hospBeds[index] = index === 0 ? event.target.value : (event.target.value / 100);
                                    updateHospBeds(hospBeds);
                                }}
                                endAdornment={(index !== 0) && <InputAdornment position="end">%</InputAdornment>}
                                fullWidth
                                inputProps={{
                                step: index === 0 ? 1 : 0.01,
                                min: 0,
                                max: 1e3,
                                type: 'number'
                                }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h6>ICU Beds</h6></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {ICUBeds.map((entry, index) => (
                            <TableRow>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{ICUTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Input
                                value={index === 0 ? entry : to2dp(entry * 100)} 
                                margin="dense"
                                onChange={event => {
                                    ICUBeds[index] = index === 0 ? event.target.value : (event.target.value / 100);
                                    updateICUBeds(ICUBeds);
                                }}
                                endAdornment={(index !== 0) && <InputAdornment position="end">%</InputAdornment>}
                                fullWidth
                                inputProps={{
                                step: index === 0 ? 1 : 0.01,
                                min: 0,
                                max: 1e3,
                                type: 'number'
                                }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h6>Ventilators</h6></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {ventilators.map((entry, index) => (
                            <TableRow>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{ventTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Input
                                value={index === 1 ? entry : to2dp(entry * 100)} 
                                margin="dense"
                                onChange={event => {
                                    ventilators[index] = index === 1 ? event.target.value : (event.target.value / 100);
                                    updateVentilators(ventilators);
                                }}
                                endAdornment={index !== 1 && <InputAdornment position="end">%</InputAdornment>}
                                fullWidth
                                inputProps={{
                                step: index === 1 ? 1: 0.01,
                                min: 0,
                                max: 1e3,
                                type: 'number'
                                }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Container>
            </div>
        );
    }
}