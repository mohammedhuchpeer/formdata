import React, { Component } from 'react';
import { GoogleComponent } from 'react-google-location';

const API_KEY = "AIzaSyA2JuEO0qrxJO-3k5uJLedxRrPiFa43m_Q";

class Data extends Component {
    state = {
        place: null
    }

    render() {
        console.log('result is here', this.state.place);
        return (
            <div>
                <GoogleComponent
                    apiKey={API_KEY}
                    language={'en'}
                    country={'country:in|country:us'}
                    coordinates={true}
                    //locationBoxStyle={'custom-style'}
                    //locationListStyle={'custom-style-list'}
                    onChange={(e) => { this.setState({ place: e }) }} />
            </div>
        );
    }
}

export default Data;