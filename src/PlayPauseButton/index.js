import React from 'react';
import { observer } from "mobx-react"

const PlayPauseButton = observer(({ synth }) => (
  <button
    onClick={() => synth.playPause()}>
    { !synth.paused ? "playing" : "paused" }
  </button>
));

export default PlayPauseButton;
