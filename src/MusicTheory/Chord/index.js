class Chord {
  constructor(name, chordByIntegerNotation) {
    this.name = name;
    this.integerNotation = chordByIntegerNotation;
  }
}

// Chords
const majorThird = new Chord('major third', [0, 4, 7]);
const majorSeventh = new Chord('major seventh', [0, 4, 7, 11]);
const dominantSeventh = new Chord('dominant seventh', [0, 4, 7, 10]);

export default Chord;
export {
  majorThird,
  majorSeventh,
  dominantSeventh
};
