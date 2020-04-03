import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default class Instructions extends Component {

    render() {
        return(
            <div>
            {/* Left Input */}
                <Container fluid style={{ padding: 20, paddingTop: 80 }}>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h4>How To Use</h4></Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "left", paddingTop: 20 }}>
                            <p>Select the number of weeks you want for each intervention (max 26 weeks). Hover over each to find out what they mean and what measures are required.</p>
		                    <p>Interventions occur in order, from least invasive to most invasive (top to bottom). If you don't reach 26 weeks, the rest becomes social distancing.</p>
                            <p>Click on model parameters to change more detailed variables, like how many ventilators are available.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
