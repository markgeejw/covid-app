import React, { Component } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Data from './Data';

export default class Input extends Component {
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

            <Data weeks={1} />

            <Row style={{ paddingRight: 0 }}>
            {/* Left Input */}
                <Container fluid style={{ paddingTop: 20, paddingRight: 0 }}>
                    <Row className="Measures"><h4>Measures:</h4></Row>
                    <Form>
                    <Form.Group>
                        <Row>
                            <Col xs={9}>
                                <Row className="Measure-Titles"><p>Do Nothing</p></Row>
                            </Col>
                            <Col xs={3}>
                                <Row className="Measure-Titles"><p>Weeks</p></Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={9}>
                        <RangeSlider
                        value={measureWeeks1}
                        onChange={changeEvent => this.setState({ measureWeeks1: changeEvent.target.value })}
                        //onChange={changeEvent => <Chart weeks={1} />}
                        max={20}
                        variant="danger"
                        />
                        </Col>
                        <Col xs={3}>
                        <Form.Control
                        value={measureWeeks1} style={{ width: 50 }}
                        onChange={changeEvent => this.setState({ measureWeeks1: changeEvent.target.value })}
                        />
                        </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col xs={9}>
                                <Row className="Measure-Titles"><p>Social Distancing</p></Row>
                            </Col>
                            <Col xs={3}>
                                <Row className="Measure-Titles"><p>Weeks</p></Row>
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
                        <Col xs={3}>
                        <Form.Control
                        value={measureWeeks2} style={{ width: 50 }}
                        onChange={changeEvent => this.setState({ measureWeeks2: changeEvent.target.value })}
                        />
                        </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col xs={9}>
                                <Row className="Measure-Titles"><p>Relaxed Lockdown</p></Row>
                            </Col>
                            <Col xs={3}>
                                <Row className="Measure-Titles"><p>Weeks</p></Row>
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
                        <Col xs={3}>
                        <Form.Control
                        value={measureWeeks3} style={{ width: 50 }}
                        onChange={changeEvent => this.setState({ measureWeeks3: changeEvent.target.value })}
                        />
                        </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col xs={9}>
                                <Row className="Measure-Titles"><p>Significant Lockdown</p></Row>
                            </Col>
                            <Col xs={3}>
                                <Row className="Measure-Titles"><p>Weeks</p></Row>
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
                        <Col xs={3}>
                        <Form.Control
                        value={measureWeeks4} style={{ width: 50 }}
                        onChange={changeEvent => this.setState({ measureWeeks4: changeEvent.target.value })}
                        />
                        </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col xs={9}>
                                <Row className="Measure-Titles"><p>Critical Lockdown</p></Row>
                            </Col>
                            <Col xs={3}>
                                <Row className="Measure-Titles"><p>Weeks</p></Row>
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
                        <Col xs={3}>
                        <Form.Control
                        value={measureWeeks5} style={{ width: 50 }}
                        onChange={changeEvent => this.setState({ measureWeeks5: changeEvent.target.value })}
                        />
                        </Col>
                        </Row>
                    </Form.Group>
                    </Form>
                </Container>
            </Row>
            <Row>
            {/* Right Model Params */}
            </Row>
            </div>
        )
    }
}
