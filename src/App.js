import React from 'react';
import './App.css';
import Cards from './components/cards/Cards';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Header itmes comes here</h1>
      </header>
      <div className="Cards">
        <Cards />
      </div>
      <p>Please pick a place</p>
    </div>
  );
}

export default App;
