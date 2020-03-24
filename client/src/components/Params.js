import React, { Component } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

export default class Params extends Component {
    formatAsPercent = (num) => {
        return num + '%';
    }

    render() {
        const { modelParams, r0_params, hospBeds, ICUBeds, ventilators } = this.props.params;
        const [ hospAdmitRate, ICUAdmitRate, ICUNeedVentPercent, ventRate, caseFatalityRateN, 
            caseFatalityRateO, mortalityRateICUBlocked, mortalityRateVentBlocked ] = modelParams;
        const [ doNothingR0, socDistR0, relaxedLDR0, sigLDR0, critLDR0 ] = r0_params;
        const [ numHospBeds, bedUtilisation, bedUtilSurge ] = hospBeds;
        const [ numICUBeds, ICUbedUtilisation, ICUbedUtilSurge ] = ICUBeds;
        const [ ventNumbers, numVents, ventUtilisation, surgeVentUtilisation, surgeVentCap ] = ventilators
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
                    <Form>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Hospital Admission Rate </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={hospAdmitRate * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[0] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>ICU Admission Rate </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={ICUAdmitRate * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[1] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>% ICU Admissions needing Ventilator </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={ICUNeedVentPercent * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[2] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Ventilator Rates </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={ventRate * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[3] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Case Fatality Rate (Normal) </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={caseFatalityRateN * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[4] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Case Fatality Rate (Overload) </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={caseFatalityRateO * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[5] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Mortality Rate of ICU Blocked Patients </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={mortalityRateICUBlocked * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[6] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Mortality Rate of Ventilator Blocked Patients </Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={mortalityRateVentBlocked * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        modelParams[7] = valueAsNumber / 100;
                                        updateModelParams(modelParams);
                                    }}/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Row>
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
                    <Form>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Do Nothing</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={doNothingR0}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        r0_params[0] = valueAsNumber;
                                        updateR0Params(r0_params);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Social Distancing</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={socDistR0}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        r0_params[1] = valueAsNumber;
                                        updateR0Params(r0_params);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Relaxed Lockdown</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={relaxedLDR0}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        r0_params[2] = valueAsNumber;
                                        updateR0Params(r0_params);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Significant Lockdown</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={sigLDR0}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        r0_params[3] = valueAsNumber;
                                        updateR0Params(r0_params);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Critical Lockdown</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={critLDR0}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        r0_params[4] = valueAsNumber;
                                        updateR0Params(r0_params);
                                    }}/>
                            </Col>
                        </Form.Group>
                    </Form>
                    
                    <Row>
                        <Col style={{ textAlign: "left" }}><h5>Resource Availability</h5></Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h6>Hospital Beds</h6></Col>
                    </Row>
                    <Form>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Number of Hospital Beds</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={1} 
                                    value={numHospBeds}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        hospBeds[0] = valueAsNumber;
                                        updateHospBeds(hospBeds);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Bed Utilisation</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={bedUtilisation * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        hospBeds[1] = valueAsNumber / 100;
                                        updateHospBeds(hospBeds);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Surge Bed Utilisation</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={bedUtilSurge * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        hospBeds[2] = valueAsNumber / 100;
                                        updateHospBeds(hospBeds);
                                    }}/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h6>ICU Beds</h6></Col>
                    </Row>
                    <Form>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Number of ICU Beds</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={1} 
                                    value={numICUBeds}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ICUBeds[0] = valueAsNumber;
                                        updateICUBeds(ICUBeds);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>ICU Bed Utilisation</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={ICUbedUtilisation * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ICUBeds[1] = valueAsNumber / 100;
                                        updateICUBeds(ICUBeds);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Surge ICU Bed Utilisation</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={ICUbedUtilSurge * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ICUBeds[2] = valueAsNumber / 100;
                                        updateICUBeds(ICUBeds);
                                    }}/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h6>Ventilators</h6></Col>
                    </Row>
                    <Form>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Ventilators Numbers (per 100,000)</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={1} 
                                    step={0.01} 
                                    precision={2} 
                                    value={ventNumbers}
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ventilators[0] = valueAsNumber;
                                        updateVentilators(ventilators);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Number of Ventilators</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={1} 
                                    value={numVents * 100} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ventilators[1] = valueAsNumber;
                                        updateVentilators(ventilators);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Ventilator Utilisation</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={ventUtilisation * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ventilators[2] = valueAsNumber / 100;
                                        updateVentilators(ventilators);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Surge Ventilator Utilisation</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={surgeVentUtilisation * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ventilators[3] = valueAsNumber / 100;
                                        updateVentilators(ventilators);
                                    }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" >
                            <Col xs={7} style={{ textAlign: "left"}}>
                                <Form.Label>Surge Ventilator Capacity</Form.Label>
                            </Col>
                            <Col className="mr-auto">
                                <NumericInput 
                                    step={0.01} 
                                    precision={2} 
                                    value={surgeVentCap * 100} 
                                    format={this.formatAsPercent} 
                                    style={{ input: { height: 40, width: 100 } }} 
                                    onChange={valueAsNumber => {
                                        ventilators[4] = valueAsNumber / 100;
                                        updateVentilators(ventilators);
                                    }}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        );
    }
}