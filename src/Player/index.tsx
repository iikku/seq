import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import PlayPauseButton from '../PlayPauseButton';
import TrackListing from '../TrackListing';
import Synth from '../Synth';
import Song from '../Song';
import KeyView from '../KeyView';
import { playSongWithSynth } from '../SongAdvancer';
import { observer } from "mobx-react"

const catchyTune = new Song();
const synth = new Synth();

const midiDeviceMounter = {
  componentWillMount() {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
      }

      // TODO: Add option to change the output on the UI
      synth.device = WebMidi.outputs[0];

      console.log("Device set to", synth.device);

      playSongWithSynth(catchyTune, synth);
    });
  }
};

const Player = observer(() => (
    <div>
      <KeyView songKey={catchyTune.key} />
      <TrackListing tracks={catchyTune.tracks} />
      <PlayPauseButton synth={synth} />
    </div>
));

export default lifecycle(midiDeviceMounter)(Player);
