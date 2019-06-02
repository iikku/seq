import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import PlayPauseButton from '../PlayPauseButton';
import TrackListing from '../TrackListing';
import Synth from '../../Synth';
import Song from '../../Song';
import KeyView from '../KeyView';
import CurrentChordView from '../CurrentChordView';
import SongAdvancer, { playSongWithSynth } from '../../SongAdvancer';
import { observer } from "mobx-react"
import { observable } from "mobx"

class PlayerData {
  @observable advancer: SongAdvancer | null = null;
  catchyTune: Song = new Song();
  synth: Synth = new Synth();
}

const data = new PlayerData();

const midiDeviceMounter = {
  componentWillMount() {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
      }

      // TODO: Add option to change the output on the UI
      data.synth.device = WebMidi.outputs[0];

      console.log("Device set to", data.synth.device);

      data.advancer = playSongWithSynth(data.catchyTune, data.synth);
    });
  }
};

const Player = observer(() => (
    data.advancer ?
    <div>
      <KeyView songKey={data.catchyTune.key} />
      <CurrentChordView chord={data.advancer.currentChord} />
      <TrackListing tracks={data.catchyTune.tracks} />
      <PlayPauseButton synth={data.synth} />
    </div>
    :
    <div>
      Initializing
    </div>
));

export default lifecycle(midiDeviceMounter)(Player);
