import { observable, computed } from "mobx"
import { fastArp, notePerBeat, slowChord, noteEveryTwoBeats } from '../NoteResolvers';
import { makeKey } from '../MusicTheory/Key';
import { major } from '../MusicTheory/Scale';
import { generateProgression } from '../Progression';

class Song {
    @observable bpm = 140;
    @observable key = makeKey("A#", major);
    progression = generateProgression(this.key);

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
