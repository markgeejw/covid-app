import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button } from 'react-bootstrap';
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/data")(Highcharts);

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.chartComponent = React.createRef();
    }

    componentDidMount() {
      const container = this.chartComponent.current.container.current;
  
      container.style.height = "100%";
      container.style.width = "100%";
      this.chartComponent.current.chart.reflow();
    }

    test() {
        console.log("hi");
    }

    render() {
        const placeHolderSusceptible = [66.29779, 66.29779, 66.29779];
        const placeHolderInfected = [121, 296, 352];
        const placeHolderRecovered = [0, 16, 47];
        const placeHolderHospitalised = [7, 19, 22];
        const placeHolderICU = [0, 4, 8];
        const placeHolderVentilators = [0, 0, 2];
        const placeHolderDeaths = [0, 2, 2];
        const options = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Some data here'
            },
            data: {
                googleSpreadsheetKey: '12Ldo5cwQMCu1Aka2p0nCCvajjYlXQ_ags1OtwHOyKeM'
            },
            // xAxis: {
            //     type: 'datetime'
            // },
            // yAxis: {
            //     title: {
            //         text: ''
            //     }
            // },
            // plotOptions: {
            //     series: {
            //         pointStart: Date.UTC(2020, 2, 22),
            //         pointInterval: 24 * 3600 * 1000 * 4 // one day
            //     }
            // },
            // series: [{
            //     name: "Susceptible",
            //     data: placeHolderSusceptible
            // }, {
            //     name: "Infected",
            //     data: placeHolderInfected
            // }, {
            //     name: "Recovered",
            //     data: placeHolderRecovered
            // }, {
            //     name: "Hospitalised",
            //     data: placeHolderHospitalised
            // }, {
            //     name: "ICU",
            //     data: placeHolderICU
            // }, {
            //     name: "Ventilators",
            //     data: placeHolderVentilators
            // }, {
            //     name: "Deaths",
            //     data: placeHolderDeaths
            // }]
        };

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <HighchartsReact highcharts={Highcharts} options={options} ref={this.chartComponent}/>
            </div>
        )
    }
}
