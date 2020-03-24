import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container } from 'react-bootstrap';
import Data from './Data';


export default class Chart extends Component {
  constructor(props) {
      super(props)
    }
  render() {
    // parse data


    function parseToSeries(data, column){

      var series = []
      if (typeof data !== 'undefined'){
      for(var i=1; i < data.length; i++){
        series.push(data[i][column])
      }
      return series
      }
    };

    const placeHolderSusceptible = [66.29779, 66.29779, 66.29779];
    const placeHolderInfected = [121, 296, 352];
    const placeHolderRecovered = [0, 16, 47];
    const placeHolderHospitalised = [7, 19, 22];
    const placeHolderICU = [0, 4, 8];
    const placeHolderVentilators = [0, 0, 2];
    const placeHolderDeaths = [0, 2, 2];
    const y = []
    const x = parseToSeries(this.props.scenarios, 'date')
    const stillHospitalised = parseToSeries(this.props.scenarios, 'stillHospitalised');



    const options = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'stillHospitalised'
        },
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
                pointInterval: 24 * 3600 * 1000 * 4 // one day
            }
        },
        series: [{
            name: 'stillHospitalised',
            data: stillHospitalised
        }, {
            name: 'stillHospitalised',
            data: stillHospitalised
        }, {
            name: "Recovered",
            data: placeHolderRecovered
        }, {
            name: "Hospitalised",
            data: placeHolderHospitalised
        }, {
            name: "ICU",
            data: placeHolderICU
        }, {
            name: "Ventilators",
            data: placeHolderVentilators
        }, {
            name: "Deaths",
            data: placeHolderDeaths
        }]


    };



    return (

      <Container style={{ marginTop: 20 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Container>
    )
  }
}
