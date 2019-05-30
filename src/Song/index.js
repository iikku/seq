import { observable, computed } from "mobx"
import { fastArp, notePerBeat, slowChord, noteEveryTwoBeats } from '../NoteResolvers';

class Song {
    @observable bpm = 140;
    progression = [
      ["C3", "E3", "G3"],
      ["G3", "B3", "D4", "F4", "A4"],
      ["F3", "A3", "C4", "F4"],
      ["C3", "E3", "G3", "B4"],
    ];

    tracks = [
      {
        name: "Bass",
        channel: 1,
        notesFromChord: noteEveryTwoBeats
      },
      {
        name: "Pad",
        channel: 2,
        notesFromChord: slowChord
      },
      {
        name: "Lead",
        channel: 3,
        notesFromChord: (c, b) =>
          (
            this.currentMeasure === 3
            ? fastArp
            : notePerBeat
          )(c, b)
      },
    ];

    currentMeasure = 0;
    currentMicroBeat = 0; // 1/256th notes from the beginning of the measure
}

export default Song;
