This is the repository for the frontend client of the COVID-19 webapp. The backend can be found [here](https://github.com/markgeejw/covid-api).

# About the app
The web client in developed using React.

## How to run the Client
1. In your terminal, navigate to the `client` directory.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the app 
(If you run the API locally, run with `REACT_APP_DEBUG=1 npm start` instead)
4. Navigate to http://localhost:3000/.


## Updating countries supported
For future development, in order to add to the number of countries supported, make the following changes.

### Client
Navigate to `client/src/config.json` and add the countries in the following format:
`country-name: [state-name-1, state-name-2, ...]`

### API
Update `api/data/hospital.json` accordingly.


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