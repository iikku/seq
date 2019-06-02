import { majorThird, dominantSeventh } from '../MusicTheory/Chord';
import Key from '../MusicTheory/Key';

const generateProgression = (key: Key) => {
  return [
    key.chordOfDegree(1, majorThird),
    key.chordOfDegree(4, majorThird),
    key.chordOfDegree(5, dominantSeventh),
    key.chordOfDegree(1, majorThird),
  ];
}

export {
  generateProgression
};
