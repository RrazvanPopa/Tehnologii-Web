import React, { Component } from 'react';
import './App.css';
import ListaCupoane from './ListaCupoane.js'


class App extends Component {
  constructor(props){
      super(props)
      this.state={
        cupoanelist: [{nume: 'cupon1',locatie: 'MC Roma'}]
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Aplicatie de gestionat cupoane</h1>
        </header>
        <ListaCupoane />
      </div>
    );
  }
}

export default App;
