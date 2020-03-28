import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

            weeklyHosp:                 54173,

            // Model outputs
            model_results:              {},
            newly_infected:             [],
            hbeds_required:             [],
            icubeds_required:           [],
            vents_required:             [],
            dates:                      [],
            currentTab:                 0
        };
        this.output = React.createRef();
        this.appbar = React.createRef();
    }

    updateMeasureWeeks = (measureWeeks) => {
        this.setState({ measureWeeks: measureWeeks });
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
    
    updateTab = (tabIndx) => {
        this.setState({ currentTab: tabIndx });
    }

    updateData = () => {
        const { measureWeeks, modelParams, r0_params, hospBeds, ICUBeds, ventilators, population, weeklyHosp, cases } = this.state;
        var url = "http://localhost:9000";
        url += "?int_len=" + measureWeeks;
        url += "&model_vals=" + modelParams;
        url += "&r0=" + r0_params;
        url += "&resource_vals=" + hospBeds + "," + ICUBeds + "," + ventilators;
        url += "&state_info=" + population + "," + weeklyHosp;
        url += "&state_cases=" + cases;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                json = JSON.parse(json);
                this.setState({ 
                    model_results: json.results, 
                    newly_infected: json.data.newly_infected,
                    hbeds_required: json.data.hbeds_required,
                    icubeds_required: json.data.icubeds_required,
                    vents_required: json.data.vents_required,
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
        this.setState({ appbarHeight: this.appbar.current.clientHeight });
        var { country, state } = this.props.region;
        country = country.replace(/ /g, "_");
        state = state.replace(/ /g, "_");
        const rootUrl = "http://localhost:9000/";
        const infoEndpoint = "info";
        const caseEndpoint = "case";
        var queryParamStr = "?country=" + country;
        if (state !== ""){
            queryParamStr += "&state=" + state;
        }
        const infoUrl = rootUrl + infoEndpoint + queryParamStr;
        fetch(infoUrl)
            .then(res => !res.ok ? res.text().then(text => {throw Error(text)}) : res.json())
            .then(json => {
                json = JSON.parse(json);
                console.log("Info API returned:");
                console.log(json);
                const hbeds = json["public hospital beds"] + json["private hospital beds"];
                const icu_beds = json["icu beds"];
                const weekly_hosp = json["weekly hospital"];
                var { hospBeds, ICUBeds } = this.state;
                hospBeds[0] = hbeds;
                ICUBeds[0] = icu_beds;
                this.setState({
                    population: json.population,
                    hospBeds: hospBeds,
                    ICUBeds: ICUBeds,
                    weeklyHosp: weekly_hosp
                });

                // Get cases info from API
                // Compute date 15 days before (should be 13 but redundancy to deal with time zone diffs)
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - 15);
                const startDateString = startDate.toISOString().split("T")[0];
                queryParamStr += "&start_date=" + startDateString;
                queryParamStr += "&app=" + 1;
                const caseUrl = rootUrl + caseEndpoint + queryParamStr;
                fetch(caseUrl)
                    .then(res => !res.ok ? res.text().then(text => {throw Error(text)}) : res.json())
                    .then(json => {
                        json = JSON.parse(json);
                        console.log("Case API returned:")
                        console.log(json);
                        const cases = json["cases"];
                        while (cases.length !== 13){
                            const first = cases.shift();
                            cases[0] += first;
                        }
                        console.log(cases);
                        this.setState({ cases: cases });
                        this.updateData();
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }

    render() {
        const { currentTab, measureWeeks, modelParams, r0_params, 
            hospBeds, ICUBeds, ventilators, 
            model_results, newly_infected, hbeds_required, icubeds_required, vents_required,
            dates, appbarHeight } = this.state;
        const navbarHeight = this.props.navbarHeight;
        return (
        <Row style={{ margin: 0 }}>
            <AppBar 
                ref={this.appbar}
                className="border-bottom border-gray" 
                style={{ paddingBottom: 5, position: "fixed", top: navbarHeight }} 
                color="white" 
                elevation={0}>
                <Tabs
                value={currentTab}
                onChange={(_, value) => {
                    this.setState({currentTab: value})
                }}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="full width tabs example"
                >
                <Tab label="Infections"
                id="full-width-tab-0"
                aria-controls="full-width-tabpanel-0"/>
                <Tab label="Hospitalisations"
                id="full-width-tab-1"
                aria-controls="full-width-tabpanel-1"/>
                <Tab label="ICU Admissions"
                id="full-width-tab-2"
                aria-controls="full-width-tabpanel-2"/>
                <Tab label="Ventilators"
                id="full-width-tab-3"
                aria-controls="full-width-tabpanel-3"/>
                </Tabs>
            </AppBar>
            <Col xs={3} style={{ paddingRight: 0 }}>
                <div className="Fixed border-right border-gray" style={{ paddingTop: 20 + appbarHeight + navbarHeight }}>
                    <Input
                        params={{
                            measureWeeks: measureWeeks, 
                            modelParams: modelParams, 
                            r0_params: r0_params, 
                            hospBeds: hospBeds, 
                            ICUBeds: ICUBeds, 
                            ventilators: ventilators
                        }}
                        currentTab={currentTab}
                        eventHandlers={{
                            updateData: this.updateData,
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
                <div style={{ paddingTop: 20 + appbarHeight + navbarHeight }}>
                <Output 
                    barHeight={appbarHeight + navbarHeight}
                    results={model_results}
                    measureWeeks={measureWeeks}
                    resources={{
                        numHospBeds: hospBeds[0],
                        numICUBeds:  ICUBeds[0],
                        numVents:    ventilators[0]
                    }}
                    region = {{ 
                        country: this.props.region.country,
                        state: this.props.region.state
                    }}
                    currentTab={currentTab}
                    dates={dates}
                    newly_infected={newly_infected}
                    hbeds_required={hbeds_required}
                    icubeds_required={icubeds_required}
                    vents_required={vents_required}
                    ref={this.output}/>
                </div>
            </Col>
        </Row>
        )
    }
}