// 1/256th note to exact note timings or null if not exact
// TODO: Add an empty optional monad instead of null
const _256thToExactOrNull = (d, divisor) => Math.floor(d / divisor) === d / divisor ? d / divisor : null

const toBeat = n => ({
  half:_256thToExactOrNull(n, 128),
  quarter:_256thToExactOrNull(n, 64),
  _8th:_256thToExactOrNull(n, 32),
  _16th:_256thToExactOrNull(n, 16),
});

const notePerBeat = (chord, demisemihemidemisemiquaver) => {
  const beat = toBeat(demisemihemidemisemiquaver).quarter;
  if (beat !== null) {
    return {
      notes: chord[beat % chord.length],
      beats: 1
    }
  } else {
    return null;
  }
}

const noteEveryTwoBeats = (chord, demisemihemidemisemiquaver) => {
  const beat = toBeat(demisemihemidemisemiquaver).half;

  if (beat !== null) {
    return {
      notes: chord[beat % chord.length],
      beats: 2
    }
  } else {
    return null;
  }
}

const slowChord = (chord, demisemihemidemisemiquaver) => {
  const beat = toBeat(demisemihemidemisemiquaver).quarter;

  if (beat === 1) {
    return {
      notes: chord,
      beats: 3
    }
  } else {
    return null;
  }
}

export {
  notePerBeat,
  slowChord,
  noteEveryTwoBeats
};
