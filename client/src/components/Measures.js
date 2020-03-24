import React, { Component } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

export default class Measures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            measureWeeks1: 0,
            measureWeeks2: 0,
            measureWeeks3: 0,
            measureWeeks4: 0,
            measureWeeks5: 0
        };
    }

    render() {
        const { measureWeeks1, measureWeeks2, measureWeeks3, measureWeeks4, measureWeeks5 } = this.state;
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
                        value={measureWeeks1}
                        onChange={changeEvent => this.setState({ measureWeeks1: changeEvent.target.value })}
                        max={20}
                        variant="danger"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks1}
                        onChange={changeEvent => this.setState({ measureWeeks1: changeEvent.target.value })}
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
                        value={measureWeeks2}
                        onChange={changeEvent => this.setState({ measureWeeks2: changeEvent.target.value })}
                        max={20}
                        variant="warning"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks2}
                        onChange={changeEvent => this.setState({ measureWeeks2: changeEvent.target.value })}
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
                        value={measureWeeks3}
                        onChange={changeEvent => this.setState({ measureWeeks3: changeEvent.target.value })}
                        max={20}
                        variant="primary"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks3}
                        onChange={changeEvent => this.setState({ measureWeeks3: changeEvent.target.value })}
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
                        value={measureWeeks4}
                        onChange={changeEvent => this.setState({ measureWeeks4: changeEvent.target.value })}
                        max={20}
                        variant="info"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks4}
                        onChange={changeEvent => this.setState({ measureWeeks4: changeEvent.target.value })}
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
                        value={measureWeeks5}
                        onChange={changeEvent => this.setState({ measureWeeks5: changeEvent.target.value })}
                        max={20}
                        variant="success"
                        />
                        </Col>
                        <Col>
                        <Form.Control 
                        value={measureWeeks5}
                        onChange={changeEvent => this.setState({ measureWeeks5: changeEvent.target.value })}
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