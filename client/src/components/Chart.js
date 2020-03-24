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

    render() {
        const { data } = this.props;
        const { newly_infected, 
            susceptible_start,
            susceptible_end,
            newly_hospitalised,
            hbeds_required,
            newly_icu,
            icubeds_required,
            true_icubeds,
            newly_vent,
            vents_required,
            true_vents,
            newly_passed,
            overload_passed,
            newly_recovered } = data;
        const options = {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            // data: {
            //     googleSpreadsheetKey: '12Ldo5cwQMCu1Aka2p0nCCvajjYlXQ_ags1OtwHOyKeM'
            // },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2020, 2, 22),
                    pointInterval: 24 * 3600 * 1000 * 4, // one day
                    showCheckbox: true
                }
            },
            series: [{
                name: "Newly Infected",
                data: newly_infected
            }, {
                name: "Susceptible at Start",
                data: susceptible_start
            }, {
                name: "Susceptible at End",
                data: susceptible_end
            }, {
                name: "Newly Hospitalised",
                data: newly_hospitalised
            }, {
                name: "Hospital Beds Required",
                data: hbeds_required
            }, {
                name: "Newly ICU",
                data: newly_icu
            }, {
                name: "ICU Beds Required",
                data: icubeds_required
            }, {
                name: "True ICU Beds",
                data: true_icubeds
            }, {
                name: "Newly Vent",
                data: newly_vent
            }, {
                name: "Ventilators Required",
                data: vents_required
            }, {
                name: "True Vents",
                data: true_vents
            }, {
                name: "Newly Passed",
                data: newly_passed
            }, {
                name: "Overload Passed",
                data: overload_passed
            }, {
                name: "Newly Recovered",
                data: newly_recovered
            }]
        };

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <HighchartsReact highcharts={Highcharts} options={options} ref={this.chartComponent}/>
            </div>
        )
    }
}
