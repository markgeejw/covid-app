# About the app
The web client uses React. The backend uses Express. For now the backend does nothing, but can be used to compute and transmit more complex data. Right now there is just a connection saying "API is working properly" to show the connection.

## How to run the Client
1. In your terminal, navigate to the `client` directory.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the app 
(If you run the API locally, run with `REACT_APP_DEBUG=1 npm start` instead)
4. Navigate to http://localhost:3000/.

## How to run the API
The API is currently deployed to `http://covidmodelling.com/api` but you can run a local version for testing.
1. In another terminal, navigate to the `service.model` directory.
2. (Requires pipenv) Run `pipenv install` to install all dependencies. Alternatively, use pip to install from requirements.txt file using `pip install -r requirements.txt`
3. Run `pipenv run python index.py` to start the api (or whatever virtualenv manager you're using).


## Updating countries supported
For future development, in order to add to the number of countries supported, make the following changes.

### Client
Navigate to `client/src/config.json` and add the countries in the following format:
`country-name: [state-name-1, state-name-2, ...]`

### API
Update `api/data/hospital.json` accordingly.


# API usage
The API is currently deployed using [Now](http://now.sh) with the URL `http://covidmodelling.com/api`.

The API has three endpoints, `/model`, `/info`, `/case`.
### Model Endpoint
The endpoint `/model` is used to query the developed COVID-19 model. It requires the following query parameters:

| Key           | Expected length | Type                                                                  | Description                                                              | Format                                                                                                                                                                                                                                                  |
|---------------|-----------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| int_len       | 5               | Int                                                                   | The lengths of weeks of each intervention measure                        | Do Nothing, Social Distancing, Relaxed Lockdown, Significant Lockdown, Critical Lockdown                                                                                                                                                                |
| r0            | 5               | Float                                                                 | The R0 of each intervention measure                                      | Do Nothing, Social Distancing, Relaxed Lockdown, Significant Lockdown, Critical Lockdown                                                                                                                                                                |
| model_vals    | 8               | Float*                                                                | Model parameters                                                         | Hospital Admission Rates, ICU Admission Rates, % ICU Admissions needing Ventilator, Ventilator Rates, Case Fatality Rate (Normal), Case Fatality Rate (Overload), Mortality Rate of ICU Blocked Patients, Mortality Rate of Ventilator Blocked Patients |
| resource_vals | 10              | Int, Float*, Float*, Int, Float*, Float*, Int, Float*, Float*, Float* | Parameters regarding resources involving hospitals, ICUs and ventilators | Number of Hospital Beds, Bed Utilisation, Surge Bed Utilisation, Number of ICU Beds, ICU Bed Utilisation, Surge ICU Bed Utilisation, Number of Ventilators, Ventilator Utilisation, Surge Ventilator Utilisation, Surge Ventilator Capacity             |

\* These numbers are percentages and should be given in the % form, e.g. for 80%, use 80 instead of 0.8.

The model gives the as output `JSON`, with the keys `results` and `data`.

`results`:
| ﻿Key                             | Description                                             |
|---------------------------------|---------------------------------------------------------|
| total_weeks_action              | Total weeks of action                                   |
| average_R0                      | Average R0 from your actions                            |
| hbed_normal                     | Number of hospital beds (normal capacity)               |
| hbed_surge                      | Number of hospital beds (surge capacity)                |
| hosp_per_week                   | Hospitalisations per week                               |
| icubed_normal                   | Number of ICU beds (normal capacity)                    |
| icubed_surge                    | Number of ICU beds (surge capacity)                     |
| vent_normal                     | Number of ventilators (normal capacity)                 |
| vent_surge                      | Number of ventilators (surge capacity)                  |
| pandemic_end                    | Did the pandemic end before September 22nd?             |
| total_infected                  | Total infected over 6 months                            |
| total_saved                     | Total saved (not infected)                              |
| total_hospitalised              | Total hospitalised                                      |
| total_needed_icu                | Total needed ICU                                        |
| total_received_icu              | Total received ICU                                      |
| total_needed_vent               | Total needed ventilators                                |
| total_received_vent             | Total ventilated                                        |
| total_deaths                    | Total deceased                                          |
| total_deaths_overload           | Total deaths from hospital overload                     |
| total_recovered                 | Total recovered                                         |
| percentage_infected             | Percentage of population infected                       |
| percentage_saved                | Percentage of population saved                          |
| percentage_deaths_overload      | Percentage of total deaths from hospital overload       |
| pandemic_peak                   | Date of pandemic peak                                   |
| daily_infection_rate_at_peak    | Daily infection rate at the peak                        |
| hbeds_req_peak                  | Beds required at the peak                               |
| shortfall_hbeds_peak            | Shortfall of hospital beds at the peak                  |
| hbeds_run_out_normal            | When beds would run out (normal capacity)               |
| hbeds_run_out_surge             | When beds would run out (surge capacity)                |
| days_hbed_out_normal            | How many days beds ran out for (normal capacity)        |
| days_hbed_out_surge             | How many days beds ran out for (surge capacity)         |
| icubeds_req_peak                | ICU beds required at the peak                           |
| shortfall_icubeds_peak          | Shortfall in ICU beds at peak                           |
| patients_missed_out_icubeds     | Number of patients who missed out on an ICU bed         |
| icubeds_run_out_normal          | When ICU beds would run out (normal capacity)           |
| icubeds_run_out_surge           | When ICU beds would run out (surge capacity)            |
| days_icubed_out_normal          | How many days ICU beds ran out for (normal capacity)    |
| days_icubed_out_surge           | How many days ICU beds ran out for (surge capacity)     |
| vents_req_peak                  | Ventilators required at the peak                        |
| shortfall_vents_peak            | Shortfall in ventilators at peak                        |
| patients_missed_out_ventilators | Number of patients who missed out on a ventilator       |
| vents_run_out_normal            | When ventilators would run out (normal capacity)        |
| vents_run_out_surge             | When ventilators would run out (surge capacity)         |
| days_vents_out_normal           | How many days ventilators ran out for (normal capacity) |
| days_vents_out_surge            | How many days ventilators ran out for (surge capacity)  |

`data`:
| Key              | Description                                                 |
|------------------|-------------------------------------------------------------|
| newly_infected   | The number of newly infected at every interval              |
| hbeds_required   | The number of cumulative hospitalisations at every interval |
| icubeds_required | The number of cumulative ICU admissions at every interval   |
| vents_required   | The number of ventilators needed at every interval          |
| dates            | The dates at every interval                                 |

### State Info Endpoint
At the `info` endpoint, the API returns some useful information about the country/state. It requires the following query parameters:
| Key     | Description           |
|---------|-----------------------|
| country | Country to be queried |
| state*  | State to be queried   |

\* Optional. You can choose not to include state if querying for whole country, or for countries without states like Singapore.

The API returns the following state information:
| Key                   | Description                        |
|-----------------------|------------------------------------|
| population            | Total population for country/state |
| public hospital beds  | Number of public hospital beds     |
| private hospital beds | Number of private hospital beds    |
| icu beds              | Number of ICU beds                 |
| weekly hospital       | Number of weekly hospitalisations  |

### State Cases Endpoint
At the `case` endpoint, the API returns information regarding the number of COVID-19 cases. It requires the following query parameters:

| Key        | Description                         |
|------------|-------------------------------------|
| country    | Country to be queried               |
| state*     | State to be queried                 |
| start_date | Start date for retrieving cases     |
| interval** | Interval between the cases reported |

\* Optional. You can choose not to include state if querying for whole country, or for countries without states like Singapore.
\** Optional. Defaults to 1 for daily cases.

The endpoint returns a single array stored in the key `cases`. The array contains the total cumulative number of cases at `start_date` at the first index. The subsequent indices contain the number of cases reported according to `interval`.

## To do:
- [x] Create client
- [x] Create backend
- [x] Show placeholder chart
- [x] Implement proper UI controls for model input
- [x] Implement model data
- [x] Optional: Use backend for handling, depending on complexity
- [x] Deploy backend
- [ ] Deploy frontend
- [ ] Add more countries
- [ ] Optimize for mobile viewports