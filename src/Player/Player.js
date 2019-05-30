import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import { observable, reaction } from "mobx"

class Synth {
  device = null;
}
const synthStore = new Synth();

class Song {
    id = Math.random();
    @observable notes = "";
    @observable nextNote = null;
}
const songStore = new Song();

const play = reaction(
  () => songStore.nextNote,
  nextNote => synthStore.device.playNote(nextNote, 2, {duration: 1000})
);

const midiDeviceMounter = {
  componentDidMount(props) {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
      }
      synthStore.device = WebMidi.outputs[1];
      console.log("Device set to", synthStore.device);
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
      <NotePlayer song={songStore} />
    </div>
);

export default lifecycle(midiDeviceMounter)(Player);
