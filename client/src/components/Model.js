import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Input from './Input';
import Output from './Output';

export default class Model extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // Model inputs
            // Intervention lengths
            measureWeeks:               [0, 26, 0, 0, 0],
            
            // Model Parameters
            modelParams:                ['6.66', '2.0', '50', '1.0', '0.97', '1.66', '100', '100'],

            // Intervention Parameters
            r0_params:                  ['2.67', '1.68', '1.40', '1.05', '0.32'],

            // Resource Availability
            // Hospital Beds
            hospBeds:                   ['23187', '40', '80'],
            // ICU Beds
            ICUBeds:                    ['476', '40', '80'],
            // Ventilators
            ventilators:                ['358', '40', '80', '300'],

            // Model outputs
            model_results: {},
            newly_infected: [],
            dates: []
        };
        this.output = React.createRef();
    }

    updateMeasureWeeks = (measureWeeks) => {
        this.setState({ measureWeeks: measureWeeks });
        this.updateData();
    }

    updateModelParams = (modelParams) => {
        this.setState({ modelParams: modelParams });
        this.updateData();
    }

    updateR0Params = (r0_params) => {
        this.setState({ r0_params: r0_params });
        this.updateData();
    }
    
    updateHospBeds = (hospBeds) => {
        this.setState({ hospBeds: hospBeds });
        this.updateData();
    }

    updateICUBeds = (ICUBeds) => {
        this.setState({ ICUBeds: ICUBeds });
        this.updateData();
    }

    updateVentilators = (ventilators) => {
        this.setState({ ventilators: ventilators });
        this.updateData();
    }

    updateData = () => {
        const { measureWeeks, modelParams, r0_params, hospBeds, ICUBeds, ventilators } = this.state;
        var url = "http://localhost:9000";
        url += "?int_len=" + measureWeeks;
        url += "&model_vals=" + modelParams;
        url += "&r0=" + r0_params;
        url += "&resource_vals=" + hospBeds + "," + ICUBeds + "," + ventilators;
        url += "&state=vic";
        fetch(url)
            .then(res => res.json())
            .then(json => {
                json = JSON.parse(json);
                this.setState({ 
                    model_results: json.results, 
                    newly_infected: json.data.newly_infected,
                    dates: json.data.dates
                });
                var axis = this.output.current.chartComponent.current.chartComponent.current.chart.axes[1];
                axis.plotLinesAndBands.forEach(function(lineOrBand) {
                    for (var prop in axis.ticks) {
                        var tick = axis.ticks[prop];
                        if (Number(lineOrBand.options.value) === tick.pos) {
                            tick.gridLine.element.style.display = 'none';
                        }
                    }
                });
            })
            .catch(err => err);
    }

    componentDidMount() {
        this.updateData();
    }

    render() {
        const { measureWeeks, modelParams, r0_params, hospBeds, ICUBeds, ventilators, model_results, newly_infected, dates } = this.state;
        return (
        <div>
            <Row style={{ width: "100%", margin: 0 }}>
                <Col xs={3} style={{ paddingRight: 0 }}>
                    <div className="Input border-right border-gray">
                        <Input
                            params = {{
                                measureWeeks: measureWeeks, 
                                modelParams: modelParams, 
                                r0_params: r0_params, 
                                hospBeds: hospBeds, 
                                ICUBeds: ICUBeds, 
                                ventilators: ventilators
                            }}
                            eventHandlers={{
                                updateMeasureWeeks: this.updateMeasureWeeks,
                                updateModelParams: this.updateModelParams,
                                updateR0Params: this.updateR0Params,
                                updateHospBeds: this.updateHospBeds,
                                updateICUBeds: this.updateICUBeds,
                                updateVentilators: this.updateVentilators
                            }}/>
                    </div>
                </Col>
                <Col xs={9} style={{ backgroundColor: '#fefefa', paddingLeft: 0 }}>
                    <Output 
                        results={model_results}
                        measureWeeks={measureWeeks}
                        resources={{
                            numHospBeds: hospBeds[0],
                            numICUBeds:  ICUBeds[0],
                            numVents:    ventilators[1]
                        }}
                        dates={dates}
                        newly_infected={newly_infected}
                        ref={this.output}/>
                </Col>
            </Row>
        </div>
        )
    }
}