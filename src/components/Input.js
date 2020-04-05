import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faQuestionCircle, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Measures from './Measures';
import Params from './Params';
import Instructions from './Instructions';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelParamMode: false,
            showInstructions: false
        };
    }

    toggleInputState = () => {
        this.setState({ modelParamMode: !this.state.modelParamMode });
    }

    toggleHowToUse = () => {
        this.setState({ showInstructions: !this.state.showInstructions });
    }

    render() {
        const { measureWeeks, modelParams, r0_params, hospBeds, ICUBeds, ventilators } = this.props.params;
        const { updateData, updateMeasureWeeks, updateModelParams, updateR0Params, updateHospBeds, updateICUBeds, updateVentilators } = this.props.eventHandlers;
        const { modelParamMode, showInstructions } = this.state;
        return(
            <div>
                {!modelParamMode && !showInstructions && <Measures
                    measureWeeks={measureWeeks}
                    eventHandlers={{
                        updateData: updateData,
                        updateMeasureWeeks: updateMeasureWeeks
                    }}
                />}
                {!modelParamMode && !showInstructions && <div>
                    <Row style={{ marginTop: 30, margin: 20 }}>
                        <Button onClick={this.toggleInputState} style={{ width: "100%" }}><FontAwesomeIcon icon={faCog}/> Model Parameters</Button>
                    </Row>
                    <Row style={{ marginTop: 30, margin: 20  }}>
                        <Button onClick={this.toggleHowToUse} style={{ width: "100%" }}><FontAwesomeIcon icon={faQuestionCircle}/> How to Use</Button>
                    </Row>
                </div>}
                {modelParamMode && !showInstructions && <Params
                    params={{
                        modelParams: modelParams, 
                        r0_params: r0_params, 
                        hospBeds: hospBeds, 
                        ICUBeds: ICUBeds, 
                        ventilators: ventilators
                    }}
                    currentTab={this.props.currentTab}
                    eventHandlers={{
                        updateModelParams: updateModelParams,
                        updateR0Params: updateR0Params,
                        updateHospBeds: updateHospBeds,
                        updateICUBeds: updateICUBeds,
                        updateVentilators: updateVentilators
                    }}
                />}
                {modelParamMode && !showInstructions && <div>
                    <Row style={{ marginTop: 30, margin: 20 }}>
                        <Button onClick={this.toggleInputState} style={{ width: "100%" }}><FontAwesomeIcon icon={faChevronCircleLeft}/> Done</Button>
                    </Row>
                </div>}
            {/* Instructions */}
                {showInstructions && <Instructions/>}
                {showInstructions && <div>
                    <Row style={{ marginTop: 30, margin: 20 }}>
                        <Button onClick={this.toggleHowToUse} style={{ width: "100%" }}><FontAwesomeIcon icon={faChevronCircleLeft}/> Done</Button>
                    </Row>
                </div>}
            </div>
        )
    }
}
