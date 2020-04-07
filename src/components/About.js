import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class About extends Component {

    render() {
        return (
            <Container style={{ paddingTop: 80, paddingBottom: 40 }}>
                <div style={{ textAlign: 'left' }}>
                <h2>About</h2>
                <div style={{ marginTop : 20 }}>
                    <p><strong>How does this model work?</strong></p>
                    <p>This model uses the SIR model, a dynamic model that divides the population into three categories - susceptible, infectious and recovered. In the SIR model, the infection rate depends on the number of people who are susceptible and infected. For example, more infections will happen if there are a larger number of infected people, or there is a larger population to be infected. You can read more about the SIR model <a href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology">here</a>.</p>
                    <center><img src="https://www.lewuathe.com/assets/img/posts/2020-03-11-covid-19-dynamics-with-sir-model/sir.png" alt="SIR model" width="80%"></img></center>
                    <center><figcaption>Kai Sasaki/The First Cry of Atom</figcaption></center>
                    <br></br>
                    <p>The infection rate is influenced by one important variable - the basic reproductive number (termed "R0"). The basic reproductive number or "R0" is the number of people that one infected person will infect on average. For example, if R0 is 2, then every infected person will infect about two others on average. The higher the R0 is, the faster the speed of infection. R0 is always changing and depends on both the disease and environmental conditions (for example, human behaviour and social distancing can decrease R0, but higher population density can increase R0). Based on <a href="https://docs.google.com/document/d/1kOWmbMYhcBRnckX7RuUgWDOY61zJXRseCN3iA-I5vT4/edit?usp=sharing">existing studies</a>, the R0 of COVID-19 ranges from approximately 0.4 (under severe lockdown) to 2.6 (business as usual). Click <a href="https://www.theatlantic.com/science/archive/2020/01/how-fast-and-far-will-new-coronavirus-spread/605632/">here</a> for a more thorough explanation of R0.</p>
                    <center><img src="https://www.popsci.com/resizer/G5EOH5rNsEyB2gOPa2Iuec_Y5B4=/997x1246/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/NRL256NEPBEHTFM6XJ7YTPEGUM.png" alt="Infection" width="80%"></img></center>
                    <center><figcaption>Popular Science/Sara Chodosh</figcaption></center>
                    <br></br>
                    <p><strong>Model Details</strong></p>
                    <p>A thorough explanation of model parameter selection and implementation can be found <a href="https://docs.google.com/document/d/1kOWmbMYhcBRnckX7RuUgWDOY61zJXRseCN3iA-I5vT4/edit?usp=sharing">here</a>.</p>
                    <p>The model <strong>strongly</strong> accounts for:</p>
                    <ul>
                        <li>R0 of different interactions (from published literature)</li>
                        <li>Case load in each country (updated daily)</li>
                        <li>Changes in case fatality rate in an overloaded healthcare system (from published literature)</li>
                        <li>Available hospital beds (obtained from latest World Bank data)</li>
                        <li>Hospital bed utilisation under standard and surge conditions (based on expert approximation)</li>
                        <li>Available critical care beds (based on World Bank wealth categories and scaled by population)</li>
                        <li>ICU bed utilisation under standard and surge conditions (based on expert approximation)</li>
                    </ul>
                    <p>The model <strong>moderately</strong> accounts for:</p>
                    <ul>
                        <li>Community transmission levels and imported cases per day - this seems to vary significantly based on social density, cultural factors and Government decisions on border control and internal lockdown</li>
                        <li>Available ventilators (approximated based on lower figures from published literature) - this is likely to be an overestimation for many lower-income countries and <strong>should be edited</strong> in model parameters as appropriate</li>
                        <li>Ventilator utilisation under standard and surge conditions - there is significant reported variation in how many ventilators countries are aiming to purchase</li>
                        <li>Mortality and hospitalisation rates - these have been approximated using the population structure of a high-income country and may be an overestimation for countries with a significantly younger population</li>
                    </ul>
                    <p>The model <strong>weakly or does not</strong> account for:</p>
                    <ul>
                        <li>Social density of populations and compartmentalisation of populations from lockdown procedures - if interested, some random walk simulations which are accessible for the general public can be found <a href="https://www.youtube.com/watch?v=gxAaO2rsdIs">here</a></li>
                        <li>Impact of available PPE equipment - significant variation exists locally, nationally and internationally</li>
                        <li>Healthcare worker infection and how this may influence case fatality rates</li>
                        <li>Influence of asymptomatic cases - there have been reports of a significant fraction of COVID cases having no symptoms and this effect has not been modelled</li>
                    </ul>
                </div>
                </div>
            </Container>
        )
    }
}