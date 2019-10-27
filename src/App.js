import React, { Component } from 'react';
import './App.css';
import Cards from './components/cards/Cards';


class App extends Component {
  render() {
    return (
      <div className="App" >
        <header className="App-header">
          
        </header>
        <div className="Cards">
          <Cards />
        </div>
        <p>Please stand near the place and hit show places</p>
      </div>
    );
  }
}

export default App;
