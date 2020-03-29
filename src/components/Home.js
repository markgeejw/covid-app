import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const config = require('../config.json');

export default class Home extends Component {

    render() {
        const supported_regions = config["supported_regions"];
        return (
            <Container style={{ paddingTop: 80, paddingBottom: 40, textAlign: 'left' }}>
            <h2>COVID-19 Model</h2>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                <p>This epidemiological model examines the impact of different interventions on the number of patients infected, hospitalised and requiring ICU beds or ventilators over 6 months. It uses the most recent COVID-19 numbers, published and pre-published literature and health system data, which is updated daily. A thorough explanation of model parameter selection and implementation can be found <a href="https://docs.google.com/document/d/1kOWmbMYhcBRnckX7RuUgWDOY61zJXRseCN3iA-I5vT4/edit?usp=sharing">here</a>. Our model can be queried through our API <a href="www.covidmodelling.com/api/">here</a>.</p>
                <p>To support other developers working in the same field, we also released an API for our model, as well as information about countries/states useful for model inputs. This includes information like population and hospital resources. Further information about the API can be found on the <a href="https://github.com/markgeejw/covid-app">Github repository</a>.</p>
                <p><strong>Disclaimer</strong>: This model should not be taken over expert public health or epidemiological advice. We take no responsibility for harm or actions resulting from this model. This software is provided under the MIT License. Copyright (C) 2020.</p>
                <p><strong>Authors</strong>: Model was created by <a href="https://www.linkedin.com/in/khoanguyencao/">Dr. Khoa Cao</a>, <a href="https://www.linkedin.com/in/mark-gee-64ab85166/">Mark Gee</a> and <a href="https://www.linkedin.com/in/leon-truong-16845840/">Leon Truong</a>.</p>
            </div>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
            <h4>List of supported countries and states:</h4>
            {Object.keys(supported_regions).map((country, index) => {
                return(
                    <ul key={index}>
                        <li>
                            <Link
                            onClick={() => {this.props.eventHandlers.updateRegion(false, country, "")}}
                            to="/">
                            {country}
                            </Link>
                        </li>
                        <ul>
                            {supported_regions[country].map((state, index) => {
                                return(
                                    <li key={index}>
                                        <Link
                                        to="/"
                                        onClick={() => {this.props.eventHandlers.updateRegion(false, country, state)}}>
                                            {state}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </ul>)
            })}
            </div>
            </Container>
        )
    }
}