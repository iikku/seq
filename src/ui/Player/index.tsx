import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import PlayPauseButton from '../PlayPauseButton';
import TrackListing from '../TrackListing';
import Synth from '../../Synth';
import Song from '../../SongStructure/Song';
import KeyView from '../KeyView';
import CurrentChordView from '../CurrentChordView';
import SongStructureDisplay from '../SongStructureDisplay';
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
    <div className="player">
      <KeyView songKey={data.catchyTune.key} />
      <SongStructureDisplay song={data.catchyTune} advancer={data.advancer} />
      <CurrentChordView chord={data.advancer.currentChord} />
      <TrackListing tracks={data.catchyTune.tracks} />
      <PlayPauseButton advancer={data.advancer} />
    </div>
    :
    <div>
      Initializing
    </div>
));

export default lifecycle(midiDeviceMounter)(Player);
