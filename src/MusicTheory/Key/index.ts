import { notes } from '../';
import Chord from '../Chord';
import Scale from '../Scale';

class Key {
  constructor (name: string, base: string, notesOfKey: string[]) {
    this.name = name;
    this.base = base;
    this.notesOfKey = notesOfKey;
  }

  name: string;
  base: string;
  notesOfKey: string[];

  // degree: integer
  // chord: MusicTheory/Chord
  chordOfDegree = (degree: number, chord: Chord) => {
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

const makeKey = (base: string, scale: Scale) => {
  const notesOfKey: string[] = [];
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
