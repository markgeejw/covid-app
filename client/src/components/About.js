import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class About extends Component {

    render() {
        return (
            <Container style={{ paddingTop: 80, paddingBottom: 40 }}>
                <div style={{ textAlign: 'left' }}>
                <h2>About</h2>
                <div style={{ marginTop : 20 }}>
                    <p>This model examines the impact of different interventions on the number of patients infected, hospitalised and requiring ICU beds or ventilators over 6 months. It uses the most recent COVID-19 numbers, published and pre-published literature and health system data, which is updated daily.</p>
                    <p>A thorough explanation of model parameter selection and implementation can be found <a href="https://docs.google.com/document/d/1kOWmbMYhcBRnckX7RuUgWDOY61zJXRseCN3iA-I5vT4/edit?usp=sharing">here</a>. Our model can be queried through our API.</p>
                    <p>Disclaimer: This model should not be taken over expert public health or epidemiological advice. We take no responsibility for harm or actions resulting from this model. This software is provided under the MIT License. Copyright (c) 2020. No models are perfect or capture all variables. If you see a mistake, please contact Dr. Khoa Cao over LinkedIn.</p>
                    <p>Model was created by <a href="https://www.linkedin.com/in/khoanguyencao/">Dr. Khoa Cao</a>, <a href="https://www.linkedin.com/in/mark-gee-64ab85166/">Mark Gee</a> and <a href="https://www.linkedin.com/in/leon-truong-16845840/">Leon Truong</a>.</p>
                </div>
                </div>
            </Container>
        )
    }
}