import { observable } from "mobx"
import { fastArp, notePerBeat, slowChord, noteEveryTwoBeats } from '../NoteResolvers';
import { makeKey } from '../MusicTheory/Key';
import { major } from '../MusicTheory/Scale';
import Key from '../MusicTheory/Key';
import Chord from '../MusicTheory/Chord';
import { generateProgression } from '../Progression';
import Track from '../Track';

class Song {
    @observable bpm: number = 140;
    @observable key: Key = makeKey("E", major);
    progression: Chord[] = generateProgression(this.key);

    tracks: Track[] = [
      new Track(
        "Bass",
        1,
        noteEveryTwoBeats
      ),
      new Track(
        "Pad",
        2,
        slowChord
      ),
      new Track(
        "Lead",
        3,
        (c, b) =>
          (
            this.currentMeasure === 3
            ? fastArp
            : notePerBeat
          )(c, b)
      )
    ];

    currentMeasure: number = 0;
    currentMicroBeat: number = 0; // 1/256th notes from the beginning of the measure
}

export default Song;
