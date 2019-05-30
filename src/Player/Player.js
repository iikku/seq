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
    (() => {
      console.log("playing", note);
      this.device.playNote(note, channel, args);
    })() :
    () => console.log('Waiting for device initialization');
}
const synth = new Synth();

class Song {
    id = Math.random();
    @observable bpm = 120;
    @computed get beatLengthInMs() {
      return (60 * 1000) / this.bpm;
    };
    @computed get nextNote() {
      // Assign a dummy variable to induce @computed calculation
      const playThisBeat = this.beatCounter;
      const note = this.progression[this.currentMeasure][this.currentBeat];
      return note;
    };
    progression = [
      ["C3", "E3", "G3", "C4"],
      ["G3", "B3", "D4", "G4"],
      ["F3", "A3", "C4", "F4"],
      ["C3", "E3", "G3", "C4"],
    ];

    currentMeasure = 1;
    currentBeat = 1;
    beatsPerMeasure = 4;
    @observable beatCounter = 0;
}
const catchyTune = new Song();

reaction(
  () => catchyTune.nextNote,
  nextNote => synth.playNote(nextNote, 2, {duration: 1000})
);

autorun(() => {
  catchyTune.beatCounter = now(catchyTune.beatLengthInMs);
  catchyTune.currentBeat = (catchyTune.currentBeat + 1) % catchyTune.beatsPerMeasure;
  if (catchyTune.currentBeat === 0) {
    catchyTune.currentMeasure = (catchyTune.currentMeasure + 1) % catchyTune.progression.length;
  }
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
