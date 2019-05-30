import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import { observable, computed, reaction, autorun } from "mobx"
import { now } from "mobx-utils"
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton.js';

class Synth {
  @observable device = null;
  @observable paused = false;
  @computed get canPlayNote() {
    return this.device !== null && !this.paused;
  };
  playPause = () => this.paused = !this.paused;
  playNote = (note, channel, args) =>
    this.canPlayNote ?
    this.device.playNote(note, channel, args) :
    () => console.log('Waiting for device initialization');
}
const synth = new Synth();

class Song {
    id = Math.random();
    @observable bpm = 120;
    @computed get beat() {
      return (60 * 1000) / this.bpm;
    }
    @observable nextNote = null;
}
const catchyTune = new Song();

reaction(
  () => catchyTune.nextNote,
  nextNote => synth.playNote(nextNote, 2, {duration: 1000})
);

autorun(() => {
  console.log("now", now(catchyTune.beat));
  synth.playNote("D4", 2, { duration: 200 });
});

const midiDeviceMounter = {
  componentDidMount(props) {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
      }
      synth.device = WebMidi.outputs[1];
      console.log("Device set to", synth.device);
    });
  }
};

const NotePlayer = ({ song }) => (
    <div>
      <button onClick={() => (song.nextNote = "C3")}>
        C3
      </button>
      <button onClick={() => (song.nextNote = "E3")}>
        E3
      </button>
    </div>
);

const Player = () => (
    <div>
      big oof
      <br />
      <PlayPauseButton synth={synth} />
      <NotePlayer song={catchyTune} />
    </div>
);

export default lifecycle(midiDeviceMounter)(Player);
