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
const diminished = new ChordQuality('diminished', [0, 3, 6]);
const augmented = new ChordQuality('augmented', [0, 4, 8]);
const majorSeventh = new ChordQuality('major seventh', [0, 4, 7, 11]);
const majorDominantSeventh = new ChordQuality('major dominant seventh', [0, 4, 7, 10]);

const knownChords = [
  minorThird,
  majorThird,
  diminished,
  augmented,
  majorSeventh,
  majorDominantSeventh
];

const resolveQuality =
  (integerNotation: number[]) => {
    const found = knownChords.find(chord =>
      JSON.stringify(chord.integerNotation) === JSON.stringify(integerNotation)
    );
    if (found !== undefined) return found;
    return new ChordQuality('something', integerNotation);
  };

export default ChordQuality;

export {
    resolveQuality,
    minorThird,
    majorThird,
    majorSeventh,
    majorDominantSeventh
};
