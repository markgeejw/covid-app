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

        const startDoNothing = data[0][0];
        var accumWeeks = Number(doNothing);
        const startSocDist = data[Math.trunc(Math.round(accumWeeks * 7) / 4)][0];
        accumWeeks += Number(socDist);
        const startRelaxedLD = data[Math.trunc(Math.round(accumWeeks * 7) / 4)][0];
        accumWeeks += Number(relaxedLD);
        const startSigLD = data[Math.trunc(Math.round(accumWeeks * 7) / 4)][0];
        accumWeeks += Number(sigLD);
        const startCritLD = data[Math.trunc(Math.round(accumWeeks * 7) / 4)][0];
        accumWeeks += Number(critLD);
        const endCritLD = data[Math.trunc(Math.round(accumWeeks * 7) / 4)][0];

        const options = {
            chart: {
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
                // plotLines: [{
                //     color: doNothing ? 'rgba(210,108,103,1)' : 'white',
                //     value: startDoNothing,
                //     // label: {
                //     //     text: 'Do Nothing',
                //     //     align: 'center',
                //     //     y: -30,
                //     //     rotation: 0
                //     // }
                // }, {
                //     color: socDist ? '#df9c99' : 'white',
                //     value: startSocDist,
                //     // label: {
                //     //     text: 'Social Distancing',
                //     //     align: 'center',
                //     //     y: -60,
                //     //     rotation: 0
                //     // }
                // }, {
                //     color: relaxedLD ? '#fbe69f' : 'white',
                //     value: startRelaxedLD,
                //     // label: {
                //     //     text: 'Relaxed Lockdown',
                //     //     align: 'center',
                //     //     y: -30,
                //     //     rotation: 0
                //     // }
                // }, {
                //     color: sigLD ? '#bdd6ab' : 'white',
                //     value: startSigLD,
                //     // label: {
                //     //     text: 'Significant Lockdown',
                //     //     align: 'center',
                //     //     y: -60,
                //     //     rotation: 0
                //     // }
                // }, {
                //     color: critLD ? '#9cc381' : 'white',
                //     value: startCritLD,
                //     // label: {
                //     //     text: 'Critical Lockdown',
                //     //     align: 'center',
                //     //     y: -30,
                //     //     rotation: 0
                //     // }
                // }],
                plotBands: [{
                    color: doNothing ? 'rgba(210,108,103,0.2)' : 'white',
                    from: startDoNothing,
                    to: startSocDist,
                    // label: {
                    //     text: doNothing ? 'Do Nothing' : '',
                    //     align: 'center'
                    // }
                }, {
                    color: socDist ? 'rgba(223,156,153,0.2)' : 'white',
                    from: startSocDist,
                    to: startRelaxedLD,
                    // label: {
                    //     text: socDist ? 'Social Distancing': '',
                    //     align: 'center'
                    // }
                }, {
                    color: relaxedLD ? 'rgba(251,230,159,0.2)' : 'white',
                    from: startRelaxedLD,
                    to: startSigLD,
                    // label: {
                    //     text: relaxedLD ? 'Relaxed Lockdown' : '',
                    //     align: 'center'
                    // }
                }, {
                    color: sigLD ? 'rgba(189,214,171,0.2)' : 'white',
                    from: startSigLD,
                    to: startCritLD,
                    // label: {
                    //     text: sigLD ? 'Significant Lockdown' : '',
                    //     align: 'center'
                    // }
                }, {
                    color: critLD ? 'rgba(156,195,129,0.2)' : 'white',
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
