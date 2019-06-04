import ChordQuality, { resolveQuality } from '../ChordQuality';

//index with modulo n
const seek = (intervals: number[], index: number) => intervals[index % intervals.length];
class Scale {
  constructor (name: string, intervals: number[]) {
    this.name = name;
    this.intervals = intervals;

    // make an integer notiation of the triads,
    // then ask for it's quality
    this.chordQualities = intervals
      .map(
        (step, index) => [
          0,
          step + seek(intervals, index + 1),
          step + seek(intervals, index + 1) + seek(intervals, index + 2) + seek(intervals, index + 3)
          ]
      )
      .map(resolveQuality);
  }

  name: string;
  intervals: number[];
  chordQualities: ChordQuality[];
}

// Intervals
const half = 1;
const whole = half + half;
const augmentedSecond = whole + half;

// Scales
const major = new Scale(
  "major",
  [whole, whole, half, whole, whole, whole, half]
);

const harmonicMinor = new Scale("harmonic minor", [whole, half, whole, whole, half, augmentedSecond, half]);
const egyptian = new Scale("egyptian", [whole, augmentedSecond, whole, augmentedSecond, whole]);

export default Scale;
export {
  major,
  harmonicMinor,
  egyptian
}
