import React from 'react';
import { observer } from "mobx-react"
import Synth from '../Synth';

const PlayPauseButton = observer(({ synth } : {synth: Synth | null }) => (
  synth
  ?
  <button
    onClick={() => synth.playPause()}>
    { !synth.paused ? "playing" : "paused" }
  </button>
  :
  <span>
    not initialized yet
  </span>
));

export default PlayPauseButton;
