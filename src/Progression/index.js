import { notes } from '../MusicTheory';
import { majorThird, dominantSeventh } from '../MusicTheory/Chord';

const generateProgression = key => {
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
