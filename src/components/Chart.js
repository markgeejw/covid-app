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
        const { newly_infected, resources, measureWeeks, dates, hbeds_required, icubeds_required, vents_required, currentTab } = this.props;
        const [ numHospBeds_N, numHospBeds_S, numICUBeds_N, numICUBeds_S, numVents_N, numVents_S ] = resources;
        const possibleData = [newly_infected, hbeds_required, icubeds_required, vents_required];
        const dataNames = ["Infected", "Hospital Beds Required", "ICU Beds Required", "Ventilators Required"];
        const currentTabData = possibleData[currentTab];
        const currentTabName = dataNames[currentTab];
        
        const possiblePlotLines = [ [1000000, -1], 
                                    [numHospBeds_N, numHospBeds_S], 
                                    [numICUBeds_N, numICUBeds_S], 
                                    [numVents_N, numVents_S] ];
        const plotLineNames = ["1 million infected", "Number of Hospital Beds", "Number of ICU Beds", "Number of Ventilators"]
        const currentTabPlotLineArray = possiblePlotLines[currentTab];
        const currentTabPlotLineName = plotLineNames[currentTab]
        
        // Compute weeks
        const [ doNothing, socDist, relaxedLD, sigLD, critLD ] = measureWeeks;
        
        const data = dates.map((dateString, index) => {
            var dateArray = dateString.split("-").map(Number);
            dateArray[1] -= 1;
            const date = Date.UTC(dateArray[0], dateArray[1], dateArray[2]);
            return [date, currentTabData[index]];
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
                text: currentTabName + ' Over Time'
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
                    text: currentTabName
                },
                plotLines: [{
                    color: 'red', // Color value
                    value: currentTabPlotLineArray[0], // Value of where the line will appear
                    width: 2, // Width of the line    
                    zIndex: 2,
                    label: { 
                        text: currentTab === 0 ? currentTabPlotLineName : currentTabPlotLineName + " (Normal)", // Content of the label. 
                        align: 'left', // Positioning of the label. 
                    // Default to center. x: +10 // Amount of pixels the label will be repositioned according to the alignment. 
                    }
                }, {
                    color: 'red',
                    value: currentTabPlotLineArray[1],
                    width: currentTab === 0 ? 0 : 2,
                    zIndex: 2,
                    label: {
                        text: currentTab === 0 ? "" : currentTabPlotLineName + " (Surge)", // Content of the label. 
                        align: 'left'
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
                name: currentTabName,
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
