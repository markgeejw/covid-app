import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Input, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';

export default class Params extends Component {
    formatAsPercent = (num) => {
        return num + '%';
    }

    render() {
        const { currentTab } = this.props;
        const { r0_params, modelParams, hospBeds, ICUBeds, ventilators } = this.props.params; 
        const r0ParamTitles = [ 
            'Do Nothing', 
            'Social Distancing', 
            'Relaxed Lockdown', 
            'Significant Lockdown', 
            'Critical Lockdown' 
        ];
        const modelParamTitles = [
            'Community Transmission Levels',
            'Imported Cases per Day',  
            'Normal Case Fatality Rate', 
            'Overloaded Case Fatality Rate'
        ];
        const hospTitles = [
            'Number of Hospital Beds', 
            'Hospital Admission Rates',  
            'Bed Utilisation', 
            'Surge Bed Utilisation' 
        ];
        const ICUTitles = [
            'Number of ICU Beds',
            'ICU Admission Rates', 
            'ICU Bed Utilisation', 
            'Surge ICU Bed Utilisation',
            'Mortality Rate of ICU Blocked Patients' 
        ];
        const ventTitles = [
            'Number of Ventilators',
            'Ventilator Rates',  
            'Ventilator Utilisation', 
            'Surge Ventilator Utilisation', 
            'Surge Ventilator Capacity',
            'Mortality Rate of Ventilator Blocked Patients'
        ]
        const { updateR0Params, updateModelParams, updateHospBeds, updateICUBeds, updateVentilators } = this.props.eventHandlers;
        return(
            <div>
                <Container fluid style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h4>Parameters</h4></Col>
                    </Row>
                    <Row style={{ paddingTop: 20 }}>
                        <Col style={{ textAlign: "left" }}><h5>General Parameters</h5></Col>
                    </Row>
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h6>R0 of Intervention Measures</h6></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {r0_params.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{r0ParamTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0, width: "20%" }}>
                                <Input
                                value={entry} 
                                margin="dense"
                                onChange={event => {
                                    r0_params[index] = event.target.value;
                                    updateR0Params(r0_params);
                                }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Row style={{ paddingTop: 20 }}>
                        <Col style={{ textAlign: "left" }}><h6>Infection Parameters</h6></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {modelParams.map((entry, index) => {
                            const isInt = index === 1;
                            return (
                            <TableRow key={index}>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{modelParamTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0, width: "20%" }}
                                size='small'>
                                <Input
                                value={entry} 
                                margin="dense"
                                onChange={event => {
                                    const value = (Number(event.target.value) > 100 && !isInt) ? "100" : event.target.value;
                                    modelParams[index] = value;
                                    updateModelParams(modelParams);
                                }}
                                endAdornment={!isInt && <InputAdornment position="end">%</InputAdornment>}
                                />
                                </TableCell>
                            </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {currentTab === 1 && <div>
                    <Row style={{ paddingTop: 20 }}>
                        <Col style={{ textAlign: "left" }}><h5>Hospital Beds</h5></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {hospBeds.map((entry, index) => {
                            const isInt = index === 0;
                            return (
                            <TableRow key={index}>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{hospTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0, width: "20%" }}>
                                <Input
                                value={entry} 
                                margin="dense"
                                onChange={event => {
                                    const value = (Number(event.target.value) > 100 && !isInt) ? "100" : event.target.value;
                                    hospBeds[index] = value;
                                    updateHospBeds(hospBeds);
                                }}
                                endAdornment={!isInt && <InputAdornment position="end">%</InputAdornment>}
                                />
                                </TableCell>
                            </TableRow>
                        )})
                        }
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </div>}
                    {currentTab === 2 && <div>
                    <Row style={{ paddingTop: 20 }}>
                        <Col style={{ textAlign: "left" }}><h5>ICU Beds</h5></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {ICUBeds.map((entry, index) => {
                            const isInt = index === 0;
                            return (
                            <TableRow key={index}>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{ICUTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0, width: "20%" }}>
                                <Input
                                value={entry} 
                                margin="dense"
                                onChange={event => {
                                    const value = (Number(event.target.value) > 100 && !isInt) ? "100" : event.target.value;
                                    ICUBeds[index] = value;
                                    updateICUBeds(ICUBeds);
                                }}
                                fullWidth
                                endAdornment={!isInt && <InputAdornment position="end">%</InputAdornment>}
                                />
                                </TableCell>
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </div>}
                    {currentTab === 3 && <div>
                    <Row style={{ paddingTop: 20 }}>
                        <Col style={{ textAlign: "left" }}><h5>Ventilators</h5></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {ventilators.map((entry, index) => {
                            const isInt = index === 0;
                            const isSurge = index === 3;
                            return (
                            <TableRow key={index}>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{ventTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0, width: "20%" }}>
                                <Input
                                value={entry} 
                                margin="dense"
                                onChange={event => {
                                    const value = (Number(event.target.value) > 100 && !isInt && !isSurge) ? "100" : event.target.value;
                                    ventilators[index] = value;
                                    updateVentilators(ventilators);
                                }}
                                endAdornment={!isInt && <InputAdornment position="end">%</InputAdornment>}
                                fullWidth
                                />
                                </TableCell>
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </div>}
                </Container>
            </div>
        );
    }
}