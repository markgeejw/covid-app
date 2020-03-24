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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum interdum tellus at rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tempus, arcu sed rutrum accumsan, orci mauris ultricies purus, ac sagittis diam urna vitae risus. Duis in nibh varius, viverra mauris at, interdum nunc. Duis malesuada at diam non scelerisque. Mauris bibendum cursus dictum. Donec vel ornare turpis.</p>
                            <p>Aliquam ut ex id urna malesuada cursus nec id sapien. Suspendisse potenti. Phasellus malesuada justo at quam eleifend tempus. Proin tempor maximus varius. Fusce nisl orci, luctus vel metus et, malesuada porttitor diam. Mauris rutrum egestas odio, sit amet posuere nisl ultrices et. Phasellus a neque massa. Nullam massa tellus, imperdiet nec dui at, pharetra suscipit orci. Etiam pharetra nulla hendrerit magna efficitur porta. Aenean accumsan cursus tellus. Nunc non nisl vel eros auctor posuere. Maecenas vitae convallis justo, in sollicitudin felis.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}