import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Input, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default class Params extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentTab: 0
        }
    }
    formatAsPercent = (num) => {
        return num + '%';
    }

    updateTab = (tabIndx) => {
        this.setState({ currentTab: tabIndx });
    }

    render() {
        const { currentTab } = this.state;
        const { modelParams, r0_params, hospBeds, ICUBeds, ventilators } = this.props.params;
        const modelParamTitles = [ 
            'Hospital Admission Rates', 
            'ICU Admission Rates', 
            '% ICU Admissions needing Ventilator',
            'Ventilator Rates', 
            'Case Fatality Rate (Normal)', 
            'Case Fatality Rate (Overload)',
            'Mortality Rate of ICU Blocked Patients', 
            'Mortality Rate of Ventilator Blocked Patients' 
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
                    <AppBar className="border-bottom border-gray" style={{ paddingBottom: 5 }} position="static" color="transparent" elevation={0}>
                        <Tabs
                        value={currentTab}
                        onChange={(_, value) => {
                            this.setState({currentTab: value})
                        }}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="full width tabs example"
                        >
                        <Tab label="Model"
                        id="full-width-tab-0"
                        aria-controls="full-width-tabpanel-0"/>
                        <Tab label="Intervention"
                        id="full-width-tab-1"
                        aria-controls="full-width-tabpanel-1"/>
                        <Tab label="Hospitals"
                        id="full-width-tab-2"
                        aria-controls="full-width-tabpanel-2"/>
                        <Tab label="ICUs"
                        id="full-width-tab-3"
                        aria-controls="full-width-tabpanel-3"/>
                        <Tab label="Ventilators"
                        id="full-width-tab-4"
                        aria-controls="full-width-tabpanel-4"/>
                        </Tabs>
                    </AppBar>
                    {currentTab === 0 && <div>
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h5>Model Parameters</h5></Col>
                    </Row>
                    <TableContainer>
                    <Table>
                        <TableBody>
                        {modelParams.map((entry, index) => {
                            return (
                            <TableRow key={index}>
                                <TableCell style={{ paddingLeft: 0, paddingRight: 0 }}>{modelParamTitles[index]}</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0, paddingRight: 0, width: "20%" }}
                                size='small'>
                                <Input
                                value={entry} 
                                margin="dense"
                                onChange={event => {
                                    const value = Number(event.target.value) > 100 ? "100" : event.target.value;
                                    modelParams[index] = value;
                                    updateModelParams(modelParams);
                                }}
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                />
                                </TableCell>
                            </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </div>}
                    {currentTab === 1 && <div>
                    <Row style={{ paddingTop: 10 }}>
                        <Col style={{ textAlign: "left" }}><h5>Intervention Parameters</h5></Col>
                    </Row>
                    <Row>
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
                    </div>}
                    {currentTab === 2 && <div>
                    <Row style={{ paddingTop: 10 }}>
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
                    {currentTab === 3 && <div>
                    <Row style={{ paddingTop: 10 }}>
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
                                    console.log(ICUBeds[index]);
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
                    {currentTab === 4 && <div>
                    <Row style={{ paddingTop: 10 }}>
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