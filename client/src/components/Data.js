import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container } from 'react-bootstrap';
import Tabletop from 'tabletop';
import moment from 'moment';
import { max } from 'mathjs'
// load data


export default class Data extends Component {

  constructor(props) {
      super(props)
      this.population = {
        population:0
      };
      this.series = {
        susceptible:[]
      };
      this.state = {
        hospital: [],
        cases:[],
        parameters:[]
      }
    }
    //https://medium.com/@ryan.mcnierney/using-react-google-sheets-as-your-cms-294c02561d59
    async componentDidMount() {
      // TODO add validation that data has been loaded
      // TODO parse and clean data types
      // https://github.com/jsoma/tabletop

      try
        {

        await Tabletop.init({
              key: '1VMw-xcTQ2u1pe4hwt8TGvA8a7RQrejauhdgBDqW_1pw',
              callback: googleData => {
                // console.log('google sheet data --->', googleData)
                this.setState({
                  hospital: googleData['Hospital'],
                  cases:googleData['Cases'],
                  parameters:googleData['Parameters']
                })
              },
              simpleSheet: false
            })
      }
      catch(error)
      {
        console.log(error);
      }

    }


  render() {


    // window.addEventListener('DOMContentLoaded', init)

    console.log('this is props -->', this.props);

    console.log('this is data -->',this.state);

    const R0Value = 2.68;
    const region = 'VIC';
    const hospitalAdmissionRates = 6.66/100;

    // get this from the spreadsheet or user input
    const startDate= '2020-03-22';


    const stopDate = moment(startDate).add(7,'months').format('YYYY-MM-DD');
    //const currentDate = '2020-03-22';

    // for future use, if we did things differently
    const simulateDate = '';

    const dateArray = getDates(startDate, stopDate);

    function getDates(startDate, stopDate) {
      // generate dates between a range
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(4, 'days');
      }
      return dateArray;
    }

    function initialise(){
      // initial values


    }

    function hospitalised(props, data){
      // cumulativeHospitalised - 3 weeks before last cumulativeHospitalised.
      // it assumed people recover on average 11 days
      console.log('hello world')

    };

    function newlyHospitalised(newlyInfected, hospitalAdmissionRates){
      return(newlyInfected * hospitalAdmissionRates)

    };

    function cumulativeHospitalised(region, props, data, initHospitalised, newlyHospitalised){

      var cumulativeHospitalised = 0
      if (typeof data.elements !== 'undefined'){

        cumulativeHospitalised = initHospitalised + newlyHospitalised

      return (cumulativeHospitalised)

      }
      else {
        console.log('data undefined');
      }

    };

    function R0(props, data){
      console.log('hello world')

    };

    function newlyInfected(R0Value, props,data, initCases, currentSusceptible, population){
      // if not in spreadsheet cases then estimate

      //  Case 1: find cases in spreadsheet
      // Case 2: Max(R0 * Susceptible * Population)
      // case 1

      if (typeof data.elements !== 'undefined'){

        var predictedNewlyInfected = R0Value * parseFloat(currentSusceptible) * parseFloat(initCases) / population

        return max(predictedNewlyInfected,0)
      }

    };

    function cumulativeInfected(){
      // cumulativeUnfected = currentInfect + previouslyInfected
      console.log('hello world')
    }

    function initSusceptible(props, newCases, population){

      if (typeof data !== 'undefined'){
        var susceptibleAtEnd = susceptibleAtStart - newCases
        return susceptibleAtEnd
      }


    }

    function susceptibleAtStart(props,data, totalCases, population){
      // cumulative infected - population
      if (typeof data !== 'undefined'){
        var currentSusceptible = population - totalCases
        return currentSusceptible
      }


    }

    function initCases(region, props, data, simulateDate=''){
      // return sum of historical
      var totalCases = 0;
      var endCaseDate = '';
      var currentCases = 0;

      if (typeof data.elements !== 'undefined'){

          if (simulateDate === ''){
            //data.elements.length
            for(var i=0; i < data.elements.length; i++){

              if(region === 'VIC'){
                  totalCases += parseInt(data.elements[i].Victoria)
              }


          }
          var currentCases = parseInt(data.elements[data.elements.length - 1].Victoria)
          var endCaseDate = data.elements[data.elements.length - 1].date
          return [totalCases, endCaseDate, currentCases]
        } else {
          //only take data to simulated date
        }

      }
      return [totalCases, endCaseDate, currentCases]

    };

    function getPopulation(region, props, data){
      // get region population
      var population = 0;
      if (typeof data.elements !== 'undefined'){
        //console.log(data.elements.length);

        for(var i=0; i <data.elements.length; i++){
          if(data.elements[i].State === region){

              population = data.elements[i].Population;

              break;
          }
        }

      }
      return (parseInt(population))
    }

    function initHospitalised(region, props, data){

        if (typeof data.elements !== 'undefined'){

          for(var i=0; i <data.elements.length; i++){
            if(data.elements[i].State === region){

                var initHospitalised = parseFloat(data.elements[i].Hospitalised)

                break;
            }
        }

          return (initHospitalised)
      };
    }

    function stillHospitalised(totalHospitalised, data, index){
      if (data.length < 2){

        console.log('before execute ->',data)
        return 0
      } else{
        console.log('index -->',index)
        console.log('data all-->',data)
        console.log('data length-->',data.length)
        console.log('data-->', data[index-2].cumulativeHospitalised)
        console.log('totalHospitalised-->', totalHospitalised)
        return totalHospitalised - data[index-2].cumulativeHospitalised
      }
    }

    // initialise Variables
    var population = getPopulation(region, this.props, this.state.hospital);
    var [totalCases, endDate, currentCases] = initCases(region, this.props, this.state.cases, simulateDate);
    var initHospitalised = initHospitalised(region,this.props, this.state.hospital)
    var initCases = totalCases - currentCases;
    var initSusceptible = population - (totalCases - currentCases);
    // simulate from here
    var currentSusceptible = initSusceptible;
    var currentInfected = currentCases;
    var newHospitalised = currentCases* hospitalAdmissionRates;
    var currentHospitalised = initHospitalised;
    var totalHospitalised = initHospitalised;
    var totalCases = initCases;
    var recoverHospitalised = 0;
    var series = [];

    // push inital values
    series.push({date:dateArray[0],
                 susceptibleAtStart:initSusceptible,
                 newlyInfected:currentInfected,
                 cumulativeInfected:totalCases,
                 newlyHospitalised:newHospitalised,
                 cumulativeHospitalised:totalHospitalised,
                 stillHospitalised:recoverHospitalised
               })

    // simulate
    for(var i=1; i < dateArray.length-45; i++){
      currentSusceptible -= currentCases
      currentInfected = newlyInfected(R0Value, this.props,this.state.cases, currentCases, currentSusceptible, population);

      newHospitalised =  newlyHospitalised(currentCases, hospitalAdmissionRates);


      totalHospitalised = cumulativeHospitalised(region,this.props,this.state.hospital, currentHospitalised,newHospitalised);

      // using historical value of totalHospitalised
      recoverHospitalised = stillHospitalised(totalHospitalised, series, i)

      series.push({date:dateArray[i],
                   susceptibleAtStart:currentSusceptible,
                   newlyInfected:currentInfected,
                   cumulativeInfected:totalCases,
                   newlyHospitalised:newHospitalised,
                   cumulativeHospitalised:totalHospitalised,
                   stillHospitalised:recoverHospitalised
                 })


      // update values
      currentCases = currentInfected;
      currentHospitalised += newHospitalised;
      totalCases += currentInfected

    }

    // loop through data and generate for periods
    function simulate(dateArray){
      //dateArray.length

      // data format
      // series: [{
      //     name: 'Jane',
      //     data: [1, 0, 4]
      // }, {
      //     name: 'John',
      //     data: [5, 7, 3]
      // }]
      //
      console.log('working')
    }

    //simulate(dateArray, population);

    // return a series array for charting
    return (
        <h1>Hello </h1>

    )

  };


};
