import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import './Geolocated.css';

class Demo extends Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <button className="buttonclick" type={this.props.type}
                onClick={event => this.props.clicked(event, this.props.coords)}>{this.props.children}</button>
        ) : (
                        <div>Getting the location data&hellip; </div>
                    );
    }

}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);
