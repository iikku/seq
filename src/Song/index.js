import { observable, computed, } from "mobx"
import { notePerBeat, noteEveryTwoBeats } from '../Arpeggiators';

class Song {
    id = Math.random();
    @observable bpm = 120;
    @computed get beatLengthInMs() {
      return (60 * 1000) / this.bpm;
    };
    @computed get nextNote() {
      // Assign a dummy variable to induce @computed calculation
      const playThisBeat = this.frameAdvancer; // eslint-disable-line no-unused-vars
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
        notesFromChord: noteEveryTwoBeats
      },
      {
        name: "Lead",
        channel: 3,
        notesFromChord: notePerBeat
      },
    ];

    currentMeasure = 1;
    currentBeat = 1;
    beatsPerMeasure = 4;
    @observable frameAdvancer = 0;
}

export default Song;
