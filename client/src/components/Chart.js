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
        const { newly_infected, resources, measureWeeks, dates } = this.props;
        const { numHospBeds, numICUBeds, numVents } = resources;
        
        // Compute weeks
        const [ doNothing, socDist, relaxedLD, sigLD, critLD ] = measureWeeks;
        
        const data = dates.map((dateString, index) => {
            var dateArray = dateString.split("-").map(Number);
            dateArray[1] -= 1;
            const date = Date.UTC(dateArray[0], dateArray[1], dateArray[2]);
            return [date, newly_infected[index]];
        });

        var indx = 0;
        var measureDates = [];
        if (dates[0]) {
            measureDates.push(data[0][0]);
            measureWeeks.forEach((int_len) => {
                indx += Math.trunc(Math.round(int_len * 7 / 4));
                if (indx > dates.length){
                    indx = dates.length;
                } 
                measureDates.push(data[indx ? indx-1: indx][0]);
            })
        }
        const [ startDoNothing, startSocDist, startRelaxedLD, startSigLD, startCritLD, endCritLD ] = measureDates;

        const options = {
            chart: {
                backgroundColor: '#fefefa',
                type: 'line'
            },
            title: {
                text: 'Newly Infected Over Time'
            },
            // data: {
            //     googleSpreadsheetKey: '12Ldo5cwQMCu1Aka2p0nCCvajjYlXQ_ags1OtwHOyKeM'
            // },
            xAxis: {
                type: 'datetime',
                plotBands: [{
                    color: doNothing ? 'rgba(210,108,103,0.2)' : 'rgba(255,255,255,0)',
                    from: startDoNothing,
                    to: startSocDist,
                    // label: {
                    //     text: doNothing ? 'Do Nothing' : '',
                    //     align: 'center'
                    // }
                }, {
                    color: socDist ? 'rgba(223,156,153,0.2)' : 'rgba(255,255,255,0)',
                    from: startSocDist,
                    to: startRelaxedLD,
                    // label: {
                    //     text: socDist ? 'Social Distancing': '',
                    //     align: 'center'
                    // }
                }, {
                    color: relaxedLD ? 'rgba(251,230,159,0.2)' : 'rgba(255,255,255,0)',
                    from: startRelaxedLD,
                    to: startSigLD,
                    // label: {
                    //     text: relaxedLD ? 'Relaxed Lockdown' : '',
                    //     align: 'center'
                    // }
                }, {
                    color: sigLD ? 'rgba(189,214,171,0.2)' : 'rgba(255,255,255,0)',
                    from: startSigLD,
                    to: startCritLD,
                    // label: {
                    //     text: sigLD ? 'Significant Lockdown' : '',
                    //     align: 'center'
                    // }
                }, {
                    color: critLD ? 'rgba(156,195,129,0.2)' : 'rgba(255,255,255,0)',
                    from: startCritLD,
                    to: endCritLD,
                    // label: {
                    //     text: critLD ? 'Critical Lockdown' : '',
                    //     align: 'center'
                    // }
                }]

            },
            yAxis: {
                title: {
                    text: 'Newly Infected'
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
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: "Newly Infected",
                data: data
            }]
        };

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <HighchartsReact highcharts={Highcharts} options={options} ref={this.chartComponent}/>
            </div>
        )
    }
}
