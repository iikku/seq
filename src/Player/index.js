import React from 'react';
import WebMidi from 'webmidi';
import lifecycle from 'react-pure-lifecycle';
import { observable, computed, reaction, autorun } from "mobx"
import { now } from "mobx-utils"
import PlayPauseButton from '../PlayPauseButton';
import TrackListing from '../TrackListing';

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
      console.log("playing", note, "at", channel, "with", args);
      if (note) this.device.playNote(note, channel, args);
    })() :
    () => console.log('Waiting for device initialization');
}
const synth = new Synth();

const arp1 = (measure, beat) => {
  return {
    notes: measure[beat],
    beats: 1
  }
}
const arp2 = (measure, beat) => {
  if (beat % 2) {
    return {
      notes: measure[beat],
      beats: 2
    }
  } else {
    return null;
  }
}

class Song {
    id = Math.random();
    @observable bpm = 120;
    @computed get beatLengthInMs() {
      return (60 * 1000) / this.bpm;
    };
    @computed get nextNote() {
      // Assign a dummy variable to induce @computed calculation
      const playThisBeat = this.frameAdvancer;
      // const note = this.progression[this.currentMeasure][this.currentBeat];
      const note = this.progression[this.currentMeasure][this.currentBeat];
      return note;

    };
    progression = [
      ["C3", "E3", "G3", "C4"],
      ["G3", "B3", "D4", "G4"],
      ["F3", "A3", "C4", "F4"],
      ["C3", "E3", "G3", "C4"],
    ];

    tracks = [
      {
        name: "Bass",
        channel: 1,
        notesFromChord: arp2
      },
      {
        name: "Lead",
        channel: 3,
        notesFromChord: arp1
      },
    ];

    currentMeasure = 1;
    currentBeat = 1;
    beatsPerMeasure = 4;
    @observable frameAdvancer = 0;
}
const catchyTune = new Song();

autorun(() => {
  catchyTune.frameAdvancer = now(catchyTune.beatLengthInMs);
  catchyTune.currentBeat = (catchyTune.currentBeat + 1) % catchyTune.beatsPerMeasure;
  if (catchyTune.currentBeat === 0) {
    catchyTune.currentMeasure = (catchyTune.currentMeasure + 1) % catchyTune.progression.length;
  }
});

reaction(
    () => catchyTune.frameAdvancer,
    frameAdvancer => {
      // Whenever the frame advancer notifies us, calculate new next notes
      // for all the tracks. If the arpeggiator gives us new note data, play it.
      // If the arpeggiator returns null as the nextNotes, this signifies that no
      // new note data should be sent to the synth.
      catchyTune.tracks.forEach(track => {
        const currentChord = catchyTune.progression[catchyTune.currentMeasure];
        const nextNotes = track.notesFromChord(
          currentChord,
          catchyTune.currentBeat);
        if (nextNotes) {
          synth.playNote(
            nextNotes.notes,
            track.channel,
            {duration: catchyTune.beatLengthInMs * nextNotes.beats}
          );
        }
      });
    }
);

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
      <TrackListing tracks={catchyTune.tracks} />
      <PlayPauseButton synth={synth} />
      <NotePlayer song={catchyTune} />
    </div>
);

export default lifecycle(midiDeviceMounter)(Player);
