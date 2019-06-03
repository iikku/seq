import Key from '../MusicTheory/Key';
import Measure from '../SongStructure/Measure';
import Section from '../SongStructure/Section';

const generateProgression = (key: Key, length: number) => {
  return Array.from({ length: length }).map((x, measure) => {
    const randomDegree = Math.floor(Math.random() * 7) + 1;
    return new Measure(
      "measure " + (measure + 1),
      [key.chordOfDegree(randomDegree)] // TODO Add multiple chords when needed
    );
  });
}

function generateStructure(key: Key) {
  // TODO Add heaps of coolness.
  const aProg = generateProgression(key, 4);
  const bProg = generateProgression(key, 8);
  const A = new Section("Verse", aProg);
  const B = new Section("Chorus", bProg);
  const structure = [
    A, A, B, A
  ];

  return structure;
}
export {
  generateStructure
};
