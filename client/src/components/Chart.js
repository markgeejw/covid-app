import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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
        const { newly_infected, resources } = this.props;
        const { numHospBeds, numICUBeds, numVents } = resources;
        const options = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Newly Infected'
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
                },
                plotLines: [{
                    color: 'black', // Color value
                    //   dashStyle: 'longdashdot', // Style of the plot line. Default to solid
                    value: numHospBeds, // Value of where the line will appear
                    width: 1, // Width of the line    
                    label: { 
                        text: 'Number of Hospital Beds', // Content of the label. 
                        align: 'left', // Positioning of the label. 
                    // Default to center. x: +10 // Amount of pixels the label will be repositioned according to the alignment. 
                    }
                }, {
                    color: 'red', // Color value
                    //   dashStyle: 'longdashdot', // Style of the plot line. Default to solid
                    value: numICUBeds, // Value of where the line will appear
                    width: 1, // Width of the line    
                    label: { 
                        text: 'Number of ICU Beds', // Content of the label. 
                        align: 'left', // Positioning of the label. 
                    // Default to center. x: +10 // Amount of pixels the label will be repositioned according to the alignment. 
                    }
                }, {
                    color: 'blue', // Color value
                    //   dashStyle: 'longdashdot', // Style of the plot line. Default to solid
                    value: numVents, // Value of where the line will appear
                    width: 1, // Width of the line    
                    label: { 
                        text: 'Number of Ventilators', // Content of the label. 
                        align: 'right', // Positioning of the label. 
                    // Default to center. x: +10 // Amount of pixels the label will be repositioned according to the alignment. 
                    }
                }]
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2020, 2, 22),
                    pointInterval: 24 * 3600 * 1000 * 4, // one day
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: "Newly Infected",
                data: newly_infected
            }]
        };

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <HighchartsReact highcharts={Highcharts} options={options} ref={this.chartComponent}/>
            </div>
        )
    }
}
