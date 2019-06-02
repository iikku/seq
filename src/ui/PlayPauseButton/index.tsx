import React from 'react';
import { observer } from "mobx-react"
import SongAdvancer from '../../SongAdvancer';

const PlayPauseButton = observer(({ advancer } : { advancer: SongAdvancer | null }) => (
  advancer
  ?
  <button
    onClick={() => advancer.playPause()}>
    { !advancer.paused ? "playing" : "paused" }
  </button>
  :
  <span>
    not initialized yet
  </span>
));

export default PlayPauseButton;
