import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const config = require('../default.json');

export default class Home extends Component {

    render() {
        const supported_regions = config["supported_regions"];
        return (
            <Container style={{ paddingTop: 80, paddingBottom: 40, textAlign: 'left' }}>
            <h2>COVID-19 Model WebApp</h2>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia pulvinar feugiat. Donec purus nisl, blandit nec ipsum sed, eleifend molestie ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer dui odio, dictum quis vehicula et, vestibulum ut ante. Nam eu euismod erat. Quisque in semper felis, rutrum mollis sapien. Sed dignissim vel est vitae luctus. Quisque felis libero, malesuada ac tempus commodo, condimentum eget lectus. Ut enim dolor, porttitor eleifend velit vitae, viverra interdum justo. Fusce at nunc vel ex tempor finibus sed in lacus. Nullam iaculis sem ut elit mattis tincidunt et at nulla. Donec at ex vitae orci tincidunt volutpat at id velit. Cras lobortis sapien in rutrum efficitur. Nulla condimentum hendrerit risus, at laoreet elit ullamcorper vitae. Sed pretium venenatis dolor, quis ullamcorper turpis lacinia consectetur.</p>
                <p>Sed finibus tristique lectus, ac pulvinar mi consectetur viverra. Aenean vitae venenatis metus. Fusce dignissim mattis sagittis. Nulla urna sapien, varius sit amet nisi at, interdum venenatis leo. Morbi libero dolor, lobortis sit amet tincidunt in, pulvinar a libero. In efficitur lacinia ligula, et eleifend mi blandit et. Phasellus vel nisi posuere, tincidunt erat ac, ultrices ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eget eros at ex tempor interdum eget sagittis tortor. Suspendisse volutpat augue ac velit maximus finibus. Ut ullamcorper, enim nec suscipit interdum, elit sapien facilisis lectus, a laoreet lorem tellus vel neque. Morbi tellus risus, accumsan nec sodales et, rhoncus vel neque. Curabitur dapibus felis facilisis nisl suscipit, sit amet cursus magna lacinia. Aenean gravida massa sapien, eu ornare dolor imperdiet ut. Phasellus id leo auctor, euismod augue eu, pharetra dolor.</p>
            </div>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
            <h4>List of supported countries and states:</h4>
            {Object.keys(supported_regions).map((country, index) => {
                return(
                    <ul key={index}>
                        <li>
                            {supported_regions[country].length === 0 ?
                                <Link
                                onClick={() => {this.props.eventHandlers.updateRegion(false, country, "")}}
                                to="/">
                                {country}
                                </Link> : <span>{country}</span>
                            }
                        </li>
                        <ul>
                            {supported_regions[country].map((state, index) => {
                                return(
                                    <li key={index}>
                                        <Link
                                        to="/"
                                        onClick={() => {this.props.eventHandlers.updateRegion(false, country, state)}}>
                                            {state}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </ul>)
            })}
            </div>
            </Container>
        )
    }
}