import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container } from 'react-bootstrap';



export default class Chart extends Component {
  render() {
    const options = {
      
        title: {
            text: 'VIC'
        },
        data: {
            googleSpreadsheetKey: '12Ldo5cwQMCu1Aka2p0nCCvajjYlXQ_ags1OtwHOyKeM'
        }
    };

    return (
      <Container style={{ marginTop: 20 }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Container>
    )
  }
}
