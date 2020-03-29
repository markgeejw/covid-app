import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class Footer extends Component {

    render() {
        return(
            <div>
                <footer className="footer">
                    <Container className="border-top border-gray">
                        <Row>
                            <Col>
                            <Row>
                                <Col>Home</Col>
                                <Col>About</Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        )
    }
}