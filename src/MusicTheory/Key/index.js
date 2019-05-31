import { notes } from '../';

class Key {
  constructor (name, base, notesOfKey) {
    this.name = name;
    this.base = base;
    this.notesOfKey = notesOfKey;
  }

  // degree: integer
  // chord: MusicTheory/Chord
  chordOfDegree = (degree, chord) => {
      console.log("Generating a", chord.name, "chord of degree", degree, "in the key of", this.base);

      const degreeAsIndex = degree - 1;
      const baseNote = this.notesOfKey[degreeAsIndex];
      const baseNoteIndex = notes.findIndex(note => note === baseNote);
      const generatedChord = chord.integerNotation
        .map(index => (baseNoteIndex + (index)) % notes.length)
        .map(index => notes[index])
        .map(noteName => noteName + "4");

      console.log("Generated", generatedChord);
      return generatedChord;
  }
}

// base: note name
// scale: MusicTheory/Scale
const makeKey = (base, scale) => {
  const notesOfKey = [];
  let prevNote = base;
  scale.intervals.forEach(interval => {
    notesOfKey.push(prevNote);
    const prevNoteIndex = notes.findIndex(chromaticNote => prevNote === chromaticNote);
    const nextNoteIndex = (prevNoteIndex + interval) % 12;
    prevNote = notes[nextNoteIndex];
  });

  console.log("Generated the key of", base, scale.name, "consisting of", notesOfKey);
  return new Key(scale.name, base, notesOfKey);
}

export default Key;
export { makeKey };
