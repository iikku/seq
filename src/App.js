import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import logo from './logo.svg';
import './App.css';

const methods = {
  componentDidMount(props) {
    WebMidi.enable(function (err) {

      if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
      }

      const digitone = WebMidi.outputs[1];
      digitone.playNote("C3", 1, {duration: 1000});
      digitone.playNote("E3", 2, {duration: 1000});

    });
  }
};

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          oof
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default lifecycle(methods)(App);
