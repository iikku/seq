import React from 'react';
import lifecycle from 'react-pure-lifecycle';
import './App.css';
import Player from './Player'

const methods = {
  componentDidMount(props) {
    console.log("Nice");
  }
};

function BigOofSeq() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          The Big Oof Seq
        </p>
        <Player />
      </header>
    </div>
  );
}

export default lifecycle(methods)(BigOofSeq);
