import Chord from '../../MusicTheory/Chord';

class Measure {
  constructor(name: string, chords: Chord[]) {
    this.name = name;
    this.chords = chords;
  }
  name: string;
  chords: Chord[]; // TODO: Distribute chords to beats of a measure
}

export default Measure;
