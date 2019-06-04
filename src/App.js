import React from 'react';
import lifecycle from 'react-pure-lifecycle';
import './App.css';
import Player from './ui/Player'

const methods = {
  componentWillMount(props) {
    console.log("Welcome to the Big Oof Seq");
  }
};

function BigOofSeq() {
  return (
    <div>
      <header>
          The Big Oof Seq
      </header>
      <Player />
    </div>
  );
}

export default lifecycle(methods)(BigOofSeq);
