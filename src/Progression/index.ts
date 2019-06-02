import { minorThird, majorThird, majorDominantSeventh } from '../MusicTheory/ChordQuality';
import Key from '../MusicTheory/Key';

const generateProgression = (key: Key) => {
  return [
    key.chordOfDegree(1, majorThird),
    key.chordOfDegree(2, minorThird),
    key.chordOfDegree(6, minorThird),
    key.chordOfDegree(4, majorThird),
    key.chordOfDegree(6, minorThird),
    key.chordOfDegree(3, minorThird),
    key.chordOfDegree(6, minorThird),
    key.chordOfDegree(5, majorDominantSeventh),
  ];
}

export {
  generateProgression
};
