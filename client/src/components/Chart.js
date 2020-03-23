import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//import HighchartsReactNative from '@highcharts/highcharts-react-native';
import { Container } from 'react-bootstrap';

require("highcharts/modules/data")(Highcharts);

export default class Chart extends Component {
  render() {
    const options = {
        title: {
            text: 'VIC'
        },
        data: {
            googleSpreadsheetKey: '12Ldo5cwQMCu1Aka2p0nCCvajjYlXQ_ags1OtwHOyKeM',
            googleSpreadsheetWorksheet:1
        }
        ,
        series: [{
          type: 'area'
          // for each series, we can have a differnt line type
        }]
    };

    return (
      <Container style={{ marginTop: 20 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Container>
    )
  }
}
