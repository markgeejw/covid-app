import React, { Component } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

export default class Measures extends Component {

    render() {
        const measureWeeks = this.props.measureWeeks;
        console.log(measureWeeks);
        console.log(this.props.eventHandlers.updateMeasureWeeks);
        return(
            <div>
            {/* Left Input */}
                <Container fluid style={{ padding: 20, paddingTop: 80 }}>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h4>Inputs</h4></Col>
                    </Row>
                    <Row>
                        <Col xs={9} style={{ textAlign: "left" }}>
                            <h5>Measures</h5>
                        </Col>
                        <Col xs={3}>
                            <h5>Weeks</h5>
                        </Col>
                    </Row>
                    <Form>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Row className="Measure-Titles"><p>Do Nothing</p></Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={9}>
                        <RangeSlider
                        value={measureWeeks[0]}
                        onChange={changeEvent => {
                            measureWeeks[0] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        max={20}
                        variant="danger"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks[0]}
                        onChange={changeEvent => {
                            measureWeeks[0] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        />
                        </Col>
                        </Row>
                    </Form.Group>
                    
                    <Form.Group>
                        <Row>
                            <Col>
                                <Row className="Measure-Titles"><p>Social Distancing</p></Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={9}>
                        <RangeSlider
                        value={measureWeeks[1]}
                        onChange={changeEvent => {
                            measureWeeks[1] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        max={20}
                        variant="warning"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks[1]}
                        onChange={changeEvent => {
                            measureWeeks[1] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        />
                        </Col>
                        </Row>
                    </Form.Group>
                    
                    <Form.Group>
                        <Row>
                            <Col>
                                <Row className="Measure-Titles"><p>Relaxed Lockdown</p></Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={9}>
                        <RangeSlider
                        value={measureWeeks[2]}
                        onChange={changeEvent => {
                            measureWeeks[2] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        max={20}
                        variant="primary"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks[2]}
                        onChange={changeEvent => {
                            measureWeeks[2] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        />
                        </Col>
                        </Row>
                    </Form.Group>
                    
                    <Form.Group>
                        <Row>
                            <Col>
                                <Row className="Measure-Titles"><p>Significant Lockdown</p></Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={9}>
                        <RangeSlider
                        value={measureWeeks[3]}
                        onChange={changeEvent => {
                            measureWeeks[3] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        max={20}
                        variant="info"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks[3]}
                        onChange={changeEvent => {
                            measureWeeks[3] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        />
                        </Col>
                        </Row>
                    </Form.Group>
                    
                    <Form.Group>
                        <Row>
                            <Col>
                                <Row className="Measure-Titles"><p>Critical Lockdown</p></Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={9}>
                        <RangeSlider
                        value={measureWeeks[4]}
                        onChange={changeEvent => {
                            measureWeeks[4] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        max={20}
                        variant="success"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks[4]}
                        onChange={changeEvent => {
                            measureWeeks[4] = changeEvent.target.value;
                            this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                        }}
                        />
                        </Col>
                        </Row>
                    </Form.Group>
                    </Form>
                </Container>
            </div>
        )
    }
}