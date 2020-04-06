import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Tooltip, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const spawnToolTipFromColor = (color) => {
    const tooltipOptions = {
        tooltip: {
            backgroundColor: color,
            color: '#000000',
            fontSize: 13,
        }
    };
    return withStyles(tooltipOptions)(Tooltip);
}

const spawnSliderFromColor = (color) => {
    const sliderOptions = {
        root: {
          color: color,
          height: 8,
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
        },
        mark: {
            height: 0
        }
    };
    return withStyles(sliderOptions)(Slider);
}

const Slider1 = spawnSliderFromColor('#d26c67');
const Slider2 = spawnSliderFromColor('#df9c99');
const Slider3 = spawnSliderFromColor('#fbe69f');
const Slider4 = spawnSliderFromColor('#bdd6ab');
const Slider5 = spawnSliderFromColor('#9cc381');

const Tooltip1 = spawnToolTipFromColor('#d26c67');
const Tooltip2 = spawnToolTipFromColor('#df9c99');
const Tooltip3 = spawnToolTipFromColor('#fbe69f');
const Tooltip4 = spawnToolTipFromColor('#bdd6ab');
const Tooltip5 = spawnToolTipFromColor('#9cc381');

export default class Measures extends Component {

    render() {
        const { measureWeeks } = this.props;
        const max1 = 26 - measureWeeks[1] - measureWeeks[2] - measureWeeks[3] - measureWeeks[4];
        const max2 = 26 - measureWeeks[0] - measureWeeks[2] - measureWeeks[3] - measureWeeks[4];
        const max3 = 26 - measureWeeks[0] - measureWeeks[1] - measureWeeks[3] - measureWeeks[4];
        const max4 = 26 - measureWeeks[0] - measureWeeks[1] - measureWeeks[2] - measureWeeks[4];
        const max5 = 26 - measureWeeks[0] - measureWeeks[1] - measureWeeks[2] - measureWeeks[3];
        return(
            <div>
                <Container fluid style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Row>
                        <Col style={{ textAlign: "left" }}><h4>Inputs</h4></Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col style={{ textAlign: "left" }}>
                            <p><span style={{ fontWeight: 500 }}>Interventions in Weeks</span> (Max 26)</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className="Measure-Titles doNothing">
                                <p>Do Nothing
                                    <Tooltip1 title="Business as usual. Minimal damage to the economy. No interventions.">
                                        <IconButton style={{ marginLeft: 5, padding: 0 }} size='small'>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </IconButton>
                                    </Tooltip1>
                                </p>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Slider1
                            step={1}
                            marks={[{
                                value: 0,
                                label: '0'
                            }, {
                                value: max1 ? max1: 26,
                                label: '' + (max1 ? max1 : '')
                            }]}
                            max={max1}
                            value={measureWeeks[0]}
                            onChange={(_, value) => {
                                measureWeeks[0] = value;
                                this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                            }}
                            onChangeCommitted={() => {
                                this.props.eventHandlers.updateData();
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="doNothing" />
                    </Row>
                    <Row>
                        <Col>
                            <Row className="Measure-Titles socDist">
                                <p>Social Distancing
                                    <Tooltip2 title="Lockdown for high risk groups. Public advocacy for social distancing and enhanced hygiene. Restricted travel.">
                                        <IconButton style={{ marginLeft: 5, padding: 0 }} size='small'>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </IconButton>
                                    </Tooltip2>
                                </p>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Slider2
                            step={1}
                            marks={[{
                                value: 0,
                                label: '0'
                            }, {
                                value: max2 ? max2 : 26,
                                label: '' + (max2 ? max2 : '')
                            }]}
                            max={max2}
                            value={measureWeeks[1]}
                            onChange={(_, value) => {
                                measureWeeks[1] = value;
                                this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                            }}
                            onChangeCommitted={() => {
                                this.props.eventHandlers.updateData();
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="socDist" />
                    </Row>
                    <Row>
                        <Col>
                            <Row className="Measure-Titles relaxedLD">
                                <p>Relaxed Lockdown
                                    <Tooltip3 title="Voluntary community-wide home quarantine (especially firm for high-risk groups). Shutdown of non-essential businesses. Can still attend essential services (e.g. groceries, go for a run).">
                                        <IconButton style={{ marginLeft: 5, padding: 0 }} size='small'>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </IconButton>
                                    </Tooltip3>
                                </p>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Slider3
                            step={1}
                            marks={[{
                                value: 0,
                                label: '0'
                            }, {
                                value: max3 ? max3 : 26,
                                label: '' + (max3 ? max3 : '')
                            }]}
                            max={max3}
                            value={measureWeeks[2]}
                            onChange={(_, value) => {
                                measureWeeks[2] = value;
                                this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                            }}
                            onChangeCommitted={() => {
                                this.props.eventHandlers.updateData();
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="relaxedLD" />
                    </Row>
                    <Row>
                        <Col>
                            <Row className="Measure-Titles sigLD">
                                <p>Significant Lockdown
                                    <Tooltip4 title="Semi-voluntary community-wide home quarantine. Shops closed except groceries/medicine. Permission required to leave house or about one family member allowed to leave every 2 days.">
                                        <IconButton style={{ marginLeft: 5, padding: 0 }} size='small'>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </IconButton>
                                    </Tooltip4>
                                </p>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Slider4
                            step={1}
                            marks={[{
                                value: 0,
                                label: '0'
                            }, {
                                value: max4 ? max4 : 26,
                                label: '' + (max4 ? max4 : '')
                            }]}
                            max={max4}
                            value={measureWeeks[3]}
                            onChange={(_, value) => {
                                measureWeeks[3] = value;
                                this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                            }}
                            onChangeCommitted={() => {
                                this.props.eventHandlers.updateData();
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="sigLD" />
                    </Row>
                    <Row>
                        <Col>
                            <Row className="Measure-Titles critLD">
                                <p>Critical Lockdown
                                    <Tooltip5 title="Mandatory home quarantine for everyone. Food delivered by couriers or army. Officials move door-to-door for health checks and anyone ill is quarantined in a hospital.">
                                        <IconButton style={{ marginLeft: 5, padding: 0 }} size='small'>
                                            <FontAwesomeIcon icon={faQuestionCircle}/>
                                        </IconButton>
                                    </Tooltip5>
                                </p>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Slider5
                            step={1}
                            marks={[{
                                value: 0,
                                label: '0'
                            }, {
                                value: max5 ? max5 : 26,
                                label: '' + (max5 ? max5 : '')
                            }]}
                            max={max5}
                            value={measureWeeks[4]}
                            onChange={(_, value) => {
                                measureWeeks[4] = value;
                                this.props.eventHandlers.updateMeasureWeeks(measureWeeks);
                            }}
                            onChangeCommitted={() => {
                                this.props.eventHandlers.updateData();
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="critLD" />
                    </Row>
                </Container>
            </div>
        )
    }
}