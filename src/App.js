import React from 'react';
import lifecycle from 'react-pure-lifecycle';
import logo from './logo.svg';
import './App.css';
import Player from './Player/Player.js'

const methods = {
  componentDidMount(props) {
    console.log("Nice");
  }
};

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          seq
        </p>
        <Player />
      </header>
    </div>
  );
}

export default lifecycle(methods)(App);
