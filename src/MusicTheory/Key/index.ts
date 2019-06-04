import { notes } from '../';
import Chord from '../Chord';
import ChordQuality from '../ChordQuality';
import Scale from '../Scale';

class Key {
  constructor (name: string, base: string, notesOfKey: string[], qualitiesByDegree: ChordQuality[]) {
    this.name = name;
    this.base = base;
    this.notesOfKey = notesOfKey;
    this.qualitiesByDegree = qualitiesByDegree;
  }

  name: string;
  base: string;
  notesOfKey: string[];
  qualitiesByDegree: ChordQuality[];

  chordOfDegree = (degree: number) => {
    console.log("Generating a chord of degree", degree, "in the key of", this.base);

    const degreeAsIndex = degree - 1;
    const baseNote = this.notesOfKey[degreeAsIndex];
    const third = this.notesOfKey[(degreeAsIndex + 2) % this.notesOfKey.length];
    const fifth = this.notesOfKey[(degreeAsIndex + 5) % this.notesOfKey.length];
    const generatedChord = [baseNote, third, fifth];

    console.log("Generated", generatedChord);

    return new Chord(baseNote, this.qualitiesByDegree[degreeAsIndex], generatedChord);
  }

  chordOfDegreeAndQuality = (degree: number, quality: ChordQuality) => {
      console.log("Generating a", quality.name, "chord of degree", degree, "in the key of", this.base);

      const degreeAsIndex = degree - 1;
      const baseNote = this.notesOfKey[degreeAsIndex];
      const baseNoteIndex = notes.findIndex(note => note === baseNote);
      const generatedChord = quality.integerNotation
        .map(index => (baseNoteIndex + (index)) % notes.length)
        .map(index => notes[index])
        .map(noteName => noteName);

      console.log("Generated", generatedChord);

      return new Chord(baseNote, quality, generatedChord);
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
  return new Key(scale.name, base, notesOfKey, scale.chordQualities);
}

export default Key;
export { makeKey };
