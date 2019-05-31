class Scale {
  constructor (name, intervals) {
    this.name = name;
    this.intervals = intervals;
  }
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
  harmonicMinor
}
