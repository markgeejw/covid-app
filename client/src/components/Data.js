import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container } from 'react-bootstrap';
import Tabletop from 'tabletop';
import moment from 'moment';
import { max, min } from 'mathjs';
import Chart from './Chart';

export default class Data extends Component {

  constructor(props) {
      super(props)
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
      // TODO bring to standard format
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

    var scenarioTitle = 'Do nothing'

    var intervensionParameters = {'Do Nothing':2.68,
                      'Social Distancing':1.67,
                      'Relaxed Lockdown':1.40,
                      'Significant Lockdown':1.05,
                      'Critical Lockdown':0.32};

    var interventionScenario = {
                      'Do Nothing':0,
                      'Social Distancing':4,
                      'Relaxed Lockdown':4,
                      'Significant Lockdown':4,
                      'Critical Lockdown':4};

    const region = 'VIC';

    var modelParameters = {
                          'Hospital Admission Rates':0.0666,
                          'ICU Admission Rates':0.02,
                          '% ICU Admits needing Ventilator': 0.5,
                          'Ventilator Rates':0.01,
                          'Case Fatality Rate (Normal)':0.0097,
                          'Case Fatality Rate (Overload)':0.0166,
                          }

    var resourceAvailability = {
                          'Hospital Beds': {
                            'Number of Hospital Beds':23187,
                            'Bed Utilisation':0.4,
                            'Surge Bed Utilisation':0.8
                          },
                          'ICU Beds':{
                            'Number of ICU Beds':476,
                            'ICU Bed Utilisation':0.4,
                            'Surge ICU Bed Utilisation':0.8
                          },
                          'Ventilators':{
                            'Ventilator Numbers (per 100,000)':5.4,
                            'Number of Ventilators':358,
                            'Ventilator Utilisation':.4,
                            'Surge Ventilator Utilisation':.8,
                            'Surge Ventilator Capacity':3
                            }
                          };

    // get this from the spreadsheet or user input
    const startDate= '2020-03-22';
    const stopDate = moment(startDate).add(7,'months').format('YYYY-MM-DD');
    // for future use, if we did things differently
    const simulateDate = '';
    const dateList = getDates(startDate, stopDate);

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

    function hospitalised(props, data){
      // cumulativeHospitalised - 3 weeks before last cumulativeHospitalised.
      // it assumed people recover on average 11 days
      return null

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

    function R0(props, data, interventionScenario,
                intervensionParameters,
                index,
                sim_interval = 4
              ){
        var num_float = 7/sim_interval;

        if (parseFloat(index) <= (interventionScenario['Do Nothing']*parseFloat(num_float))){
          return intervensionParameters['Do Nothing']
        }
        else if (index - (interventionScenario['Do Nothing']*num_float) <= interventionScenario['Social Distancing']*num_float ) {
          return intervensionParameters['Social Distancing']
        }
        else if (index - interventionScenario['Do Nothing']*num_float - interventionScenario['Social Distancing']*num_float
                      <= interventionScenario['Relaxed Lockdown']*num_float) {
          return intervensionParameters['Relaxed Lockdown']
        }
        else if (index - interventionScenario['Do Nothing']*num_float
                      - interventionScenario['Social Distancing']*num_float
                      - interventionScenario['Relaxed Lockdown']*num_float
                      <= interventionScenario['Significant Lockdown']*num_float) {

          return intervensionParameters['Significant Lockdown']
        }
        else if (index - interventionScenario['Do Nothing']*num_float
                      - interventionScenario['Social Distancing']*num_float
                      - interventionScenario['Relaxed Lockdown']*num_float
                      - interventionScenario['Significant Lockdown']*num_float
                      <= interventionScenario['Critical Lockdown']*num_float) {
          return intervensionParameters['Critical Lockdown']
        }
        else {
          return intervensionParameters['Social Distancing']
        }
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
        return 0
      } else{
        return totalHospitalised - data[index-2].cumulativeHospitalised
      }
    }

    function currentlyInfected(region, data, casesData,index){
      // the sum of three periods prior of newly infected
      var region = 'VIC'
      if (region === 'VIC'){
        region = 'Victoria'
      }


      if (typeof casesData.elements !== 'undefined'){
        if (data.length < 1){
          return parseInt(casesData.elements[index][region]) + parseInt(casesData.elements[index + 1][region]) + parseInt(casesData.elements[index + 2][region])
          //return 0

        } else if (data.length < 2) {
          return parseInt(casesData.elements[index][region]) + parseInt(casesData.elements[index + 1][region]) + parseInt(data[0].newlyInfected)

        }
        else if (data.length < 3) {
          return parseInt(casesData.elements[index][region]) + parseInt(data[0].newlyInfected) + parseInt(data[1].newlyInfected)
        }
        else{
          return data[index-1].newlyInfected + data[index-2].newlyInfected + data[index-3].newlyInfected
        }
      }
    };

    function newlyRecovered(region, data, casesData, index){
      // the sum of three periods prior of newly infected
      var region = 'VIC'
      if (region === 'VIC'){
        region = 'Victoria'
      }


      if (typeof casesData.elements !== 'undefined'){
        if (data.length < 3 && index > 0){
          return parseInt(casesData.elements[index][region])
        }
        else{
          return data[index-1].newlyInfected + data[index-2].newlyInfected + data[index-3].newlyInfected
        }
      }

    }

    function cumulativeRecovered(data, casesData, index){

      if (typeof casesData.elements !== 'undefined'){
        if (data.length < 1){
          return 0
        }
        else{
          return data[index-1].newlyRecovered + data[index-1].cumulativeRecovered
        }
      }

    }

    function hospitalBedsRequired(data, hospitalData, newlyHospitalised, index){

      if (typeof hospitalData.elements !== 'undefined'){
        if (data.length < 2){
          return 0
        }
        else{


          return data[index-1].newlyHospitalised + newlyHospitalised
        }
      }

    }

    function newlyPassed(cases, fatalityRate){
      return cases * fatalityRate
    }

    function cumulativeNeedingICU(data, index, hospitalData){

      if (typeof hospitalData.elements !== 'undefined'){
          return data[index-1].newlyNeedingICU + data[index-1].cumulativeNeedingICU
      }
    }

    function cumulativeInICU(data, index, hospitalData){
      return data[index-1]['True in ICU Beds (Accounting Deaths)'] + data[index-1].cumulativeInICU
    }

    function cumulativeDead(data, index){
      return data[index-1]['newlyPassed'] + data[index-1]['Cumulative Dead']
    }

    function cumulativeOverLoadDeath(data, index){
      return data[index-1]['Overload-Associated Deaths'] + data[index-1]['Cumulative Overload Deaths']
    }


    // fix this
    function overloadAssociatedDead(newlyPassed, newlyInfected, fatalityRate){
      // newly passed - (newly infected * case fatality rate (normal))
      return newlyPassed - (newlyInfected * fatalityRate)
    }

    function ICUBedsRequired(data, index, hospitalData, newlyICU){

      if (typeof hospitalData.elements !== 'undefined'){

          if (data.length < 1){
            return newlyICU
          }
          else{
            return newlyICU + data[index-1].newlyNeedingICU
          }

      }
    }

    function cumulativeNeedingVentilators(data, index){
      return data[index-1]['newlyNeedingVentilators'] + data[index-1]['cumulativeNeedingVentilators']
    }

    function ventitorsRequired(data, index, ventilators){

          if (data.length < 1){
            return ventilators
          }
          else{
            return ventilators + data[index-1].newlyNeedingVentilators
          }
    }

    // loop through data and generate for periods
    function simulate(
                      scenarioTitle,
                      region,
                      dateList,
                      props,
                      hospitalData,
                      casesData,
                      interventionScenario,
                      intervensionParameters,
                      modelParameters,
                      resourceAvailability,
                      simulateDate = ''
                    ){

      /*
      Parameters
      -------------------
      region:string
      dateList: list string
      props: object
      hospitalData: googlesheets object
      casesData: googlesheets ojbect
      hospitalAdmissionRates: float
      simulateDate: date string


      Example output:
      --------------------
      [{date:'2020-03-22', susceptibleAtStart: 6629779 ...}
      {date:'2020-03-22', susceptibleAtStart: 6629779 ...}
      ...
      ]

      */


      // initialise Variables
      var population = getPopulation(region, props, hospitalData);
      var [totalCases, endDate, currentCases] = initCases(region, props, casesData, simulateDate);
      var initialHospitalised = initHospitalised(region, props, hospitalData)
      var initialCases = totalCases - currentCases;
      var initSusceptible = population - (totalCases - currentCases);

      var index = 1
      var R0Value = R0(props, hospitalData, interventionScenario, intervensionParameters, index)
      // simulate from here
      var currentSusceptible = initSusceptible;
      var currentInfected = currentCases;
      var newHospitalised = currentCases * modelParameters['Hospital Admission Rates'];
      var currentHospitalised = initialHospitalised;
      var totalHospitalised = initialHospitalised;
      var totalCases = initialCases;
      var recoverHospitalised = 0;
      var series = [];
      var recoverInfected = 0;
      var recovered = 16;
      var cumRecovered = 0;
      var bedsRequired = 12;
      var newPassed = 2;
      var newlyICU = 3.5;
      var cumICU = 0; // get it from hospitalData
      var newVentRate = currentCases * modelParameters['Ventilator Rates'];
      var cumNeedingVentilators=0; // confirmed cases in region
      var ventilatorsRequiredRate = newVentRate;
      var newVentInSurge = resourceAvailability['Ventilators']['Number of Ventilators'] * resourceAvailability['Ventilators']['Surge Ventilator Capacity'] * resourceAvailability['Ventilators']['Surge Ventilator Utilisation'];
      var trueVentNumers = min(newVentRate * newVentInSurge,ventilatorsRequiredRate)
      var cumOnVentilators = 0;

      var bedsRequiredICU = 3.5;
      var currentBedsICUSurge = resourceAvailability['ICU Beds']['Number of ICU Beds'] * resourceAvailability['ICU Beds']['Surge ICU Bed Utilisation'];
      var cumInICU=0;
      var inICUBeds = 3.5;
      var cumDead = 0;
      var overloadDead = 0;
      var cumOverloadDeath = 0;



      // push inital values
      series.push({date:dateList[0],
                   R0: R0Value,
                   susceptibleAtStart:initSusceptible,
                   newlyInfected:currentInfected,
                   currentlyInfected:initialCases,
                   cumulativeInfected:totalCases,
                   newlyRecovered:recovered,
                   cumulativeRecovered:cumRecovered,
                   newlyHospitalised:newHospitalised,
                   hospitalBedsRequired:bedsRequired,
                   cumulativeHospitalised:totalHospitalised,
                   stillHospitalised:recoverHospitalised,

                   //Ventilators
                   newlyNeedingVentilators:newVentRate,
                   cumulativeNeedingVentilators:cumNeedingVentilators,
                   ventilatorsRequired:ventilatorsRequiredRate,
                   'True Ventilator Numbers (Accounting Deaths)':trueVentNumers,
                   'Cumulative on Ventilators':cumOnVentilators,

                   newlyNeedingICU:newlyICU,
                   cumulativeNeedingICU:cumICU,
                   cumulativeInICU:cumInICU,
                   'True in ICU Beds (Accounting Deaths)':inICUBeds,
                   newlyPassed:newPassed,
                   'Cumulative Dead': cumDead,
                   'Overload-Associated Deaths':overloadDead,
                   'Cumulative Overload Deaths':cumOverloadDeath
                 })


      // simulate
      //for(var i=1; i < dateList.length; i++){
      for(var i=1; i < 7; i++){

        index += 1
        R0Value = R0(props, hospitalData, interventionScenario, intervensionParameters, index)

        currentSusceptible -= currentCases
        currentInfected = newlyInfected(R0Value, props, casesData, currentCases, currentSusceptible, population);

        newHospitalised =  newlyHospitalised(currentCases, modelParameters['Hospital Admission Rates']);

        totalHospitalised = cumulativeHospitalised(region,props,hospitalData, currentHospitalised,newHospitalised);

        // using historical value of totalHospitalised
        recoverHospitalised = stillHospitalised(totalHospitalised, series, i);

        // TODO fix region
        recoverInfected = currentlyInfected(region, series, casesData, i);

        // TODO fix
        newPassed = newlyPassed(currentInfected, modelParameters['Case Fatality Rate (Normal)']);
        recovered = newlyRecovered(region, series, casesData, i);
        recovered = recovered - newPassed;
        cumRecovered = cumulativeRecovered(series, casesData, i);

        bedsRequired = hospitalBedsRequired(series,hospitalData, newHospitalised, i);

        newlyICU = currentInfected * modelParameters['ICU Admission Rates'];

        cumICU = cumulativeNeedingICU(series, i, hospitalData);

        newVentRate = currentInfected * modelParameters['Ventilator Rates'];

        cumNeedingVentilators = cumulativeNeedingVentilators(series, i);

        ventilatorsRequiredRate = ventitorsRequired(series, i, newVentRate)

        trueVentNumers = min(newVentInSurge, ventilatorsRequiredRate)

        //'Cumulative on Ventilators':cumOnVentilators,
        cumulativeOnVentilators

        bedsRequiredICU = ICUBedsRequired(series,i,hospitalData, newlyICU);

        //True in ICU Beds (Accounting Deaths)
        // fix rounding
        inICUBeds = min(parseInt(currentBedsICUSurge),parseInt(bedsRequiredICU));

        cumInICU = cumulativeInICU(series, i, hospitalData);

        cumDead = cumulativeDead(series, i);

        // TODO fix
        overloadDead = overloadAssociatedDead(newPassed, currentInfected, modelParameters['Case Fatality Rate (Normal)'])

        cumOverloadDeath = cumulativeOverLoadDeath(series, i)


        series.push({date:dateList[i],
                     R0: R0Value,
                     susceptibleAtStart:currentSusceptible,
                     newlyInfected:currentInfected,
                     currentlyInfected:recoverInfected,
                     cumulativeInfected:totalCases,
                     newlyRecovered: recovered,
                     cumulativeRecovered: cumRecovered,
                     newlyHospitalised:newHospitalised,
                     hospitalBedsRequired:bedsRequired,
                     cumulativeHospitalised:totalHospitalised,
                     stillHospitalised:recoverHospitalised,
                     newlyNeedingICU:newlyICU,
                     cumulativeNeedingICU:cumICU,
                     ICUBedsRequired:bedsRequiredICU,
                     newlyNeedingVentilators:newVentRate,
                     cumulativeNeedingVentilators:cumNeedingVentilators,
                     ventilatorsRequired:ventilatorsRequiredRate,
                     'True Ventilator Numbers (Accounting Deaths)':trueVentNumers,
                     'Cumulative on Ventilators':cumOnVentilators,
                     cumulativeInICU:cumInICU,
                     'True in ICU Beds (Accounting Deaths)':inICUBeds,
                     newlyPassed:newPassed,
                     'Cumulative Dead': cumDead,
                     'Overload-Associated Deaths':overloadDead,
                     'Cumulative Overload Deaths':cumOverloadDeath
                   })

        // update values
        currentCases = currentInfected;
        currentHospitalised += newHospitalised;
        totalCases += currentInfected

      }
      console.log('series -->', series)
      return series
    }

    var scenario = simulate(scenarioTitle, region, dateList, this.props, this.state.hospital, this.state.cases,
                            interventionScenario,
                            intervensionParameters,
                            modelParameters,
                            resourceAvailability);

    // return a series array for charting
    return (
        <Chart scenarios={scenario}/>

    )

  };


};
