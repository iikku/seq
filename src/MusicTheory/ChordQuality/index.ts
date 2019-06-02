class ChordQuality {
  constructor(name: string, chordByIntegerNotation: number[]) {
    this.name = name;
    this.integerNotation = chordByIntegerNotation;
  }

  name: string;
  integerNotation: number[];
}

// Chords
const minorThird = new ChordQuality('minor third', [0, 3, 7]);
const majorThird = new ChordQuality('major third', [0, 4, 7]);
const majorSeventh = new ChordQuality('major seventh', [0, 4, 7, 11]);
const majorDominantSeventh = new ChordQuality('major dominant seventh', [0, 4, 7, 10]);

export default ChordQuality;

export {
  minorThird,
  majorThird,
  majorSeventh,
  majorDominantSeventh
};
