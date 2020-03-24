import React, { Component } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

export default class Params extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Model Parameters
            hospAdmitRate:              0.0666,
            ICUAdmitRate:               0.02,
            ICUNeedVentPercent:         0.5,
            ventRate:                   0.01,
            caseFatalityRateN:          0.0097,
            caseFatalityRateO:          0.0166,
            mortalityRateICUBlocked:    1,
            mortalityRateVentBlocked:   1,

            // Intervention Parameters
            doNothingR0:                2.67,
            socDistR0:                  1.68,
            relaxedLDR0:                1.40,
            sigLDR0:                    1.05,
            critLDR0:                   0.32,

            // Resource Availability
            // Hospital Beds
            numHospBeds:                23187,
            bedUtilisation:             0.4,
            bedUtilSurge:               0.8,
            // ICU Beds
            numICUBeds:                 476,
            ICUbedUtilisation:          0.4,
            ICUbedUtilSurge:            0.8,
            // Ventilators
            ventNumbers:                5.4,        // per 100,000
            numVents:                   358,
            ventUtilisation:            0.4,
            surgeVentUtilisation:       0.8,
            surgeVentCap:               3
        };
    }

    formatAsPercent = (num) => {
        return num + '%';
    }

    render() {
        const { hospAdmitRate, ICUAdmitRate, ICUNeedVentPercent, ventRate, caseFatalityRateN, caseFatalityRateO, mortalityRateICUBlocked, mortalityRateVentBlocked, 
            doNothingR0, socDistR0, relaxedLDR0, sigLDR0, critLDR0, 
            numHospBeds, bedUtilisation, bedUtilSurge, numICUBeds, ICUbedUtilisation, ICUbedUtilSurge, ventNumbers, numVents, ventUtilisation, surgeVentUtilisation, surgeVentCap } = this.state;
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
                                    onChange={valueAsNumber => this.setState({ hospAdmitRate: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ ICUAdmitRate: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ ICUNeedVentPercent: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ caseFatalityRateN: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ caseFatalityRateO: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ mortalityRateICUBlocked: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ mortalityRateVentBlocked: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ ventRate: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ doNothingR0: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ socDistR0: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ relaxedLDR0: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ sigLDR0: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ critLDR0: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ numHospBeds: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ bedUtilisation: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ bedUtilSurge: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ numICUBeds: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ ICUbedUtilisation: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ ICUbedUtilSurge: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ ventNumbers: valueAsNumber })} />
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
                                    onChange={valueAsNumber => this.setState({ numVents: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ ventUtilisation: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ surgeVentUtilisation: valueAsNumber / 100 })} />
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
                                    onChange={valueAsNumber => this.setState({ surgeVentCap: valueAsNumber / 100 })} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        );
    }
}