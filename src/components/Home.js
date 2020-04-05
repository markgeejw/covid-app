import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import Select from "react-select";
import { format_countries } from "../utils/utils";
const config = require("../config.json");
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            state: "",
        };
    }

    render() {
        const supported_regions = config["supported_regions"];
        const { country, state } = this.state;
        var country_select_options = [];
        var state_select_options = [];
        country_select_options.push({
            label: "Select country",
            value: "",
            color: "grey",
        });
        Object.keys(supported_regions).forEach((country) => {
            country_select_options.push({
                label: format_countries(country),
                value: country,
            });
        });
        const country_selected = country !== "";
        const no_states =
            country === "" || supported_regions[country].length === 0;
        if (!no_states) {
            state_select_options.push({ label: "Select state", value: "" });
            supported_regions[country].forEach((state) => {
                state_select_options.push({ label: state, value: state });
            });
        }
        const color_styles = {
            option: (styles, { data, isSelected }) => {
                return {
                    ...styles,
                    color:
                        data.value === ""
                            ? "grey"
                            : isSelected
                            ? "white"
                            : "black",
                };
            },
            singleValue: (styles, { data }) => ({
                ...styles,
                color: data.value === "" ? "grey" : "black",
            }),
        };
        return (
            <Container
                style={{ paddingTop: 80, paddingBottom: 40, textAlign: "left" }}
            >
                <h2>COVID-19 Model</h2>
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <p>
                        This epidemiological model examines the impact of
                        different interventions on the number of patients
                        infected, hospitalised and requiring ICU beds or
                        ventilators over 6 months. It uses the most recent
                        COVID-19 numbers, published and pre-published literature
                        and health system data, which is updated daily. A
                        thorough explanation of model parameter selection and
                        implementation can be found{" "}
                        <a href="https://docs.google.com/document/d/1kOWmbMYhcBRnckX7RuUgWDOY61zJXRseCN3iA-I5vT4/edit?usp=sharing">
                            here
                        </a>
                        .
                    </p>
                    <p>
                        To support other developers working in the same field,
                        we also released an API for our model, as well as
                        information about countries/states useful for model
                        inputs. This includes information like population and
                        hospital resources. Further information about the API
                        can be found on the{" "}
                        <a href="https://github.com/markgeejw/covid-app">
                            Github repository
                        </a>
                        .
                    </p>
                    <p>
                        <strong>Disclaimer</strong>: This model should not be
                        taken over expert public health or epidemiological
                        advice. We take no responsibility for harm or actions
                        resulting from this model. This software is provided
                        under the MIT License. Copyright (C) 2020.
                    </p>
                    <p>
                        <strong>Authors</strong>: Model was created by{" "}
                        <a href="https://www.linkedin.com/in/khoanguyencao/">
                            Dr. Khoa Cao
                        </a>
                        ,{" "}
                        <a href="https://www.linkedin.com/in/mark-gee-64ab85166/">
                            Mark Gee
                        </a>{" "}
                        and{" "}
                        <a href="https://www.linkedin.com/in/leon-truong-16845840/">
                            Leon Truong
                        </a>
                        .
                    </p>
                </div>
                <h6 style={{ textDecoration: "underline" }}>Instructions</h6>
                <p>
                    To use the model, select a country, followed by a state if
                    available. Not all states are available. If no state is
                    selected, the model aggregates data for the selected
                    country.
                </p>
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <h4>Country</h4>
                    <Select
                        options={country_select_options}
                        styles={color_styles}
                        placeholder="Select country"
                        onChange={(selected) =>
                            this.setState({ country: selected.value })
                        }
                    />
                    {!no_states && (
                        <div>
                            <h4 style={{ marginTop: 10 }}>State</h4>
                            <Select
                                placeholder="Select state"
                                styles={color_styles}
                                options={state_select_options}
                                onChange={(selected) =>
                                    this.setState({ state: selected.value })
                                }
                            />
                        </div>
                    )}
                </div>
                {country_selected && (
                    <Button
                        onClick={() =>
                            this.props.eventHandlers.updateRegion(
                                false,
                                country,
                                state
                            )
                        }
                    >
                        Model
                    </Button>
                )}
            </Container>
        );
    }
}
